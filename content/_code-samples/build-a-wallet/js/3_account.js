const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const xrpl = require("xrpl")

const testnetUrl = "wss://s.altnet.rippletest.net:51233"

let reserveBaseXrp = null, reserveIncrementXrp = null

const prepareLedgerData = (ledger) => {
    reserveBaseXrp = xrpl.dropsToXrp(ledger.reserve_base)
    reserveIncrementXrp = xrpl.dropsToXrp(ledger.reserve_inc)

    return ledger
}

const prepareAccountData = (rawAccountData) => {
    const numOwners = rawAccountData.OwnerCount || 0

    let xrpReserve = null
    if (reserveBaseXrp && reserveIncrementXrp) {
        //TODO: Decimal?
        xrpReserve = reserveBaseXrp + (reserveIncrementXrp * numOwners)
    }

    return {
        classicAddress: rawAccountData.Account,
        xAddress: xrpl.classicAddressToXAddress(rawAccountData.Account, false, true),
        xrpBalance: xrpl.dropsToXrp(rawAccountData.Balance),
        xrpReserve: xrpReserve
    }
}
const createWindow = () => {

    const appWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'view', '3_preload.js'),
        },
    })

    appWindow.loadFile(path.join(__dirname, 'view', '3_account.html'))

    return appWindow
}

const main = async () => {
    const appWindow = createWindow()

    ipcMain.on('address-entered', async (event, address) =>  {

        const client = new xrpl.Client(testnetUrl)

        await client.connect()

        await client.request({
            "command": "subscribe",
            "streams": ["ledger"],
            "accounts": [address]
        })

        //
        client.on("ledgerClosed", async (ledger) => {
            const ledgerData = prepareLedgerData(ledger)
            appWindow.webContents.send('update-ledger-data', ledgerData)
        })

        // Wait for transaction on subscribed account and re-request account data
        client.on("transaction", async (transaction) => {
            const accountInfoRequest = {
                "command": "account_info",
                "account": address,
                "ledger_index": transaction.ledger_index
            }
            const accountInfoResponse = await client.request(accountInfoRequest)
            const accountData = prepareAccountData(accountInfoResponse.result.account_data)
            appWindow.webContents.send('update-account-data', accountData)
        })

        // Initial Account Request
        const accountInfoResponse = await client.request({
            "command": "account_info",
            "account": address,
            "ledger_index": "current"
        })
        const accountData = prepareAccountData(accountInfoResponse.result.account_data)
        appWindow.webContents.send('update-account-data', accountData)
    })
}

app.whenReady().then(main)
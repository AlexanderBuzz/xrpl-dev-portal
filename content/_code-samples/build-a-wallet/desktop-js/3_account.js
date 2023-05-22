const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const xrpl = require("xrpl")
const { prepareReserve, prepareAccountData, prepareLedgerData} = require('./library/3_helpers')

const TESTNET_URL = "wss://s.altnet.rippletest.net:51233"

let reserveBaseXrp = null, reserveIncrementXrp = null

const createWindow = () => {

    const appWindow = new BrowserWindow({
        width: 1024,
        height: 768,
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

        let reserve = null

        const client = new xrpl.Client(TESTNET_URL)

        await client.connect()

        // Reference: https://xrpl.org/subscribe.html
        await client.request({
            "command": "subscribe",
            "streams": ["ledger"],
            "accounts": [address]
        })

        // Reference: https://xrpl.org/subscribe.html#ledger-stream
        client.on("ledgerClosed", async (rawLedgerData) => {
            reserve = prepareReserve(rawLedgerData)
            const ledger = prepareLedgerData(rawLedgerData)
            appWindow.webContents.send('update-ledger-data', ledger)
        })

        // Reference: https://xrpl.org/subscribe.html#transaction-streams
        client.on("transaction", async (transaction) => {
            // Reference: https://xrpl.org/account_info.html
            const accountInfoRequest = {
                "command": "account_info",
                "account": address,
                "ledger_index": transaction.ledger_index
            }
            const accountInfoResponse = await client.request(accountInfoRequest)
            const accountData = prepareAccountData(accountInfoResponse.result.account_data, reserve)
            appWindow.webContents.send('update-account-data', accountData)
        })

        // Initial Account Request -> Get account details on startup
        // Reference: https://xrpl.org/account_info.html
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

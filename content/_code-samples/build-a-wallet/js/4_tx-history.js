const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const xrpl = require("xrpl")
const { prepareReserve, prepareAccountData } = require('./library/3_helpers')
const { prepareTxData } = require('./library/4_helpers')

const TESTNET_URL = "wss://s.altnet.rippletest.net:51233"

const createWindow = () => {

    const appWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'view', '4_preload.js'),
        },
    })

    appWindow.loadFile(path.join(__dirname, 'view', '4_tx-history.html'))

    return appWindow
}

const main = async () => {
    const appWindow = createWindow()

    ipcMain.on('address-entered', async (event, address) => {

        let reserve = null

        const client = new xrpl.Client(TESTNET_URL)

        await client.connect()

        await client.request({
            "command": "subscribe",
            "streams": ["ledger"],
            "accounts": [address]
        })

        client.on("ledgerClosed", async (ledger) => {
            reserve = prepareReserve(ledger)
            appWindow.webContents.send('update-ledger-data', ledger)
        })

        // Wait for transaction on subscribed account and re-request account data
        client.on("transaction", async (transaction) => {
            const accountInfoRequest = {
                "command": "account_info",
                "account": address,
                "ledger_index": transaction.ledger_index
            }

            const accountInfoResponse = await client.request(accountInfoRequest)
            const accountData = prepareAccountData(accountInfoResponse.result.account_data, reserve)
            appWindow.webContents.send('update-account-data', accountData)

            const transactions = prepareTxData([{tx: transaction.transaction}])
            appWindow.webContents.send('update-transaction-data', transactions)
        })

        // Initial Account Request -> get account details
        const accountInfoResponse = await client.request({
            "command": "account_info",
            "account": address,
            "ledger_index": "current"
        })
        const accountData = prepareAccountData(accountInfoResponse.result.account_data)
        appWindow.webContents.send('update-account-data', accountData)

        // Initial Transaction Request -> list transactions on startup
        const txResponse = await client.request({
            "command": "account_tx",
            "account": address
        })
        const transactions = prepareTxData(txResponse.result.transactions)
        appWindow.webContents.send('update-transaction-data', transactions)

    })
}

app.whenReady().then(main)
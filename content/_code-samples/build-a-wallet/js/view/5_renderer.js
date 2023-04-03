window.electronAPI.onOpenSeedDialog((_event) => {
    const seedDialog = document.getElementById('seed-dialog');
    const seedInput = seedDialog.querySelector('input');
    const submitButton = seedDialog.querySelector('button[type="submit"]');
    const resetButton = seedDialog.querySelector('button[type="reset"]');

    submitButton.addEventListener('click', () => {
        const seed = seedInput.value;
        window.electronAPI.onEnterSeed(seed)
        seedDialog.close()
    });

    resetButton.addEventListener('click', () => {
        seedInput.value = '';
    });

    seedDialog.showModal()
})

window.electronAPI.onOpenPasswordDialog((_event) => {console.log('opwd')
    const passwordDialog = document.getElementById('password-dialog');
    const passwordInput = passwordDialog.querySelector('input');
    const submitButton = passwordDialog.querySelector('button[type="submit"]');
    const resetButton = passwordDialog.querySelector('button[type="reset"]');

    submitButton.addEventListener('click', () => {
        const password = passwordInput.value;
        window.electronAPI.onEnterPassword(password)
        passwordDialog.close()
    });

    resetButton.addEventListener('click', () => {
        passwordInput.value = '';
    });

    passwordDialog.showModal()
});

const ledgerIndexEl = document.getElementById('ledger-index')
const ledgerHashEl = document.getElementById('ledger-hash')
const ledgerCloseTimeEl = document.getElementById('ledger-close-time')

const accountAddressClassicEl = document.getElementById('account-address-classic')
const accountAddressXEl = document.getElementById('account-address-x')
const accountBalanceEl = document.getElementById('account-balance')
const accountReserveEl = document.getElementById('account-reserve')

const txTableBodyEl = document.getElementById('tx-table').tBodies[0]
window.testEl = txTableBodyEl

window.electronAPI.onUpdateLedgerData((_event, value) => {
    ledgerIndexEl.innerText = value.ledger_index
    ledgerHashEl.innerText = value.ledger_hash
    ledgerCloseTimeEl.innerText = value.ledger_time
})

window.electronAPI.onUpdateAccountData((_event, value) => {
    accountAddressClassicEl.innerText = value.classicAddress
    accountAddressXEl.innerText = value.xAddress
    accountBalanceEl.innerText = value.xrpBalance
    accountReserveEl.innerText = value.xrpReserve
})

window.electronAPI.onUpdateTransactionData((_event, transactions) => {
    for (let transaction of transactions) {
        txTableBodyEl.insertAdjacentHTML( 'beforeend',
        "<tr>" +
            "<td>" + transaction.confirmed + "</td>" +
            "<td>" + transaction.type + "</td>" +
            "<td>" + transaction.from + "</td>" +
            "<td>" + transaction.to + "</td>" +
            "<td>" + transaction.value + "</td>" +
            "<td>" + transaction.hash + "</td>" +
            "</tr>"
        )
    }
})
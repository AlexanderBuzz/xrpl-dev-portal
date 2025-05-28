---
date: "2018-10-23"
template: '../../@theme/templates/blogpost'
category: 2018
labels:
    - Advisories
markdown:
    editPage:
        hide: true
---
# Updates Coming to Data API

The Data API, which provides data to XRP Charts and third-party tools, is scheduled to update to **version 2.4.0** in approximately two weeks, on **2018-11-07**. This version improves the way the Data API imports and summarizes data on XRP Ledger validators.


## Improvements

The Data API v2.4.0 changes provide the following benefits:

- Adds real-time tracking of validator agreement.
- Indicates when a validator is included in the network's recommended UNL.
- Reports validator agreement in 1-hour and 24-hour rolling windows, plus (non-rolling) daily summaries.
- Tracks whether validators follow the production network, the TestNet, or other ledger history chains.

See the "Action Required" section below for a summary of which methods these changes apply to.

## Action Required

This release contains the following breaking changes:

- **Removed methods.** The following methods are removed in v2.4.0 and will no longer be available after the release on **2018-11-07**:
    - **Get Validations** (`/v2/network/validations`)
    - **Get Validator Validations** (`/v2/network/validators/{pubkey}/validations`)
- **Format Changes.** The request and response formats of the following methods have changed.
    - **Get Validator** (`/v2/network/validators/{pubkey}`)
    - **Get Validators** (`/v2/network/validators`)
    - **Get Daily Validator Reports** (`/v2/network/validator_reports`)
    - **Get Single Validator Daily Reports** (`/v2/network/validators/{pubkey}/validator_reports`)

If you use any of the above API methods, you may need to make changes to use the updated API.

### Preview on Staging

You can try out the new methods by using `http://data-staging.ripple.com` as your base URL.

The API Reference documentation will be updated with the new formats soon.

---
labels:
    - Amendments
category: 2019
date: "2019-04-17"
template: '../../@theme/templates/blogpost'
markdown:
    editPage:
        hide: true
---
# MultiSignReserve is Now Available

[As previously announced](/blog/2019/multisignreserve-expected.md), the MultiSignReserve amendment [became enabled on the XRP Ledger](https://xrpcharts.ripple.com/#/transactions/C421E1D08EFD78E6B8D06B085F52A34A681D0B51AE62A018527E1B8F54C108FB) on 2019-04-17.

## Action Recommended

If you are already using multi-signing, no changes are necessary to continue using it. Optionally, you can now benefit from the reduced reserve requirements by replacing your existing SignerList with an identical or updated one.

If you are not using multi-signing yet, feel free to take this opportunity to [Set Up Multi-Signing](/docs/tutorials/how-tos/manage-account-settings/set-up-multi-signing) with the reduced reserve requirements.


## MultiSignReserve Summary

Reduces the [owner reserve](/docs/concepts/accounts/reserves#owner-reserves) to 5 XRP counted against your XRP Ledger account when it owns a [multi-signing](/docs/concepts/accounts/multi-signing) SignerList, regardless of the number of signers. The reserve requirement for previously-created SignerList objects remains unchanged. To reduce the reserve requirement of SignerList objects created before this amendment was enabled, use a [SignerListSet transaction](/docs/references/protocol/transactions/types/signerlistset.md) to replace the SignerList after this amendment has been enabled. (The replacement can be identical to the previous version.)

Before this amendment, the owner reserve for a SignerList ranged from 15 to 50 XRP, depending on the number of signers in the list.


## Learn, ask questions, and discuss
Related documentation is available in the [XRP Ledger Dev Portal](/docs/), including detailed example API calls and web tools for API testing.

Other resources:

* The Ripple Forum (_Disabled._ Formerly `forum.ripple.com`)
* [The Ripple Dev Blog](https://ripple.com/dev-blog/)
* Ripple Technical Services: <support@ripple.com>
* [XRP Chat Forum](http://www.xrpchat.com/)

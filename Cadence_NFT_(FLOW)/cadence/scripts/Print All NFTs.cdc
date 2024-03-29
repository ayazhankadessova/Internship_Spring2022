// Print All NFTs

import ExampleNFT from 0x02

// Print the NFTs owned by accounts 0x01 and 0x02.
pub fun main() {

    // Get both public account objects
    let account1 = getAccount(0x01)
	let account2 = getAccount(0x02)

    // Find the public Receiver capability for their Collections
    let acct1Capability = account1.getCapability(ExampleNFT.CollectionPublicPath)
    let acct2Capability = account2.getCapability(ExampleNFT.CollectionPublicPath)

    // borrow references from the capabilities
    let receiver1Ref = acct1Capability.borrow<&{ExampleNFT.NFTReceiver}>()
        ?? panic("Could not borrow account 1 receiver reference")
    let receiver2Ref = acct2Capability.borrow<&{ExampleNFT.NFTReceiver}>()
        ?? panic("Could not borrow account 2 receiver reference")

    // Print both collections as arrays of IDs
    log("Account 1 NFTs")
    log(receiver1Ref.getIDs())

    log("Account 2 NFTs")
    log(receiver2Ref.getIDs())
}

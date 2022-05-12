// Print 0x02 NFTs

import ExampleNFT from 0x02

// Print the NFTs owned by account 0x02.
pub fun main() {
    // Get the public account object for account 0x02
    let nftOwner = getAccount(0x02)
    let nftOwner2 = getAccount(0x01)
    let nftOwner3 = getAccount(0x03)

    // Find the public Receiver capability for their Collection
    let capability = nftOwner.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
    let capability2 = nftOwner2.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)
    let capability3 = nftOwner3.getCapability<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath)


    // borrow a reference from the capability
    let receiverRef = capability.borrow()
        ?? panic("Could not borrow the receiver reference")
    let receiver2Ref = capability2.borrow()
        ?? panic("Could not borrow the receiver reference")
    let receiver3Ref = capability3.borrow()
        ?? panic("Could not borrow the receiver reference")

    // Log the NFTs that they own as an array of IDs
    log("Account 2 NFTs")
    log(receiverRef.getIDs())

    log("Account 1 NFTs")
    log(receiver2Ref.getIDs())

    log("Account 3 NFTs")
    log(receiver3Ref.getIDs())
}

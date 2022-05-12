// Setup Account

import ExampleNFT from 0x02

// This transaction configures a user's account
// to use the NFT contract by creating a new empty collection,
// storing it in their account storage, and publishing a capability
transaction {
    prepare(acct: AuthAccount) {

        // Create a new empty collection
        let collection <- ExampleNFT.createEmptyCollection()

        // store the empty NFT Collection in account storage
        acct.save<@ExampleNFT.Collection>(<-collection, to: ExampleNFT.CollectionStoragePath)

        log("Collection created for account 1")

        // create a public capability for the Collection
        acct.link<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)

        log("Capability created")
    }
}
 
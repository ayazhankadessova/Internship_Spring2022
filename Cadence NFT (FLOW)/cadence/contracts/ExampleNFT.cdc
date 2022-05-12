// ExampleNFT.cdc
//
// This is a complete version of the ExampleNFT contract
// that includes withdraw and deposit functionality, as well as a
// collection resource that can be used to bundle NFTs together.
//
// It also includes a definition for the Minter resource,
// which can be used by admins to mint new NFTs.
//
// Learn more about non-fungible tokens in this tutorial: https://docs.onflow.org/docs/non-fungible-tokens

pub contract ExampleNFT {

    // Declare Path constants so paths do not have to be hardcoded
    // in transactions and scripts

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
        }
    }

    // We define this interface purely as a way to allow users
    // to create public, restricted references to their NFT Collection.
    // They would use this to only publicly expose the deposit, getIDs,
    // and idExists fields in their Collection
    pub resource interface NFTReceiver {

    // safe methods 
        pub fun deposit(token: @NFT)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool
    }

    // The definition of the Collection resource that
    // holds the NFTs that a user owns
    // keep track of which tokens exist in the collection, token id and token itself
    pub resource Collection: NFTReceiver { // NFT Receiver as our interfac
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        // @ - sign that dictionary contains resources, so we need to treat it like a resource
        pub var ownedNFTs: @{UInt64: NFT}

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedNFTs <- {}
        }

        // withdraw - only accessible to the owner of the collection, no intefrace thatcontrols it
        //
        // pass in the Token ID that we want & get back the token resource that we want
        //
        // Function that removes an NFT from the collection 
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawID)!

            return <-token
        }

        // deposit 
        //
        // 1. pass in the Token itself 
        //
        // Function that takes a NFT as an argument and 
        // adds it to the collections dictionary
        pub fun deposit(token: @NFT) {
            // add the new token to the dictionary with a force assignment
            // if there is already a value at that key, it will fail and revert
            self.ownedNFTs[token.id] <-! token
        }

        // idExists checks to see if a NFT 
        // with the given ID exists in the collection
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys // return all the keys in the dictionary
        }

        destroy() {
            destroy self.ownedNFTs // destroy to whatever in old token variable, destroy the entire dictionary
            // should u be just destroying them or sending somewhere, as they have some value 
        }
    }

    // creates a new empty Collection resource and returns it, no Tokens there
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    // NFTMinter - belongs to an admin/site that will be controlling the minting of the NFTs & 
    // it allows a trusted source to handle the actual creation of the assets 
    //
    // Resource that would be owned by an admin or by a smart contract 
    // that allows them to mint new NFTs when needed
    pub resource NFTMinter {

        // the ID that is used to mint NFTs
        // it is only incremented so that NFT ids remain
        // unique. It also keeps track of the total number of NFTs
        // in existence
        pub var idCount: UInt64

        init() {
            self.idCount = 1
        }

        // mintNFT 
        //
        // Function that mints a new NFT with a new ID
        // and returns it to the caller
        pub fun mintNFT(): @NFT { // allows you to pass in any NFT as long as it has that receiver interface 
        // & that functionality on it

            // create a new NFT
            var newNFT <- create NFT(initID: self.idCount)

            // change the id so that each ID is unique
            self.idCount = self.idCount + 1 as UInt64
            
            return <-newNFT
        }
    }

	init() {
        self.CollectionStoragePath = /storage/nftTutorialCollection
        self.CollectionPublicPath = /public/nftTutorialCollection
        self.MinterStoragePath = /storage/nftTutorialMinter

		// store an empty NFT Collection in account storage
        self.account.save(<-self.createEmptyCollection(), to: self.CollectionStoragePath)

        // publish a reference to the Collection in storage
        self.account.link<&{NFTReceiver}>(self.CollectionPublicPath, target: self.CollectionStoragePath)

        // store a minter resource in account storage
        // ADMIN ACCOUNT - give ability to mint NFTs, pop that to a different 
        // location in storage bc it's a diff resource
        self.account.save(<-create NFTMinter(), to: self.MinterStoragePath)
	}
}
 

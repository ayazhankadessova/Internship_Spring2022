// NFT Exists

import NonFungibleTokenv1 from 0x01

// This transaction checks if an NFT exists in the storage of the given account
// by trying to borrow from it. If the borrow succeeds (returns a non-nil value), the token exists!
transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&NonFungibleTokenv1.NFT>(from: /storage/BasicNFTPath) != nil {
            log("The token exists!")
        } else {
            log("No token found!")
        }
    }
}
 
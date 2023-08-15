Using 8 layers from open-source to generate NFTs(eyes) and export their metadata through art engine
Upload them and their metadata to Pinata, getting CID.
Deploying Smart Contract with metadata of NFTs and Hidden Image to Rinkeby Test Net and minting NFTs.

Contract: https://rinkeby.etherscan.io/address/0x116eb5549d716c40f9d91c2a24cf8d7ad56cb7d2#writeContract 

NFT: https://testnets.opensea.io/collection/eyesmirrror (Only minted one hehe)

### 🔸 Art Engine -> Let's create art! 

Steps:
1. Download node.js https://nodejs.org/en/download/releases/ or brew install node@14.18.2 (terminal)
2. Check node & npm versions
> node -v
> npm -v
3. npm install
4. Npm run generate -> create 5 NFTs -> found in build -> images -> json for every 5 NFTs w/ respected json meta data
5. Change hastags for rarity

### 🔸 We have images and corresponding json metadata -> IPFS

1. Download IPFS Desktop https://github.com/ipfs/ipfs-desktop/releases IPFS-Desktop-0.20.3.dmg
2. Sign up https://app.pinata.cloud/pinmanager 
*CID never changes unless the Data Changes*
3. IPFS -> images -> +import images, so we can use CID and pint it (point it) to JSON files
4. Click on three dots -> inspect -> check number of files
5. Click on three dots -> copy CID
6. Pinata -> Upload -> CID -> Pinned Que
7. CID -> DNA of data -> copy
8. Change basiuri in src -> config.js -> const baseUri = "ipfs://__imagecollectionCID__"; mine: QmYevjuLLHUrsRcjdpzmLPXYNv2M9ZqLVq6KHLwydtUMHF
9. Run “npm run update_info” in terminal to update uri for other images
10. Delete _metadata.json bc it has metadata of all images and it might break when we do execution on it w/ the dapp 
11. Upload json-s to pinata bc not that big -> also has CID

*Now images live in IPFS and metadata is simply there to give more info about them & their location*

*We will use jsons for SC, bc marketplace will use that data for the OpenSea or other marketplace. Usually we don’t put gateway, so marketplaces can use their gateway, such as Pinata*

12. Upload hidden file (question mark), get CID
13. Put CID to Hidden Image metadata and upload to Pinata -> mine: QmVzrVZAWcS9fexR2MVvaQ8AUWD5Tdbf9wdwCvqsGDVfif 
*Which will be displayed before displaying the real metadata behind the image*

## 🔸 Contract -> Deploy NFT Smart contract 
*we can do it through truffle dashboard, but remix is easier*

1. Go to http://remix.ethereum.org/ & connect to metamask (rinkeby test net)
2. Change parameters, such as price, max supply
3. Copy the `SimpleNft_flat.sol` file in the `contract` folder and deploy it on remix
4. Give name, CID of hidden and images
5. Copy thing ABI (button close to transact) -> After 572 -> ABI
6. Change status pause true -> false
7. Mint 1 -> check in https://testnets.opensea.io/collection/eyesmirrror -> hidden
8. Reveal -> refresh meta data
9. After 572 -> ABI
10. Contract 0x116Eb5549d716C40F9D91C2A24cf8d7AD56cB7d2 verify on etherscan and can use functions, such as withdraw, mint. So public can use it, not just us on remix

## DONE! We can do Dapp now! 






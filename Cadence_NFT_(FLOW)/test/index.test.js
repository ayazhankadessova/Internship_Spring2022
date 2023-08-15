import path from "path";
import * as types from "@onflow/types";
import {
  init,
  sendTransaction,
  deployContractByName,
  getTransactionCode,
} from "flow-js-testing/dist";
import { getScriptCode } from "flow-js-testing/dist/utils/file";
import { executeScript } from "flow-js-testing/dist/utils/interaction";
import { getContractAddress } from "flow-js-testing/dist/utils/contract";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";

const basePath = path.resolve(__dirname, "../cadence");

beforeAll(() => {
  init(basePath);
});

describe("Replicate Playground Accounts", () => {
  test("Create Accounts", async () => {
    // Playground project support 4 accounts, but nothing stops you from creating more by following the example laid out below
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");
    const Charlie = await getAccountAddress("Charlie");
    const Dave = await getAccountAddress("Dave");

    console.log(
      "Four Playground accounts were created with following addresses"
    );
    console.log("Alice:", Alice);
    console.log("Bob:", Bob);
    console.log("Charlie:", Charlie);
    console.log("Dave:", Dave);
  });
});

describe("Deployment", () => {
  test("Deploy NonFungibleTokenv1 contract", async () => {
    const name = "NonFungibleTokenv1";
    const to = await getAccountAddress("Alice");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy ExampleNFT contract", async () => {
    const name = "ExampleNFT";
    const to = await getAccountAddress("Bob");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("Charlie");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });

  test("Deploy HelloWorld contract", async () => {
    const name = "HelloWorld";
    const to = await getAccountAddress("Dave");

    let result;
    try {
      result = await deployContractByName({
        name,
        to,
      });
    } catch (e) {
      console.log(e);
    }

    expect(result.errorMessage).toBe("");
  });
});

describe("Transactions", () => {
  test("test transaction template NFT Exists", async () => {
    const name = "NFT Exists";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const NonFungibleTokenv1 = await getContractAddress("NonFungibleTokenv1");

    const addressMap = {
      NonFungibleTokenv1,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Mint NFT", async () => {
    const name = "Mint NFT";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const ExampleNFT = await getContractAddress("ExampleNFT");

    const addressMap = {
      ExampleNFT,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Setup Account", async () => {
    const name = "Setup Account";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");

    // Set transaction signers
    const signers = [Alice];

    // Generate addressMap from import statements
    const ExampleNFT = await getContractAddress("ExampleNFT");

    const addressMap = {
      ExampleNFT,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });

  test("test transaction template Transfer", async () => {
    const name = "Transfer";

    // Import participating accounts
    const Charlie = await getAccountAddress("Charlie");

    // Set transaction signers
    const signers = [Charlie];

    // Generate addressMap from import statements
    const ExampleNFT = await getContractAddress("ExampleNFT");

    const addressMap = {
      ExampleNFT,
    };

    let code = await getTransactionCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x03": Charlie,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    let txResult;
    try {
      txResult = await sendTransaction({
        code,
        signers,
      });
    } catch (e) {
      console.log(e);
    }

    expect(txResult.errorMessage).toBe("");
  });
});

describe("Scripts", () => {
  test("test script template Print 0x02 NFTs", async () => {
    const name = "Print 0x02 NFTs";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");
    const Charlie = await getAccountAddress("Charlie");

    // Generate addressMap from import statements
    const ExampleNFT = await getContractAddress("ExampleNFT");

    const addressMap = {
      ExampleNFT,
    };

    let code = await getScriptCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
        "0x02": Bob,
        "0x03": Charlie,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    const result = await executeScript({
      code,
    });

    // Add your expectations here
    expect().toBe();
  });

  test("test script template Print All NFTs", async () => {
    const name = "Print All NFTs";

    // Import participating accounts
    const Alice = await getAccountAddress("Alice");
    const Bob = await getAccountAddress("Bob");

    // Generate addressMap from import statements
    const ExampleNFT = await getContractAddress("ExampleNFT");

    const addressMap = {
      ExampleNFT,
    };

    let code = await getScriptCode({
      name,
      addressMap,
    });

    // pass corrected addressed to getAccount calls
    code = code.replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
      const accounts = {
        "0x01": Alice,
        "0x02": Bob,
      };
      const name = accounts[match];
      return `getAccount(${name})`;
    });

    const result = await executeScript({
      code,
    });

    // Add your expectations here
    expect().toBe();
  });
});

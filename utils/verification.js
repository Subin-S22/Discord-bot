import caver from "../caver/caver";

export const NFT_ADDRESS = "0x92FCcc0940B5bb0e39Ea31dC351E409a5056dee6";
export const TESTNET_KLAPES_ADDRESS =
  "0xfF3fb412746d97E5a5BdC4AEC92a3e13eaAF3b21";
const KLAPES_CONTRACT_ABI = require("../abi/Klapes.json").abi;
export const holderVerification = (actions) => {
  if (caver) {
    const contract = new caver.klay.Contract(
      KLAPES_CONTRACT_ABI,
      process.env.ENV === "DEV" ? TESTNET_KLAPES_ADDRESS : NFT_ADDRESS
    );

    actions(contract);
  }
};

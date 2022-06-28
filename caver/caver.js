import Caver from "caver-js";

let caver;

if (typeof window !== "undefined") {
  caver = new Caver(window.klaytn);
}

export default caver;

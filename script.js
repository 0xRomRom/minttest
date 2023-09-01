import NFT_ABI from "./abi.js";

const mintBtn = document.querySelector(".mint");
const connectWalletBtn = document.querySelector(".connect");

const nftContract = "0x901a473D0Be572e31bb1E74793C53591aA4c05D3";

window.web3 = new Web3(window.ethereum);
const contractInstance = new web3.eth.Contract(NFT_ABI, nftContract);

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal;
let provider;
let wallet = "";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "5bf08719a9d043d6838fc33c77dc149a",
    },
  },
};

web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions,
});

connectWalletBtn.addEventListener("click", async () => {
  try {
    provider = await web3Modal.connect();
  } catch (err) {
    console.log("Could not get a wallet connection", err);
    return;
  }
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  wallet = accounts[0];
});

mintBtn.addEventListener("click", async () => {
  try {
    await contractInstance.methods.publicMint().send({
      from: wallet,
      value: web3.utils.toWei("0.01", "ether"),
      gasLimit: 300000,
    });
  } catch (err) {
    console.error(err);
  }
});

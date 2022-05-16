import detectEthereumProvider from "@metamask/detect-provider";
import { showErrorToast } from "utils";
import Web3 from "web3";

const connectWallet = async (
  walletId: string,
  onProviderFetch: (web3: any, walletAddress: string) => void
) => {
  let provider: any;
  if (walletId === "metamask") {
    let errorMessage = "Something went wrong";
    try {
      provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (!provider) {
        errorMessage = "Metamask not installed or available";
        throw false;
      }
    } catch (err) {
      showErrorToast(errorMessage);
    }
  }
  if (!provider) return;
  try {
    await provider.enable();
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let web3 = new Web3(provider);
    onProviderFetch(web3, account);
  } catch (err) {
    console.log(err);
  }
};

export default connectWallet;

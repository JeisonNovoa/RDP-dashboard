import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.REACT_APP_PRIVATE_KEY || process.env.REACT_APP_PRIVATE_KEY === "") {
  console.log("🛑 Private key not found.");
}

if (!process.env.REACT_APP_QUICKNODE_API_URL || process.env.REACT_APP_QUICKNODE_API_URL === "") {
  console.log("🛑 QuickNode API URL not found.");
}

if (!process.env.REACT_APP_WALLET_ADDRESS || process.env.REACT_APP_WALLET_ADDRESS === "") {
  console.log("🛑 Wallet Address not found.");
}

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.REACT_APP_PRIVATE_KEY,
  process.env.REACT_APP_QUICKNODE_API_URL,
  {
    clientId: process.env.REACT_APP_NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    secretKey: process.env.REACT_APP_THIRDWEB_SECRET_KEY,
  }
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("👋 SDK initialized by address:", address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

export default sdk; 
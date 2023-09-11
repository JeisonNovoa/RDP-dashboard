import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from '@thirdweb-dev/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider activeChain="mumbai" clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}><App /></ThirdwebProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);

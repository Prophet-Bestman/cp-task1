import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import App from "./App.tsx";
import "./index.css";
import FormProvider from "./contexts/FormProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#087B2F",
          borderRadius: 2,

          // Alias Token
          colorPrimaryBg: "#087B2F",
        },
      }}
    >
      <FormProvider>
        <App />
      </FormProvider>
    </ConfigProvider>
  </React.StrictMode>
);

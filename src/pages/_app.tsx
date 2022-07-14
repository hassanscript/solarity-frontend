import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { ToastContainer } from "react-toastify";
import AppLoader from "../components/AppLoader";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
// for Drag and Drop
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// For redux
import {
  Provider,
  RootStateOrAny,
  useDispatch,
  useSelector,
} from "react-redux";
import store from "../redux/store";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/App.css";
import { checkSession } from "../redux/slices/authSlice";
import { useRouter } from "next/router";
import { startLoadingApp } from "redux/slices/commonSlice";
import { stopLoadingApp } from "../redux/slices/commonSlice";

// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
const endpoint = "https://ssc-dao.genesysgo.net";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

function MyApp({ children }: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { logged, profileData, checkingSession, iframe } = useSelector(
    (state: RootStateOrAny) => ({
      profileData: state.profile.data,
      logged: state.auth.logged,
      checkingSession: state.auth.checkingSession,
      iframe: state.common.iframe,
    })
  );

  // load on not visibile!!!
  useEffect(() => {
    const currentRoute = router.pathname;

    const isIframe = currentRoute.substring(1, 7) === "iframe";
    if (!isIframe) {
      if (currentRoute !== "/setup" && logged && !profileData.visible) {
        dispatch(startLoadingApp());
        router.push("/setup");
        return;
      }
      if (currentRoute === "/profile" && !logged && !checkingSession) {
        router.push("/");
        return;
      }
    }
    dispatch(stopLoadingApp());
  }, [logged, profileData.visible]);

  useEffect(() => {
    dispatch(checkSession());
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>{children}</WalletProvider>
    </ConnectionProvider>
  );
}

function ReduxWrapped({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Solarity</title>
      </Head>
      <MyApp>
        <AppLoader />
        <ToastContainer
          style={{ position: "fixed", zIndex: "100000000" }}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </MyApp>
    </Provider>
  );
}

export default ReduxWrapped;

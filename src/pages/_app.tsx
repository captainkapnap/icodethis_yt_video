import { type AppType } from "next/dist/shared/lib/utils";
import "icodethis/styles/globals.css";
import "icodethis/styles/util.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;

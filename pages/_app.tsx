import "@/styles/globals.css";
import App from "next/app";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser } from "../utils/authUser";
import axios from "axios";
import CartProvider from "@/CartProvider";

interface User {
  phone: string;
  role?: string;
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const { token } = parseCookies(ctx);
    let pageProps = {};
    const protectedRoutes = ctx.pathname === "/" || ctx.pathname === "/admin";
    if (!token) {
      protectedRoutes && redirectUser(ctx, "/login");
    } else {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/auth`, {
          headers: { Authorization: token },
        });
        const user: User = res.data.user;
        pageProps = { ...pageProps, user };
      } catch (err) {
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    const pathname = this.props.router.pathname;
    const protectedRoutes = pathname === "/" || pathname === "/admin";
    if (protectedRoutes) {
      return (
        <>
          <CartProvider>
            <Navbar user={pageProps.user} />
            <Component {...pageProps} />
          </CartProvider>
        </>
      );
    } else {
      return (
        <>
          <Component {...pageProps} />
        </>
      );
    }
  }
}

export default MyApp;

import "@/styles/globals.css";
import Head from 'next/head';
import { AuthProvider } from "@/components/AuthContext";

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Prihlásenie užívateľa</title>
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default App
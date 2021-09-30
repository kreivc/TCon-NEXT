import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { DataProvider } from "../context/GlobalState";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<DataProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</DataProvider>
		</ChakraProvider>
	);
}

export default MyApp;

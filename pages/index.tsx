import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../assets/logoTCon.png";

export default function Home() {
	return (
		<>
			<Head>
				<title>TCon</title>
				<meta name="description" content="Technology Consultant" />
				<link rel="icon" href="/tconnotext.png" />
			</Head>

			<Box h="80vh">
				<Box
					alignItems="center"
					d="flex"
					flexDir="column"
					justifyContent="center"
					my="auto"
					h="full"
					position="relative"
				>
					<Image
						objectFit={"cover"}
						src={Logo}
						objectPosition="center"
						alt="logohome"
					/>

					<Text fontSize="md" color="#7e7e7e">
						TCon Make Our Live Easier
					</Text>
				</Box>
			</Box>
		</>
	);
}

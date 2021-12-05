import Head from "next/head";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useRouter } from "next/router";

export interface Consultant {
	email: string;
	name: string;
	phone: string;
	userId: string;
}

interface SearchProps {
	data: {
		consultants: Consultant[];
	};
}
export default function Search({ data }: SearchProps) {
	const router = useRouter();
	const [noData, setNoData] = useState(false);

	return (
		<>
			<Head>
				<title>Search: {router.query.c}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/tconnotext.png" />
			</Head>
			<Box p={{ base: "10", md: "20" }} pt={{ base: "5", md: "5" }}>
				<Text fontWeight="bold" fontSize="xl" py="2" color="gray.700">
					Search result for: {router.query.c}
				</Text>
				<SimpleGrid column={{ base: "1", md: "3" }} spacing={8}>
					{data.consultants.map((c, i) => {
						if (c.name.toLowerCase().includes(router.query.c as string)) {
							noData === false && setNoData(true);
							return <Card key={c.userId} consultant={c} />;
						} else {
							if (!noData && i === data.consultants.length - 1) {
								return (
									<Box
										p="2"
										fontWeight="semibold"
										bg="gray.100"
										color="#52C8FA"
										rounded="md"
										textAlign="center"
										w={{ base: "full", md: "85px" }}
										key={c.userId}
									>
										No Data
									</Box>
								);
							}
						}
					})}
				</SimpleGrid>
			</Box>
		</>
	);
}

export async function getServerSideProps() {
	try {
		const res = await axios.get(
			"https://tcon-api.herokuapp.com/consultant/getall"
		);
		return {
			props: {
				data: res.data,
			},
		};
	} catch (err) {
		console.log(err);
	}
}

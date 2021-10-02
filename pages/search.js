import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import Card from "../components/Card";
import { useRouter } from "next/router";

export default function Search({ data }) {
	const router = useRouter();
	return (
		<Box p="20">
			<SimpleGrid columns={3} spacing={10}>
				{data.consultants.map((c) => {
					if (c.name.toLowerCase().includes(router.query.c)) {
						return <Card key={c.userId} consultant={c} />;
					}
				})}
			</SimpleGrid>
		</Box>
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

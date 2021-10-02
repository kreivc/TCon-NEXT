import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Card({ consultant }) {
	return (
		<Box
			as="button"
			p="20px"
			color="white"
			fontWeight="semibold"
			bg="#52C8FA"
			_hover={{ bg: "#60cdfc" }}
			rounded="md"
		>
			<Text>{consultant.name}</Text>
		</Box>
	);
}

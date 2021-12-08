import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Consultant } from "../pages/search";

interface CardProps {
	consultant: Consultant;
}

export default function Card({ consultant }: CardProps) {
	const route = useRouter();
	return (
		<Box
			as="button"
			p="20px"
			color="white"
			fontWeight="semibold"
			bg="#52C8FA"
			_hover={{ bg: "#60cdfc" }}
			rounded="md"
			onClick={() =>
				route.push(
					`/consultant/${consultant.userId}/${consultant.name}/${consultant.email}`
				)
			}
		>
			<Text>{consultant.name}</Text>
		</Box>
	);
}

/* eslint-disable react/no-children-prop */
import {
	VStack,
	CloseButton,
	InputGroup,
	InputRightElement,
	Input,
	Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function MobileNav({ mobileNav, auth, handleLogout }) {
	const router = useRouter();
	return (
		<VStack
			pos="absolute"
			top={0}
			left={0}
			right={0}
			display={mobileNav.isOpen ? "flex" : "none"}
			flexDirection="column"
			p={2}
			pb={4}
			m={2}
			bg={"white"}
			spacing={3}
			rounded="sm"
			shadow="md"
			zIndex={99}
			color="#2e373f"
		>
			<CloseButton
				aria-label="Close menu"
				justifySelf="self-start"
				onClick={mobileNav.onClose}
			/>
			<InputGroup w="full">
				<InputRightElement
					pointerEvents="none"
					children={<AiOutlineSearch color="#52C8FA" />}
				/>
				<Input type="tel" placeholder="Search..." rounded="full" />
			</InputGroup>
			{!auth ? (
				<Button
					w="full"
					variant="ghost"
					bg="#52C8FA"
					onClick={() => {
						router.push("/login");
						mobileNav.onClose();
					}}
				>
					Login
				</Button>
			) : (
				<Button
					w="full"
					variant="ghost"
					bg="red"
					_hover={{ bg: "red.400" }}
					onClick={handleLogout}
				>
					Logout
				</Button>
			)}
		</VStack>
	);
}

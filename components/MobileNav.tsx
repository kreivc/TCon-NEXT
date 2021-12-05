/* eslint-disable react/no-children-prop */
import {
	VStack,
	CloseButton,
	InputGroup,
	InputRightElement,
	Input,
	Button,
	Menu,
	MenuList,
	MenuItem,
	MenuButton,
	UseDisclosureReturn,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

interface MobileNavProps {
	mobileNav: UseDisclosureReturn;
	auth: any;
	handleLogout: () => void;
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function MobileNav({
	mobileNav,
	auth,
	handleLogout,
	handleSearch,
	setSearch,
}: MobileNavProps) {
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
			<InputGroup w="full" as="form" onSubmit={handleSearch}>
				<Input
					type="tel"
					placeholder="Search..."
					rounded="full"
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
				/>
				<InputRightElement
					as="button"
					children={<AiOutlineSearch color="#52C8FA" />}
					color="#52C8FA"
					type="submit"
				/>
			</InputGroup>
			{auth.name == "" ? (
				<Button
					w="full"
					variant="ghost"
					color="white"
					bg="#52C8FA"
					onClick={() => {
						router.push("/login");
						mobileNav.onClose();
					}}
				>
					Login
				</Button>
			) : (
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<FiChevronDown />}
						color="white"
						bg="#52C8FA"
						_hover={{ bg: "#60cdfc" }}
						w="full"
					>
						{auth.name}
					</MenuButton>
					<MenuList>
						<MenuItem
							variant="ghost"
							fontSize="medium"
							color="gray.700"
							cursor="pointer"
							fontWeight="semibold"
							_hover={{ color: "#60cdfc", bg: "gray.100" }}
							_active={{ bg: "gray.200" }}
						>
							Profile
						</MenuItem>
						<MenuItem
							variant="solid"
							fontSize="medium"
							color="gray.700"
							cursor="pointer"
							onClick={handleLogout}
							fontWeight="semibold"
							_hover={{ color: "red", bg: "gray.100" }}
							_active={{ bg: "gray.200" }}
						>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			)}
		</VStack>
	);
}

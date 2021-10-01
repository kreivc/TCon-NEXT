/* eslint-disable react/no-children-prop */
import React, { useContext } from "react";
import {
	chakra,
	HStack,
	Flex,
	IconButton,
	useColorModeValue,
	useDisclosure,
	CloseButton,
	VStack,
	Button,
	Input,
	InputRightElement,
	InputGroup,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Logo from "../assets/logopanjang.png";
import { useRouter } from "next/router";
import { DataContext } from "../context/GlobalState";
import MobileNav from "./MobileNav";

export default function Header() {
	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	const mobileNav = useDisclosure();
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("user");
		dispatch({ type: "AUTH", payload: {} });
		return router.reload("/");
	};

	return (
		<React.Fragment>
			<chakra.header
				transition="box-shadow 0.2s"
				bg={"white"}
				w="full"
				overflowY="hidden"
				borderBottomWidth={2}
				borderBottomColor={useColorModeValue("gray.200", "gray.900")}
			>
				<chakra.div h="4.5rem" mx="auto" maxW="1200px">
					<Flex
						w="full"
						h="full"
						px="6"
						alignItems="center"
						justifyContent="space-between"
					>
						<Flex align="flex-start">
							<HStack as="a" href="/" color="#52C8FA" cursor="pointer">
								<Image
									src={Logo}
									alt="logo_adaconda"
									width="120px"
									height="65px"
									objectFit="cover"
								/>
							</HStack>
						</Flex>
						<Flex>
							<HStack spacing="5" display={{ base: "none", md: "flex" }}>
								<InputGroup w="500px">
									<InputRightElement
										pointerEvents="none"
										children={<AiOutlineSearch color="#52C8FA" />}
									/>
									<Input type="tel" placeholder="Search..." rounded="full" />
								</InputGroup>
							</HStack>
						</Flex>
						<Flex justify="flex-end" align="center" color="gray.400">
							<HStack spacing="5" display={{ base: "none", md: "flex" }}>
								{!auth ? (
									<Button
										variant="solid"
										fontSize="medium"
										color="white"
										bg="#52C8FA"
										_hover={{ bg: "#60cdfc" }}
										cursor="pointer"
										onClick={() => router.push("/login")}
									>
										Sign In
									</Button>
								) : (
									<Button
										variant="solid"
										fontSize="medium"
										color="white"
										bg="red"
										_hover={{ bg: "red.400" }}
										cursor="pointer"
										onClick={handleLogout}
									>
										Logout
									</Button>
								)}
							</HStack>
							<IconButton
								display={{ base: "flex", md: "none" }}
								aria-label="Open menu"
								fontSize="20px"
								color={useColorModeValue("gray.800", "inherit")}
								variant="ghost"
								icon={<AiOutlineMenu />}
								onClick={mobileNav.onOpen}
							/>
						</Flex>
					</Flex>
					<MobileNav
						mobileNav={mobileNav}
						auth={auth}
						handleLogout={handleLogout}
					/>
				</chakra.div>
			</chakra.header>
		</React.Fragment>
	);
}

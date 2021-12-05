/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import {
	chakra,
	HStack,
	Flex,
	IconButton,
	useDisclosure,
	Button,
	Input,
	InputRightElement,
	InputGroup,
	Menu,
	MenuList,
	MenuItem,
	MenuButton,
	createStandaloneToast,
	Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import Logo from "../assets/logopanjang.png";
import { useRouter } from "next/router";
import MobileNav from "./MobileNav";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BiGlobe } from "react-icons/bi";
import { IoMdChatboxes } from "react-icons/io";
import { TiTicket } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUser, selectUser } from "../store/UserSLice";
import { getLocalStorage } from "../utils/hooks";

export default function Header() {
	const dispatch = useAppDispatch();
	// const auth = useAppSelector(selectUser);
	const { user: auth } = getLocalStorage(); // temporary
	const [search, setSearch] = useState("");

	const mobileNav = useDisclosure();
	const router = useRouter();
	const toast = createStandaloneToast();

	//
	const loading = false;

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		router.push(`/search?c=${search}`);
		// dispatch({ type: "LOADING", payload: true });
		mobileNav.onClose();
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		dispatch(logoutUser());
		toast({
			title: "Logged out successfully!",
			description: "Successfully logged out.",
			status: "success",
			duration: 5000,
			isClosable: true,
		});
		return router.push("/");
	};

	return (
		<React.Fragment>
			<chakra.header
				transition="box-shadow 0.2s"
				bg={"white"}
				w="full"
				overflowY="hidden"
				borderBottomWidth={2}
				borderBottomColor={"gray.200"}
			>
				<chakra.div h="4.5rem" mx="auto" maxW="1200px">
					<Flex
						w="full"
						h="full"
						px="6"
						alignItems="center"
						justifyContent="space-between"
					>
						<Flex align="flex-start" alignItems="center" gridGap="3">
							<HStack
								color="#52C8FA"
								cursor="pointer"
								onClick={() => router.push("/")}
							>
								<Image
									src={Logo}
									alt="logo_adaconda"
									width="120px"
									height="65px"
									objectFit="cover"
								/>
							</HStack>
							<Flex color="#605C5C" gridGap={1}>
								<Button w="full" variant="ghost" leftIcon={<BiGlobe />}>
									Blog
								</Button>
								<Button w="full" variant="ghost" leftIcon={<IoMdChatboxes />}>
									Ticket
								</Button>
								<Button w="full" variant="ghost" leftIcon={<TiTicket />}>
									Chat
								</Button>
							</Flex>
						</Flex>

						<Flex
							justify="flex-end"
							align="center"
							color="gray.400"
							gridGap="4"
						>
							<Flex>
								<HStack spacing="5" display={{ base: "none", md: "flex" }}>
									<InputGroup w="280px" as="form" onSubmit={handleSearch}>
										<Input
											type="text"
											placeholder="Search..."
											rounded="lg"
											onChange={(e) => setSearch(e.target.value.toLowerCase())}
										/>
										{loading ? (
											<InputRightElement
												as="button"
												children={
													<Spinner
														thickness="2px"
														speed="0.65s"
														emptyColor="gray.200"
														color="#52C8FA"
														size="md"
													/>
												}
												type="submit"
											/>
										) : (
											<InputRightElement
												as="button"
												children={<AiOutlineSearch color="#52C8FA" />}
												type="submit"
											/>
										)}
									</InputGroup>
								</HStack>
							</Flex>
							<HStack spacing="5" display={{ base: "none", md: "flex" }}>
								{auth.name == "" ? (
									<Button
										variant="solid"
										fontSize="medium"
										color="white"
										bg="#52C8FA"
										_hover={{ bg: "#60cdfc" }}
										cursor="pointer"
										onClick={() => router.push("/login")}
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
							</HStack>
							<IconButton
								display={{ base: "flex", md: "none" }}
								aria-label="Open menu"
								fontSize="20px"
								color={"gray.800"}
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
						handleSearch={handleSearch}
						setSearch={setSearch}
					/>
				</chakra.div>
			</chakra.header>
		</React.Fragment>
	);
}

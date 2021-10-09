/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import {
	FormLabel,
	Flex,
	Input,
	FormControl,
	Button,
	Text,
	Container,
	VStack,
	Heading,
	SimpleGrid,
	GridItem,
	Checkbox,
	useBreakpointValue,
	useColorModeValue,
	Box,
	createStandaloneToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Logo from "../assets/logoTCon.png";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useAssert from "../hooks/useAssert";

export default function Register() {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const router = useRouter();
	const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
	const [isLoading, setIsLoading] = useState(false);
	const toast = createStandaloneToast();
	const assert = useAssert(toast, "Unable to register.");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Using && chains so when one fail, it won't continue.
		// Condition must be true to pass assertions.
		const formValidationAssertions =
			assert(firstName !== "", "First name cannot be null") &&
			assert(lastName !== "", "Last Name cannot be null") &&
			assert(email !== "", "Email cannot be null") &&
			assert(password !== "", "Password cannot be null") &&
			assert(rePassword !== "", "Re-Password cannot be null") &&
			assert(password.length >= 6, "Password must be 6 character minimal.") &&
			assert(rePassword.length >= 6, "Re-Password must be 6 character minimal.") &&
			assert(password === rePassword, "Password didn't match");
		if (!formValidationAssertions) {
			return;
		}

		setIsLoading(true);
		try {
			await axios
				.post("https://tcon-api.herokuapp.com/auth/register", {
					email,
					firstName,
					lastName,
					password,
					phoneNumber,
				})
			toast({
				title: "Successfully Registered!",
				description: "Login to continue.",
				status: "success",
				duration: 5000,
				isClosable: true,
			})
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
		router.push("/login");
	};

	const colSpan = useBreakpointValue({ base: 2, md: 1 });

	return (
		<div>
			<Head>
				<title>Sign Up</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container maxW="container.2xl" p={0}>
				<Flex
					h={{ base: "auto", md: "100vh" }}
					direction={{ base: "column-reverse", md: "row-reverse" }}
				>
					<VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
						<VStack spacing={3} alignItems="flex-start">
							<Heading size="2xl">Register to TCon</Heading>
							<Text>
								If you already have an account, click here to&nbsp;
								<Text
									color="#52C8FA"
									as="span"
									fontWeight="bold"
									cursor="pointer"
									onClick={() => router.push("/login")}
								>
									Login.
								</Text>
							</Text>
						</VStack>
						<Box as="form" w="100%" onSubmit={handleSubmit}>
							<SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
								<GridItem colSpan={colSpan}>
									<FormControl>
										<FormLabel>First Name</FormLabel>
										<Input
											placeholder="John"
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={colSpan}>
									<FormControl>
										<FormLabel>Last Name</FormLabel>
										<Input
											placeholder="Doe"
											onChange={(e) => setLastName(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={2}>
									<FormControl>
										<FormLabel>Email</FormLabel>
										<Input
											placeholder="email@email.com"
											onChange={(e) => setEmail(e.target.value)}
											type="email"
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={2}>
									<FormControl>
										<FormLabel>Phone Number</FormLabel>
										<Input
											placeholder="628xxxxx"
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={colSpan}>
									<FormControl>
										<FormLabel>Password</FormLabel>
										<Input
											placeholder="Password"
											type="password"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={colSpan}>
									<FormControl>
										<FormLabel>Re-Password</FormLabel>
										<Input
											placeholder="Re-Password"
											type="password"
											onChange={(e) => setRePassword(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={2}>
									<Checkbox>
										I agree with te Term & Condition and Privacy Policy
									</Checkbox>
								</GridItem>
								<GridItem colSpan={2}>
									<Button
										variant="outline"
										size="lg"
										w="full"
										type="submit"
										isLoading={isLoading}
										bg="#52C8FA"
										_hover={{ bg: "#60cdfc" }}
										color="white"
									>
										Register
									</Button>
								</GridItem>
							</SimpleGrid>
						</Box>
					</VStack>
					{/* ------- */}
					<VStack
						w="full"
						h="full"
						p={10}
						spacing={2}
						align="center"
						alignItems="center"
						bg={bgColor}
						justifyContent="center"
						d={{ base: "none", md: "flex" }}
					>
						<Image src={Logo} alt="logotcon" />
						<Text fontWeight="semibold" color="">
							Ready to consult?
						</Text>
					</VStack>
				</Flex>
			</Container>
		</div>
	);
}

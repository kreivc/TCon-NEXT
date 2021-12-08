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
	useColorModeValue,
	Box,
	createStandaloneToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Logo from "../assets/logoTCon.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/UserSLice";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const { dispatch } = useContext(DataContext);
	const dispatch = useAppDispatch();

	const router = useRouter();
	const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
	const [isLoading, setIsLoading] = useState(false);
	const toast = createStandaloneToast();

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement | HTMLDivElement>
	) => {
		e.preventDefault();

		if (email === "") {
			return toast({
				title: "Email cannot be null",
				description: "Unable to login.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
		if (password === "") {
			return toast({
				title: "Password cannot be null",
				description: "Unable to login.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
		if (password.length < 5) {
			return toast({
				title: "Password too weak",
				description: "Password must be 5 character minimal.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
		setIsLoading(true);
		const { payload } = await dispatch(login({ email, password }));
		if (payload.message == "Failed to Fetch JSON Payload") {
			localStorage.removeItem("user");
			toast({
				title: "Credential Error!",
				description: "Unable to login.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Login Success!",
				description: "Successfully logged.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			router.push("/");
		}
		setIsLoading(false);
	};

	return (
		<div>
			<Head>
				<title>Sign In</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container maxW="container.2xl" p={0}>
				<Flex
					h={{ base: "auto", md: "100vh" }}
					direction={{ base: "column-reverse", md: "row-reverse" }}
					alignItems="center"
				>
					<VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
						<VStack spacing={3} alignItems="flex-start">
							<Heading size="2xl">Login to TCon</Heading>
							<Text>
								If you don&#8217;t have an account, click here to&nbsp;
								<Text
									color="#52C8FA"
									as="span"
									fontWeight="bold"
									cursor="pointer"
									onClick={() => router.push("/register")}
								>
									Register.
								</Text>
							</Text>
						</VStack>
						<Box as="form" w="100%" onSubmit={handleSubmit}>
							<SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
								<GridItem colSpan={2}>
									<FormControl>
										<FormLabel>Email</FormLabel>
										<Input
											placeholder="email@email.com"
											type="email"
											onChange={(e) => setEmail(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={2}>
									<FormControl>
										<FormLabel>Password</FormLabel>
										<Input
											placeholder="Password"
											type="password"
											onChange={(e) => setPassword(e.target.value)}
										/>
									</FormControl>
								</GridItem>
								<GridItem colSpan={2}>
									<Checkbox>Keep me logged in</Checkbox>
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
										Login
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

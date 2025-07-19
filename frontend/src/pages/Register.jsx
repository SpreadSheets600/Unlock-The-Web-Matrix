import axios from "axios";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { UserPlusIcon, UserIcon, LockIcon, ArrowLeftIcon } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const registerUser = async () => {
		if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
			alert("Please Fill In All Fields");
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords Do No Match!");
			return;
		}

		if (password.length < 6) {
			alert("Password Must Be At Least 6 Characters Long!");
			return;
		}

		setLoading(true);
		try {
			const URI = "http://localhost:5000/api/auth/register";
			await axios.post(URI, { username, password });

			alert("Registration Successful! You Can Now Log In.");
			navigate("/login");
		} catch (error) {
			console.error("Registration Error :", error);

			if (error.response?.data?.message) {
				alert(error.response.data.message);
			} else {
				alert("Registration Failed! Please Try Again.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			registerUser();
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md space-y-8 animate-fade-in">
				{/* Header */}
				<div className="text-center space-y-4">
					<div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
						<UserPlusIcon className="h-10 w-10 text-primary" />
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
						<span className="gradient-text">Join The Community</span>
					</h1>
					<p className="text-muted-foreground text-lg">Create An Account Get Started!</p>
				</div>

				{/* Register Form */}
				<Card className="border-0 shadow-2xl shadow-base-300">
					<CardHeader className="space-y-4 text-center">
						<CardTitle className="text-2xl">Sign Up</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-3">
							<label htmlFor="username" className="text-base font-semibold">
								Username
							</label>
							<div className="relative group">
								<UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
								<Input id="username" type="text" placeholder="Choose a unique username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} className="pl-12 h-12 text-base focus:border-primary/50 transition-colors" />
							</div>
						</div>

						<div className="space-y-3">
							<label htmlFor="password" className="text-base font-semibold">
								Password
							</label>
							<div className="relative group">
								<LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
								<Input id="password" type="password" placeholder="Create a secure password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} className="pl-12 h-12 text-base focus:border-primary/50 transition-colors" />
							</div>
							<p className="text-sm text-muted-foreground">Password Must Be 6 Characters Long</p>
						</div>

						<div className="space-y-3">
							<label htmlFor="confirmPassword" className="text-base font-semibold">
								Confirm Password
							</label>
							<div className="relative group">
								<LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
								<Input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyPress={handleKeyPress} className="pl-12 h-12 text-base focus:border-primary/50 transition-colors" />
							</div>
							{confirmPassword && password !== confirmPassword && <p className="text-sm text-destructive font-medium">Passwords Do Not Match</p>}
						</div>

						<Button onClick={registerUser} className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50" disabled={loading || !username.trim() || !password.trim() || !confirmPassword.trim() || password !== confirmPassword}>
							{loading ? (
								<>
									<div className="w-5 h-5 rounded-full animate-spin mr-2"></div>
									Creating Account ...
								</>
							) : (
								<>
									<UserPlusIcon className="h-5 w-5 mr-2" />
									Create Account
								</>
							)}
						</Button>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Separator />
						<div className="text-center text-base text-muted-foreground">
							Already Have An Account ?{" "}
							<Link to="/login" className="font-semibold text-primary hover:underline transition-all">
								Sign in here
							</Link>
						</div>
					</CardFooter>
				</Card>

				{/* Back to Posts */}
				<div className="text-center">
					<Button variant="ghost" asChild className="text-base">
						<Link to="/">
							<ArrowLeftIcon className="h-4 w-4 mr-2" />
							Back To Posts
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Register;

import axios from "axios";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { LogInIcon, UserIcon, LockIcon, ArrowLeftIcon } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const loginUser = async () => {
		if (!username.trim() || !password.trim()) {
			alert("Please Fill In Both Username And Password");
			return;
		}

		setLoading(true);
		try {
			const URI = "http://localhost:5000/api/auth/login";
			const res = await axios.post(URI, { username, password });

			localStorage.setItem("token", res.data.token);
			navigate("/", {
				replace: true,
			});
		} catch (err) {
			alert("Login Failed! Please Check Your Credentials...");
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			loginUser();
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md space-y-8 animate-fade-in">
				{/* Header */}
				<div className="text-center space-y-4">
					<div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
						<LogInIcon className="h-10 w-10 text-primary" />
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
						<span className="gradient-text">Welcome Back</span>
					</h1>
					<p className="text-muted-foreground text-lg">Sign In To Your Account</p>
				</div>

				{/* Login Form */}
				<Card className="shadow-2xl">
					<CardHeader className="space-y-4 text-center">
						<CardTitle className="text-2xl">Sign In</CardTitle>
						<CardDescription className="text-base">Enter Your Credentials To Access Your Account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-3">
							<label htmlFor="username" className="text-base font-semibold">
								Username
							</label>
							<div className="relative group">
								<UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
								<Input id="username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} className="pl-12 h-12 text-base border-2 focus:border-primary/50 transition-colors" />
							</div>
						</div>

						<div className="space-y-3">
							<label htmlFor="password" className="text-base font-semibold">
								Password
							</label>
							<div className="relative group">
								<LockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
								<Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} className="pl-12 h-12 text-base border-2 focus:border-primary/50 transition-colors" />
							</div>
						</div>

						<Button onClick={loginUser} className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50" disabled={loading || !username.trim() || !password.trim()}>
							{loading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
									Signing In...
								</>
							) : (
								<>
									<LogInIcon className="h-5 w-5 mr-2" />
									Sign In
								</>
							)}
						</Button>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Separator />
						<div className="text-center text-base text-muted-foreground">
							Don't Have An Account?{" "}
							<Link to="/register" className="font-semibold text-primary hover:underline transition-all">
								Create One Here
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

export default Login;

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { HomeIcon, AlertCircleIcon } from "lucide-react";

function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
			<div className="w-full max-w-md">
				<Card className="border-0 shadow-xl glass-effect animate-scale-in">
					<CardHeader className="text-center space-y-6">
						<div className="w-20 h-20 mx-auto bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center shadow-lg">
							<AlertCircleIcon className="h-10 w-10 text-destructive" />
						</div>
						<CardTitle className="text-3xl">Page Not Found</CardTitle>
						<CardDescription className="text-base">You Gost Lost ? The Page You Are Looking Dosen't Exist!</CardDescription>
					</CardHeader>
					<CardContent className="text-center space-y-6">
						<div className="space-y-4">
							<Button asChild className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200">
								<Link to="/">
									<HomeIcon className="h-5 w-5 mr-2" />
									Go To Home
								</Link>
							</Button>
							<Button variant="outline" asChild className="w-full h-12 text-base">
								<Link to="/create">Create A New Post</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default NotFound;

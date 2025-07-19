import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { LoadingPage } from "../components/ui/loading";
import { PlusIcon, MessageSquareIcon, ThumbsUpIcon, BookmarkIcon, ShareIcon, SearchIcon, RefreshCwIcon, LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { Input } from "../components/ui/input";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState("grid");
	const [sortBy, setSortBy] = useState("newest");

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = () => {
		setLoading(true);
		axios
			.get("http://localhost:5000/api/posts/")
			.then((res) => {
				setPosts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error Fetch Posts :", err);
				setLoading(false);
			});
	};

	// Filter and sort posts based on user selection
	const filteredPosts = posts
		.filter((post) => post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || post.content?.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			if (sortBy === "newest") {
				return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
			} else if (sortBy === "oldest") {
				return new Date(a.createdAt || Date.now()) - new Date(b.createdAt || Date.now());
			} else if (sortBy === "title") {
				return (a.title || "").localeCompare(b.title || "");
			}
			return 0;
		});

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4">
			{/* Header */}
			<div className="space-y-4">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
					<div className="flex-1">
						<h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Discover</span> Amazing Content
						</h1>
						<p className="text-muted-foreground text-lg max-w-2xl">Join the conversation and share your thoughts with our growing community of creators and thinkers</p>
					</div>
					<div className="flex-shrink-0">
						<Button asChild size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-gradient-to-r from-primary to-purple-600">
							<Link to="/create">
								<PlusIcon className="h-5 w-5 mr-2" />
								Create Post
							</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Search and filters */}
			<div className="bg-background/50 backdrop-blur-lg rounded-lg shadow-lg p-4 sticky top-0 z-10">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
						<Input placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-background" />
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} className="flex items-center gap-2">
							{viewMode === "grid" ? (
								<>
									<LayoutListIcon className="h-4 w-4" />
									<span className="hidden sm:inline">List View</span>
								</>
							) : (
								<>
									<LayoutGridIcon className="h-4 w-4" />
									<span className="hidden sm:inline">Grid View</span>
								</>
							)}
						</Button>
						<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
							<option value="newest">Newest First</option>
							<option value="oldest">Oldest First</option>
							<option value="title">By Title</option>
						</select>
						<Button variant="ghost" size="icon" onClick={fetchPosts} title="Refresh posts" className="flex-shrink-0">
							<RefreshCwIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Stats Section */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Card className="text-center glass-effect shadow-md bg-gradient-to-br from-background to-muted/30 border-primary/10 hover:border-primary/30 transition-all duration-300">
					<CardContent className="pt-6 pb-6">
						<div className="text-3xl font-bold text-primary">{posts.length}</div>
						<div className="text-sm text-muted-foreground">Total Posts</div>
					</CardContent>
				</Card>
				<Card className="text-center glass-effect shadow-md bg-gradient-to-br from-background to-muted/30 border-primary/10 hover:border-primary/30 transition-all duration-300">
					<CardContent className="pt-6 pb-6">
						<div className="text-3xl font-bold text-primary">{posts.filter((post) => post.author?.username).length}</div>
						<div className="text-sm text-muted-foreground">Authors</div>
					</CardContent>
				</Card>
				<Card className="text-center glass-effect shadow-md bg-gradient-to-br from-background to-muted/30 border-primary/10 hover:border-primary/30 transition-all duration-300">
					<CardContent className="pt-6 pb-6">
						<div className="text-3xl font-bold text-primary">{posts.reduce((acc, post) => acc + Math.ceil((post.content?.length || 0) / 200), 0)}</div>
						<div className="text-sm text-muted-foreground">Total Reading Time (min)</div>
					</CardContent>
				</Card>
			</div>

			{/* Posts List */}
			<div className="space-y-6">
				{filteredPosts.length === 0 ? (
					<Card className="shadow-lg glass-effect animate-scale-in bg-gradient-to-br from-background to-muted/30 border-primary/10">
						<CardContent className="pt-8">
							<div className="text-center py-12">
								<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full flex items-center justify-center shadow-inner">
									<MessageSquareIcon className="h-12 w-12 text-primary" />
								</div>
								<h3 className="text-3xl font-semibold mb-3">{searchTerm ? "No Matching Posts Found" : "No Posts Yet"}</h3>
								<p className="text-muted-foreground mb-6 max-w-md mx-auto">{searchTerm ? "Try adjusting your search terms or clear the search to see all posts." : "Be the first to share something amazing with our community! Your voice matters."}</p>
								{!searchTerm && (
									<Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-purple-600">
										<Link to="/create">
											<PlusIcon className="h-5 w-5 mr-2" />
											Create The First Post
										</Link>
									</Button>
								)}
								{searchTerm && (
									<Button variant="outline" size="lg" onClick={() => setSearchTerm("")} className="shadow-lg hover:shadow-xl transition-all duration-200">
										Clear Search
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				) : (
					<>
						<div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
							{filteredPosts.map((post, index) => (
								<Card key={post._id} className={`card-hover shadow-md glass-effect animate-slide-up bg-gradient-to-br from-background to-muted/30 border-primary/10 hover:border-primary/30 transition-all duration-300 ${viewMode === "list" ? "flex flex-col" : ""}`} style={{ animationDelay: `${index * 0.05}s` }}>
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between gap-4">
											<div className="flex items-center space-x-4 min-w-0 flex-1">
												<div className="relative group">
													<Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200 shadow-lg">
														<AvatarFallback className="text-base bg-gradient-to-br from-primary to-purple-500/50 text-white font-semibold">{post.author?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
													</Avatar>
													<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
												</div>
												<div className="min-w-0 flex-1">
													<p className="font-semibold text-base truncate">{post.author?.username || "Anonymous"}</p>
													<p className="text-xs text-muted-foreground">
														{post.createdAt
															? new Date(post.createdAt).toLocaleDateString("en-US", {
																	month: "long",
																	day: "numeric",
																	year: "numeric",
																	hour: "2-digit",
																	minute: "2-digit",
															  })
															: "Date unknown"}
													</p>
												</div>
											</div>
											<Button variant="ghost" size="sm" className="flex items-center space-x-1 flex-shrink-0 hover:bg-primary/10 hover:text-primary">
												<ThumbsUpIcon className="h-4 w-4" />
												<span className="text-sm font-medium">Like</span>
											</Button>
										</div>
									</CardHeader>
									<CardContent className="pt-2 pb-4 flex-grow">
										<CardTitle className="text-xl sm:text-2xl mb-4 line-clamp-2 leading-tight hover:text-primary transition-colors">{post.title}</CardTitle>
										<CardDescription className="text-base leading-relaxed line-clamp-3">{post.content}</CardDescription>
									</CardContent>
									<CardFooter className="pt-2 pb-3 border-t bg-muted/10">
										<div className="flex items-center justify-between w-full">
											<div className="text-xs text-muted-foreground">{Math.ceil((post.content?.length || 0) / 200)} min read</div>
											<div className="flex items-center space-x-1">
												<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
													<BookmarkIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
												</Button>
												<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
													<ShareIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
												</Button>
											</div>
										</div>
									</CardFooter>
								</Card>
							))}
						</div>
						{filteredPosts.length > 6 && (
							<div className="text-center pt-4">
								<Button variant="outline" className="px-8">
									Load More
								</Button>
							</div>
						)}
					</>
				)}
			</div>

			{/* Footer */}
			<div className="border-t border-border pt-8 pb-16 mt-12">
				<div className="text-center text-muted-foreground">
					<p className="mb-2">© {new Date().getFullYear()} Our Community Blog</p>
					<div className="flex justify-center space-x-4 text-sm">
						<Link to="/" className="hover:text-primary transition-colors">
							Home
						</Link>
						<span className="text-border">•</span>
						<Link to="/about" className="hover:text-primary transition-colors">
							About
						</Link>
						<span className="text-border">•</span>
						<Link to="/contact" className="hover:text-primary transition-colors">
							Contact
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Posts;

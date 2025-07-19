import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePosts from "./pages/CreatePosts";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Posts />} />
					<Route path="/create" element={<CreatePosts />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;

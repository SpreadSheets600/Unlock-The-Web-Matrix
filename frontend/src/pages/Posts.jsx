import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts/")
      .then((res) => setPosts(res.data));
  }, []);
  //   console.log(posts[0]);
  return (
    <div>
      <center>
        <h2>All Posts</h2>
        {posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>By: {post.author?.username}</small>
            <br />
          </div>
        ))}
        <Link to="/create">Create Post</Link>
      </center>
    </div>
  );
}
export default Posts;

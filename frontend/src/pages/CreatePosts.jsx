import axios from "axios";
import { useState } from "react";

function CreatePosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createPost = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/posts/",
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    alert("Post created!");
  };
  return (
    <div>
      <center>
        <h2>Create Post</h2>
        <br />
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button onClick={createPost}>Post</button>
      </center>
    </div>
  );
}
export default CreatePosts;

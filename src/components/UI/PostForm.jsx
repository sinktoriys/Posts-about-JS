import React from 'react';
import  {useState,useRef } from "react";
import MyInput from "./input/MyInput";
import MyButton from './buttom/MyButton';
const PostForm = ({create}) => {

    const [post, setPost] = useState({ title: "", body: "" });
    const bodyInputRef1 = useRef();
    const bodyInputRef = useRef();

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
			title: post.title,
			body: post.body,
			id: Date.now(),
		};
        create(newPost)
        setPost([...post,newPost]);
    }

    const handleSubmit = (event) => {
		// 👇️ prevent page refresh
		event.preventDefault();

		const newPost ={
...post, id: Date.now()
        }
        create(newPost)
		setPost({ title: "", body: "" });
	};
    
  return (
    <form onSubmit={handleSubmit}>    
        <MyInput
            value={post.title}
            onChange={(e) =>
                setPost({ ...post, title: e.target.value })
            }
            type="text"
            placeholder="Post title"
         ref={bodyInputRef}
        />    
        <MyInput
             value={post.body}
           onChange={(e) => setPost({ ...post, body: e.target.value })}
            type="text"
            placeholder="Post body"
            ref={bodyInputRef1}
        />    
        <MyButton onClick={addNewPost}> Create post </MyButton>
    </form>
  )
}

export default PostForm
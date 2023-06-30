import React from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../../../API/PostService";
import Loader from "../Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";

const PostIdPages = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const responce = await PostService.getById(id);
		setPost(responce.data);
	});
	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		console.log(id);
		const responce = await PostService.getCommentsByPostId(id);
		console.log(responce, comError);
		setComments(responce.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, []);
	return (
		<div>
			<h1>
				{" "}
				You have opened the page of the post with id = {params.id}{" "}
			</h1>
			{/* <div>{post.id}.{post.title}</div> */}

			{isLoading ? (
				<Loader />
			) : (
				<div>
					{post.id}.{post.title}
				</div>
			)}
			<h1> Comments </h1>
			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map((comm) => (
						<div key={comm.id} style={{ marginTop: 15 }}>
							<h5>{comm.email}</h5>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PostIdPages;

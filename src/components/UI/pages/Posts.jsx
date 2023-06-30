import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducer } from "react";
// import ClassCounter from "./components/ClassCounter";
// import Counter from "./components/Counter";
import "./../../../styles/App.css";
import PostList from "./../../../components/PostList";
import PostForm from "./../PostForm";
import PostFilter from "./../../../components/UI/select/PostFilter";
import MyModal from "./../../../components/UI/MyModal/MyModal";
import MyButton from "./../../../components/UI/buttom/MyButton";
import { usePosts } from "./../../../components/UI/hooks/usePosts";
// import * as axios from "axios";
import PostService from "./../../../API/PostService";
import Loader from "./../../../components/UI/Loader/Loader";
import { useFetching } from "./../../../components/UI/hooks/useFetching";
import { getPageCount } from "./../../../components/UI/utils/pages";
import Pagination from "./../../../components/UI/pagination/Pagination";
function Posts() {
	// const [posts, setPosts] = useState([
	// 	{ id: 1, title: "aa", body: "nn" },
	// 	{ id: 2, title: "rr", body: "aa" },
	// 	{ id: 3, title: "bb", body: "cc" },
	// ]);

	const [filter, setFilter] = useState({ sort: "", query: "" });
	const [modal, setModal] = useState(false);
	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const lastElement = useRef();
	const observer = useRef();
	console.log(lastElement);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const responce = await PostService.getAll(limit, page);
		setPosts(responce.data);
		const totalCount = responce.headers["x-total-count"];
		setTotalPages(getPageCount(totalCount, limit));
	});
	console.log(totalPages);

	useEffect(() => {
		if (isPostsLoading) return;
		if (observer.current) observer.current.disconnect();
		var callback = function (entries, observer) {
			if (entries[0].isIntersecting) {
				setPage(page + 1);
			}
			observer.current = new IntersectionObserver(callback);
			observer.current.observe(lastElement.current);
		};
	}, [isPostsLoading]);

	useEffect(() => {
		fetchPosts(limit, page);
	}, [page]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (item) => {
		setPosts(posts.filter((p) => p.id !== item.id));
	};

	const changePage = (page) => {
		setPage(page);
	};
	return (
		<div className="App">
			<button onClick={fetchPosts}>GET POSTS </button>
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Create user
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: "15px 0" }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			{postError && <h1>The mistake has happend ${postError} </h1>}

			<PostList
				remove={removePost}
				postItem={sortedAndSearchedPosts}
				title="Posts about Javascript"
			/>
			<div ref={lastElement} style={{ height: 20, background: "red" }} />
			{isPostsLoading && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: 50,
					}}
				>
					<Loader />
				</div>
			)}
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
}
export default Posts;

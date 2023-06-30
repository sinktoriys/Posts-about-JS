import React from "react";
import MyInput from "../input/MyInput";
import MyButton from "../buttom/MyButton";
import { AuthContext } from "../context";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Loigin = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	let navigate = useNavigate();

	const loigin = (event) => {
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem("auth", "true");
		navigate("/posts");
	};
	return (
		<div>
			<h1> Page for login</h1>
			<form onSubmit={loigin}>
				<MyInput type="text" placeholder="Enter login" />
				<MyInput type="password" placeholder="Enter password" />
				<MyButton>Enter</MyButton>
			</form>
		</div>
	);
};

export default Loigin;

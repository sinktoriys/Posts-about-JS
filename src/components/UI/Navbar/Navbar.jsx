import React from "react";
import { AuthContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyButton from "../buttom/MyButton";
const Navbar = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem("auth");
		navigate("/login");
	};

	let navigate = useNavigate();
	return (
		<div className="navbar">
			<MyButton onClick={logout}> Exit </MyButton>
			<div className="navbar__links">
				<Link to="/about">about site</Link>
				<Link to="/posts">posts</Link>
			</div>
		</div>
	);
};

export default Navbar;

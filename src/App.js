import React, { useEffect } from "react";
import "./styles/App.css";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import About from "./components/UI/pages/About";
// import Posts from "./components/UI/pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import { AuthContext } from "./components/UI/context";
function App() {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("auth")) setIsAuth(true);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				setIsAuth,
			}}
		>
			<BrowserRouter>
				<Navbar />
				<AppRouter />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}
export default App;

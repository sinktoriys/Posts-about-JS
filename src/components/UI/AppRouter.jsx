import React from "react";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostIdPage from "./pages/PostIdPage";
import { publicRoutes, privateRoutes } from "../UI/router";
import { AuthContext } from "./context";

const AppRouter = () => {
	const { isAuth } = useContext(AuthContext);
	console.log(isAuth);
	return isAuth ? (
		<Routes>
			{privateRoutes.map((route) => (
				<Route
					element={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>
			))}
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map((route) => (
				<Route
					element={route.component}
					path={route.path}
					exact={route.exact}
					key={route.path}
				/>
			))}
		</Routes>
	);
};

export default AppRouter;

import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

//Fonts
import "./components/CSS/Fonts.css";

//Pages
import Login from "./components/authentication/Login";
import FileRepository from "./components/file-repo/FileRepository";
import ManageFiles from "./components/file-repo/ManageFiles";
import Logs from "./components/file-repo/Logs";
import CreateAccount from "./components/authentication/CreateAccount";
import Profile from "./components/file-repo/Profile";
import LandingPage from "./components/file-repo/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";
function App() {
	return (
		<AuthProvider>
			<Fragment>
				<Routes>
					{/* Drive */}
					<Route exact path="/" element={<PrivateRoute> <LandingPage /> </PrivateRoute>} />
					<Route exact path="/folder/:folderId" element={<PrivateRoute> <FileRepository /> </PrivateRoute>} />
					<Route path="/filerepo" element={<PrivateRoute><FileRepository /></PrivateRoute>} />
					<Route path="/manage" element={<PrivateRoute><ManageFiles /></PrivateRoute>} />
					<Route path="/logs" element={<PrivateRoute><Logs /></PrivateRoute>} />
					<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />


					{/* Auth */}
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<PrivateRoute><CreateAccount /></PrivateRoute>} />
					<Route path="/forgot-password" element={<ForgotPassword />} />



				</Routes>
			</Fragment>
		</AuthProvider>

	);
}

export default App;




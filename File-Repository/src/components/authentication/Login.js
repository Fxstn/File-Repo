//css import from package
import React, {Fragment, useRef, useState} from "react";
import {Form, Button, Row, Col, Alert} from "react-bootstrap";

//Firebase
import {useAuth} from "../../context/AuthContext";

//custom css
import styles from "../CSS/Login.module.css";
import bg from "../Images/Login/BG2.jpg";

//images
import CICT from "../Images/CICT.png";
import TopLine from "../Images/Login/line-top.png";
import BotLine from "../Images/Login/line-bottom.png";
import {Helmet} from "react-helmet";

import {Link, useNavigate} from "react-router-dom";
import {getUserDocument} from "../../submits/loginSubmits";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const {login} = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value).then(
				(userCredential) => {
					const user = userCredential.user;
					localStorage.setItem("user_id", user.uid);
					if (emailRef.current.value === "spaceapart2021@gmail.com") {
						localStorage.setItem("fullName", "Administrator");
						localStorage.setItem("email", emailRef.current.value);
						localStorage.setItem("contactNumber", "N/A");
						localStorage.setItem("status", "Administrator");
						navigate("/");
					} else {
						getUserDocument(user.uid, navigate);
					}
				}
			);
		} catch (e) {
			setError("Failed to log in");
		}
		setLoading(false);
	}

	return (
		<Fragment>
			<Helmet>
				<style>
					{`
                        body {
							background-image: url(${bg});
                            background-repeat: no-repeat;
                            background-size: cover;
                            min-height: 100vh;
                        }
						
                        header {
							margin-bottom: 15%;
                        }
                      
                        div {
							font-family: Roboto-Bold;
                            font-size: 20px;
                        }
						.text-deco {
                            text-decoration: none;
							color: #182850;
                        }
						`}
				</style>
			</Helmet>
			<Row className={styles.row}>
				<Col className={styles.colsNoPadding} lg={8}></Col>
				<Col
					className={[styles.loginSection, styles.colsNoPadding]}
					lg={4}
					style={{minHeight: "100vh"}}
				>
					<header>
						<img
							src={TopLine}
							className={styles.lineTop}
							alt="Top"
						/>
					</header>
					<div className="d-flex justify-content-center">
						<div className="w-100" style={{maxWidth: "400px"}}>
							<img
								src={CICT}
								className={styles.icon}
								alt="CICT"
							/>
							<h2
								className={[
									"text-center mb-4",
									styles.greetingText,
								]}
							>
								Welcome to CICT File Repository!
							</h2>
							{error && <Alert variant="danger">{error}</Alert>}
							<Form
								className={styles.form}
								onSubmit={handleSubmit}
							>
								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										className={styles.formControl}
										type="email"
										ref={emailRef}
										required
									/>
								</Form.Group>
								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										className={styles.formControl}
										type="password"
										ref={passwordRef}
										required
									/>
								</Form.Group>
								<Button
									className={["mt-4 w-100", styles.btn]}
									type="submit"
									disabled={loading}
								>
									Login
								</Button>
							</Form>
							<div className="w-100 text-center mt-3 ">
								<Link
									className="text-deco"
									to="/forgot-password"
								>
									Forgot Password?
								</Link>
							</div>
						</div>
					</div>
					<footer>
						<img
							src={BotLine}
							className={styles.lineBottom}
							alt="Bottom"
						/>
					</footer>
				</Col>
			</Row>
		</Fragment>
	);
}

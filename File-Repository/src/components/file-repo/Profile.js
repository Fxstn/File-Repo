import React, {Fragment, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Alert,
	Container,
	InputGroup,
	Button,
	Table,
	Row,
	Col,
} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import styles from "../CSS/Base.module.css";

export default function Profile() {
	const emailRef = useRef();
	const {currentUser, updatePassword, updateEmail} = useAuth();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password do not match");
		}

		const promises = [];

		setLoading(true);
		setError("");
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		} else if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				window.confirm("Updated Successfully!");
				navigate("/");
			})
			.catch(() => {
				setError("Failed to update account");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<Fragment>
			<Helmet>
				{/****** Inline CSS ******/}
				<style>
					{`
                        html{
                            min-width: 100vw;
                            margin: 0;
                        }
                        a{
                            color: black !important;
                            text-align: center;
                        }
                        p{
                            margin: 0;
                        }
                        table{
                            border-collapse: collapse;
                        }
                        th, tr  {
                            font-family: Roboto-Bold;
                            border-bottom: solid 2px !important;
                            border-color: lightgray !important;
                        }
                        th, td {
                            text-align:left
                            margin: 0 auto;
                        }
                        th {
                            font-size: 1.2rem;
                        }
                        td {
                            vertical-align: middle;
                        }
                        tbody>tr>:nth-child(4) {
                            text-align:center;
                        }

                        .navbar {
                            font-family: Roboto-Bold;
                            font-size: 20px !important;
                        }
                        .fa-file-circle-plus, .fa-folder-plus, .fa-file, .fa-folder{
                            font-size: 1.5rem;
                        }
                        .fa-file-circle-plus, .fa-folder-plus {
                            color: mediumaquamarine;
                            padding-right: 10px;
                        }
                        .fa-file {
                            color: dodgerblue;
                        }
                        .fa-folder {
                            color: midnightblue;
                        }
                        .white-text {
                            color: white;                            
                        }
                        .text-deco {
                            text-decoration: none;
                        }
                        .update-profile{
                            text-align: center;
                        }
                    `}
				</style>
			</Helmet>
			{/**************** Navbar 1 ******************/}
			<Navbar className={["col-12", styles.navbarHead]}>
				<Navbar.Brand className={styles.navbarBrand}>
					<p>
						<Link to="/" className="text-deco">
							<span className="white-text">BACK / </span>
						</Link>
						PROFILE
					</p>
				</Navbar.Brand>
			</Navbar>
			<Row className="m-5 h-75">
				<Row className="p-0 m-0 gx-3">
					<Col md={12}>
						<Row className={["m-0 p-3", styles.profileBox1]}>
							<Col xs={3} className={["p-0", styles.profilePic]}>
								{/**************** Insert picture here ******************/}
							</Col>
							<Col xs={9}>
								<p className={["white-text fs-1 fw-bold"]}>
									<strong>Name: </strong>
									{localStorage.getItem("fullName")}
								</p>
								<p className={["white-text fs-3 fw-bold"]}>
									<strong>User Type: </strong>{" "}
									{localStorage.getItem("status")}
								</p>
							</Col>
						</Row>
					</Col>

					<Col md={6} className="mt-4">
						<div
							className={[styles.profileBox2]}
							style={{height: "25rem"}}
						>
							<p className={["fs-3 fw-bold update-profile"]}>
								About
							</p>
							<p className="fs-4">
								<span className="fw-bold">
									Email : {localStorage.getItem("email")}
									&nbsp;
								</span>
								<span></span>
							</p>
							<p className="fs-4">
								<span className="fw-bold">
									Contact Number :{" "}
									{localStorage.getItem("contactNumber")}
									&nbsp;
								</span>
								<span></span>
							</p>
						</div>
					</Col>
					<Col md={6} className="mt-4">
						<div
							className={styles.profileBox2}
							style={{height: "25rem"}}
						>
							<Form onSubmit={handleSubmit}>
								<Row className="pb-4">
									<Col sm={12} className="mt-2">
										<div className="update-profile">
											<h3 className="fs-4 fw-bold ">
												Update Profile
											</h3>
										</div>
									</Col>
									<Col sm={12}>
										<h3 className="fs-5 fw-bold">
											Email Address
										</h3>
										<Form.Control
											className={[
												"mt-2",
												styles.accountInput,
											]}
											type="email"
											ref={emailRef}
											required
											defaultValue={currentUser.email}
										/>
									</Col>
									<Col sm={12} className="mt-2">
										<h3 className="fs-5 fw-bold">
											New Password
										</h3>
										<Form.Control
											className={[
												"mt-2",
												styles.accountInput,
											]}
											type="password"
											ref={passwordRef}
											placeholder="Leave blank to keep the same"
										/>
									</Col>
									<Col sm={12} className="mt-2 fw-bold">
										<h3 className="fs-5 fw-bold">
											Confirm New Password
										</h3>
										<Form.Control
											className={[
												"mt-2",
												styles.accountInput,
											]}
											type="password"
											ref={passwordConfirmRef}
											placeholder="Leave blank to keep the same"
										/>
									</Col>
								</Row>
								{error && (
									<Alert variant="danger">{error}</Alert>
								)}

								<Row className="d-flex justify-content-center align-items-center pb-4">
									<Col xs={6} className="mt-2 text-end">
										<Button
											type="submit"
											variant="primary"
											disabled={loading}
											className={styles.profileBtnPrimary}
										>
											<span>Update</span>
										</Button>
									</Col>
									<Col xs={6} className="mt-2 text-start">
										<Button
											variant="danger"
											className={styles.profileBtnDanger}
										>
											<span>
												<Link
													to="/"
													className="text-deco "
												>
													Cancel
												</Link>
											</span>
										</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</Col>
				</Row>
			</Row>
		</Fragment>
	);
}

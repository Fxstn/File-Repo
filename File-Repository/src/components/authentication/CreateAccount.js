import React, {Fragment, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {Helmet} from "react-helmet";
import styles from "../CSS/Base.module.css";
import {Link, useNavigate} from "react-router-dom";
import CICT from "../Images/CICT.png";
import {
	Navbar,
	Nav,
	Dropdown,
	Alert,
	Form,
	Col,
	Container,
	Row,
	Button,
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faUser,
	faBook,
	faFilePen,
	faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import {registerData} from "../../submits/registerSubmit";

export default function CreateAccount() {
	const fullNameRef = useRef();
	const statusRef = useRef();
	const contactNumRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const {signup} = useAuth();
	const [error, setError] = useState("");
	const {logout} = useAuth();
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("Select status");
	const navigate = useNavigate();
	const handleSelect = (e) => {
		setStatus(e);
	};

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password do not match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value
			).then((userCredential) => {
				const user = userCredential.user;
				const data = {
					fullName: fullNameRef.current.value,
					status: status,
					contactNumber: contactNumRef.current.value,
					email: emailRef.current.value,
				};
				registerData(data, user.uid);
			});
			window.confirm("Succesfully Created!");
		} catch (e) {
			setError("Failed to create an account");
		}
		setLoading(false);
	}
	async function handleLogout() {
		setError("");

		try {
			localStorage.clear();
			await logout();
			navigate("/");
		} catch {
			setError("Failed to log out");
		}
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
                        body {
                            font-family: Roboto-Bold;
                        }
                        table{
                            border-collapse: collapse;
                        }
                        a{
                            color: #182850 !important;
                        }
                        th, tr  {
                            font-family: Roboto-Bold;
                            border-bottom: solid 2px !important;
                            border-color: lightgray !important;
                        }
                        h, th, td {
                            text-align:left
                            margin: 0 auto;
                            color: #182850;
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

                        .white-text {
                            color: white;
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
                        .fa-power-off{
                            color: #ffc239 !important;
                        }
                        .icon {
                            width: 5rem;
                            height: auto;
                        }
                        .side-nav{
                            background-color: #182850;
                        }
                        .side-nav-link{
                            color: #ffc239 !important;
                            border-radius: 15px !important;
                        }
                        .side-nav-link:hover{
                            color: #ca9b2d !important;
                        }
                        .side-nav-link:active,{
                            color: white !important;
                        }
                        .side-nav-link:focus > span,
                        .side-nav-link:focus{
                            color: black !important;
                        }
                        .side-nav-link:focus{
                            background-color: white;
                            border: solid 2px;
                            border-color: white;
                        }
                        .svg-inline--fa{
                            font-size: 1.8rem;
                        }
						.text-deco {
                            text-decoration: none;
                        }
                    `}
				</style>
			</Helmet>
			<Container fluid>
				<Row className="flex-nowrap">
					<Col
						md={3}
						xl={2}
						className="col-auto px-sm-2 px-0 side-nav"
					>
						<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
							<Link
								to="/"
								className={[
									"d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none",
								]}
							>
								<img src={CICT} className="icon" alt="CICT" />
								<span className="fs-5 d-none d-sm-inline ps-3 fs-1 fst-italic">
									CICT
								</span>
							</Link>
							{/**************** Sidebar ******************/}
							<Nav
								className="nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
								id="menu"
							>
								<li>
									<i className="fs-4 bi-speedometer2" />
									<FontAwesomeIcon
										icon={faUser}
										className={styles.faCustom}
									/>
									<Link
										className="ms-1 d-none d-sm-inline ps-3 white-text nav-link px-2 my-2 align-middle side-nav-link"
										to="/signup"
									>
										Account
									</Link>
								</li>
								<li>
									<i className="fs-4 bi-speedometer2" />
									<FontAwesomeIcon
										icon={faBook}
										className={styles.faCustom}
									/>
									<Link
										className="ms-1 d-none d-sm-inline ps-3 white-text nav-link px-2 my-2 align-middle side-nav-link"
										to="/logs"
									>
										Logs
									</Link>
								</li>
								<li>
									<i className="fs-4 bi-speedometer2" />
									<FontAwesomeIcon
										icon={faFilePen}
										className={styles.faCustom}
									/>
									<Link
										className="ms-1 d-none d-sm-inline ps-3 white-text nav-link px-2 my-2 align-middle side-nav-link"
										to="/manage"
									>
										Manage Files
									</Link>
								</li>
							</Nav>
						</div>
						<hr />
					</Col>
					<Col className="p-0">
						{/**************** Navbar 1 ******************/}
						<Navbar className={["col-12", styles.navbarHead]}>
							<Nav className="ms-auto">
								<Button
									variant="link"
									onClick={handleLogout}
									className={[
										"d-flex align-items-center text-deco",
										styles.logOutBtn,
									]}
								>
									<FontAwesomeIcon
										icon={faPowerOff}
										className={"pe-2"}
									/>
									Log Out
								</Button>
							</Nav>
						</Navbar>
						{/**************** Account Creation ******************/}
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Row className="p-0 m-0 h-75 d-flex justify-content-center align-items-center">
								<Col
									xl={9}
									className={["p-3", styles.accountCol]}
								>
									<div className="pb-4">
										<label className="fs-2">
											Account Creation
										</label>
									</div>
									<Row className="pb-4">
										<Col sm={12}>
											<label className="fs-5">
												Full Name
											</label>
											<Form.Control
												className={[
													"mt-2",
													styles.accountInput,
												]}
												type="text"
												ref={fullNameRef}
												required
											/>
										</Col>
									</Row>
									<Row className="pb-4">
										<Col sm={4}>
											<label className="fs-5">
												Status
											</label>
											<Dropdown
												ref={statusRef}
												required
												onSelect={handleSelect}
											>
												<Dropdown.Toggle
													variant="success"
													id="assigned-phase"
													className={[
														"mt-2",
														styles.accountInput,
													]}
												>
													{status}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item eventKey="Faculty">
														Faculty
													</Dropdown.Item>
													<Dropdown.Item eventKey="Accreditor">
														Accreditor
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</Col>
										<Col sm={4}>
											<label className="fs-5">
												Contact Number
											</label>
											<Form.Control
												className={[
													"mt-2",
													styles.accountInput,
												]}
												type="number"
												ref={contactNumRef}
												required
											/>
										</Col>
										<Col sm={4}>
											<label className="fs-5">
												Email Address
											</label>
											<Form.Control
												className={[
													"mt-2",
													styles.accountInput,
												]}
												type="email"
												ref={emailRef}
												required
											/>
										</Col>
									</Row>

									<Row className="pb-4">
										<Col sm={6}>
											<label className="fs-5">
												Password
											</label>
											<Form.Control
												className={[
													"mt-2",
													styles.accountInput,
												]}
												type="password"
												ref={passwordRef}
												required
											/>
										</Col>
										<Col sm={6}>
											<label className="fs-5">
												Confirm Password
											</label>
											<Form.Control
												className={[
													"mt-2",
													styles.accountInput,
												]}
												type="password"
												ref={passwordConfirmRef}
												required
											/>
										</Col>
									</Row>
									<Col
										sm={12}
										className="d-flex justify-content-center"
									>
										<Button
											disabled={loading}
											className={[
												"fs-5",
												styles.accountBtn,
											]}
											type="submit"
										>
											Create Account
										</Button>
									</Col>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}

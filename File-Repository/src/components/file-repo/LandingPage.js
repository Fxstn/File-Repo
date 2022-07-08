import React, { Fragment, useRef, useState } from "react";
import { Row, Col, Dropdown, Container, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import bg from "../Images/LandingBG.png";
import CICT from "../Images/CICT.png";
import profile from "../Images/Profile-PNG-File.png";
import styles from "../CSS/Base.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
	const [error, setError] = useState("")
	const { logout } = useAuth()
	const navigate = useNavigate();

	async function handleLogout() {
		setError("")

		try {
			localStorage.clear()
			await logout()
			navigate("/")
		} catch {
			setError("Failed to log out")
		}

	}

	function handleProfile() {
		return navigate("/profile")
	}

	return (
		<Fragment>
			<Helmet>
				<body className={styles.fontBebasNeue} />
				<style>
					{`
                        body {
                            background-image: url(${bg});
                            background-repeat: no-repeat;
                            background-size: cover;
                            min-height: 100vh;
                            margin: 0;
                        }
                        div, .dblue-font {
                            color: #182850;
							text-decoration: none;
                        }

                        .icon {
                            width: 8vh;
                            min-width: 80px;
                            max-width: 230px;
                            height: auto;
                        }
                        .profileImg{
                            background-image: url(${profile});
                            background-size: cover;
                        }
                    `}
				</style>
			</Helmet>
			<Container fluid>
				<Row className="p-0 m-0 py-4 d-flex justify-content-center align-items-center">
					<Col xs={2} className="p-0 text-end">
						<div className="">
							<img src={CICT} className="icon" alt="CICT" />
						</div>
					</Col>
					<Col
						xs={8}
						className={[
							"p-0 d-flex justify-content-center align-items-center text-center text-wrap",
							styles.fontSpacing,
						]}
					>

						<span className="fs-1">
							COLLEGE OF INFORMATION AND COMMUNICATION TECHNOLOGY
						</span>
					</Col>
					<Col xs={2} className="p-0 text-start">
						{error && <Alert variant="danger">{error}</Alert>}
						<Dropdown>
							<Dropdown.Toggle
								className={[
									"p-0 m-0 profileImg ",
									styles.dropdownToggle,
								]}
								id="dropdown-basic"
							></Dropdown.Toggle>
							<Dropdown.Menu
								className={[
									"fw-bold",
									styles.fontRobotoBold,
									styles.dropdownMenu,
								]}>
								<Dropdown.Item onClick={handleProfile} >
									<span className="dblue-font" >
										<FontAwesomeIcon
											icon={faUser}
											className={styles.faCustom}
										/>
										&nbsp;Profile
									</span>
								</Dropdown.Item>
								<Dropdown.Item onClick={handleLogout} >
									<span className="dblue-font">
										<FontAwesomeIcon
											icon={faPowerOff}
											className={styles.faCustom}
										/>
										&nbsp; Log Out
									</span>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Col>
					<Col
						xs={12}
						className={[
							"p-0 d-flex justify-content-center align-items-center text-center",
							styles.welcomeSection,
						]}
					>
						<p className={styles.fontSpacing}>
							<span className={styles.welcomeMsg1}>
								WELCOME!
								<br />
								<span className={styles.welcomeMsg2}>
									{localStorage.getItem('fullName')}
								</span>
								<br />
								<span className={styles.welcomeMsg3}>
									TO WEB-BASED FILE REPOSITORIES FOR
									ACCREDITATION SYSTEM
								</span>
							</span>
						</p>
					</Col>
					<Col
						xs={12}
						className="p-0 d-flex justify-content-center align-items-center text-center"
					>
						{localStorage.getItem('fullName') === 'Administrator' ?
						<Link to="/manage" className={styles.welcomeBtn}>
							LET'S GET STARTED
						</Link>
						:
						<Link to="/filerepo" className={styles.welcomeBtn}>
							LET'S GET STARTED
						</Link>
						}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}

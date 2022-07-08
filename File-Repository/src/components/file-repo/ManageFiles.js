import React, {Fragment, useState} from "react";
import {Helmet} from "react-helmet";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Alert,
	Col,
	Container,
	Row,
	InputGroup,
	Button,
	Table,
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faFolderPlus,
	faFolder,
	faUser,
	faBook,
	faFileCirclePlus,
	faFile,
	faSearch,
	faFilePen,
	faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import CICT from "../Images/CICT.png";
import styles from "../CSS/Base.module.css";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import {useFolder} from "../../hooks/useFolder";
import {useParams, useLocation} from "react-router-dom";
import Folder from "./Folder";
import File from "./File";

export default function ManageFiles() {
	const {folderId} = useParams();
	const [error, setError] = useState("");
	const {logout} = useAuth();
	const [newFolder, setNewFolder] = useState(false);
	const {folder, childFolders, childFiles} = useFolder(folderId);

	const navigate = useNavigate();

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
                        a{
                            color: #182850 !important;
                        }
                        table{
                            border-collapse: collapse;
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
								{/* <li>
                                    <i className="fs-4 bi-speedometer2" />
                                    <FontAwesomeIcon icon={faBook} className={styles.faCustom} />
                                    <Link className="ms-1 d-none d-sm-inline ps-3 white-text nav-link px-2 my-2 align-middle side-nav-link" to="/filerepo">File Repository</Link>
                                </li> */}
							</Nav>
						</div>
						<hr />
					</Col>
					<Col className="p-0">
						{/**************** Navbar 1 ******************/}
						{error && <Alert variant="danger">{error}</Alert>}
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
						{/**************** Contents ******************/}

						{/**************** Navbar Option ******************/}
						<Container fluid>
							<div className="d-flex align-items-center">
								<FolderBreadcrumbs currentFolder={folder} />
								<AddFileButton currentFolder={folder} />
								<AddFolderButton currentFolder={folder} />
							</div>
							{childFolders.length > 0 && (
								// <div className="d-flex flex-wrap">
								// 	{childFolders.map((childFolder) => (
								// 		<div
								// 			key={childFolder.id}
								// 			style={{maxWidth: "200px"}}
								// 			className="p-2"
								// 		>
								// 			<Folder folder={childFolder} />
								// 		</div>
								// 	))}
								// </div>
								<Table borderless hover>
									<thead>
										<tr>
											<th className={styles.checkboxCol}>
												Name
											</th>
											<th className={styles.nameCol}></th>
											<th className={styles.ownerCol}>
												Owner
											</th>
											<th className={styles.dateCol}>
												Date Modified
											</th>
											<th className={styles.option}></th>
										</tr>
									</thead>
									{childFolders.map((childFolder) => (
										<tbody>
											<Folder folder={childFolder} />
										</tbody>
									))}
								</Table>
							)}
							{childFolders.length > 0 &&
								childFiles.length > 0 && <hr />}
							{childFiles.length > 0 && (
								<Table borderless hover>
									<thead>
										<tr>
											<th
												className={styles.checkboxCol}
											></th>
											<th className={styles.nameCol}></th>
											<th
												className={styles.ownerCol}
											></th>
											<th className={styles.dateCol}></th>
											<th className={styles.option}></th>
										</tr>
									</thead>
									{childFiles.map((childFile) => (
										<tbody>
											<File file={childFile} />
										</tbody>
									))}
								</Table>
							)}
						</Container>

						{/************** Table ***************/}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}

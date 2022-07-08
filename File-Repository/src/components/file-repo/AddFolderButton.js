import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faFolderPlus,
	faFolder,
	faFileCirclePlus,
	faFile,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {database, database2} from "../../firebase";
import {doc, updateDoc, getFirestore, setDoc} from "firebase/firestore";
import {useAuth} from "../../context/AuthContext";
import {ROOT_FOLDER} from "../../hooks/useFolder";

export default function AddFolderButton({currentFolder}) {
	const [open, setOpen] = useState(false);
	const [folName, setName] = useState("");
	const [owner, getOwner] = useState("");
	const {currentUser} = useAuth();
	const db = getFirestore();

	function openModal() {
		setOpen(true);
	}

	function closeModal() {
		setOpen(false);
	}
	async function handleSubmit(e) {
		e.preventDefault();

		if (currentFolder == null) return;
		const path = [...currentFolder.path];
		if (currentFolder !== ROOT_FOLDER) {
			path.push({name: currentFolder.name, id: currentFolder.id});
		}

		const date = new Date();
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const dayNames = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + " " + ampm;

		const log_id = Date.parse(date).toString();

		await setDoc(doc(db, "folders", log_id), {
			name: folName,
			parentId: currentFolder.id,
			userId: currentUser.uid,
			owner: localStorage.getItem("fullName"),
			path: path,
			createdAt:
				monthNames[date.getMonth()] +
				" " +
				date.getDate() +
				", " +
				date.getFullYear() +
				" " +
				dayNames[date.getDay()] +
				", " +
				strTime,
		});

		await setDoc(doc(db, "logs", log_id), {
			log_id: log_id,
			owner: localStorage.getItem("fullName"),
			file_name: folName,
			action: "Added",
			date_modified:
				monthNames[date.getMonth()] +
				" " +
				date.getDate() +
				", " +
				date.getFullYear() +
				" " +
				dayNames[date.getDay()] +
				", " +
				strTime,
		});
		setName("");
		closeModal();
	}

	return (
		<>
			<Button onClick={openModal} variant="outline-success" size="md">
				<FontAwesomeIcon icon={faFolderPlus} style={{opacity: 1}} />
				Add Folder
			</Button>
			<Modal show={open} onHide={closeModal}>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Folder Name</Form.Label>
							<Form.Control
								type="text"
								value={folName}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeModal}>
							Close
						</Button>
						<Button variant="success" type="submit">
							Add Folder
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

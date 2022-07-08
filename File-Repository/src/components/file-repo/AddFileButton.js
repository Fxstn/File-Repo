import React, {useState} from "react";
import ReactDOM from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../context/AuthContext";
import {storage, database} from "../../firebase";
import {ROOT_FOLDER} from "../../hooks/useFolder";
import {v4 as uuidV4} from "uuid";
import {Toast, ProgressBar} from "react-bootstrap";
import {upload} from "@testing-library/user-event/dist/upload";
import {doc, updateDoc, getFirestore, setDoc} from "firebase/firestore";

export default function AddFileButton({currentFolder}) {
	const [uploadingFiles, setUploadingFiles] = useState([]);
	const {currentUser} = useAuth();
	const db = getFirestore();

	async function handleUpload(e) {
		const file = e.target.files[0];
		if (currentFolder == null || file == null) return;

		const id = uuidV4();
		setUploadingFiles((prevUploadingFiles) => [
			...prevUploadingFiles,
			{id: id, name: file.name, progress: 0, error: false}
		]);

		const filePath =
			currentFolder === ROOT_FOLDER
				? `${currentFolder.path.join("/")}/${file.name}`
				: `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

		const uploadTask = storage
			.ref(`/files/${currentUser.uid}/${filePath}`)
			.put(file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = snapshot.bytesTransferred / snapshot.totalBytes;
				setUploadingFiles((prevUploadingFiles) => {
					return prevUploadingFiles.map((uploadFile) => {
						if (uploadFile.id === id) {
							return {...uploadFile, progress: progress};
						}
						return uploadFile;
					});
				});
			},
			() => {
				setUploadingFiles((prevUploadingFiles) => {
					return prevUploadingFiles.map((uploadFile) => {
						if (uploadFile.id === id) {
							return {...uploadFile, error: true};
						}
						return uploadFile;
					});
				});
			},
			() => {
				setUploadingFiles((prevUploadingFiles) => {
					return prevUploadingFiles.filter((uploadFile) => {
						return uploadFile.id !== id;
					});
				});

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where("name", "==", file.name)
                        .where("userId", "==", currentUser.uid)
                        .where("folderId", "==", currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]
                            if (existingFile) {
                                existingFile.ref.update({ url: url })
                            } else {
                                const date = new Date()
                                const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                                ];
                                const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                                "Saturday"
                                ];
                                var hours = date.getHours();
                                var minutes = date.getMinutes();
                                var ampm = hours >= 12 ? 'pm' : 'am';
                                hours = hours % 12;
                                hours = hours ? hours : 12; // the hour '0' should be '12'
                                minutes = minutes < 10 ? '0'+minutes : minutes;
                                var strTime = hours + ':' + minutes + ' ' + ampm;
                                
                                database.files.add({
                                    url: url,
                                    name: file.name,
                                    owner:localStorage.getItem('fullName'),
                                    createdAt: monthNames[date.getMonth()] + " " + date.getDate() + ", " +  date.getFullYear()+ " " + dayNames[date.getDay()] + ", " + strTime,
                                    folderId: currentFolder.id,
                                    userId: currentUser.uid,
                                })
                            }
                        })
                })
            }
        )

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
			"December"
		];
		const dayNames = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + " " + ampm;

		const log_id = Date.parse(date).toString();
		await setDoc(doc(db, "logs", log_id), {
			log_id: log_id,
			owner: localStorage.getItem("fullName"),
			file_name: file.name,
			action: "Uploaded",
			date_modified:
				monthNames[date.getMonth()] +
				" " +
				date.getDate() +
				", " +
				date.getFullYear() +
				" " +
				dayNames[date.getDay()] +
				", " +
				strTime
		});
	}

	return (
		<>
            <div className="Div-space" style={{paddingRight: "10px"}}>
			<label className="btn btn-outline-success px-2 btn-md ">
                <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: "4px", opacity:0.6, height:"1.4vmax"}} />
                    Add File
				<input
					type="file"
					onChange={handleUpload}
					style={{opacity: 0, position: "absolute", left: "-9999px"}}
				/>
			</label>
            </div>
			{uploadingFiles.length > 0 &&
				ReactDOM.createPortal(
					<div
						style={{
							position: "absolute",
							bottom: "1rem",
							right: "1rem",
							maxWidth: "250px"
						}}
					>
						{uploadingFiles.map((file) => (
							<Toast
								key={file.id}
								onClose={() => {
									setUploadingFiles((prevUploadingFiles) => {
										return prevUploadingFiles.filter((uploadFile) => {
											return uploadFile.id !== file.id;
										});
									});
								}}
							>
								<Toast.Header
									closeButton={file.error}
									className="text-truncate w-100 d-block"
								>
									{file.name}
								</Toast.Header>
								<Toast.Body>
									<ProgressBar
										animated={!file.error}
										variant={file.error ? "danger" : "primary"}
										now={file.error ? 100 : file.progress * 100}
										label={
											file.error
												? "Error"
												: `${Math.round(file.progress * 100)}%`
										}
									/>
								</Toast.Body>
							</Toast>
						))}
					</div>,
					document.body
				)}
		</>
	);
}

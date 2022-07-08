import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faFolder, faFileCirclePlus, faFile, faSearch } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebase';
import { doc, deleteDoc, getFirestore, setDoc } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';

export default function DeleteFolderButton(props) {
    const [open, setOpen] = useState(false)
    const [folName, setName] = useState(props.id.name)
    const { currentUser } = useAuth()

    const db = getFirestore()
     
    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()

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

        const log_id = Date.parse(date).toString()

        await deleteDoc(doc(db, "folders", props.id.id));

        await setDoc(doc(db, "logs", log_id), {
            log_id:log_id,
            owner:localStorage.getItem('fullName'),
            file_name: folName,
            action:"Deleted",
            date_modified:  monthNames[date.getMonth()] + " " + date.getDate() + ", " +  date.getFullYear()+ " " + dayNames[date.getDay()] + ", " + strTime,
        });

    

        closeModal()
    }

    return (
        <>
            <Button onClick={openModal} variant="danger" size="sm" style={{marginRight:5}}>
                Delete
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Are you sure you want to delete {props.id.name} folder? The folder/file inside of this folder will also be deleted.
                            </Form.Label>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="danger" type="submit">
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

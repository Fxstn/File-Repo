import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import {Table} from "react-bootstrap";
import styles from "../CSS/Base.module.css";
import RenameFolderButton from './RenameFolderButton';
import DeleteFolderButton from './DeleteFolderButton';

export default function Folder({ folder }) {
    return (
        // <Button as={Link} to={{
        //     pathname: `/folder/${folder.id}`,
        //     state: { folder: folder },
        // }} variant='outline-dark' className='text-truncate w-100'>
        //     <FontAwesomeIcon icon={faFolder} style={{ marginRight: "5px" }} className="mr-2" />
        //     {folder.name}
        // </Button>
                                <tr 
                                >
                                    <td>
                                    <Link
                                        to={{
                                                pathname: `/folder/${folder.id}`,
                                                state: { folder: folder },
                                    }}>
                                        <FontAwesomeIcon className={styles.iconPadding} icon={faFolder} />
                                    </Link>
                                    </td>
                                    <td>
                                    <Link
                                        style={{textDecoration:'none'}}
                                        to={{
                                                pathname: `/folder/${folder.id}`,
                                                state: { folder: folder },
                                    }}>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            {folder.name}
                                        </label>
                                    </Link>
                                    </td>
                                    <td>{folder.owner}</td>
                                    <td>{folder.createdAt}</td>
                                    {/* <td>{(date.getMonth() + 1)}\{date.getDate()}\{date.getFullYear()} {date.getHours()}:{date.getSeconds()}</td> */}
                                    {/* <td>{monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()} {dayNames[date.getDay()]} {strTime }</td> */}
                                    <td>
                                        <div style={{display:'flex'}}>
                                            {localStorage.getItem("status") !== "Accreditor" ?
                                            <>
                                            <RenameFolderButton id={folder}/>
                                            <DeleteFolderButton id={folder}/>
                                            </>
                                            :
                                            <></>
                                             }       
                                        </div>
                                    </td>
                                </tr>
        // </Link>
    )
}

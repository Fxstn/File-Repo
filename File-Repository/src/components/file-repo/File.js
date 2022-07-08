import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { Link } from "react-router-dom";
import RenameFileButton from './RenameFileButton';
import DeleteFileButton from './DeleteFileButton';
export default function File({ file }) {
    return (
        // <a href={file.url} target="_blank" className="btn btn-outline-dark text-truncate w-100" >
        //     <FontAwesomeIcon icon={faFile} className="mr-2" style={{ marginRight: "10px" }} />
        //     {file.name}
        // </a>
        <tr 
                                >
                                     <td>
                                    <a href={file.url} target="_blank">
                                        <FontAwesomeIcon icon={faFile} className="mr-2" style={{ marginLeft: "15px" }} />
                                        {/* <img src={file.url} width='35' height='35' style={{ marginLeft: 10 }}/> */}
                                    </a>
                                    </td>
                                    <td>
                                    <a href={file.url} target="_blank">
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            {file.name}
                                        </label>
                                    </a>
                                    </td>
                                    <td>{file.owner}</td>
                                    <td>{file.createdAt}</td>
                                    {/* <td>{(date.getMonth() + 1)}\{date.getDate()}\{date.getFullYear()} {date.getHours()}:{date.getSeconds()}</td> */}
                                    {/* <td>{monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()} {dayNames[date.getDay()]} {strTime }</td> */}
                                    <td>
                                        <div style={{display:'flex'}}>
                                            {localStorage.getItem("status") !== "Accreditor" ?
                                            <>
                                            <RenameFileButton id={file}/>
                                            <DeleteFileButton id={file}/>
                                            </>
                                            :
                                            <></>
                                             }       
                                        </div>
                                    </td>
                                </tr>
    )
}

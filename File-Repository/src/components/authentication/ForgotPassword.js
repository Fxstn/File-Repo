//css import from package
import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

//Firebase
import { useAuth } from "../../context/AuthContext";

//custom css
import styles from "../CSS/Login.module.css";
import bg from "../Images/Login/BG.png";

//images
import CICT from "../Images/CICT.png";
import TopLine from "../Images/Login/line-top.png";
import BotLine from "../Images/Login/line-bottom.png";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

export default function ForgotPassword() {
    // const userIdref = useRef();
    const emailRef = useRef();

    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password");
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
                    style={{ minHeight: "100vh" }}
                >
                    <header>
                        <img
                            src={TopLine}
                            className={styles.lineTop}
                            alt="Top"
                        />
                    </header>
                    <div className="d-flex justify-content-center">
                        <div className="w-100" style={{ maxWidth: "400px" }}>
                            <img
                                src={CICT}
                                className={styles.icon}
                                alt="CICT"
                            />
                            <h2
                                className={[
                                    "text-center mb-4 mt-3",
                                    styles.greetingText,
                                ]}
                            >
                                Password Reset
                            </h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form className={styles.form} onSubmit={handleSubmit}>

                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className={styles.formControl}
                                        type="email"
                                        ref={emailRef}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    className={["mt-4 w-100", styles.btn]}
                                    type="submit"
                                    disabled={loading}
                                >
                                    Reset Password
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-3 ">
                                <Link className="text-deco" to="/login">Login</Link>
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


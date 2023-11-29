import React from "react";
import {Row, Col } from "react-bootstrap";

const Success = () => {

    return (
        <Row className="justify-content-center align-items-center vmh-100">
            <Col>
                <div className="password-reset-success">
                    <i className='bx bxs-lock-open' ></i>
                    <h3>Password Reset</h3>
                    <p>Your Password has been reset Successfully!</p>
                </div>
            </Col>
        </Row>
    )
}

export default Success
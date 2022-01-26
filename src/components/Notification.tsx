import React, { useState } from 'react';
import { Row, Col, Button, Toast } from 'react-bootstrap';

const Notification = () => {

    const [show, setShow] = useState(true);

    return (
        <Row>
            <Col xs={12}>
                <Toast onClose={() => setShow(false)} show={show}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
};

export default Notification;

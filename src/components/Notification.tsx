import React, { useState, useEffect } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
import { DetailResponse, ILogin, IProps } from '../services/Interface';

const Notification = ( props: IProps<DetailResponse<ILogin>>) => {

    const noti = props.notiProps

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (noti?.Error == true) {
            setShow(true)
            return;
        } else if ( noti?.Error == false) {
            setShow(true)
            return;
        } else {
            setShow(false)
            return;
        }
    }, [noti])

    return (
        <div style={{ position: "absolute", right: "0" }}>
            <Row>
                <Col xs={12}>
                    <Toast onClose={() => setShow(false)} show={show} bg="danger">
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Notification</strong>
                            {/* <small>11 mins ago</small> */}
                        </Toast.Header>
                        <Toast.Body>{ noti?.Message }</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </div>
    );
};

export default Notification;

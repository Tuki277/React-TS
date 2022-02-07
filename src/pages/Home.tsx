import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api';
import { IRole, IUserprofile, IPosition, ListResponse } from '../services/Interface';
import { formatDate } from './../utils/function'

const Home = () => {

    const [user, setUser] = useState<ListResponse<IUserprofile<IRole, IPosition>>>()

    const [statusButton, setStatusButton] = useState(false)

    const history = useNavigate()

    const getUserprofile = () => {
        const session = localStorage.getItem("SessionId")
        Api.get<ListResponse<IUserprofile<IRole, IPosition>>>(`/api/userprofilebysession/${session}`).then(res => {
            setUser(res.data)
        }).catch((error: any) => console.log(error))
    }

    const checkLogin = () => {
        if (!localStorage.getItem("LoginStatus")) {
            history('/login')
        }
    }

    useEffect(() => {
        if (localStorage.getItem("SessionId")) {
            getUserprofile()
        }
        checkLogin()
    }, [])

    const toggleButton = () => {
        setStatusButton(!statusButton)
    }

    return (
        <div className='container'>
            <h1 className='mt-5'>Userprofile</h1>
            <Card>
                <Card.Body>
                    <Row className='mb-5'>
                        <Col>Id: {user?.object[0]._id}</Col>
                        <Col>Email: {user?.object[0].email}</Col>
                    </Row>

                    <Row className='mb-5'>
                        <Col>Username: {user?.object[0].username}</Col>
                        <Col>Position: {user?.object[0].position[0].name}</Col>
                    </Row>

                    <Row className='mb-5'>
                        <Col>Role: {user?.object[0].role[0].name}</Col>
                        <Col>CreatedAt: { formatDate(user?.object[0].createdAt) }</Col>
                    </Row>

                    <Row>
                        {
                            statusButton ? <Col>Password: {user?.object[0].password} </Col> : <Col>Password: ********************* </Col>
                        }
                        <Col>
                            <Button size='sm' variant="outline-primary" onClick={() => toggleButton()}>
                                { statusButton ? "HIDE" : "SHOW" }
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
};

export default Home;

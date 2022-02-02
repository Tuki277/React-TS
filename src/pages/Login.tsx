import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import Api from '../services/Api';
import { ILogin, ILoginPost, DetailResponse } from '../services/Interface';

const Login = () => {

    const history = useNavigate()

    const [account, setAccount] = useState<ILoginPost>({
        email: '',
        password: ''
    });

    const [noti, setNoti] = useState<DetailResponse<ILogin>>()

    const changeState = (event: ChangeEvent<HTMLInputElement>) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await Api.post<DetailResponse<ILogin>>('/api/login', account)
        if (res.data.Error === true) {
            setNoti(res.data)
        } else if (res.data.Error === false) {
            localStorage.setItem("LoginStatus", res.data.Message)
            localStorage.setItem("SessionId", res.data.object.sessionId)
            setNoti(res.data)
            history('/task')
            window.location.reload();
        }
    }

    return (
        <div>

            <Notification 
                notiProps={noti}
            />

            <div className='container'>
                <h1 className='text-center mt-5'>Login</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3 mt-5">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={account.email}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => changeState(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={account.password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => changeState(event)}
                            autoComplete="on"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
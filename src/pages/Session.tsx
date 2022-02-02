import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table, CloseButton, Badge } from 'react-bootstrap';
import Api from '../services/Api';
import { ISession, ListResponse } from '../services/Interface';

const Session = () => {

    const [session, setSession] = useState<ListResponse<ISession>>()

    const getAllSession = () => {
        const session = localStorage.getItem("SessionId")
        Api.get<ListResponse<ISession>>(`/api/user/session/${session}`).then(res => {
            setSession(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const formatDate = (date: Date) => moment(date).format("DD/MM/YYYY")

    useEffect(() => {
        getAllSession()
    }, [])

    return (
        <div className='container mt-5'>
            <Table bordered className='text-center'>
                <thead>
                    <tr>
                        <th>Browser</th>
                        <th>Logged At</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        session?.object.map(x => (
                            <tr key={ x._id }>
                                <td className='text-start'>
                                    { x.userAgent }
                                </td>
                                <td>
                                    { formatDate(x.createdAt) }
                                </td>
                                <td>
                                    { x.valid }
                                </td>
                                <td>
                                    <CloseButton />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
};

export default Session;

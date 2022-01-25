import React, { useState, useEffect } from 'react';
import { Badge, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api'

import moment from 'moment';

import './index.css'

interface ITask {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date,
    updatedAt: Date
}

const Task = () => {

    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useNavigate()

    useEffect(() => {
        loadTask();
    }, [])

    const loadTask = async () => {
        const res = await Api.get('/api/todo');
        setTasks(res.data.data)
    }

    const formatDate = (date: Date) => moment(date).format("DD/MM/YYYY")

    const newTask = () => {
        history('/task/add')
    }

    return (
        <div className="container mt-5">
            <div className='task-header'>
                <h1>Task page</h1>
                <Button variant='dark' size='sm' onClick={ newTask }>Create Task</Button>
            </div>
            
            <Table striped bordered hover className='mt-4 text-center'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>

                    {

                        tasks.map(x => (
                            <tr key={ x._id }>
                                <td>{ x.name }</td>
                                <td>{ x.description }</td>
                                <td>{ formatDate(x.createdAt) }</td>
                                <td>
                                    <Badge bg={ x.status ? "success" : "warning" }>
                                        { x.status ? "Success": "Pending"}
                                    </Badge>
                                </td>
                                <td>
                                    <Button size='sm'>EDIT</Button>{' '}
                                    <Button size='sm' variant="success">SUCCESS</Button>{' '}
                                    <Button size='sm' variant="info">DETAIL</Button>{' '}
                                    <Button size='sm' variant="danger">DELETE</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    );
};

export default Task

import React, { useState, useEffect } from 'react';
import { Badge, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Api from '../services/Api'
import { getAllTodo } from './../redux/feature/todoSlice'
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { formatDate } from './../utils/function'

const TaskRedux = () => {

    const dispath = useDispatch();
    const { task, loading } = useSelector((state: RootState) => state.todo)

    const history = useNavigate()

    useEffect(() => {
        checkLogin();
        dispath(getAllTodo())
    }, [])

    const checkLogin = () => {
        if (!localStorage.getItem("LoginStatus")) {
          history('/login')
        }
    }

    const newTask = () => {
        history('/redux/add')
    }

    const editTask = (id: string) => {
        history(`/task/edit/${id}`)
    }

    const detailTask = (id: string) => {
        history(`/task/${id}`)
    }

    const successTask = async (id: string) => {
        if (id !== undefined) {
            await Api.patch(`/api/todo/finish/${id}`);
        }
    }

    const deleteTask = async (id: string) => {
        if (id !== undefined) {
            await Api.delete(`/api/todo/${id}`);
        }
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
                        task?.object.map(x => (
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
                                    <Button size='sm' disabled={ x.status } onClick={() => editTask( x._id)}>EDIT</Button>{' '}
                                    <Button size='sm' disabled={ x.status } variant="success" onClick={() => successTask( x._id )}>SUCCESS</Button>{' '}
                                    <Button size='sm' disabled={ x.status } variant="info" onClick={() => detailTask( x._id )}>DETAIL</Button>{' '}
                                    <Button size='sm' variant="danger" onClick={() => deleteTask( x._id )}>DELETE</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    );
};

export default TaskRedux

import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../services/Api';
import moment from 'moment'
import { DetailResponse, ITask } from '../services/Interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { findTask } from '../redux/feature/todoSlice';
import { formatDate } from './../utils/function'

const Detail = () => {

    const dispatch = useDispatch()

    const history = useNavigate()
    const { id } = useParams()


    const { taskDetail } = useSelector((state: RootState) => state.todo)

    // const [task, setTask] = useState<DetailResponse<ITask>>(

    useEffect(() => {
        if (id !== undefined) {
            dispatch(findTask(id))
            // findTask(id)
        }
    }, [id])

    const close = () => {
        history(-1);
    }

    // const findTask = async (id: string) => {
    //     const res = await Api.get<DetailResponse<ITask>>(`/api/todo/${id}`)
    //     setTask(res.data)
    // }

    return (
        <div className="container mt-5">
            <div className='task-header'>
                <h1>Detail</h1>
                <Button variant='dark' size='sm' onClick={close} >Close</Button>
            </div>
            <Card className='mt-5'>
                <Card.Body>
                    <Card.Title>{ taskDetail?.object.name }</Card.Title>
                    <Card.Text>
                        { taskDetail?.object.description }
                    </Card.Text>
                    <Badge bg={ taskDetail?.object.status ? 'success' : 'warning'}>
                        { taskDetail?.object.status ? "SUCCESS" : "PENDING" }
                    </Badge>
                    <br />
                    <Badge bg="info">
                        { formatDate( taskDetail?.object.createdAt ) }
                    </Badge>
                </Card.Body>
            </Card>
        </div>


    );
};

export default Detail;

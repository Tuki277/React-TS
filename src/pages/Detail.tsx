import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../services/Api';
import moment from 'moment'
import { DetailResponse, ITask } from '../services/Interface';

const Detail = () => {

    const history = useNavigate()
    const { id } = useParams()

    const [task, setTask] = useState<DetailResponse<ITask>>()

    useEffect(() => {
        if (id !== undefined) {
            findTask(id);
        }
    }, [id])

    const close = () => {
        history(-1);
    }

    const findTask = async (id: string) => {
        const res = await Api.get<DetailResponse<ITask>>(`/api/todo/${id}`)
        setTask(res.data)
    }

    const formatDate = (date: Date | undefined) => moment(date).format("DD/MM/YYYY")

    return (
        <div className="container mt-5">
            <div className='task-header'>
                <h1>Detail</h1>
                <Button variant='dark' size='sm' onClick={close} >Close</Button>
            </div>
            <Card className='mt-5'>
                <Card.Body>
                    <Card.Title>{ task?.object.name }</Card.Title>
                    <Card.Text>
                        { task?.object.description }
                    </Card.Text>
                    <Badge bg={ task?.object.status ? 'success' : 'warning'}>
                        { task?.object.status ? "SUCCESS" : "PENDING" }
                    </Badge>
                    <br />
                    <Badge bg="info">
                        { formatDate( task?.object.createdAt ) }
                    </Badge>
                </Card.Body>
            </Card>
        </div>


    );
};

export default Detail;

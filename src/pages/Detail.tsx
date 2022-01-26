import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../services/Api';
import moment from 'moment'

interface ITask {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date,
    updatedAt: Date
}

const Detail = () => {

    const history = useNavigate()
    const { id } = useParams()

    const [task, setTask] = useState<ITask>()

    useEffect(() => {
        if (id !== undefined) {
            findTask(id);
        }
    }, [id])

    const close = () => {
        history(-1);
    }

    const findTask = async (id: string) => {
        const res = await Api.get(`/api/todo/${id}`)
        console.log({ res });
        setTask(res.data.data)
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
                    <Card.Title>{ task?.name }</Card.Title>
                    <Card.Text>
                        { task?.description }
                    </Card.Text>
                    <Badge bg={ task?.status ? 'success' : 'warning'}>
                        { task?.status ? "SUCCESS" : "PENDING" }
                    </Badge>
                    <br />
                    <Badge bg="info">
                        { formatDate( task?.createdAt) }
                    </Badge>
                </Card.Body>
            </Card>
        </div>


    );
};

export default Detail;

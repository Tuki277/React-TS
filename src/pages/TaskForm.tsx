import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import Api from '../services/Api';
import { useNavigate, useParams } from 'react-router-dom'

import './index.css'

interface ITask {
    name: string;
    description: string;
}

const TaskForm = () => {

    const history = useNavigate()
    const { id } = useParams()

    const [model, setModel] = useState<ITask>({
        name: '',
        description: ''
    })

    useEffect(() => {
        if (id !== undefined) {
            findTask(id);
        }
    }, [])

    const updatedModel = (event: ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id !== undefined) {
            const res = await Api.put(`/api/todo/${id}`, model)
        } else {
            const res = await Api.post('/api/todo', model)
        }
        history(-1)
    }

    const taskList = () => {
        history(-1)
    }

    const findTask = async (id: string) => {
        const res = await Api.get(`/api/todo/${id}`)
        setModel({
            name: res.data.data.name,
            description: res.data.data.description
        })
    }

    return (
        <div className="container mt-5">
            <div className='task-header'>
                <h1>New Task</h1>
                <div>
                    <Button className='h-100' variant='danger' size='sm' onClick={ taskList }>Task List</Button>
                </div>
            </div>
            <div className="container mt-5">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder="Enter title"
                            name='name'
                            value={model.name}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            name='description'
                            value={model.description}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default TaskForm

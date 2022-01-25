import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';

import './index.css'

interface ITask {
    name: string;
    description: string;
}

const TaskForm = () => {

    const [model, setModel] = useState<ITask>({
        name: '',
        description: ''
    })

    const updatedModel = (event: ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(model);

    }

    return (
        <div className="container mt-5">
            <div className='task-header'>
                <h1>New Task</h1>
                <Button variant='dark' size='sm'>Create Task</Button>
            </div>
            <div className="container mt-5">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder="Enter title"
                            name='name'
                            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            name='description'
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

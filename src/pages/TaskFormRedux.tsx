import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import Api from '../services/Api';
import { useNavigate, useParams } from 'react-router-dom'

import './index.css'
import { ITaskPost, ITaskUpdateRedux } from '../services/Interface';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, findTask, getAllTodo, updateTodo } from '../redux/feature/todoSlice';
import { RootState } from '../redux/store';

const TaskFormRedux = () => {

    const dispatch = useDispatch()

    const history = useNavigate()
    const { id } = useParams()

    const { taskDetail } = useSelector((state: RootState) => state.todo)

    const [model, setModel] = useState<ITaskPost>({
        name: '',
        description: '',
    })

    useEffect(() => {
        if (id !== undefined) {
            dispatch(findTask(id))
        }
    }, [])

    useEffect(() => {
        findTaskRedux()
    }, [taskDetail])

    const updatedModel = (event: ChangeEvent<HTMLInputElement>) => {
        setModel({
            ...model,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id !== undefined) {
            const modelUpdate: ITaskUpdateRedux<ITaskPost> = {
                model,
                id
            }
            await dispatch(updateTodo(modelUpdate))
            await dispatch(getAllTodo())
        } else {
            dispatch(addTodo(model))
            dispatch(getAllTodo())
        }
        history(-1)
    }

    const taskList = () => {
        history(-1)
    }

    const findTaskRedux = async () => {
        if (taskDetail) {
            setModel({
                name: taskDetail.object.name,
                description: taskDetail.object.description
            })
        }
    }

    return (
        <div className="container mt-5">
            <div className='task-header'>
                <h1>New Task Redux</h1>
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

export default TaskFormRedux

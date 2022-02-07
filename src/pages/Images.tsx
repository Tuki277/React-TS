import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, getAllImages } from '../redux/feature/imageSlice';
import { RootState } from '../redux/store';
import Api from '../services/Api';
import { IImagesPost } from '../services/Interface';
import { formatDate } from './../utils/function'

const Images = () => {

    const dispatch = useDispatch()
    const { listImage } = useSelector((state: RootState) => state.image)

    const [file, setFile] = useState<IImagesPost>({
        fileUpload: '',
        title: ''
    })

    useEffect(() => {
        dispatch(getAllImages())
    }, [])

    const updateFile = (event: ChangeEvent<HTMLInputElement>) => {
        var name = event.target.name
        var value: any = event.target.value
        if (name === "fileUpload" && event.target?.files?.[0] != null) {
            value = event.target.files[0]
        }
        setFile({
            ...file,
            [name]: value
        })
    }

    const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const reader = new FileReader();
        reader.readAsDataURL(file.fileUpload)
        reader.onload = ((e) => {
            var rawLog = reader.result;
            const item: IImagesPost = {
                title: file.title,
                fileUpload: rawLog
            }
            uploadImage(item)
        })
    }

    const uploadImage = async (item: IImagesPost) => {
        await dispatch(addImage(item))
        await dispatch(getAllImages())
    }

    return (
        <div className='container'>
            <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3 mt-3">
                    <Form.Control
                        type='text'
                        placeholder="Enter title"
                        name='title'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updateFile(event) }
                    />
                </Form.Group>

                <Form.Group controlId="formFileLg" className="mt-4">
                    <Form.Control
                        type="file"
                        name='fileUpload'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => updateFile(event) }
                    />
                </Form.Group>
                <Button variant="dark" type="submit" className='mt-3'>
                    Submit
                </Button>
            </Form>

            <h1 className='mt-4 mb-4'>List Images</h1>

            {
                listImage?.object.map(x => (
                    <Card style={{ width: '18rem', float: 'left', margin: "20px" }} className="mr-3" key={x._id}>
                        <Card.Img variant="top" src={ x.urlImage } />
                        <Card.Body>
                            <Card.Title>{ x.title }</Card.Title>
                            <Card.Title>{ formatDate (x.createdAt) }</Card.Title>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
};

export default Images;

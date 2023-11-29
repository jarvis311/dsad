import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from "react-switch";
import { CategorieAll, PlanLevelAll, SoundEdit, SoundUpdate } from "../../Auth/Api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SoundsEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [category, Setcategory] = useState([])
    const [planlevels, Setplanlevels] = useState([])
    const [Data, SetData] = useState({
        index: 1,
        category_id: "",
        plan_level_id: "",
        name: "",
        url: "",
        time: "",
        previewThumb: "",
        backgroundGIF: "",
        is_free: 0,
        _id: ""
    })

    const GetCategory = async () => {
        const Result = await CategorieAll()
        if (Result.data.Status === true) {
            Setcategory(Result.data.Data)
        }
        else {
            Setcategory([])
        }
    }

    const GetPlanLevels = async () => {
        const Result = await PlanLevelAll()
        if (Result.data.Status === true) {
            Setplanlevels(Result.data.Data)
        }
        else {
            Setplanlevels([])
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputFiles = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const ChangeStatus = (e) => {
        SetData({ ...Data, is_free: (e === true) ? 1 : 0 })
    }

    const EditData = async () => {
        const Result = await SoundEdit(id)
        if (Result.data.Status === true) {
            SetData({
                index: Result.data.Data.index,
                category_id: Result.data.Data.category_id,
                plan_level_id: Result.data.Data.plan_level_id,
                name: Result.data.Data.name,
                url: Result.data.Data.url,
                time: Result.data.Data.time,
                previewThumb: Result.data.Data.previewThumb,
                backgroundGIF: Result.data.Data.backgroundGIF,
                is_free: Result.data.Data.is_free,
                _id: Result.data.Data._id
            })
        }
    }

    const Save = async () => {
        if (Data.index === "" || Data.name === "" || Data.category_id === "" || category.some(val => val._id === Data.category_id) === false || Data.plan_level_id === "" || planlevels.some(val => val._id === Data.plan_level_id) === false || Data.time === "" ||
            Data.previewThumb === "" || Data.url === "") {
            setValidate(true)
        }
        else {
            setValidate(false)
            Setloading(true)
            const Result = await SoundUpdate(Data)
            if (Result.data.Status === true) {
                toast.success("Sound Update Successfully...")
                Setloading(false)
                Redirect(`/Sounds/View/${id}`)
            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    useEffect(() => {
        EditData()
        GetCategory()
        GetPlanLevels()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Edit Sounds</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Sounds">Sounds List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Sounds</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="page-content">
                <Form method='post' noValidate validated={validate}>
                    <Row>
                        <Col xs={12}>
                            <Card className="mb-4">
                                <Card.Body>
                                    {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                                    <Row>
                                        <Col md={2}>
                                            <Form.Label htmlFor="index" >Index</Form.Label>
                                            <Form.Control type="number" name="index" value={Data?.index} className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Index
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="Categoryname">Category Name</Form.Label>
                                            <Form.Select className="my-2" name="category_id" onChange={e => InputData(e)} required >
                                                <option value="">Select Category Name</option>
                                                {category.map((val, index) => {
                                                    return (
                                                        <option key={index} value={val?._id} selected={(Data?.category_id === val?._id) ? true : false} >{val?.category_name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Category Name
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="soundname" >Sound Name</Form.Label>
                                            <Form.Control type="text" name="name" value={Data?.name} className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Sound Name
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="url" >URL</Form.Label>
                                            <Form.Control type="file" name="url" className="my-2" onChange={e => InputFiles(e)} />
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Url
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="time" >Time</Form.Label>
                                            <Form.Control type="text" name="time" value={Data?.time} className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Time
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="previewthumb" >Preview Thumb</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control type="file" name="previewThumb" onChange={e => InputFiles(e)} />
                                                <img src={Data?.previewThumb} alt="" className="rounded-3 hv-40" />
                                            </InputGroup>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Preview Thumb
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="backgroundgif" >Background GIF</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control type="file" name="backgroundGIF" onChange={e => InputFiles(e)} />
                                                <img src={Data?.backgroundGIF} alt="" className="rounded-3 hv-40" />
                                            </InputGroup>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Background GIF
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="level" >Level</Form.Label>
                                            <Form.Select className="my-2" name="plan_level_id" onChange={e => InputData(e)} required >
                                                <option value="">Select Plan Level</option>
                                                {
                                                    planlevels.map((val, index) => {
                                                        return (
                                                            <option key={index} value={val?._id} selected={(Data?.plan_level_id === val?._id) ? true : false} >{val.plan_level}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Level
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="isfree" className='d-block mb-2'>Is Free</Form.Label>
                                            <Switch
                                                onChange={e => ChangeStatus(e)}
                                                checked={(Data?.is_free === 1) ? true : false}
                                                offColor="#C8C8C8"
                                                onColor="#0093ed"
                                                height={30}
                                                width={70}
                                                className="react-switch"
                                                uncheckedIcon={
                                                    <div className='react-switch-off'>OFF</div>
                                                }
                                                checkedIcon={
                                                    <div className='react-switch-on'>ON</div>
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                                    <Link to={`/Sounds/View/${id}`}>
                                        <Button variant="secondary">Cancle</Button>
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Layout>
    )
}

export default SoundsEdit
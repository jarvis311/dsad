import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, InputGroup, Image, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from "react-switch";
import Select from 'react-select'
import { PlanAddd, PlanIndex, PlanLevelAll, TagsActiveStatusAll, TagsAll } from "../../Auth/Api";
import { toast } from "react-toastify";

const PlanAdd = () => {
    const Redirect = useNavigate()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [planlevels, Setplanlevels] = useState([])
    const [tags, Settags] = useState([])
    const [selecttags, Setselecttags] = useState([])
    const [workout, Setworkout] = useState([])
    const [Data, SetData] = useState({
        index: 1,
        plan_name: "",
        plan_active_users: 0,
        plan_total_completions: 0,
        plan_description: "",
        plan_level_id: "",
        plan_preview_image: "",
        short_video_url: "",
        intro_video_url: "",
        gif_url: "",
        type: 0,
        status: 0
    })

    const GetIndex = async () => {
        const Result = await PlanIndex()
        if (Result.data.Status === true) {
            SetData({ ...Data, index: (Result.data.Data.index + 1) })
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

    const GetTags = async () => {
        const Result = await TagsActiveStatusAll()
        if (Result.data.Status === true) {
            var p = []
            Result.data.Data.map((val, index) => {
                p.push({ value: val._id, label: val.name })
            })
            Settags(p)
        }
        else {
            Settags([])
        }
    }

    const SelectTags = (e) => {
        var tagid = []
        e.map((val) => {
            tagid.push(val.value)
        })
        Setselecttags(tagid)
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputFiles = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const InputIsData = (e) => {
        const Type = (e === true) ? 1 : 0
        SetData({ ...Data, type: Type })
    }

    const InputStatus = (e) => {
        const Status = (e === true) ? 1 : 0
        SetData({ ...Data, status: Status })
    }

    const AddWorkOut = () => {
        let WorkOutData = [...workout]
        WorkOutData.push({ workout_name: "", duration: "", calories: "", is_free: 0 })
        Setworkout(WorkOutData)
    }

    const WorkoutInputData = (e, index) => {
        let WorkOutData = [...workout]
        WorkOutData[index][e.target.name] = e.target.value
        Setworkout(WorkOutData)
    }

    const WorkoutStatusData = (e, index) => {
        let WorkOutData = [...workout]
        WorkOutData[index].is_free = (e === true) ? 1 : 0
        Setworkout(WorkOutData)
    }

    const WorkOutRemove = (index) => {
        let WorkOutData = [...workout]
        WorkOutData.splice(index, 1)
        Setworkout(WorkOutData)
    }

    const Save = async () => {
        if (Data.type === 1 && (Data.plan_name === "" || Data.plan_description === "" || Data.plan_preview_image === "" || Data.short_video_url === "" || Data.intro_video_url === "" || Data.gif_url === "" || Data.plan_level_id === "")) {
            setValidate(true)
        }
        else if (Data.type === 0 && (Data.plan_name === "" || Data.plan_level_id === "")) {
            setValidate(true)
        }
        else {
            var Counter = 0

            workout.map((val) => {
                if (val.workout_name === "" || val.duration === "" || val.calories === "") {
                    Counter++
                }
            })

            if (Counter === 0) {
                setValidate(false)
                Setloading(true)
                const Result = await PlanAddd(Data, workout, selecttags)
                if (Result.data.Status === true) {
                    toast.success("Plan Saved Successfully...")
                    Setloading(false)
                    Redirect("/Plan")
                }
                else {
                    toast.error(Result.data.Response_Message)
                }
            }
            else {
                setValidate(true)
            }
        }
    }

    useEffect(() => {
        GetIndex()
        GetPlanLevels()
        GetTags()
    }, [])


    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Plan</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Plan">Plan List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Plan</Breadcrumb.Item>
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
                                        <Col md={1}>
                                            <Form.Label htmlFor="index">Index</Form.Label>
                                            <Form.Control type="number" value={Data.index} name="index" className="my-2" onChange={e => InputData(e)} />
                                        </Col>
                                        <Col md={5}>
                                            <Form.Label htmlFor="name">Name</Form.Label>
                                            <Form.Control type="text" name="plan_name" className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Plan Name
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="active_users">Active Users</Form.Label>
                                            <Form.Control type="number" name="plan_active_users" className="my-2" onChange={e => InputData(e)} />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Active Users
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="total_completions">Total Completions</Form.Label>
                                            <Form.Control type="number" name="plan_total_completions" className="my-2" onChange={e => InputData(e)} />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Total Completions
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="description">Description</Form.Label>
                                            <Form.Control type="text" name="plan_description" className="my-2" onChange={e => InputData(e)} required={(Data.type === 1) ? true : false} />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Description
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="preview_image_url">Preview Image Url</Form.Label>
                                            <Form.Control type="file" className="my-2" name="plan_preview_image" onChange={e => InputFiles(e)} required={(Data.type === 1) ? true : false} />
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Preview Image
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="short_video_url">Short Video Url</Form.Label>
                                            <Form.Control type="file" name="short_video_url" onChange={e => InputFiles(e)} required={(Data.type === 1) ? true : false} />
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Short Video
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="intro_video_url">Intro Video Url</Form.Label>
                                            <Form.Control type="file" name="intro_video_url" onChange={e => InputFiles(e)} required={(Data.type === 1) ? true : false} />
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Intro Video
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="gif_url">GIF Url</Form.Label>
                                            <Form.Control type="file" name="gif_url" onChange={e => InputFiles(e)} required={(Data.type === 1) ? true : false} />
                                            <Form.Control.Feedback type="invalid">
                                                Select Your GIF
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="tags" className="mb-2">Tags</Form.Label>
                                            <Select options={tags} onChange={e => SelectTags(e)} closeMenuOnSelect={false} isMulti />
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="firebase_account" >Plan Level</Form.Label>
                                            <Form.Select className="my-2" name="plan_level_id" onChange={e => InputData(e)} required >
                                                <option value="">Select Plan Level</option>
                                                {
                                                    planlevels.map((val, index) => {
                                                        return (
                                                            <option key={index} value={val?._id}>{val?.plan_level}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Plan Level
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="status" className='d-block mb-2'>Is Data</Form.Label>
                                            <Switch
                                                onChange={(e) => InputIsData(e)}
                                                checked={(Data.type === 1) ? true : false}
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
                                        <Col md={3}>
                                            <Form.Label htmlFor="status" className='d-block mb-2'>Status</Form.Label>
                                            <Switch
                                                onChange={(e) => InputStatus(e)}
                                                checked={(Data.status === 1) ? true : false}
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

                                    <div className="mt-3">
                                        <Table bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>Workout Name</th>
                                                    <th>Duration</th>
                                                    <th>Calories</th>
                                                    <th className="text-center">Is Free</th>
                                                    <th className="text-center">
                                                        <Button variant="primary" size="sm" className="btn-icon" onClick={() => { AddWorkOut() }}><i className="bx bx-plus"></i></Button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    workout.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><Form.Control type="text" placeholder="Enter Workout Name" name="workout_name" value={val.workout_name} onChange={e => WorkoutInputData(e, index)} required />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Enter Your Workout Name
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td><Form.Control type="number" placeholder="Enter Workout Duration" name="duration" value={val.duration} onChange={e => WorkoutInputData(e, index)} required />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Enter Your Duration
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td><Form.Control type="text" placeholder="Enter Workout Calories" name="calories" value={val.calories} onChange={e => WorkoutInputData(e, index)} required />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Enter Your Calories
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td className="text-center">
                                                                    <Switch
                                                                        onChange={e => WorkoutStatusData(e, index)}
                                                                        checked={(val.is_free === 1) ? true : false}
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
                                                                </td>
                                                                <td className="text-center">
                                                                    <Button variant="danger" size="sm" className="btn-icon" onClick={() => { WorkOutRemove(index) }} ><i className="bx bx-x"></i></Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                                    <Link to='/Plan'>
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

export default PlanAdd
import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { useEffect } from "react";
import { ExerciseAdd, PlanAll, PosesIndex, PosesListsNumber, PosesPlanWiseWorkOut } from "../../Auth/Api";
import { toast } from "react-toastify";

const ExercisesAdd = () => {

    const Redirect = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, Setloading] = useState(false)
    const [poseslist, Setposeslist] = useState([])
    const [plan, Setplan] = useState([])
    const [workout, Setworkout] = useState([])
    const [Poses, SetPoses] = useState([])
    const [Data, SetData] = useState({
        index: 1,
        series_id: "",
        workout_id: "",
        status: 1
    })


    const GetIndex = async () => {
        const Result = await PosesIndex()
        if (Result.data.Status === true) {
            SetData({ ...Data, index: (Result.data.Data.index + 1) })
        }
        let PosesData = [...Poses]
        PosesData.push("")
        SetPoses(PosesData)
    }

    const GetPoses = async () => {
        const Result = await PosesListsNumber()
        if (Result.data.Status === true) {
            Setposeslist(Result.data.Data)
        }
        else {
            Setposeslist([])
        }
    }

    const GetPlan = async () => {
        const Result = await PlanAll()
        if (Result.data.Status === true) {
            Setplan(Result.data.Data)
        }
        else {
            Setplan([])
        }
    }

    const GetPlanWiseWorkout = async (id) => {
        const Result = await PosesPlanWiseWorkOut(id)
        if (Result.data.Status === true) {
            Setworkout(Result.data.Data)
        }
        else {
            Setworkout([])
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputPlan = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
        GetPlanWiseWorkout(e.target.value)
    }

    const AddPoses = () => {
        let PosesData = [...Poses]
        PosesData.push("")
        SetPoses(PosesData)
    }

    const PosesRemove = (index) => {
        let PosesData = [...Poses]
        PosesData.splice(index, 1)
        SetPoses(PosesData)
    }

    const InputPoses = (e, index) => {
        let PosesData = [...Poses]
        PosesData[index] = e.target.value
        SetPoses(PosesData)
    }

    const Save = async () => {
        if (Data.index === "" || Data.series_id === "" || Data.workout_id === "") {
            setValidate(true)
        }
        else {
            var Counter = 0

            Poses.map(async (val) => {
                if (val === "") {
                    Counter++
                }
            })

            if (Counter === 0) {
                setValidate(false)
                Setloading(true)
                const Result = await ExerciseAdd(Data, Poses)
                if (Result.data.Status === true) {
                    toast.success("Exercises Saved Successfully...")
                    Setloading(false)
                    Redirect("/Exercises")
                }
            }
            else {
                setValidate(true)
            }

        }
    }

    useEffect(() => {
        GetPoses()
        GetPlan()
        GetIndex()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Exercises</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Exercises">Exercises List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Exercises</Breadcrumb.Item>
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
                                        <Col md={4}>
                                            <Form.Label htmlFor="index">Index</Form.Label>
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Index
                                            </Form.Control.Feedback>
                                            <Form.Control type="number" name="index" className="my-2" value={Data.index} onChange={e => InputData(e)} required />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="plan" >Plan</Form.Label>
                                            <Form.Select className="my-2" name="series_id" onChange={e => InputPlan(e)} required >
                                                <option value="">Select Plans</option>
                                                {
                                                    plan.map((val, index) => {
                                                        return (
                                                            <option key={index} value={val._id}>{val.plan_name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Plan
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="workout" >Workout</Form.Label>
                                            <Form.Select className="my-2" name="workout_id" onChange={e => InputData(e)} required  >
                                                <option value="">Select Workout</option>
                                                {
                                                    workout.map((val, index) => {
                                                        return (
                                                            <option key={index} value={val._id} selected={(Data.workout_id === val._id) ? true : false}  >{val.workout_name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Workout
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <div className="mt-3">
                                        <h4 className="mb-3 fw-600">Add Poses</h4>
                                        <Table bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>Poses</th>
                                                    <th className="text-center">
                                                        <Button variant="primary" size="sm" className="btn-icon" onClick={() => { AddPoses() }}><i className="bx bx-plus"></i></Button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Poses.map((val, index) => {
                                                        return (
                                                            <tr key={index} >
                                                                <td>
                                                                    <Form.Select onChange={e => InputPoses(e, index)} required >
                                                                        <option value="">Select Poses</option>
                                                                        {
                                                                            poseslist.map((val, index) => {
                                                                                return (
                                                                                    <option key={index} value={val?._id}>{val?.pose_no}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Select Your Poses
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td className="text-center">
                                                                    <Button variant="danger" size="sm" className="btn-icon" onClick={() => { PosesRemove(index) }}><i className="bx bx-x"></i></Button>
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
                                    <Link to='/Exercises'>
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

export default ExercisesAdd
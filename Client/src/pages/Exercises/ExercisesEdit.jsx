import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { useEffect } from "react";
import { ExerciseEdit, ExerciseUpdate, PlanAll, PoseDelete, PosesListsNumber, PosesPlanWiseWorkOut } from "../../Auth/Api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ExercisesEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [poseslist, Setposeslist] = useState([])
    const [plan, Setplan] = useState([])
    const [workout, Setworkout] = useState([])
    const [Poses, SetPoses] = useState([])
    const [Data, SetData] = useState({
        index: 0,
        series_id: "",
        workout_id: "",
        status: 1,
        _id: ""
    })

    const EditData = async () => {
        const Result = await ExerciseEdit(id)
        if (Result.data.Status === true) {
            SetData({
                index: Result.data.Data.index,
                series_id: Result.data.Data.series_id,
                workout_id: Result.data.Data.workout_id,
                status: Result.data.Data.status,
                _id: Result.data.Data._id
            })

            var PosesData = []
            Result.data.Data.exerciselist.map((val, index) => {
                PosesData.push({ _id: val._id, poses_list_id: val.poses_list_id, index: val.index })
            })
            SetPoses(PosesData)
            GetPlanWiseWorkout(Result.data.Data.series_id)
        }
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
        SetData({
            index: Data.index,
            series_id: e.target.value,
            workout_id: "",
            status: Data.status,
            _id: Data._id
        })
        GetPlanWiseWorkout(e.target.value)
    }

    const AddPoses = () => {
        let PosesData = [...Poses]
        PosesData.push({ _id: null, poses_list_id: "", index: Poses[Poses.length - 1].index + 1 })
        SetPoses(PosesData)
    }

    const PosesRemove = (index, id) => {
        if (id === null) {
            let PosesData = [...Poses]
            PosesData.splice(index, 1)
            SetPoses(PosesData)
        }
        else {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger me-2",
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel! ",
                    reverseButtons: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const Result = await PoseDelete(id)
                        if (Result.data.Status === true) {
                            let PosesData = [...Poses]
                            PosesData.splice(index, 1)
                            SetPoses(PosesData)
                            toast.success("Poses Delete Successfully...")
                        }
                        else {
                            toast.error(Result.data.Response_Message)
                        }
                    }
                });
        }

    }

    const InputPoses = (e, index) => {
        let PosesData = [...Poses]
        PosesData[index][e.target.name] = e.target.value
        SetPoses(PosesData)
    }

    const Save = async () => {
        if (Data.index === "" || Data.series_id === "" || Data.workout_id === "") {
            setValidate(true)
        }
        else {
            var Counter = 0

            Poses.map(async (val) => {
                if (val.poses_list_id === "") {
                    Counter++
                }
            })

            if (Counter === 0) {
                setValidate(false)
                Setloading(true)
                const Result = await ExerciseUpdate(Data, Poses)
                if (Result.data.Status === true) {
                    toast.success("Exercises Updated Successfully...")
                    Setloading(false)
                    Redirect(`/Exercises/View/${id}`)
                }
            }
            else {
                setValidate(true)
            }

        }
    }

    useEffect(() => {
        EditData()
        GetPoses()
        GetPlan()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Edit Exercises</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Exercises">Exercises List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Exercises</Breadcrumb.Item>
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
                                            <Form.Control type="number" name="index" value={Data?.index} className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Index
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="plan" >Plan</Form.Label>
                                            <Form.Select className="my-2" name="series_id" onChange={e => InputPlan(e)} required >
                                                <option value="">Select Plans</option>
                                                {
                                                    plan.map((val, index) => {
                                                        return (
                                                            <option key={index} value={val._id} selected={(Data.series_id === val._id) ? true : false} >{val.plan_name}</option>
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
                                            <Form.Select className="my-2" name="workout_id" onChange={e => InputData(e)} required >
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
                                                    Poses?.map((val1, index) => {
                                                        return (
                                                            <tr key={index} >
                                                                <td>
                                                                    <Form.Select name="poses_list_id" onChange={e => InputPoses(e, index)} required >
                                                                        <option value="">Select Poses</option>
                                                                        {
                                                                            poseslist.map((val, index) => {
                                                                                return (
                                                                                    <option key={index} value={val?._id} selected={(val1?.poses_list_id === val?._id) ? true : false}>{val?.pose_no}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Select Your Poses
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td className="text-center">
                                                                    <Button variant="danger" size="sm" className="btn-icon" onClick={() => { PosesRemove(index, val1._id) }}><i className="bx bx-x"></i></Button>
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
                                    <Link to={`/Exercises/View/${id}`}>
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

export default ExercisesEdit
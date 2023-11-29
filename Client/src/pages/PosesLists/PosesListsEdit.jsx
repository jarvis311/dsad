import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, Table, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { LanguageAll, PoseListsAudioDelete, PoseListsEdit, PoseListsUpdate } from "../../Auth/Api";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PosesListsEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [language, Setlanguage] = useState([])
    const [backgroundid, Setbackgroundid] = useState([])
    const [Data, SetData] = useState({
        pose_no: "",
        name: "",
        media_type: "",
        activity_time: "",
        preview: "",
        media_url: "",
        _id: ""
    })

    const GetLanguages = async () => {
        const Result = await LanguageAll()
        if (Result.data.Status === true) {
            Setlanguage(Result.data.Data)
        }
    }

    const EditData = async () => {
        const Result = await PoseListsEdit(id)
        if (Result.data.Status === true) {
            SetData({
                pose_no: Result.data.Data.pose_no,
                name: Result.data.Data.name,
                media_type: Result.data.Data.media_type,
                activity_time: Result.data.Data.activity_time,
                preview: Result.data.Data.preview,
                media_url: Result.data.Data.media_url,
                _id: Result.data.Data._id
            })
            if (Result.data.Data.backgroundaudios.length !== 0) {
                var dataArr = [...backgroundid]
                Result.data.Data.backgroundaudios.map(async (val, index) => {
                    dataArr.push({
                        _id: val._id,
                        poses_list_id: val.poses_list_id,
                        language_id: val.language_id,
                        audio: val.audio,
                        updateimage: 0
                    })
                })
                Setbackgroundid(dataArr)
            }
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputFiles = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const AddAudio = () => {
        let AudioData = [...backgroundid]
        AudioData.push({
            _id: null,
            poses_list_id: id,
            language_id: "",
            audio: "",
            updateimage: 0
        })
        Setbackgroundid(AudioData)
    }

    const AudioRemove = (index, id) => {
        if (id === null) {
            let AudioData = [...backgroundid]
            AudioData.splice(index, 1)
            Setbackgroundid(AudioData)
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
                        const Result = await PoseListsAudioDelete(id)
                        if (Result.data.Status === true) {
                            let AudioData = [...backgroundid]
                            AudioData.splice(index, 1)
                            Setbackgroundid(AudioData)
                            toast.success("Background Audio Delete Successfully...")
                        }
                        else {
                            toast.error(Result.data.Response_Message)
                        }
                    }
                });
        }
    }

    const AudioInputData = (e, index) => {
        let AudioData = [...backgroundid]
        AudioData[index].language_id = e.target.value
        Setbackgroundid(AudioData)
    }

    const AudioInputFiles = (e, index) => {
        let AudioData = [...backgroundid]
        if (AudioData[index]._id !== null) {
            AudioData[index].audio = e.target.files[0]
            AudioData[index].updateimage = 1
        }
        else {
            AudioData[index].audio = e.target.files[0]
        }
        Setbackgroundid(AudioData)
    }

    const Save = async () => {
        if (Data.pose_no === "" || Data.activity_time === "" || Data.media_type === "" || Data.name === "") {
            setValidate(true)
        }
        else {
            let Counter = 0

            backgroundid.map(async (val) => {
                if (val.language_id === "" || val.audio === "" || val.audio === undefined) {
                    Counter++
                }
            })

            if (Counter === 0) {
                setValidate(false)
                Setloading(true)
                const Result = await PoseListsUpdate(Data, backgroundid)
                if (Result.data.Status === true) {
                    toast.success("Poses Lists Saved Successfully...")
                    Setloading(false)
                    Redirect(`/PosesLists/View/${id}`)

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
        EditData()
        GetLanguages()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Edit Poses Lists</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/PosesLists">Poses Lists</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Poses Lists</Breadcrumb.Item>
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
                                            <Form.Label htmlFor="posesno" >Poses No</Form.Label>
                                            <Form.Control type="number" value={Data?.pose_no} name="pose_no" onChange={e => InputData(e)} required className="my-2" />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Poses No
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="name">Name</Form.Label>
                                            <Form.Control type="text" value={Data?.name} name="name" onChange={e => InputData(e)} required className="my-2" />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Name
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="mediatype" >Media Type</Form.Label>
                                            <Form.Control type="text" value={Data?.media_type} name="media_type" onChange={e => InputData(e)} required className="my-2" />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Media Type
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="activitytime" >Activity Time</Form.Label>
                                            <Form.Control type="number" value={Data?.activity_time} name="activity_time" onChange={e => InputData(e)} required className="my-2" />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Activity Time
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="preview" >Preview</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control type="file" name="preview" className="my-2" onChange={e => InputFiles(e)} />
                                                <img src={Data?.preview} alt="" className="rounded-3 hv-40 my-2" />
                                            </InputGroup>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Preview
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="mediaurl" >Media URL</Form.Label>
                                            <InputGroup className="my-2">
                                                <Form.Control type="file" name="media_url" className="my-2" onChange={e => InputFiles(e)} />
                                                <a href={Data?.media_url} target='_blank' rel="noreferrer" >
                                                    <Button variant="outline-primary" className="rounded-3 hv-40 my-2"  ><i className='bx bx-video'></i></Button>
                                                </a>
                                            </InputGroup>
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Media URL
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <div className="mt-3">
                                        <Table bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>Language</th>
                                                    <th>Background Audio</th>
                                                    <th className="text-center">
                                                        <Button variant="primary" size="sm" className="btn-icon" onClick={() => { AddAudio() }} ><i className="bx bx-plus"></i></Button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    backgroundid?.map((val1, index) => {
                                                        return (
                                                            <tr key={index} >
                                                                <td>
                                                                    <Form.Select className="my-2" onChange={e => AudioInputData(e, index)} required>
                                                                        <option value="">Select Language</option>
                                                                        {
                                                                            language.map((val, index) => {
                                                                                return (
                                                                                    <option key={index} value={val?._id} selected={(val1.language_id === val._id) ? true : false}>{val?.language}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Select Your Language
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td>
                                                                    <Form.Control type="file" className="my-2" onChange={e => AudioInputFiles(e, index)} required={(val1.audio === '' || val1.audio === undefined) ? true : false} />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Select Your Background Audio
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td className="text-center">
                                                                    <Button variant="danger" size="sm" className="btn-icon" onClick={() => { AudioRemove(index, val1._id) }} ><i className="bx bx-x"></i></Button>
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
                                    <Button variant="primary" className="me-3" onClick={Save}>Save</Button>
                                    <Link to={`/PosesLists/View/${id}`}>
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

export default PosesListsEdit
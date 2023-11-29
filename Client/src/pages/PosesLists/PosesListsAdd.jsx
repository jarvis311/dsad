import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { LanguageAll, PoseListsAdd } from "../../Auth/Api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PosesListsAdd = () => {

    const Redirect = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, Setloading] = useState(false)
    const [backgroundid, Setbackgroundid] = useState([])
    const [language, Setlanguage] = useState([])
    const [Data, SetData] = useState({
        pose_no: "",
        name: "",
        media_type: "",
        activity_time: "",
        preview: "",
        media_url: ""
    })

    const GetLanguages = async () => {
        const Result = await LanguageAll()
        if (Result.data.Status === true) {
            Setlanguage(Result.data.Data)
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const InputFiles = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.files[0] })
    }

    const AudioInputData = (e, index) => {
        let AudioData = [...backgroundid]
        AudioData[index].language_id = e.target.value
        Setbackgroundid(AudioData)

    }

    const AudioInputFiles = (e, index) => {
        let AudioData = [...backgroundid]
        AudioData[index].background_audio = e.target.files[0]
        Setbackgroundid(AudioData)
    }

    const AddAudio = () => {
        let AudioData = [...backgroundid]
        AudioData.push({ language_id: "", background_audio: "" })
        Setbackgroundid(AudioData)
    }

    const AudioRemove = (index) => {
        let AudioData = [...backgroundid]
        AudioData.splice(index, 1)
        Setbackgroundid(AudioData)
    }

    const Save = async () => {
        if (Data.pose_no === "" || Data.activity_time === "" || Data.media_type === "" || Data.name === "" || Data.preview === "" || Data.media_url === "") {
            setValidate(true)
        }
        else {
            let Couter = 0
            backgroundid.map(async (val) => {
                if (val.language_id === "" || val.background_audio === "" || val.background_audio === undefined) {
                    Couter++
                }
            })

            if (Couter === 0) {
                setValidate(false)
                Setloading(true)
                const Result = await PoseListsAdd(Data, backgroundid)
                if (Result.data.Status === true) {
                    toast.success("Poses Lists Saved Successfully...")
                    Setloading(false)
                    Redirect("/PosesLists")

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
        GetLanguages()
    }, [])


    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Poses Lists</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/PosesLists">Poses Lists</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Poses Lists</Breadcrumb.Item>
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
                                            <Form.Control type="number" className="my-2" name="pose_no" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Poses No
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="name">Name</Form.Label>
                                            <Form.Control type="text" className="my-2" name="name" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Name
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="mediatype" >Media Type</Form.Label>
                                            <Form.Control type="text" className="my-2" name="media_type" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Media Type
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="activitytime" >Activity Time</Form.Label>
                                            <Form.Control type="number" className="my-2" name="activity_time" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Activity Time
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="preview" >Preview</Form.Label>
                                            <Form.Control type="file" className="my-2" name="preview" onChange={e => InputFiles(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Select Your Preview
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="mediaurl" >Media URL</Form.Label>
                                            <Form.Control type="file" className="my-2" name="media_url" onChange={e => InputFiles(e)} required />
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
                                                    backgroundid?.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <Form.Select className="my-2" onChange={e => AudioInputData(e, index)} required >
                                                                        <option value="">Select Language</option>
                                                                        {
                                                                            language.map((val, index) => (
                                                                                <option key={index} value={val?._id}>{val?.language}</option>
                                                                            ))
                                                                        }
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Select Your Language
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td>
                                                                    <Form.Control type="file" onChange={e => AudioInputFiles(e, index)} required />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Select Your Background Audio
                                                                    </Form.Control.Feedback>
                                                                </td>
                                                                <td className="text-center">
                                                                    <Button variant="danger" size="sm" className="btn-icon" onClick={() => { AudioRemove(index) }} ><i className="bx bx-x"></i></Button>
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
                                    <Link to='/PosesLists'>
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

export default PosesListsAdd
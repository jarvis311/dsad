import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import Switch from "react-switch";
import { PlanLevelEdit, PlanLevelUpdate } from "../../Auth/Api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PlanLevelsEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [Data, SetData] = useState({
        planlevel: "",
        _id: ""
    })

    const EditData = async () => {
        const Result = await PlanLevelEdit(id)
        if (Result.data.Status === true) {
            SetData({
                planlevel: Result.data.Data.plan_level,
                _id: Result.data.Data._id
            })
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }


    const Save = async () => {
        if (Data.planlevel === "") {
            setValidate(true)
        }
        else {
            setValidate(false)
            Setloading(true)
            const Result = await PlanLevelUpdate(Data)
            if (Result.data.Status === true) {
                toast.success(Result.data.Response_Message)
                Setloading(false)
                Redirect(`/PlanLevels/View/${id}`)

            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    useEffect(() => {
        EditData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Edit Plan Levels</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/PlanLevels">Plan Levels List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Plan Levels</Breadcrumb.Item>
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
                                            <Form.Label htmlFor="plan_level">Plan Level</Form.Label>
                                            <Form.Control type="text" value={Data?.planlevel} name="planlevel" onChange={e => InputData(e)} className="my-2" required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Plan Level
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save}>Save</Button>
                                    <Link to={`/PlanLevels/View/${id}`}>
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

export default PlanLevelsEdit
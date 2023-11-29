import React from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { useState } from "react";
import { PlanLevelAdd } from "../../Auth/Api";
import { toast } from "react-toastify";

const PlanLevelsAdd = () => {

    const Redirect = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, Setloading] = useState(false)
    const [Data, SetData] = useState({
        planlevel: "",
    })


    const InputData = async (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const Save = async () => {
        if (Data.planlevel === "") {
            setValidate(true)
        }
        else {
            setValidate(false)
            Setloading(true)
            const Result = await PlanLevelAdd(Data)
            if (Result.data.Status === true) {
                toast.success(Result.data.Response_Message)
                Setloading(false)
                Redirect("/planLevels")
            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Plan Levels</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/PlanLevels">Plan Levels List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Plan Levels</Breadcrumb.Item>
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
                                            <Form.Control type="text" name="planlevel" className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Plan Level
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                                    <Link to='/PlanLevels'>
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

export default PlanLevelsAdd
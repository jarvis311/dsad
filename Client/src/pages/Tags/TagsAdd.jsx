import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { toast } from "react-toastify";
import { TagAdd } from "../../Auth/Api";

const TagsAdd = () => {

    const Redirect = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, Setloading] = useState(false)
    const [Data, SetData] = useState({
        name: "",
        service_name: ""
    })

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const Save = async () => {
        if (Data.name === "" || Data.service_name === "") {
            setValidate(true)
        }
        else {
            setValidate(false)
            Setloading(true)
            const Result = await TagAdd(Data)
            if (Result.data.Status === true) {
                toast.success("Tags Saved Successfully...")
                Setloading(false)
                Redirect("/Tags")

            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Tags</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Tags">Tags List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Tags</Breadcrumb.Item>
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
                                        <Col md={6}>
                                            <Form.Label htmlFor="name" >Name</Form.Label>
                                            <Form.Control type="text" className="my-2" name="name" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Tag Name
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="servicename" >Service Name</Form.Label>
                                            <Form.Control type="text" className="my-2" name="service_name" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Service Name
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                                    <Link to='/Tags'>
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

export default TagsAdd
import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { toast } from "react-toastify";
import { LanguageAdd } from "../../Auth/Api";

const LanguagesAdd = () => {

    const Redirect = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, Setloading] = useState(false)
    const [Data, SetData] = useState({
        language: "",
        languagecode: ""
    })

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const Save = async () => {
        if(Data.language === "" || Data.languagecode === "")
        {
            setValidate(true)
        }
        else
        {
            setValidate(false)
            Setloading(true)
            const Result = await LanguageAdd(Data)
            if(Result.data.Status === true)
            {
                toast.success("Languages Saved Successfully...")
                Setloading(false)
                Redirect("/Languages")

            }
            else
            {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Languages</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Languages">Languages List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Languages</Breadcrumb.Item>
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
                                            <Form.Label htmlFor="language" >Language</Form.Label>
                                            <Form.Control type="text" name="language" className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Language
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="languagecode" >Language Code</Form.Label>
                                            <Form.Control type="text" name="languagecode" className="my-2" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Language Code
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save}>Save</Button>
                                    <Link to='/Languages'>
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

export default LanguagesAdd
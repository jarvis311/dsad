import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { LanguageEdit, LanguageUpdate } from "../../Auth/Api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LanguagesEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [Data, SetData] = useState({
        language: "",
        languagecode: "",
        _id: ""
    })

    const EditData = async () => {
        const Result = await LanguageEdit(id)
        if (Result.data.Status === true) {
            SetData({
                language: Result.data.Data.language,
                languagecode: Result.data.Data.language_code,
                _id: Result.data.Data._id
            })
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const Save = async () => {
        if (Data.language === "" || Data.languagecode === "") {
            setValidate(true)
        }
        else {
            setValidate(false)
            Setloading(true)
            const Result = await LanguageUpdate(Data)
            if (Result.data.Status === true) {
                toast.success("Language Updated Successfully...")
                Setloading(false)
                Redirect(`/Languages/View/${id}`)

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
                <h3>Edit Languages</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Languages">Languages List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Languages</Breadcrumb.Item>
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
                                            <Form.Control type="text" className="my-2" name="language" value={Data?.language} onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Language
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="languagecode" >Language Code</Form.Label>
                                            <Form.Control type="text" className="my-2" name="languagecode" value={Data?.languagecode} onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Language Code
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save}>Save</Button>
                                    <Link to={`/Languages/View/${id}`}>
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

export default LanguagesEdit
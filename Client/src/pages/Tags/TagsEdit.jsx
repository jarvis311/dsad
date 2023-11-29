import React from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from '../../layout/Layout';
import { useState } from "react";
import { TagEdit, TagUpdate } from "../../Auth/Api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const TagsEdit = () => {

    const Redirect = useNavigate()
    const { id } = useParams()
    const [loading, Setloading] = useState(false)
    const [validate, setValidate] = useState(false)
    const [Data, SetData] = useState({
        name: "",
        service_name: "",
        _id: ""
    })

    const EditData = async () => {
        const Result = await TagEdit(id)
        if (Result.data.Status === true) {
            SetData({
                name: Result.data.Data.name,
                service_name: Result.data.Data.service_name,
                _id: Result.data.Data._id
            })
        }
    }

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
            const Result = await TagUpdate(Data)
            if (Result.data.Status === true) {
                toast.success("Tags Updated Successfully...")
                Setloading(false)
                Redirect(`/Tags/View/${id}`)

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
                <h3>Edit Tags</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Tags">Tags List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Tags</Breadcrumb.Item>
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
                                            <Form.Control type="text" name="name" value={Data?.name} onChange={e => InputData(e)} className="my-2" required />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="servicename" >Service Name</Form.Label>
                                            <Form.Control type="text" name="service_name" value={Data?.service_name} onChange={e => InputData(e)} className="my-2" required />
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                                    <Link to={`/Tags/View/${id}`}>
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

export default TagsEdit
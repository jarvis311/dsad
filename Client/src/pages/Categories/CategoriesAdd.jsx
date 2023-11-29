import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from '../../layout/Layout';
import { CategorieAdd, CategorieIndex } from "../../Auth/Api";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CategoriesAdd = () => {

    const Redirect = useNavigate()
    const [validate, setValidate] = useState(false)
    const [loading, Setloading] = useState(false)
    const [Data, SetData] = useState({
        index: 1,
        category_name: ""
    })

    const GetIndex = async () => {
        const Result = await CategorieIndex()
        if (Result.data.Status === true) {
            SetData({ ...Data, index: (Result.data.Data.index + 1) })
        }
    }

    const InputData = (e) => {
        SetData({ ...Data, [e.target.name]: e.target.value })
    }

    const Save = async () => {
        if (Data.category_name === "") {
            setValidate(true)
        }
        else {
            setValidate(false)
            Setloading(true)
            const Result = await CategorieAdd(Data)
            if (Result.data.Status === true) {
                toast.success("Categories Saved Successfully...")
                Setloading(false)
                Redirect("/Categories")

            }
            else {
                toast.error(Result.data.Response_Message)
            }
        }
    }

    useEffect(() => {
        GetIndex()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3>Create Categories</h3>
                <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                    <Breadcrumb.Item >
                        <Link to="/Home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/Categories">Categories List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Categories</Breadcrumb.Item>
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
                                            <Form.Label htmlFor="index" >Index</Form.Label>
                                            <Form.Control type="number" name="index" className="my-2" value={Data?.index} onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Index
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="categoriesname" >Categories Name</Form.Label>
                                            <Form.Control type="text" className="my-2" name="category_name" onChange={e => InputData(e)} required />
                                            <Form.Control.Feedback type="invalid">
                                                Enter Your Categories Name
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" className="me-3" onClick={Save} >Save</Button>
                                    <Link to='/Categories'>
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

export default CategoriesAdd
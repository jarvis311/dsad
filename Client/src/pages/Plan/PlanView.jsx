/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Fancybox from '../../Component/FancyBox';
import { SelectPicker } from 'rsuite';
import { PlanAll, PlansView } from '../../Auth/Api';


const PlanView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)
    const [tag, Settag] = useState([])

    const GetAllData = async () => {
        const Result = await PlanAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.plan_name,
                    value: val._id
                })
                SetViewSearchData(SetSearchData)
            })
        }
        else {
            SetSearchData = []
            SetViewSearchData(SetSearchData)
        }
    }

    const GetViewData = async (id) => {
        const Result = await PlansView((id === "") ? Id : id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
            var tag = []
            Result?.data?.Data?.plan_tag?.map((val, index) => {
                tag.push(val.name)
            })
            Settag(tag)
        }
        else {
            SetData([])
            Setloading(false)
        }
    }

    const InputData = (e) => {
        SetId(e)
        GetViewData(e)
    }

    useEffect(() => {
        GetViewData("")
        GetAllData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Plan" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>{` View Plan ( ${Data?.plan_name} ) `}</h3>
                <div className="page-heading-right">
                    <SelectPicker data={ViewSearchData} defaultValue={Id} cleanable={false} className="wv-200 my-1 ms-3" onChange={e => InputData(e)} placeholder="Select Plan Name" />
                    <Link to={`/Plan/Edit/${Id}`}>
                        <Button variant="primary ms-3 my-1" value="edit" >Edit</Button>
                    </Link>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                        <Row>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Plan Name</p><span>{(Data?.plan_name !== "") ? Data?.plan_name : "-"}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Preview Image</p>
                                    {
                                        (Data?.plan_preview_image === "") ? "-" : <>
                                            <Fancybox>
                                                <a data-fancybox="gallery" href={Data?.plan_preview_image}>
                                                    <img src={Data?.plan_preview_image} className="hv-40 rounded-3" alt="Image" />
                                                </a>
                                            </Fancybox>
                                        </>}
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Plan Description</p><span>{(Data?.plan_description !== "") ? Data?.plan_description : "-"}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Plan Tags</p><span>{(tag?.length !== 0) ? tag.toString() : "-"}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Plan Active Users</p><span>{(Data?.plan_active_users !== "") ? Data?.plan_active_users : "-"}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Plan Total Completions</p><span>{(Data?.plan_total_completions !== "") ? Data?.plan_total_completions : "-"}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default PlanView
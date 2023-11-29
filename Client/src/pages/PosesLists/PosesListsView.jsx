/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import Fancybox from '../../Component/FancyBox';
import { PoseListsAll, PoseListsView } from '../../Auth/Api';

const PosesListsView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)

    const GetAllData = async () => {
        const Result = await PoseListsAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.name,
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
        const Result = await PoseListsView((id === "") ? Id : id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data)
            Setloading(false)
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
                <h3><Link to="/PosesLists" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Poses Lists</h3>
                <div className="page-heading-right">
                    <SelectPicker data={ViewSearchData} defaultValue={Id} cleanable={false} className="wv-200 my-1 ms-3" onChange={e => InputData(e)} placeholder="Select Poses Name" />
                    <Link to={`/PosesLists/Edit/${Id}`}>
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
                                    <p className='mb-0 fw-bold'>Poses No</p><span>{Data?.pose_no}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Name</p><span>{Data?.name}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Media Type</p><span>{Data?.media_type}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Activity Time</p><span>{Data?.activity_time}</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Preview</p>
                                    <span>
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={Data?.preview}>
                                                <img src={Data?.preview} className="hv-30 rounded-3" alt="Image" />
                                            </a>
                                        </Fancybox>
                                    </span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Media URL</p>
                                    <span>
                                        <a href={Data?.media_url} target='_blank' rel="noreferrer">
                                            <Button variant="outline-primary" className="btn-icon"><i className='bx bx-video'></i></Button>
                                        </a>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>Language</th>
                                        <th>Background Audio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Data?.backgroundaudios?.map((val, index) => (
                                            val?.languages?.map((val1) => (
                                                <tr>
                                                    <td>{val1?.language}</td>
                                                    <td><a href={val.audio} target='_blank' rel="noreferrer"><Button variant="outline-info" className="btn-icon"><i class='bx bx-music'></i></Button></a></td>
                                                </tr>
                                            ))
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default PosesListsView
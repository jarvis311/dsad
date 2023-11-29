import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import { useState } from 'react';
import { PlanLevelAll, PlanLevelView } from '../../Auth/Api';
import { useEffect } from 'react';

const PlanLevelsView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)


    const GetAllData = async () => {
        const Result = await PlanLevelAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.plan_level,
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
        const Result = await PlanLevelView((id === "") ? Id : id)
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
                <h3><Link to="/PlanLevels" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>{`View Plan Levels ( ${Data?.plan_level} )`}</h3>
                <div className="page-heading-right">
                    <SelectPicker data={ViewSearchData} cleanable={false} defaultValue={Id} className="wv-200 my-1 ms-3" onChange={e => InputData(e)} placeholder="Select Plan Level" />
                    <Link to={`/PlanLevels/Edit/${Id}`}>
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
                                    <p className='mb-0 fw-bold'>Sr No.</p><span>1</span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <p className='mb-0 fw-bold'>Plan Level</p><span>{(Data?.plan_level !== "") ? Data?.plan_level : "-"}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default PlanLevelsView
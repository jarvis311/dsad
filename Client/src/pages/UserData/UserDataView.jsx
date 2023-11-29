import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import Fancybox from '../../Component/FancyBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserAll, UserView } from '../../Auth/Api';
import dayjs from 'dayjs';

const UserDataView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)

    const GetAllData = async () => {
        const Result = await UserAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.user_email,
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
        const Result = await UserView((id === "") ? Id : id)
        console.log(Result)
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
          <h3><Link to="/UserData" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View User Data</h3>
          <div className="page-heading-right">
            <SelectPicker data={ViewSearchData} defaultValue={Id} placement='bottomEnd' cleanable={false} className="wv-300 my-1 ms-3" onChange={e => InputData(e)} placeholder="Select Email"/>
          </div>
      </div>
      <div className='page-content'>
          <Card>
              <Card.Body>
              {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                  <Row>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>No</p><span>1</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>User Name</p><span>{(Data?.user_name) ? Data?.user_name : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Email</p><span>{(Data?.user_email) ? Data?.user_email : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Platform</p><span>{(Data?.user_platform) ? Data?.user_platform : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Gender</p><span>{(Data?.gender) ? Data?.gender : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Current Body Type</p><span>{(Data?.currentBodyType) ? Data?.currentBodyType : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Target Body Type</p><span>{(Data?.targetBodyTyp) ? Data?.targetBodyTyp : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Flexibility Level</p><span>{(Data?.flexibilityLevel) ? Data?.flexibilityLevel : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Sedentory Lifestyle</p><span>{(Data?.sedentoryLifestyle) ? Data?.sedentoryLifestyle : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Stamina</p><span>{(Data?.stamina) ? Data?.stamina : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Physical Active</p><span>{(Data?.physicalActive) ? Data?.physicalActive : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Goal</p><span>{(Data?.Goal) ? Data?.Goal : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Work On</p><span>{(Data?.WorkOn) ? Data?.WorkOn : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Height Paramater</p><span>{(Data?.HeightParamater) ? Data?.HeightParamater : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Weight Paramater</p><span>{(Data?.WeightParamater) ? Data?.WeightParamater : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Target Weight In</p><span>{(Data?.TargetWeightIn) ? Data?.TargetWeightIn : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Height IN</p><span>{(Data?.HeightIN) ? Data?.HeightIN : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Weight LB</p><span>{(Data?.WeightLB) ? Data?.WeightLB : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Weight KG</p><span>{(Data?.WeightKG) ? Data?.WeightKG : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Target Weight LB</p><span>{(Data?.TargetWeightLB) ? Data?.TargetWeightLB : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Target Weight KG</p><span>{(Data?.TargetWeightKG) ? Data?.TargetWeightKG : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Age</p><span>{(Data?.Age) ? Data?.Age : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Created At</p><span>{dayjs(Data?.createdAt).format("DD-MM-YYYY HH:mm:ss")}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Updated At</p><span>{dayjs(Data?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</span>
                          </div>
                      </Col>
                    </Row>
              </Card.Body>
          </Card>
      </div>
  </Layout>
  )
}

export default UserDataView
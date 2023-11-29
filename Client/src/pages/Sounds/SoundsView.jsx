/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import Fancybox from '../../Component/FancyBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { SoundName, SoundView } from '../../Auth/Api';

const SoundsView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)

    const GetAllData = async () => {
        const Result = await SoundName()
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
        const Result = await SoundView((id === "") ? Id : id)
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
          <h3><Link to="/Sounds" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>{`View Sounds ( ${Data?.name} )`}</h3>
          <div className="page-heading-right">
            <SelectPicker data={ViewSearchData} defaultValue={Id} cleanable={false} className="wv-200 my-1 ms-3" onChange={e => InputData(e)} placeholder="Select Sounds"/>
            <Link to={`/Sounds/Edit/${Id}`}>
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
                              <p className='mb-0 fw-bold'>Category Name</p><span>{(Data.category_id !== null) ? Data?.category_id?.category_name : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Sound Name</p><span>{Data?.name}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Time</p><span>{Data?.time}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>URL</p>
                              <span>
                                <a href={Data?.url} target='_blank' rel="noreferrer" ><Button variant="outline-primary" className="btn-icon"><i className='bx bx-video'></i></Button></a>
                              </span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Preview Thumb</p>
                              <span>
                                <Fancybox>
                                    <a data-fancybox="gallery" href={Data?.previewThumb}>
                                        <img src={Data?.previewThumb} className="hv-30 rounded-3" alt="Image" />
                                    </a>
                                </Fancybox>
                              </span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Background GIF</p>
                              <span>
                              <a href={Data?.backgroundGIF} target='_blank' rel="noreferrer" ><Button variant="outline-info" className="btn-icon"><i className='bx bxs-file-gif' ></i></Button></a>
                              </span>
                          </div>
                      </Col>
                  </Row>
              </Card.Body>
          </Card>
      </div>
  </Layout>
  )
}

export default SoundsView
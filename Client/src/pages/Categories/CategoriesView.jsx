import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import { useState } from 'react';
import { CategorieAll, CategorieView } from '../../Auth/Api';
import { useEffect } from 'react';

const CategoriesView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)

    const GetAllData = async () => {
        const Result = await CategorieAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.category_name,
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
        const Result = await CategorieView((id === "") ? Id : id)
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
          <h3><Link to="/Categories" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>{`View Categories ( ${Data?.category_name} )`}</h3>
          <div className="page-heading-right">
            <SelectPicker data={ViewSearchData} defaultValue={Id} cleanable={false} className="wv-200 my-1 ms-3" placeholder="Select Categories" onChange={e => InputData(e)} />
            <Link to={`/Categories/Edit/${Id}`}>
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
                              <p className='mb-0 fw-bold'>Index</p><span>{(Data?.index !== "") ? Data?.index : "-"}</span>
                          </div>
                      </Col>
                      <Col md={4}>
                          <div className='mb-4'>
                              <p className='mb-0 fw-bold'>Categories Name</p><span>{(Data?.category_name !== "") ? Data?.category_name : "-"}</span>
                          </div>
                      </Col>
                  </Row>
              </Card.Body>
          </Card>
      </div>
  </Layout>
  )
}

export default CategoriesView
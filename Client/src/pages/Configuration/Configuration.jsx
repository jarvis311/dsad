import React, { useState } from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Switch from "react-switch";
import Pagination from "rc-pagination";
import { useEffect } from "react";
import { ChnageConfiguration, ConfigurationAll, GuestToken } from "../../Auth/Api";
import { toast } from "react-toastify";
import $ from 'jquery'

const Configuration = () => {

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true)
  const [Datastatus, SetDatastatus] = useState(true)
  const [guesttoken, Setguesttoken] = useState([])
  const [index, Setindex] = useState([])
  const [Data, SetData] = useState({
    status: 0,
    subscription: 0,
    subscription_required_ios: 0,
    plans_local_free_ios: 0,
    plans_local_free_android: 0,
    plans_local_showfirst_ios: 0,
    plans_local_showfirst_android: 0
  })

  const GetGuestToken = async () => {
    const Result = await GuestToken()
    if (Result.data.Status === true) {
      Setguesttoken(Result.data.Data)
      $('#remove_tr').empty()
      var id = []
      Result.data.Data.map(async (val) => {
        id.push(val._id)
      })
      Setindex(id)
    }
    else {
      Setguesttoken([])
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Guest Token</p></div></td>')
    }
  }

  const GetData = async () => {
    const Result = await ConfigurationAll()
    if (Result.data.Status === true) {
      SetDatastatus(true)
      Setloading(false)
      SetData({
        status: Result.data.Data.status,
        subscription: Result.data.Data.subscription,
        subscription_required_ios: Result.data.Data.subscription_required_ios,
        plans_local_free_ios: Result.data.Data.plans_local_free_ios,
        plans_local_free_android: Result.data.Data.plans_local_free_android,
        plans_local_showfirst_ios: Result.data.Data.plans_local_showfirst_ios,
        plans_local_showfirst_android: Result.data.Data.plans_local_showfirst_android
      })
    }
    else {
      Setloading(false)
      SetDatastatus(false)
    }
  }

  const Status = async (e) => {
    SetData({ ...Data, status: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'status', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("First Day Unlock Status Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const Subscription = async (e) => {
    SetData({ ...Data, subscription: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'subscription', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("Subscription Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const Subscriptionios = async (e) => {
    SetData({ ...Data, subscription_required_ios: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'subscription_required_ios', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("Subscription Ios Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const PlanslocalfreeiOS = async (e) => {
    SetData({ ...Data, plans_local_free_ios: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'plans_local_free_ios', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("Plans Local Free Ios Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const Planslocalfreeandroid = async (e) => {
    SetData({ ...Data, plans_local_free_android: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'plans_local_free_android', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("Plans Local Free Android Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const Planslocalshowfirstios = async (e) => {
    SetData({ ...Data, plans_local_showfirst_ios: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'plans_local_showfirst_ios', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("Plans Local Show First Ios Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const Planslocalshowfirstandroid = async (e) => {
    SetData({ ...Data, plans_local_showfirst_android: (e === true) ? 1 : 0 })
    const Result = await ChnageConfiguration(Data, 'plans_local_showfirst_android', (e === true) ? 1 : 0)
    if (Result.data.Status === true) {
      toast.success("Plans Local Show First Android Changes Successfully...")
    } else {
      toast.success(Result.data.Response_Message)
    }
  }

  const PagginationData = (current, pageSize) => {
    return guesttoken.slice((current - 1) * pageSize, current * pageSize);
  };

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(guesttoken.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  }

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize)
  }

  useEffect(() => {
    GetData()
    GetGuestToken()
  }, [])

  return (
    <Layout sidebar={true}>

      <div className="page-heading">
        <h3 className="my-1">Configuration</h3>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              {
                (Datastatus === true) ? <>
                  <Card.Body>
                    {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                    <Row>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="fdunlock" className='d-block mb-2'>First Day Unlock Status	</Form.Label>
                        <Switch
                          onChange={(e) => Status(e)}
                          checked={(Data.status === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="subscription" className='d-block mb-2'>Subscription</Form.Label>
                        <Switch
                          onChange={(e) => Subscription(e)}
                          checked={(Data.subscription === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="subscriptionios" className='d-block mb-2'>Subscription iOS</Form.Label>
                        <Switch
                          onChange={(e) => Subscriptionios(e)}
                          checked={(Data.subscription_required_ios === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="planlocalfreeios" className='d-block mb-2'>Plans Local Free iOS</Form.Label>
                        <Switch
                          onChange={(e) => PlanslocalfreeiOS(e)}
                          checked={(Data.plans_local_free_ios === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="planlocalfreeandroid" className='d-block mb-2'>Plans Local Free Android</Form.Label>
                        <Switch
                          onChange={(e) => Planslocalfreeandroid(e)}
                          checked={(Data.plans_local_free_android === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="planlocalshowfirstios" className='d-block mb-2'>Plans Local Show First iOS</Form.Label>
                        <Switch
                          onChange={(e) => Planslocalshowfirstios(e)}
                          checked={(Data.plans_local_showfirst_ios === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                      <Col md={3} className="my-2">
                        <Form.Label htmlFor="planlocalshowfirstandroid" className='d-block mb-2'>Plans Local Show First Android</Form.Label>
                        <Switch
                          onChange={(e) => Planslocalshowfirstandroid(e)}
                          checked={(Data.plans_local_showfirst_android === 1) ? true : false}
                          offColor="#C8C8C8"
                          onColor="#0093ed"
                          height={30}
                          width={70}
                          className="react-switch"
                          uncheckedIcon={
                            <div className='react-switch-off'>OFF</div>
                          }
                          checkedIcon={
                            <div className='react-switch-on'>ON</div>
                          }
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </> : ""}
            </Card>
          </Col>
          <Col xs={12} className="mt-4">
            <Card>
              <Card.Header className="pb-0">
                <div className="page-heading p-0 mb-0">
                  <h3 className="my-1">Guest Token Details</h3>
                  <Form.Select onChange={e => { setSize(Number(e.target.value)); setCurrent(1) }} className="wv-100 my-1 ms-3">
                    {
                      [10, 20, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))
                    }
                  </Form.Select>
                </div>
              </Card.Header>
              <Card.Body>
                {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th width="10%" className='text-center'>No</th>
                      <th width="90%">Guest Token</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PagginationData(current, size).map((val, ind) => {
                      return (
                        <tr key={ind}>
                          <td className='text-center'>{index.indexOf(val?._id) + 1}</td>
                          <td>{val.device_token}</td>
                        </tr>
                      )
                    })}
                    <tr id="remove_tr"></tr>
                  </tbody>
                </Table>
                {(guesttoken.length > size) ?
                  <div className="pagination-custom">
                    <Pagination showTitle={false}
                      className="pagination-data"
                      onChange={PaginationChange}
                      total={guesttoken.length}
                      current={current}
                      pageSize={size}
                      showSizeChanger={false}
                      onShowSizeChange={PerPageChange}
                    />
                  </div> : ""}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default Configuration
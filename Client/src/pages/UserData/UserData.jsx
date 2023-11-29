import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Table, Form } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { useEffect } from "react";
import { UserAll, UserSearch } from "../../Auth/Api";
import $ from 'jquery'
import dayjs from "dayjs";
import XLSX from "sheetjs-style"
import FileSaver from "file-saver";

const UserData = () => {

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true)
  const [index, Setindex] = useState([])
  const [Data, SetData] = useState([])
  const [iconcoror, Seticoncoror] = useState("email_up")
  const [search, Setsearch] = useState({
    email: "",
    subscribe: "",
    deviceplatform: "",
    date: ""
  })

  const GetData = async () => {
    const Result = await UserAll()
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      Setloading(false)
      $('#remove_tr').empty()
      var id = []
      Result.data.Data.map(async (val) => {
        id.push(val._id)
      })
      Setindex(id)
    }
    else {
      SetData([])
      Setloading(false)
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found User</p></div></td>')
    }
  }

  const sorting = (col, type = "string", order, e) => {
    Seticoncoror(e.target.id)
    if (order === "ASC") {
      const sorted = [...Data].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      if (iconcoror !== e.target.id) {
        SetData(sorted)
      }
    }
    if (order === "DSC") {
      const sorted = [...Data].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      if (iconcoror !== e.target.id) {
        SetData(sorted)
      }
    }
  }

  const SearchUser = async (e) => {
    Setsearch({ ...search, [e.target.name]: e.target.value })
    var email = (e.target.name === "email") ? e.target.value : search.email
    var subscribe = (e.target.name === "subscribe") ? e.target.value : search.subscribe
    var deviceplatform = (e.target.name === "deviceplatform") ? e.target.value : search.deviceplatform
    const Result = await UserSearch(email, subscribe, deviceplatform, search.date)
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      $('#remove_tr').empty()
    }
    else {
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found User</p></div></td>')
      SetData([])
    }
  }

  const SearchUserDate = async (e, name) => {
    if (name === "Date") {
      Setsearch({ ...search, date: e.target.value })
    }
    else {
      Setsearch({ ...search, date: "" })
    }
    var Date = (name === "Date") ? e.target.value : ""
    const Result = await UserSearch(search.email, search.subscribe, search.deviceplatform, Date)
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      $('#remove_tr').empty()
      setCurrent(1)
    }
    else {
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found User</p></div></td>')
      SetData([])
    }
  }

  const ExportExcel = async () => {
    const filename = "UserData"
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = ".xlsx"

    const ws = XLSX.utils.json_to_sheet(Data)
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, filename + fileExtension)
  }

  const PagginationData = (current, pageSize) => {
    return Data.slice((current - 1) * pageSize, current * pageSize);
  };

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(Data.length / value);
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
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">User Data</h3>
        <div className="page-heading-right">
          <Form.Control type="text" name="email" id="" placeholder="Search Email" className="wv-200 my-1 ms-3" onChange={(e) => { SearchUser(e) }} />
          <Form.Select className="wv-200 my-1 ms-3" name="deviceplatform" onChange={(e) => { SearchUser(e) }} >
            <option value="" >All Platform</option>
            <option value="iOS">iOS</option>
            <option value="Android">Android</option>
          </Form.Select>
          <Form.Select className="wv-200 my-1 ms-3" name="subscribe" onChange={(e) => { SearchUser(e) }} >
            <option value="">All Subscribe User</option>
            <option value="1">Subscribed</option>
            <option value="0">Not Subscribed</option>
          </Form.Select>
          <DateRangePicker onApply={(e) => { SearchUserDate(e, 'Date') }} onCancel={(e) => { SearchUserDate(e, 'Cancle') }}>
            <input type="text" name="date" id="" placeholder="Select Date" autoComplete="off" value={search.date} className="form-control wv-200 my-1 ms-3" />
          </DateRangePicker>
          <Form.Select onChange={e => { setSize(Number(e.target.value)); setCurrent(1) }} className="wv-100 my-1 ms-3">
            {
              [10, 20, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))
            }
          </Form.Select>
          <Button variant="info" className="my-1 ms-3" onClick={() => { ExportExcel() }} >Export</Button>
        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th width="5%" className='text-center'>No</th>
                      <th width="35%">
                        <div className='table-sort-filter'>Email
                          <span className="table-sort">
                            <div className={`sort-down ${iconcoror === "email_down" ? "active" : ""}`} id="email_down" onClick={(e) => { sorting('user_email', "", "DSC", e) }}></div>
                            <div className={`sort-up ${iconcoror === "email_up" ? "active" : ""}`} id="email_up" onClick={(e) => { sorting('user_email', "", "ASC", e) }}></div>
                          </span>
                        </div>
                      </th>
                      <th width="12%">Platform</th>
                      <th width="12%">Age</th>
                      <th width="12%">Join Date</th>
                      <th width="12%">Expiry Date</th>
                      <th className='text-center' width="12%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      PagginationData(current, size).map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td className='text-center'>{index.indexOf(val?._id) + 1}</td>
                            <td>{(val?.user_email) ? val?.user_email : "-"}</td>
                            <td>{(val?.user_platform) ? val?.user_platform : "-"}</td>
                            <td>{(val?.Age) ? val?.Age : "-"}</td>
                            <td>{(val?.createdAt) ? dayjs(val?.createdAt).format("DD-MM-YYYY HH:mm:ss") : "-"}</td>
                            <td>{(val?.expiry_date) ? dayjs(val?.expiry_date).format("DD-MM-YYYY HH:mm:ss") : "-"}</td>
                            <td className='text-center'>
                              <Link to={`/UserData/View/${val._id}`}>
                                <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    }
                    <tr id="remove_tr"></tr>
                  </tbody>
                </Table>
                {(Data.length > size) ?
                  <div className="pagination-custom">
                    <Pagination showTitle={false}
                      className="pagination-data"
                      onChange={PaginationChange}
                      total={Data.length}
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

export default UserData
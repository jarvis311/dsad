import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Switch from "react-switch";
import Pagination from "rc-pagination";
import $ from 'jquery'
import { useEffect } from "react";
import { ExerciseAll, ExerciseDelete, ExerciseSearch, ExerciseStatusUpdate } from "../../Auth/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Exercises = () => {

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true)
  const [index, Setindex] = useState([])
  const [Data, SetData] = useState([])
  const [iconcoror, Seticoncoror] = useState("plan_up")
  const [Search, SetSearch] = useState({
    planname: "",
    status: "",
  })

  const GetData = async () => {
    const Result = await ExerciseAll()
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
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Exercises</p></div></td>')
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

  const ChangeStatus = async (e, id) => {
    const Result = await ExerciseStatusUpdate((e === true) ? 1 : 0, id)
    if (Result.data.Status === true) {
      toast.success("Status Update Successfully...")
      if (Search.planname !== "" || Search.status !== "") {
        const Res = await ExerciseSearch(Search.planname, Search.status)
        if (Res.data.Status === true) {
          SetData(Res.data.Data)

          setCurrent(1)
        }
        else {
          SetData([])
        }
      }
      else {
        GetData()
      }
    }
    else {
      toast.error(Result.data.Response_Message)
    }
  }

  const SearchInput = async (e) => {
    SetSearch({ ...Search, [e.target.name]: e.target.value })
    var planname = (e.target.name === "planname") ? e.target.value : Search.planname
    var status = (e.target.name === "status") ? e.target.value : Search.status

    const Result = await ExerciseSearch(planname, status)
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      $('#remove_tr').empty()
      setCurrent(1)
    }
    else {
      SetData([])
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Exercises</p></div></td>')
    }
  }

  const Delete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel! ",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const Result = await ExerciseDelete(id)
          if (Result.data.Status === true) {
            toast.success("Exercises Delete Successfully...")
            GetData()
            if (current !== 1) {
              setCurrent(current - 1)
            }
          }
          else {
            toast.error(Result.data.Response_Message)
          }
        }
      });
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


  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return <button className='paggination-btn'>Previous</button>;
    }
    if (type === 'next') {
      return <button className='paggination-btn'>Next</button>;
    }
    return originalElement;
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">Exercises - <span className="text-primary">(Total-{(Data.length !== 0) ? Data.length : 0})</span></h3>
        <div className="page-heading-right">
          <Form.Control type="text" name="planname" id="" placeholder="Search Name" className="wv-200 my-1 ms-3" onChange={(e) => SearchInput(e)} />
          <Form.Select className="wv-150 my-1 ms-3" name="status" onChange={(e) => SearchInput(e)}>
            <option value="" >All Status</option>
            <option value="1">Active</option>
            <option value="0">Deactive</option>
          </Form.Select>
          <Form.Select onChange={e => { setSize(Number(e.target.value)); setCurrent(1) }} className="wv-100 my-1 ms-3">
            {
              [10, 20, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))
            }
          </Form.Select>
          <Link to="/Exercises/Add" className="my-1 ms-3">
            <Button variant="primary" value="create">Add New</Button>
          </Link>
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
                      <th width="40%">
                        <div className='table-sort-filter'>Plan
                          <span className='table-sort'>
                            <div className={`sort-down ${iconcoror === "plan_down" ? "active" : ""}`} id="plan_down" onClick={(e) => { sorting('status', "", "DSC", e) }}></div>
                            <div className={`sort-up ${iconcoror === "plan_up" ? "active" : ""}`} id="plan_up" onClick={(e) => { sorting('status', "", "ASC", e) }}></div>
                          </span>
                        </div>
                      </th>
                      <th width="35%">Workout Name</th>
                      <th width="10%">
                        <div className='table-sort-filter justify-content-center'>Status
                          <span className='table-sort'>
                            <div className={`sort-down ${iconcoror === "status_down" ? "active" : ""}`} id="status_down" onClick={(e) => { sorting('plan', "", "DSC", e) }}></div>
                            <div className={`sort-up ${iconcoror === "status_up" ? "active" : ""}`} id="status_up" onClick={(e) => { sorting('plan', "", "ASC", e) }}></div>
                          </span>
                        </div>
                      </th>
                      <th className='text-center' width="10%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      PagginationData(current, size).map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td className='text-center'>{index.indexOf(val?._id) + 1}</td>
                            <td>{val?.plan}</td>
                            <td>{val?.workout_name}</td>
                            <td className='text-center'>
                              <Switch
                                onChange={e => ChangeStatus(e, val?._id)}
                                checked={(val?.status === 1) ? true : false}
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
                            </td>
                            <td className='text-center'>
                              <Link to={`/Exercises/View/${val._id}`}>
                                <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                              </Link>
                              <Button variant="outline-danger" size="sm" className="btn-icon" onClick={() => Delete(val?._id)} ><i className='bx bx-trash-alt' ></i></Button>
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
                      itemRender={PrevNextArrow}
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

export default Exercises
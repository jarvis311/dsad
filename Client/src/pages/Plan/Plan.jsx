/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Fancybox from '../../Component/FancyBox';
import Switch from "react-switch";
import Pagination from 'rc-pagination';
import $ from 'jquery'
import { CategorieDragAndDrop, PlanAll, PlanChangeStatus, PlanChangeType, PlanDelete, PlanDragAndDrop, PlanSearch } from "../../Auth/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Plan = () => {

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true)
  const [Data, SetData] = useState([])
  const [iconcoror, Seticoncoror] = useState("")
  const [Search, SetSearch] = useState({
    planname: "",
    status: "",
    type: ""
  })
  var DragAndDropData = []



  const GetData = async () => {
    const Result = await PlanAll()
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      Setloading(false)
      $('#remove_tr').empty()
    }
    else {
      SetData([])
      Setloading(false)
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Plans</p></div></td>')
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
          const Result = await PlanDelete(id)
          if (Result.data.Status === true) {
            toast.success("Plan Delete Successfully...")
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

  const ChangeStatus = async (e, id) => {
    const Result = await PlanChangeStatus((e === true) ? 1 : 0, id)
    if (Result.data.Status === true) {
      toast.success("Plan Status Update Successfully...")
      if (Search.planname !== "" || Search.status !== "" || Search.type !== "") {
        const Res = await PlanSearch(Search.planname, Search.status, Search.type)
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

  const ChangesType = async (e, id) => {
    const Result = await PlanChangeType((e === true) ? 1 : 0, id)
    if (Result.data.Status === true) {
      toast.success("Plan Type Update Successfully...")
      if (Search.planname !== "" || Search.status !== "" || Search.type !== "") {
        const Res = await PlanSearch(Search.planname, Search.status, Search.type)
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
    var type = (e.target.name === "type") ? e.target.value : Search.type
    const Result = await PlanSearch(planname, status, type)
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      $('#remove_tr').empty()
      setCurrent(1)
    }
    else {
      SetData([])
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Plans</p></div></td>')
    }
  }

  const handleDragEnd = async (e) => {
    if (!e.destination) return;
    let tempData = Array.from(Data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    SetData(tempData)
    tempData.map(async (val, index) => {
      DragAndDropData.push({ id: val._id, index: index + 1 })
    })
    const Result = await CategorieDragAndDrop(DragAndDropData)
    if (Result.data.Status === true) {
      toast.success("Position Update Successfully")
      GetData()
    }
    else {
      toast.error("Error, please try again.")
    }
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
        <h3 className="my-1">Plan - <span className="text-primary">(Total-{(Data.length !== 0) ? Data.length : 0})</span></h3>
        <div className="page-heading-right">
          <Form.Control type="text" name="planname" id="" placeholder="Search Name" className="wv-200 my-1 ms-3" onChange={(e) => SearchInput(e)} />
          <Form.Select className="wv-150 my-1 ms-3" name="status" onChange={(e) => SearchInput(e)} >
            <option value="" >All Status</option>
            <option value="1">Active</option>
            <option value="0">Deactive</option>
          </Form.Select>
          <Form.Select className="wv-150 my-1 ms-3" name="type" onChange={(e) => SearchInput(e)} >
            <option value="">All Type</option>
            <option value="1">Online</option>
            <option value="0">Offline</option>
          </Form.Select>
          <Form.Select onChange={e => { setSize(Number(e.target.value)); setCurrent(1) }} className="wv-100 my-1 ms-3">
            {
              [10, 20, 50, 100].map((pageSize, index) => (
                <option key={index} value={pageSize}>
                  {pageSize}
                </option>
              ))
            }
          </Form.Select>
          <Link to="/Plan/Add" className="my-1 ms-3">
            <Button variant="primary" value="create">Add New</Button>
          </Link>
        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <DragDropContext onDragEnd={handleDragEnd}>
                  {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th className='text-center' width="6%">No</th>
                        <th width="15%">
                          <div className='table-sort-filter'>Plan Name
                            <span className='table-sort'>
                              <div className={`sort-down ${iconcoror === "planname_down" ? "active" : ""}`} id="planname_down" onClick={(e) => { sorting('plan_name', "", "DSC", e) }}></div>
                              <div className={`sort-up ${iconcoror === "planname_up" ? "active" : ""}`} id="planname_up" onClick={(e) => { sorting('plan_name', "", "ASC", e) }}></div>
                            </span>
                          </div>
                        </th>
                        <th className='text-center' width="6%">Image</th>
                        <th width="35%">Description</th>
                        <th width="7%">Active User</th>
                        <th width="10%">Total Completions</th>
                        <th className='text-center' width="7%">
                          <div className='table-sort-filter'>Status
                            <span className='table-sort'>
                              <div className={`sort-down ${iconcoror === "status_down" ? "active" : ""}`} id="status_down" onClick={(e) => { sorting('status', "", "DSC", e) }}></div>
                              <div className={`sort-up ${iconcoror === "status_up" ? "active" : ""}`} id="status_up" onClick={(e) => { sorting('status', "", "ASC", e) }}></div>
                            </span>
                          </div>
                        </th>
                        <th className='text-center' width="7%">
                          <div className='table-sort-filter'>Type
                            <span className='table-sort'>
                              <div className={`sort-down ${iconcoror === "type_down" ? "active" : ""}`} id="type_down" onClick={(e) => { sorting('type', "", "DSC", e) }}></div>
                              <div className={`sort-up ${iconcoror === "type_up" ? "active" : ""}`} id="type_up" onClick={(e) => { sorting('type', "", "ASC", e) }}></div>
                            </span>
                          </div>
                        </th>
                        <th className='text-center' width="7%">Action</th>
                      </tr>
                    </thead>
                    <Droppable droppableId="droppable-1">
                      {(provider) => (
                        <tbody ref={provider.innerRef} {...provider.droppableProps}>
                          {
                            PagginationData(current, size).map((val, index) => (
                              <Draggable key={val._id} draggableId={val._id} index={index}>
                                {(provider) => (
                                  <tr key={index} {...provider.draggableProps} ref={provider.innerRef} {...provider.dragHandleProps}>
                                    <td className='text-center'>{val?.index}</td>
                                    <td>{val?.plan_name}</td>
                                    <td className='text-center'>
                                      {
                                        (!val?.plan_preview_image) ? "-" : <>
                                          <Fancybox>
                                            <a data-fancybox="gallery" href={val?.plan_preview_image}>
                                              <img src={val?.plan_preview_image} className="hv-30 rounded-3" alt="Image" />
                                            </a>
                                          </Fancybox>
                                        </>}
                                    </td>
                                    <td>{(val?.plan_description) ? val?.plan_description : "-"}</td>
                                    <td>{val?.plan_active_users}</td>
                                    <td>{val?.plan_total_completions}</td>
                                    <td className='text-center'>
                                      <Switch
                                        onChange={(e) => ChangeStatus(e, val._id)}
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
                                      <Switch
                                        onChange={(e) => ChangesType(e, val._id)}
                                        checked={(val?.type === 1) ? true : false}
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
                                      <Link to={`/Plan/View/${val?._id}`}>
                                        <Button variant="outline-warning" size="sm" className="me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                      </Link>
                                      <Button variant="outline-danger" size="sm" className="btn-icon" onClick={() => Delete(val?._id)} ><i className='bx bx-trash-alt' ></i></Button>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))
                          }
                          <tr id="remove_tr"></tr>
                        </tbody>
                      )}
                    </Droppable>
                  </Table>
                </DragDropContext>

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

export default Plan
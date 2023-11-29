/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Table, Form } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Fancybox from "../../Component/FancyBox";
import { SoundAll, SoundDelete, SoundDragAndDrop, SoundSearch } from "../../Auth/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import $ from 'jquery'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Sounds = () => {

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true)
  const [Data, SetData] = useState([])
  const [iconcoror, Seticoncoror] = useState("")
  var DragAndDropData = []

  const GetData = async () => {
    const Result = await SoundAll()
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      Setloading(false)
      $('#remove_tr').empty()
    }
    else {
      SetData([])
      Setloading(false)
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Sounds</p></div></td>')
    }
  }

  const SearchSound = async (e) => {
    const Result = await SoundSearch(e.target.value)
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      $('#remove_tr').empty()
      setCurrent(1)
    }
    else {
      SetData([])
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Sounds</p></div></td>')
    }
  }

  const sorting = (col, type = "string", order, e) => {
    Seticoncoror(e.target.id)
    if (col === "category_name") {
      if (order === "ASC") {
        const sorted = [...Data].sort((a, b) =>
          a.category_id.category_name > b.category_id.category_name ? 1 : -1
        );
        if (iconcoror !== e.target.id) {
          SetData(sorted)
        }
      }
      if (order === "DSC") {
        const sorted = [...Data].sort((a, b) =>
          a.category_id.category_name < b.category_id.category_name ? 1 : -1
        );
        if (iconcoror !== e.target.id) {
          SetData(sorted)
        }
      }
    }
    else {
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
          const Result = await SoundDelete(id)
          if (Result.data.Status === true) {
            toast.success("Tags Delete Successfully...")
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

  const handleDragEnd = async (e) => {
    if (!e.destination) return;
    let tempData = Array.from(Data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    SetData(tempData)
    tempData.map(async(val, index) => {
      DragAndDropData.push({ id: val._id, index: index + 1 })
    })
    const Result = await SoundDragAndDrop(DragAndDropData)
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
        <h3 className="my-1">Sounds - <span className="text-primary">(Total-{(Data.length !== 0) ? Data.length : 0})</span></h3>
        <div className="page-heading-right">
          <Form.Control type="text" name="" id="" placeholder="Search Sound Name" onChange={e => SearchSound(e)} className="wv-200 my-1 ms-3" />
          <Form.Select onChange={e => { setSize(Number(e.target.value)); setCurrent(1) }} className="wv-100 my-1 ms-3">
            {
              [10, 20, 50, 10].map((pageSize, index) => (
                <option key={index} value={pageSize}>
                  {pageSize}
                </option>
              ))
            }
          </Form.Select>
          <Link to="/Sounds/Add" className="my-1 ms-3">
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
                        <th width="5%" className='text-center'>No</th>
                        <th width="20%">
                          <div className='table-sort-filter'>Category Name
                            <span className='table-sort'>
                              <div className={`sort-down ${iconcoror === "categoryname_down" ? "active" : ""}`} id="categoryname_down" onClick={(e) => { sorting('category_name', "", "DSC", e) }}></div>
                              <div className={`sort-up ${iconcoror === "categoryname_up" ? "active" : ""}`} id="categoryname_up" onClick={(e) => { sorting('category_name', "", "ASC", e) }}></div>
                            </span>
                          </div>
                        </th>
                        <th width="25%">
                          <div className='table-sort-filter'>Sound Name
                            <span className='table-sort'>
                              <div className={`sort-down ${iconcoror === "name_down" ? "active" : ""}`} id="name_down" onClick={(e) => { sorting('name', "", "DSC", e) }}></div>
                              <div className={`sort-up ${iconcoror === "name_up" ? "active" : ""}`} id="name_up" onClick={(e) => { sorting('name', "", "ASC", e) }}></div>
                            </span>
                          </div>
                        </th>
                        <th width="10%">Time</th>
                        <th className="text-center" width="10%">URL</th>
                        <th className="text-center" width="10%">Preview Thumb</th>
                        <th className="text-center" width="10%">Background GIF</th>
                        <th className='text-center' width="10%">Action</th>
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
                                    <td>{(val?.category_id !== null) ? val?.category_id?.category_name : "-"}</td>
                                    <td>{val?.name}</td>
                                    <td>{val?.time}</td>
                                    <td className="text-center"><a href={val?.url} target="_blank" rel="noreferrer"><Button variant="outline-primary" className="btn-icon"><i className='bx bx-video'></i></Button></a></td>
                                    <td className="text-center">
                                      <Fancybox>
                                        <a data-fancybox="gallery" href={val?.previewThumb}>
                                          <img src={val?.previewThumb} className="hv-30 rounded-3" alt="Image" />
                                        </a>
                                      </Fancybox>
                                    </td>
                                    <td className="text-center"><a href={val?.backgroundGIF} target="_blank" rel="noreferrer"><Button variant="outline-info" className="btn-icon"><i className='bx bxs-file-gif' ></i></Button></a></td>
                                    <td className='text-center'>
                                      <Link to={`/Sounds/View/${val?._id}`}>
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

export default Sounds
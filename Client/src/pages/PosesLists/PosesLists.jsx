/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Table, Form } from "react-bootstrap";
import Layout from '../../layout/Layout';
import Pagination from "rc-pagination";
import Fancybox from "../../Component/FancyBox";
import { PoseListsAll, PoseListsDelete, PoseListsSearch } from "../../Auth/Api";
import $ from 'jquery'
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PosesLists = () => {

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, Setloading] = useState(true)
  const [index, Setindex] = useState([])
  const [Data, SetData] = useState([])
  const [iconcoror, Seticoncoror] = useState("name_up")


  const GetData = async () => {
    const Result = await PoseListsAll()
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
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Poses Lists</p></div></td>')
    }
  }

  const Search = async (e) => {
    const Result = await PoseListsSearch(e.target.value)
    if (Result.data.Status === true) {
      SetData(Result.data.Data)
      $('#remove_tr').empty()
      setCurrent(1)
    }
    else {
      SetData([])
      $('#remove_tr').empty()
      $('#remove_tr').append('<td colSpan="100%" class="p-0"><div class="no-found"><img src="../../not-found/image.svg"/><p>No Found Poses Lists</p></div></td>')
    }
  }

  const sorting = (col, type = "string", order, e) => {
    Seticoncoror(e.target.id)
    if (col === "pose_no") {
      if (order === "ASC") {
        const sorted = [...Data].sort((a, b) =>
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
        );
        if (iconcoror !== e.target.id) {
          SetData(sorted)
        }
      }
      if (order === "DSC") {
        const sorted = [...Data].sort((a, b) =>
          parseInt(a[col]) < parseInt(b[col]) ? 1 : -1
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
          const Result = await PoseListsDelete(id)
          if (Result.data.Status === true) {
            toast.success("Poses Lists Delete Successfully...")
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
        <h3 className="my-1">Poses Lists - <span className="text-primary">(Total-{(Data.length !== 0) ? Data.length : 0})</span></h3>
        <div className="page-heading-right">
          <Form.Control type="text" name="" id="" placeholder="Search Name" className="wv-200 my-1 ms-3" onChange={e => Search(e)} />
          <Form.Select onChange={e => { setSize(Number(e.target.value)); setCurrent(1) }} className="wv-100 my-1 ms-3">
            {
              [10, 20, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))
            }
          </Form.Select>
          <Link to="/PosesLists/Add" className="my-1 ms-3">
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
                      <th width="8%">
                        <div className='table-sort-filter justify-content-center'>Pose No
                          <span className='table-sort'>
                            <div className={`sort-down ${iconcoror === "poseno_down" ? "active" : ""}`} id="poseno_down" onClick={(e) => { sorting('pose_no', "", "DSC", e) }}></div>
                            <div className={`sort-up ${iconcoror === "poseno_up" ? "active" : ""}`} id="poseno_up" onClick={(e) => { sorting('pose_no', "", "ASC", e) }}></div>
                          </span>
                        </div>
                      </th>
                      <th width="27%">
                        <div className='table-sort-filter'>Name
                          <span className='table-sort'>
                            <div className={`sort-down ${iconcoror === "name_down" ? "active" : ""}`} id="name_down" onClick={(e) => { sorting('name', "", "DSC", e) }}></div>
                            <div className={`sort-up ${iconcoror === "name_up" ? "active" : ""}`} id="name_up" onClick={(e) => { sorting('name', "", "ASC", e) }}></div>
                          </span>
                        </div>
                      </th>
                      <th width="10%">Media Type</th>
                      <th width="10%">Activity Time</th>
                      <th className="text-center" width="10%">Preview</th>
                      <th className="text-center" width="10%">Media URL</th>
                      <th className="text-center" width="10%">Background Audio</th>
                      <th className='text-center' width="10%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      PagginationData(current, size).map((val, ind) => {
                        return (
                          <tr key={ind}>
                            <td className='text-center'>{index.indexOf(val?._id) + 1}</td>
                            <td className='text-center'>{val?.pose_no}</td>
                            <td>{val?.name}</td>
                            <td>{val?.media_type}</td>
                            <td>{val?.activity_time}</td>
                            <td className="text-center">
                              <Fancybox>
                                <a data-fancybox="gallery" href={val?.preview}>
                                  <img src={val?.preview} className="hv-30 rounded-3" alt="Image" />
                                </a>
                              </Fancybox>
                            </td>
                            <td className="text-center"><a href={val?.media_url} target="_blank" rel="noreferrer"><Button variant="outline-primary" className="btn-icon"><i className='bx bx-video'></i></Button></a></td>
                            <td className="text-center"><a href={val?.backgroundaudio[0]?.audio} target="_blank" rel="noreferrer"><Button variant="outline-info" className="btn-icon"><i class='bx bx-music'></i></Button></a></td>
                            <td className='text-center'>
                              <Link to={`/PosesLists/View/${val?._id}`}>
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

export default PosesLists
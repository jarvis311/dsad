import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Layout from '../../layout/Layout';
import { SelectPicker } from 'rsuite';
import { useEffect } from 'react';
import { useState } from 'react';
import { ExerciseAll, ExerciseDragAndDrop, ExerciseView } from '../../Auth/Api';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

const ExercisesView = () => {

    const [Data, SetData] = useState([])
    const [loading, Setloading] = useState(true)
    const [ViewSearchData, SetViewSearchData] = useState([])
    const { id } = useParams()
    const [Id, SetId] = useState(id)
    var DragAndDropData = []


    const GetAllData = async () => {
        const Result = await ExerciseAll()
        if (Result.data.Status === true) {
            var SetSearchData = []
            Result.data.Data.map((val) => {
                SetSearchData.push({
                    label: val.plan,
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
        const Result = await ExerciseView((id === "") ? Id : id)
        if (Result.data.Status === true) {
            SetData(Result.data.Data.exercisesposelist)
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

    const handleDragEnd = async (e) => {
        if (!e.destination) return;
        let tempData = Array.from(Data);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        SetData(tempData)
        tempData.map(async(val, index) => {
          DragAndDropData.push({ id: val._id, index: index + 1 })
        })
        const Result = await ExerciseDragAndDrop(DragAndDropData)
        if (Result.data.Status === true) {
          toast.success("Position Update Successfully")
          GetViewData("")
        }
        else {
          toast.error("Error, please try again.")
        }
      }

    useEffect(() => {
        GetViewData("")
        GetAllData()
    }, [])

    return (
        <Layout sidebar={true}>
            <div className="page-heading">
                <h3><Link to="/Exercises" className='btn btn-primary btn-icon me-3'><i className='bx bxs-left-arrow-alt'></i></Link>View Exercises</h3>
                <div className="page-heading-right">
                    <SelectPicker data={ViewSearchData} defaultValue={Id} cleanable={false} className="wv-200 my-1 ms-3" onChange={e => InputData(e)} placeholder="Select Plan Name" />
                    <Link to={`/Exercises/Edit/${Id}`}>
                        <Button variant="primary ms-3 my-1" value="edit">Edit</Button>
                    </Link>
                </div>
            </div>
            <div className='page-content'>
                <Card>
                    <Card.Body>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            {(loading === true) ? <div className="loader table-loader" ></div> : <></>}
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th width="8%" className='text-center'>No</th>
                                        <th width="92%">Pose Name</th>
                                    </tr>
                                </thead>
                                <Droppable droppableId="droppable-1">
                                    {(provider) => (
                                        <tbody ref={provider.innerRef} {...provider.droppableProps}>
                                            {
                                                Data?.map((val, index) => (
                                                    <Draggable key={val._id} draggableId={val._id} index={index}>
                                                        {(provider) => (
                                                            <tr key={index} {...provider.draggableProps} ref={provider.innerRef} {...provider.dragHandleProps}>
                                                                <td className='text-center'>{val?.index}</td>
                                                                <td>{val?.name}</td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                        </tbody>
                                    )}
                                </Droppable>
                            </Table>
                        </DragDropContext>

                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default ExercisesView
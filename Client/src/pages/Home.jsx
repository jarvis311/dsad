import React from 'react'
import Layout from '../layout/Layout'
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  defaults
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { DashboardData } from '../Auth/Api';
import { useEffect } from 'react';

defaults.font.family = 'Maven Pro';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Plan Level Doughnut Chart
const planleveloptions = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: 'rectRounded',
        font: {
          family: "Maven Pro",
          size: 14
        }
      },
      tooltip: {
        bodyFont: {
          family: "Maven Pro"
        },
        titleFont: {
          family: "Maven Pro"
        }
      }
    },
  },
};


// Categories Bar Chart
const CategoriesOptions = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
      tooltip: {
        bodyFont: {
          family: "Maven Pro"
        },
        titleFont: {
          family: "Maven Pro"
        }
      }
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 2,
        font: {
          family: "Maven Pro",
          size: 14
        }
      },
      grid: {
        display: true,
      },
      scaleLabel: {
        display: true,
        font: {
          family: "Maven Pro",
          size: 14
        }
      }
    },
    x: {
      ticks: {
        font: {
          family: "Maven Pro",
          size: 14
        }
      },
      grid: {
        display: false,
      },
      scaleLabel: {
        display: true,
        font: {
          family: "Maven Pro",
          size: 14
        }
      }
    }
  }
};


const Home = () => {

  const [Data, SetData] = useState({
    CategoriesCount: [],
    ExercisesCount: 0,
    PlanCount: 0,
    PlanLevels: [],
    PosesListsCount: 0,
    SoundsCount: 0
  })
  const [Categories, SetCategories] = useState({
    Labels: [],
    Data: []
  })
  const [PlanLevels, SetPlanLevels] = useState({
    Labels: [],
    Data: []
  })

  const GetData = async () => {
    const Result = await DashboardData()
    if (Result.data.Status === true) {
      SetData(Result.data.Data)

      if (Result.data.Data.CategoriesCount.length !== 0) {
        var label = []
        var data = []
        Result.data.Data.CategoriesCount.map((val, index) => {
          label.push(val.category_name)
          data.push(val.count)
        })
        SetCategories({ Labels: label, Data: data })
      }

      if (Result.data.Data.PlanLevels.length !== 0) {
        var label1 = []
        var data1 = []
        Result.data.Data.PlanLevels.map((val, index) => {
          label1.push(val.plan_level)
          data1.push(val.count)
        })
        SetPlanLevels({ Labels: label1, Data: data1 })
      }
    }
  }

  const CategoriesData = {
    labels: Categories.Labels,
    datasets: [
      {
        label: 'Categories',
        data: Categories.Data,
        barThickness: 20,
        backgroundColor: '#DB73FF',
      }
    ],
  };

  const planleveldata = {
    labels: PlanLevels.Labels,
    datasets: [
      {
        label: 'Plan Level',
        data: PlanLevels.Data,
        backgroundColor: ['#1FD9A3', '#FFB15C', '#6A9BF4', '#FF5C84', '#DB73FF']
      },
    ],
  };

  useEffect(() => {
    GetData()
  }, [])

  return (
    <Layout sidebar={true}>
      <div className="vv-dashboard">
        <Row>
          <Col xxl={3} xl={4} md={6}>
            <Link to="/plan">
              <Card>
                <Card.Body>
                  <div className="counter orange">
                    <div className="counter-media">
                      <i className="bx bxs-notepad"></i>
                    </div>
                    <div className="counter-content">
                      <h3>{Data.PlanCount}</h3>
                      <p>Plan</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={4} md={6}>
            <Link to="/exercises">
              <Card>
                <Card.Body>
                  <div className="counter pink">
                    <div className="counter-media">
                      <i className="bx bx-dumbbell"></i>
                    </div>
                    <div className="counter-content">
                      <h3>{Data.ExercisesCount}</h3>
                      <p>Exercises</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={4} md={6}>
            <Link to="/sounds">
              <Card>
                <Card.Body>
                  <div className="counter green">
                    <div className="counter-media">
                      <i className="bx bxs-music"></i>
                    </div>
                    <div className="counter-content">
                      <h3>{Data.SoundsCount}</h3>
                      <p>Sounds</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={4} md={6}>
            <Link to="/poseslists">
              <Card>
                <Card.Body>
                  <div className="counter blue">
                    <div className="counter-media">
                      <i className='bx bx-list-ul'></i>
                    </div>
                    <div className="counter-content">
                      <h3>{Data.PosesListsCount}</h3>
                      <p>Poses Lists</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          {
            (Data.CategoriesCount.length !== 0) ? <>
              <Col xxl={6} md={6}>
                <Card>
                  <Card.Body>
                    <div className="chart-title">
                      <h4>Categories</h4>
                    </div>
                    <Bar options={CategoriesOptions} data={CategoriesData} height="137" />
                  </Card.Body>
                </Card>
              </Col></> : ""
          }

          {
            (Data.PlanLevels.length !== 0) ? <>
              <Col xxl={3} md={6}>
                <Card>
                  <Card.Body>
                    <div className="chart-title">
                      <h4>Plan Level</h4>
                    </div>
                    <Doughnut options={planleveloptions} data={planleveldata} />
                  </Card.Body>
                </Card>
              </Col></> : ""
          }
        </Row>
      </div>
    </Layout>
  )
}

export default Home
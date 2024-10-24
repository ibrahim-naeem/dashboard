/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { fetchData } from '../../firebaseUtils'
const Dashboard = () => {
  const [result, setResult] = useState([])
  const [surveys, setSurveys] = useState([]); // State to hold the surveys data
  const [loading, setLoading] = useState(true); 

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Old Users', value: '40', percent: 40, color: 'success' },
    { title: 'New Users', value: '45', percent: 20, color: 'info' },
    { title: 'Active Users', value: '78', percent: 60, color: 'warning' },
    {
      title: "Compeleted Assessment's",
      value: result?.assessments?.length,
      percent: 80,
      color: 'danger',
    },
    { title: "Active Assessment's", value: '5', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'January', value1: 34, value2: 78, value3: 10, value4: 19 },
    { title: 'February', value1: 56, value2: 24, value3: 13, value4: 90 },
    { title: 'March', value1: 12, value2: 67, value3: 56, value4: 14 },
    { title: 'April', value1: 43, value2: 91, value3: 12, value4: 47 },
    { title: 'May', value1: 22, value2: 73, value3: 56, value4: 94 },
    { title: 'June', value1: 53, value2: 82, value3: 10, value4: 19 },
    { title: 'July', value1: 9, value2: 69, value3: 43, value4: 11 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Ground floor - meeting room',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Discovery' },
      usage: {
        value: 'Region Alpha',
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: 'Compeleted',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Pinwheel Meeting Room',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Discovery' },
      usage: {
        value: 'Campus Beta',
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: 'In-progress',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Meeting room B', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'Discovery' },
      usage: {
        value: 'Campus Beta',
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: 'Compeleted',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Moonshot Lab', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'Discovery' },
      usage: {
        value: 'Bulding Alpha',
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Compeleted',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Vic office',
        new: true,
        // registered: 'Jan 1, 2021',
      },
      country: { name: 'Discovery' },
      usage: {
        value: 'Campus Beta',
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'In-progress',
    },
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData('surveys');
        setSurveys(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading surveys...</div>;
  }
  

  return (
    <>
    <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {/* xeadereader> */}
            {/* <CCardBody> */}
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Assessment name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Type</CTableHeaderCell>
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Created at</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {surveys.map((survey, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell>
                      <div>{survey?.name}</div>
                      {/* <div className="small text-medium-emphasis">
                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                        {item.user.registered}
                      </div> */}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {/* <CIcon size="xl" icon={item.country.name} title={item.country.name} /> */}
                      <div>{survey?.type || 'Not Available'}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>VX HQ ISL</strong>
                        </div>
                        <div className="float-end">
                          {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                        </div>
                      </div>
                      {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                    </CTableDataCell>

                    <CTableDataCell>
                      <div className="small text-medium-emphasis"></div>
                      {survey?.createdAt || 'Not Available'}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            {/* </CCardBody> */}
          </CCard>
        </CCol>
      </CRow>
      
      <WidgetsDropdown data={surveys} />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Usage
              </h4>
              {/* <div className="small text-medium-emphasis">January - July 2021</div> */}
            </CCol>
            {/* <CCol sm={7} className="d-none d-md-block"> */}
            {/* <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton> */}
            {/* <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup> */}
            {/* </CCol> */}
          </CRow>

          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'Active Users',
                  backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),
                  borderColor: getStyle('--cui-warning'),
                  pointHoverBackgroundColor: getStyle('--cui-warning'),
                  borderWidth: 2,
                  data: [30, 50, 10, 65, 77, 45, 83],
                  fill: true,
                },
                {
                  label: 'New Users',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [10, 5, 15, 20, 5, 25, 13],
                  fill: true,
                },
                {
                  label: " Assessment's",
                  backgroundColor: hexToRgba(getStyle('--cui-danger'), 10),
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 2,
                  data: [11, 5, 4, 17, 21, 2, 32],
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>{item.value}</strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      {/* <WidgetsBrand withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Spaces Info</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={12}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Buildings</div>
                        <div className="fs-5 fw-semibold">43</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small"> Region</div>
                        <div className="fs-5 fw-semibold">17</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Campus</div>
                        <div className="fs-5 fw-semibold">83</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Assets Info</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={12}>
                  <CRow>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Videos</div>
                        <div className="fs-5 fw-semibold">113</div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small"> Audios</div>
                        <div className="fs-5 fw-semibold">173</div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Notes</div>
                        <div className="fs-5 fw-semibold">{result?.notes?.length}</div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Images</div>
                        <div className="fs-5 fw-semibold">43</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                        <CProgress thin color="warning" value={item.value3} />
                        <CProgress thin color="success" value={item.value4} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Spaces Info</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={12}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Buildings</div>
                        <div className="fs-5 fw-semibold">43</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small"> Region</div>
                        <div className="fs-5 fw-semibold">17</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">Campus</div>
                        <div className="fs-5 fw-semibold">83</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

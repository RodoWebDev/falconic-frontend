import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Slider from "react-slick";
import useWindowSize from "utils/windowSize";
import moment from 'moment'
import './styles.scss'

interface SampleArrowProps {
  className?: string
  style?: Record<string, unknown>
  onClick?: () => void
}

function SampleNextArrow(props: SampleArrowProps) {
  const { className, style, onClick } = props
  return (
    <FaAngleRight
      className={className}
      style={{
        ...style,
        display: 'block',
        right: 10,
        zIndex: 1,
        color: 'black',
        opacity: 0.7,
        width: 32,
        height: 32,
      }}
      onClick={onClick}
    />
  )
}
function SamplePrevArrow(props: SampleArrowProps) {
  const { className, style, onClick } = props
  return (
    <FaAngleLeft
      className={className}
      style={{
        ...style,
        display: 'block',
        left: 10,
        zIndex: 1,
        color: 'black',
        opacity: 0.7,
        width: 32,
        height: 32,
      }}
      onClick={onClick}
    />
  )
}

const News = (props: any) => {
  const { data } = props;
  const [key, setKey] = useState('service');
  const width = useWindowSize()
  const settings = {
    dots: false,
    centerMode: width >= 768 ? true : false,
    infinite: true,
    slidesToShow: width >= 1400 ? 4 : width >= 1400 ? 3 : width >= 768 ? 2 : 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const renderService = (data: any) => {
    return (
      <div className="service-section" key={data._id}>
        <img src={data.imgUrl} className="service_img" alt="Service_img" />
        <div className="service_content">
          <p className='date'>{moment(data.createdAt).format('DD MMMM YYYY')}</p>
          <p className='desc'>{data.title}</p>
          <p className='more'>{data.btnTitle}  -&gt;</p>
        </div>
      </div>
    )
  }

  if (!data || !data.items) {
    return <>Data is not exist</>;
  }
  
  return (
    <div className="tabs">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k: any) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="service" title="Latest News">
          <p className='more_absolute'>More News  -&gt;</p>
          <div className="slider-container">
            <Slider {...settings}>
              {data.items.map((data: any) => (
                renderService(data)
              ))}
            </Slider>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default News

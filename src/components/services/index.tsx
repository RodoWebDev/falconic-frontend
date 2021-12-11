import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import './styles.scss'

const Services = (props: any) => {
  const { data } = props;
  const [key, setKey] = useState('service');
  if (!data || !data.items || data.items.length < 5) {
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
        <Tab eventKey="service" title="Our Service">
          <p className='more_absolute'>More Services  -&gt;</p>
          <div className="row">
            <div className="col-md-4 service">
              <img src={data.items[0].imgUrl} className="Service1-img" alt="Service1-img" />
              <div className="background_gradient" />
              <div className="content">
                <p className="title">{data.items[0].title}</p>
                <p className='more'>{data.items[0].btnTitle}  -&gt;</p>
              </div>
            </div>
            <div className="col-md-8 service second">
              <img src={data.items[1].imgUrl} className="Service2-img" alt="Service2-img" />
              <div className="background_gradient" />
              <div className="content">
                <p className="title">{data.items[1].title}</p>
                <p className='more'>{data.items[1].btnTitle} -&gt;</p>
              </div>
            </div>
            <div className="col-md-4 mt-4 service">
              <img src={data.items[2].imgUrl} className="Service3-img" alt="Service3-img" />
              <div className="background_gradient" />
              <div className="content">
                <p className="title">{data.items[2].title}</p>
                <p className='more'>{data.items[2].btnTitle}  -&gt;</p>
              </div>
            </div>
            <div className="col-md-4 mt-4 service">
              <img src={data.items[3].imgUrl} className="Service3-img" alt="Service3-img" />
              <div className="background_gradient" />
              <div className="content">
                <p className="title">{data.items[3].title}</p>
                <p className='more'>{data.items[3].btnTitle}  -&gt;</p>
              </div>
            </div>
            <div className="col-md-4 mt-4 service">
              <img src={data.items[4].imgUrl} className="Service5-img" alt="Service5-img" />
              <div className="background_gradient" />
              <div className="content">
                <p className="title">{data.items[4].title}</p>
                <p className='more'>{data.items[4].btnTitle}  -&gt;</p>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Services

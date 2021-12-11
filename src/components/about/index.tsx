import React from 'react';
import FalconicLogo from '../../assets/imgs/falconic_logo.png';
import './styles.scss'

const About = (props: any) => {
  const { data } = props;
  const Comparsion = data.list.filter((list: any) => list.title === "Comparsion")[0];
  const falconic = data.list.filter((list: any) => list.title === "FALCONIC")[0];
  const bank = data.list.filter((list: any) => list.title === "Another bank")[0];
  return (
    <div className="about">
      <img src={data.imgUrl} className="About-img" alt="About-img" />
      <div className="background_gradient" />
      <div className="container">
        <div className="content">
          <p className="title">{data.title}</p>
          <p className="desc">{data.desc}</p>
          <p className='more'>{data.btnTitle}  -&gt;</p>
        </div>
      </div>
      <div className="tags">
        <div className="tag">
          <p className="title">{Comparsion.title}</p>
          <div className="descs">
            {Comparsion.list.map((item: string, index: number) => (
              <p className="desc" key={`${item}-${index}`}>{item}</p>
            ))}
          </div>
        </div>
        <div className="tag select text-center">
          <div className="title-section">
            <img src={FalconicLogo} className="falconicLogo-img" alt="FalconicLogo-img" />
            <p className="title">{falconic.title}</p>
          </div>
          <div className="descs">
            {falconic.list.map((item: string, index: number) => (
              <p className="desc" key={`${item}-${index}`}>{item}</p>
            ))}
          </div>
        </div>
        <div className="tag text-center">
          <p className="title">{bank.title}</p>
          <div className="descs">
            {bank.list.map((item: string, index: number) => (
              <p className="desc" key={`${item}-${index}`}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

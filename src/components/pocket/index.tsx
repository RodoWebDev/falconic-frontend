import React from 'react';
import QRCode from '../../assets/imgs/qrcode.png';
import AppStore from '../../assets/imgs/App_Store.png';
import GooglePlay from '../../assets/imgs/Google_Play.png';
import './styles.scss'

const Pocket = (props: any) => {
  const { data } = props;
  return (
    <div className="pocket">
      <div className="pocket_left">
        <h1>{data.title}</h1>
        <p className="desc">{data.desc}</p>
        <p className='more'>{data.btnTitle}  -&gt;</p>
      </div>
      <img src={data.imgUrl} className="pocket_right" alt="pocket_right_img" />
      <div className="center_div">
        <img src={QRCode} className="qrcode" alt="pocket_right_img" />
        <img src={AppStore} className="app_store" alt="pocket_right_img" />
        <img src={GooglePlay} className="google_play" alt="pocket_right_img" />
      </div>
    </div>
  )
}

export default Pocket

import React from 'react';
import Cardimg from '../../assets/imgs/card.png';
import ArrowImg from '../../assets/imgs/arrow.png';
import './styles.scss'

const features = [
  {id: 1, highlight: 'Contactless.', desc: 'Convenient.'},
  {id: 2, highlight: 'Credit.', desc: 'Enhancing.'},
  {id: 3, highlight: 'Debit.', desc: 'Simple.'},
  {id: 4, highlight: 'Metal.', desc: 'Prestige.'},
  {id: 5, highlight: 'Ledger.', desc: 'Game-changing.'},
]

const Card = (props: any) => {
  const { data } = props;
  if (!data || !data.items || data.items.length < 5) {
    return <>Data is not exist</>;
  }
  return (
    <div className="card_section">
      <div className="row">
        <div className="col-md-6">
          <img src={Cardimg} className="card_img" alt="Card-img" />
        </div>
        <div className="col-md-6 card_desc">
          <h1 className="title">One card many features</h1>
          {features.map(feature => (
            <div className="feature" key={feature.id}>
              <img src={ArrowImg} className="arrow-img" alt="arrow-img" />
              <p className="desc"><b>{feature.highlight}</b> {feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
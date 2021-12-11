/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap'
import './styles.scss'

const Currency = (props: any) => {
  const { data } = props;
  const [key, setKey] = useState('currency');
  const [symbols, setSymbols] = useState<any>({});
  const [currencies, setCurrencies] = useState<any>({});
  const [cryptos, setCryptos] = useState<any>({});
  const [fromCur, setFromCur] = useState('');
  const [toCur, setToCur] = useState('');
  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [currency1, setCurrency1] = useState(0);
  const [currency2, setCurrency2] = useState(0);
  const [crypto1, setCrypto1] = useState(0);
  const [crypto2, setCrypto2] = useState(0);
  const [cryptoRate, setCryptoRate] = useState(1);
  const [currencyRate, setCurrencyRate] = useState(1);

  const getCurrencyRate = () => {
    setCurrencyRate(currencies[toCur] / currencies[fromCur]);
    setCurrency2(currency1 * currencies[toCur] / currencies[fromCur]);
  }

  const getCryptoRate = async () => {
    const res: any = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${fromCrypto}&tsyms=${toCrypto}`);
    setCryptoRate(res.data[toCrypto]);
    setCrypto2(crypto1 * res.data[toCrypto])
  }

  const getCryptoData = async () => {
    const res: any = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${data[1]?.base}&tsyms=USDT,BTC,ETH,XRP,BCH,TRX,DOGE,BNB,LTC,XLM`);
    setCryptos(res.data);
  }

  const getCurrenciesData = async () => {
    const res: any = await axios.get(`https://api.exchangerate.host/latest?base=${data[0]?.base}`);
    setCurrencies(res.data.rates);
  }

  const onCurrency1Change = (e: any) => {
    setCurrency1(e.target.value);
    setCurrency2(e.target.value * currencyRate);
  }

  const onCurrency2Change = (e: any) => {
    setCurrency2(e.target.value);
    setCurrency1(e.target.value / currencyRate);
  }

  const onCrypto1Change = (e: any) => {
    setCrypto1(e.target.value);
    setCrypto2(e.target.value * cryptoRate);
  }

  const onCrypto2Change = (e: any) => {
    setCrypto2(e.target.value / cryptoRate);
    setCrypto2(e.target.value);
  }

  useEffect(() => {
    getCurrencyRate();
  }, [fromCur, toCur])

  useEffect(() => {
    getCryptoRate();
  }, [fromCrypto, toCrypto])

  useEffect(() => {
    getCryptoData();
    getCurrenciesData();
    if (data[0] && data[1]) {
      setToCur(data[0]?.items[0])
      setFromCur(data[0]?.items[0])
      setToCrypto(data[1]?.items[0])
      setFromCrypto(data[1]?.items[0])
    }
  }, [data])

  useEffect(() => {
    var requestURL = 'https://api.exchangerate.host/symbols';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      var response = request.response;
      setSymbols(response.symbols);
    }
  }, [])
  if (currencies.length === 0 || symbols.length === 0) {
    return <></>;
  }
  if (!data || !data[0]?.items || !data[1]?.items) {
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
        <Tab eventKey="currency" title="Currency exchange">
          <div className="row">
            <div className="col-lg-3 col-md-12 calculator">
              <p className="title">Calculator</p>
              <div className="row">
                <div className="col-md-3 mt-4">
                  <p className="sub-title">From</p>
                </div>
                <div className="col-md-3 col-6 mt-4">
                  <Form.Select aria-label="Select currency" onChange={(e: any) => setFromCur(e.target.value)} value={fromCur}>
                    {data && data[0]?.items?.map((item: string) => (
                      <option value={item} key={item}>{item}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-6 col-6 mt-4">
                  <Form.Control type="number" placeholder="0.00" value={currency1} onChange={onCurrency1Change} />
                </div>
              </div>      
              <div className="row mt-4">
                <div className="col-md-3 mt-4">
                  <p className="sub-title">To</p>
                </div>
                <div className="col-md-3 col-6 mt-4">
                  <Form.Select aria-label="Select currency" onChange={(e: any) => setToCur(e.target.value)} value={toCur}>
                    {data && data[0]?.items?.map((item: string) => (
                      <option value={item} key={item}>{item}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-6 col-6 mt-4">
                  <Form.Control type="number" placeholder="0.00" value={currency2} onChange={onCurrency2Change} />
                </div>
              </div>      
            </div>
            <div className="col-lg-9 col-md-12 currency">
              <p className="title"><span>Default </span>{data && data[0]?.base}</p>
              <div className="row">
                {data && data[0]?.items?.map((item: string, index: number) => (
                  <div className="col-lg-4 col-md-4 currency" key={item}>
                    <div className="row border_bottom">
                      <div className="col-6 mb-2">
                        <p className="sub-title">{item}</p>
                      </div>
                      <div className="col-6">
                        <p className="desc"><span>Buy </span>{currencies[item]}</p>
                      </div>
                      <div className="col-6">
                        <p className="desc text-left"><span>{symbols[item]?.description}</span></p>
                      </div>
                      <div className="col-6">
                        <p className="desc"><span>Sell </span>{currencies[item]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="crypto" title="Crypto Currencies">
          <div className="row">
            <div className="col-lg-3 col-md-12 calculator">
              <p className="title">Calculator</p>
              <div className="row">
                <div className="col-md-3 mt-4">
                  <p className="sub-title">From</p>
                </div>
                <div className="col-md-3 col-6 mt-4">
                  <Form.Select aria-label="Select currency" onChange={(e: any) => setFromCrypto(e.target.value)} value={fromCrypto}>
                    {data && data[1]?.items?.map((item: string) => (
                      <option value={item} key={item}>{item}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-6 col-6 mt-4">
                  <Form.Control type="number" placeholder="0.00" value={crypto1} onChange={onCrypto1Change} />
                </div>
              </div>      
              <div className="row mt-4">
                <div className="col-md-3 mt-4">
                  <p className="sub-title">To</p>
                </div>
                <div className="col-md-3 col-6 mt-4">
                  <Form.Select aria-label="Select currency" onChange={(e: any) => setToCrypto(e.target.value)} value={toCrypto}>
                    {data && data[1]?.items?.map((item: string) => (
                      <option value={item} key={item}>{item}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-6 col-6 mt-4">
                  <Form.Control type="number" placeholder="0.00" value={crypto2} onChange={onCrypto2Change} />
                </div>
              </div>      
            </div>
            <div className="col-lg-9 col-md-12 currency">
              <p className="title"><span>Default </span>{data && data[1]?.base}</p>
              <div className="row">
                {data && data[1]?.items?.map((item: string, index: number) => (
                  <div className="col-lg-4 col-md-4 currency" key={item}>
                    <div className="row border_bottom">
                      <div className="col-6 mb-2">
                        <p className="sub-title">{item}</p>
                      </div>
                      <div className="col-6">
                        <p className="desc"><span>Buy </span>{cryptos[item]}</p>
                      </div>
                      <div className="col-6" />
                      <div className="col-6">
                        <p className="desc"><span>Sell </span>{cryptos[item]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Currency

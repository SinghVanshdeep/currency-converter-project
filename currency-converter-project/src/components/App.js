import React, { useState, useEffect } from 'react';

function App() {
  const currencies = ["CAD", "EUR", "INR", "USD", "GBP"]; 
  const [baseCurr, setBaseCurr] = useState('GBP');
  const [convertCurr, setConvertCurr] = useState('CAD');
  const [baseVal, setBaseVal] = useState(1);
  const [currencyData, setCurrencyData] = useState({});
  const filteredCurr = currencies.filter((item) => item !== baseCurr);
  const result = baseVal * currencyData[convertCurr];

  useEffect(() => {
    async function fetchData(){
      try {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=EUR%2CUSD%2CCAD%2CINR&base_currency=${baseCurr}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCurrencyData(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [baseCurr]);
  
  return (
    <div id="main">
      <div id="container">
        <p className="h3">Currency Converter</p>
        <div className="currency-container">
          <select value={baseCurr} onChange={(e) => setBaseCurr(e.target.value)}>
            {currencies.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <input id="base" type="number" defaultValue={1} onChange={(e) => setBaseVal(e.target.value)}/>
        </div>
        <div className="currency-container">
          <select value={convertCurr} onChange={(e) => setConvertCurr(e.target.value)}>
            {filteredCurr.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <input id="result" type="number" value={isNaN(result) ? "" : result} readOnly/>
        </div>
      </div>
    </div>  
  );
}

export default App;

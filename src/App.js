import money from './img/money.png'
import './App.css';
import CurrencyComponent from './components/CurrencyComponent';
import { useEffect,useState } from "react"


function App() {
  const [currencyChoice,setCurrencyChoice] = useState([]);
  const [fromCurrency,setfromCurrency] = useState('USD');
  const [toCurrency,setToCurrency] = useState('THB');

  const [amount,setAmount] = useState(1);
  const [exChangeRate,setexChangeRate] = useState(0);

  const [checkFromCurrency,setcheckFromCurrency] = useState(true);
  let fromAmount,toAmount

  if(checkFromCurrency){
    fromAmount = amount;
    toAmount = (amount*exChangeRate).toFixed(2)
  }else{
    toAmount = amount;
    fromAmount = (amount/exChangeRate).toFixed(2)
  }

  useEffect(()=>{
    const url =`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCurrencyChoice([...Object.keys(data.rates)])
      setexChangeRate(data.rates[toCurrency])
    })
  },[fromCurrency,toCurrency])

  const amountFromCurrency = (e)=>{
    setAmount(e.target.value)
    setcheckFromCurrency(true)
  }

  const amountToCurrency = (e)=>{
    setAmount(e.target.value)
    setcheckFromCurrency(false)
  }

  return (
    <div>
      <img src={money} alt="logo" className="money-img"></img>
      <h1>แอพแปลงสกุลเงิน</h1>
      <div className="container">
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={fromCurrency} 
          changCurrency={(e)=>setfromCurrency(e.target.value)}
          amount = {fromAmount}
          onChangeAmount = {amountFromCurrency}
        >
        </CurrencyComponent>
        <div className="equal"> = </div>
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={toCurrency} 
          changCurrency={(e)=>setToCurrency(e.target.value)}
          amount = {toAmount}
          onChangeAmount = {amountToCurrency}
        >
        </CurrencyComponent>
      </div>
    </div>
  );
}

export default App;

const CurrencyComponent = (props)=>{
    const {currencyChoice,selectCurrency,changCurrency,amount,onChangeAmount} = props
    return(
        <div className="currency">
            <select value={selectCurrency} onChange={changCurrency}>
                {currencyChoice.map((choice)=>
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type="number" value={amount} 
            onChange={onChangeAmount}>

            </input>
        </div>
    )
}

export default CurrencyComponent
import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/index.js";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center item-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2018/07/29/10/16/crypto-3569795_1280.jpg")`,
        }}
      >
        <div className="w-full ">
          <div className=" w-full max-w-md mt-24 mx-auto border border-white rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-4">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
                <div className="relative w-full h-0.5 mb-0.5">
                  <button
                    className="absolute hover:bg-blue-700 left-1/2 -translate-x-1/2 -translate-y-1/2 boder-2 boder-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swap}
                  >
                    Swap
                  </button>
                </div>
                <InputBox
                  label="To"
                  currencyOptions={options}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg"
                type="submit"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

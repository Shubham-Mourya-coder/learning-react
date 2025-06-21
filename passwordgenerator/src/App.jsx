import { useState, useCallback, useEffect, useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberallowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState('Copy');
  const [isCopied, setIsCopied] = useState(false);


  const passwordRef = useRef(null);

  // Logic for password generator
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "!@#$%^&*()-_+=";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed]);
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialCharAllowed]);

  //  Copy to clipboard function logic
  const copyPasswordToClipboard = async() => {
    try {
      await navigator.clipboard.writeText(buttonText);
      setButtonText('Copied!');
      setIsCopied(true);
      // Revert button text after a delay
      setTimeout(() => {
        setButtonText('Copy');
        setIsCopied(false);
      }, 2000); // 2 seconds
    }catch (err) {
      console.error('Failed to copy text: ', err);}
      // Optionally, handle error state for the button
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    
    };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className=" w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-8 bg-zinc-700 text-gray-100">
        <h1 className="text-2xl font-bold mb-2 ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="bg-zinc-500 outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            disabled={isCopied}
            className="outline-none bg-green-500 text-zinc-900 px-3 py-0.5 shrink-0 hover:bg-green-600"
          >
           {buttonText}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              type="range"
              min={8}
              max={20}
              value={length}
              name=""
              id=""
            />
            <label htmlFor="length">Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              onChange={() => {
                setNumberallowed((prev) => !prev);
              }}
              type="checkbox"
              defaultChecked={numberAllowed}
              name=""
              id=""
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev);
              }}
              type="checkbox"
              defaultChecked={specialCharAllowed}
              name=""
              id=""
            />
            <label htmlFor="specialChar">Special Char</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

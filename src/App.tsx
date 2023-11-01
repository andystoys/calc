import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

function formatPrice(number: number, percentage: number): string {
  let formatted = round9(markup(number, percentage))
  return isNaN(formatted) ? "" : formatted.toLocaleString().toString()
}

function round9(number: number): number {
  let cent = number * 100 % 10 * 0.01
  let diff = 0.09 - cent
  let formatted = diff <= 0.04 ? number + diff : number - cent - 0.01
  // console.log("number: " + number + "cent: " + cent + "diff: " + diff + "formatted: " + formatted)
  return formatted >= 0 ? parseFloat(formatted.toFixed(2)) : 0
}

// 100% is max and will be infinite
function markup(price: number, percentage: number): number {
  let value = parseFloat((price / (1 - percentage * 0.01)).toFixed(2))
  return value
}

function formatNumber(number: string): string {
  const filtered = number.replace(/\./g, '')
  if (filtered.length > 2) {
    const prefix = filtered.slice(0, -2)
    const suffix = filtered.slice(-2)
    return `${prefix}.${suffix}`
  } else {
    return filtered
  }
}

// NOTE: Keyboard auto opening seems like a security concern and won't be allowed
function App() {
  const percentages1 = []
  const percentages2 = []
  for (let i = 5; i <= 100; i += 5) {
    if (i <= 50) percentages1.push(i)
    else percentages2.push(i)
  }

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (input: { target: { value: React.SetStateAction<string>; }; }) => {
    let number = input.target.value.toString()
    setInputValue(formatNumber(number))
  }

  return (
    <div className="App container">
      <h1 className="title">Beer🍺 % Calculator</h1>

      <div className="tile is-ancestor">
        <div className="tile is-3 is-vertical is-parent">
          <div className="tile is-child">
            <input
              autoFocus
              className="input is-medium"
              inputMode="numeric" // need for iOS
              onChange={handleInputChange}
              pattern="[0–9]*"
              placeholder="$ Amount"
              type="text"
              value={inputValue}
            />
          </div>

        </div>
        <div className="tile is-parent">
          <div className="tile is-child">
            <ul>
              {percentages1.map((percentage, index) => (
                <li key={index}>{percentage}%: → ${formatPrice(parseFloat(inputValue), percentage)} </li>
              ))}
            </ul>
          </div>
          <div className="tile is-child">
          <ul>
            {percentages2.map((percentage, index) => (
              <li key={index}>{percentage}%: → ${formatPrice(parseFloat(inputValue), percentage)} </li>
            ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

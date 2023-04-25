import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { linearSearch, binarySearch } from "./utils";

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [needle, setNeedle] = useState<number>(3);
  const [result, setResult] = useState<string>("");
  const [haystack, setHaystack] = useState<number[]>([1, 2, 3, 4, 5]);
  const [searchType, setSearchType] = useState<string>("Linear Search");

  const handleSearch = (): void => {
    switch (searchType) {
      case "Linear Search":
        linearSearch(haystack, needle)
          ? setResult(`${needle} found in array`)
          : setResult(`${needle} not found in array`);
        break;
      case "Binary Search":
        binarySearch(haystack, needle)
          ? setResult(`${needle} found in array`)
          : setResult(`${needle} not found in array`);
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <div className="search-container">
        <h1>{searchType}</h1>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <div className="info-panel">
          <div>
            Looking for: <span id="needle">{needle}</span>
          </div>
          <div>
            Iterations: <span id="iter-counter">{counter}</span>
          </div>
          <div>
            Result: <span id="result">{result}</span>
          </div>
        </div>
        <div id="array-container">
          {haystack.map((item) => (
            <div key={item} className="list-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />);

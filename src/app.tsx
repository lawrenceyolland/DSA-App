import React, { useEffect, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { linearSearch, binarySearch } from "./utils";
import { hydrate } from "react-dom";

type Haystack = (number | string)[][];

const ARRAY_SIZE = 10;
const NEEDLE = 3;
const TIME_TO_WAIT = 50;

const generateHaystackArray = (): Haystack => {
  return [...Array(ARRAY_SIZE)].map((_, idx) => [
    idx,
    Math.floor(Math.random() * ARRAY_SIZE),
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  ]);
};

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [needle, _] = useState<number>(NEEDLE);
  const [result, setResult] = useState<string>("");
  const [haystack, setHaystack] = useState<Haystack>(generateHaystackArray());
  const [type, setType] = useState<string>("sort");
  const [title, setTitle] = useState<string>("Bubble Sort");
  const [sorted, setSorted] = useState<Haystack>(haystack);
  const [disableSort, setDisableSort] = useState<boolean>(false);

  const waitToResolve = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, TIME_TO_WAIT);
    });
  };

  async function bubbleSort(haystack: Haystack): Promise<void> {
    setDisableSort(true);

    const promises: Promise<TimerHandler>[] = [];

    let arr = [...haystack];
    for (let i = 0; i < arr.length; i++)
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j][1] > arr[j + 1][1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          setSorted(arr.slice());
          setCounter((prev) => prev + 1);
          await waitToResolve();
        }
      }
    setResult("Sorted");
    setDisableSort(false);
  }

  const handleRegenerateHaystack = (): void => {
    const newHaystack = generateHaystackArray();
    setHaystack(newHaystack);
    setSorted(newHaystack);
    setCounter(0);
  };

  return (
    <section>
      <div className="search-container">
        <h1>{title}</h1>
        <div className="action-container">
          <button
            type="button"
            disabled={disableSort}
            onClick={() => bubbleSort(haystack)}
          >
            Sort
          </button>
          <button
            type="button"
            disabled={disableSort}
            onClick={handleRegenerateHaystack}
          >
            Reset
          </button>
        </div>
        <div className="info-panel">
          {type === "search" && (
            <div>
              Looking for: <span id="needle">{needle}</span>
            </div>
          )}
          <div>
            Iterations: <span id="iter-counter">{counter}</span>
          </div>
          <div>
            Result: <span id="result">{result}</span>
          </div>
        </div>
        <div id="array-container">
          {sorted?.map((i) => (
            <div
              style={{
                height: `${(i[1] as number) * 10}px`,
                backgroundColor: `${i[2]}`,
              }}
              className="list-item"
              key={i[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />);

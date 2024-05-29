import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [bars, setBars] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSorting, setIsSorting] = useState(false);

  const delay = 100;
  const frequency = 200;
  let audioCtx = useRef(null);

  useEffect(() => {
    random();
  }, []);

  const checker = async () => {
    if (bars.length === 0) {
      return;
    }

    let swapped = false;
    for (let i = 0; i < bars.length - 1; i++) {
      if (parseInt(bars[i].style.height) <= parseInt(bars[i + 1].style.height)) {
        bars[i].style.backgroundColor = "green";
        updateBarHolder(bars);
        playNote(frequency + parseInt(bars[i].style.height));
        await sleep(100 / i);
      } else {
        swapped = true;
        break;
      }
    }

    if (!swapped) {
      bars.forEach((bar) => {
        bar.style.backgroundColor = "green";
      });
      updateBarHolder(bars);
      playNote(frequency + parseInt(bars[bars.length - 1].style.height));
    }

    return swapped;
  };

  const initAudioContext = () => {
    if (audioCtx.current == null) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const playNote = (freq) => {
    if (!audioCtx.current) initAudioContext();

    const dur = 0.1;
    const osc = audioCtx.current.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.current.currentTime + dur);
    osc.connect(audioCtx.current.destination);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const updateBarHolder = (arr) => {
    const barHolder = document.getElementById("barHolder");
    barHolder.innerHTML = "";
    arr.forEach((bar) => {
      barHolder.appendChild(bar);
    });
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const random = () => {
    const newBars = [];
    setElapsedTime(0);
    const barHolder = document.getElementById("barHolder");
    barHolder.innerHTML = "";

    for (let i = 1; i < 41; i++) {
      const bar = document.createElement("div");
      bar.id = `bar_${i}`;
      bar.classList.add("1");
      barHolder.appendChild(bar);
      bar.style.width = "10px";
      bar.style.height = getRandomInt(300) + "px";
      bar.style.backgroundColor = "black";
      bar.style.display = "inline-block";
      bar.style.margin = "2px";
      newBars.push(bar);
    }

    setBars(newBars);
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (parseInt(arr[j].style.height) < parseInt(pivot.style.height)) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        arr[i].style.backgroundColor = "red";
        arr[j].style.backgroundColor = "red";
        updateBarHolder(arr);
        playNote(frequency + parseInt(arr[i].style.height));
        playNote(frequency + parseInt(arr[j].style.height));
        await sleep(delay);
        arr[i].style.backgroundColor = "black";
        arr[j].style.backgroundColor = "black";
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arr[i + 1].style.backgroundColor = "red";
    arr[high].style.backgroundColor = "red";
    updateBarHolder(arr);
    playNote(frequency + parseInt(arr[i + 1].style.height));
    playNote(frequency + parseInt(arr[high].style.height));
    await sleep(delay);
    arr[i + 1].style.backgroundColor = "black";
    arr[high].style.backgroundColor = "black";
    return i + 1;
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const handleQS = async () => {

    if (await checker() === false) {
      return;
    }

    setIsSorting(true);
    const start = performance.now();
    await quickSort(bars, 0, bars.length - 1);
    const end = performance.now();
    setElapsedTime((end - start) / 1000);

    await checker();
    setIsSorting(false);
  };

  const insertionSort = async (arr, n) => {
    let i, key, j;
    for (i = 1; i < n; i++) {
      key = arr[i];
      j = i - 1;

      while (j >= 0 && parseInt(arr[j].style.height) > parseInt(key.style.height)) {
        arr[j + 1] = arr[j];
        arr[j + 1].style.backgroundColor = "red";
        updateBarHolder(arr);
        playNote(frequency + parseInt(arr[j + 1].style.height));
        await sleep(delay);
        arr[j + 1].style.backgroundColor = "black";
        j = j - 1;
      }
      arr[j + 1] = key;
      arr[j + 1].style.backgroundColor = "red";
      updateBarHolder(arr);
      playNote(frequency + parseInt(arr[j + 1].style.height));
      await sleep(delay);
      arr[j + 1].style.backgroundColor = "black";
    }
  };

  const handleInsertion = async () => {
    if (await checker() === false) {
      return;
    }

    setIsSorting(true);
    const start = performance.now();
    await insertionSort(bars, bars.length);
    const end = performance.now();
    setElapsedTime((end - start) / 1000);

    await checker();
    setIsSorting(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Sort Visualizer</h1>
        <div id="barHolder" className="barHolder"></div>
        <div className="button-group">
          <button onClick={random} disabled={isSorting}>Generate Random Array</button>
          <button onClick={handleQS} disabled={isSorting}>QuickSort</button>
          <button onClick={handleInsertion} disabled={isSorting}>Insertion Sort</button>
        </div>
        <div className="timer">
          <h1>Time Executed</h1>
          <h2 className="time">{elapsedTime.toFixed(2)} seconds</h2>
        </div>
      </header>
    </div>
  );
}

export default App;

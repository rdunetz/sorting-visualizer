import "./App.css";

function App() {
  let bars = [];

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
    bars = [];

    console.log("random");

    // for (let i = 0; i < 10; i++) {
    //   heights[i] = getRandomInt(i);
    // }

    const barHolder = document.getElementById("barHolder");

    barHolder.innerHTML = "";
    
    // console.log(barHolder.childNodes);
    for (let i = 1; i < 11; i++) {
      const bar = document.createElement("div");
      bar.id = `bar_${i}`;
      bar.classList.add("1");
      barHolder.appendChild(bar);
      bar.style.width = 50 + "px";
      bar.style.height = getRandomInt(100) + "px";
      bar.style.backgroundColor = "black";
      bar.style.display = "inline-block";
      bar.style.margin = 2 + "px";
      bars.push(bar);
    }

    console.log(bars);

    console.log(bars[0]);
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    console.log(pivot);
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      // If current element is smaller than the pivot
      if (parseInt(arr[j].style.height) < parseInt(pivot.style.height)) {
        // Increment index of smaller element
        i++;
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
        arr[i].style.backgroundColor = "red";
        arr[j].style.backgroundColor = "red";
        updateBarHolder(arr);
        await sleep(200);
        arr[i].style.backgroundColor = "black";
        arr[j].style.backgroundColor = "black";
      }
    }
    // Swap pivot to its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arr[i + 1].style.backgroundColor = "red";
    arr[high].style.backgroundColor = "red";
    updateBarHolder(arr);
    await sleep(200);
    arr[i + 1].style.backgroundColor = "black";
    arr[high].style.backgroundColor = "black";
    return i + 1; // Return the partition index
  };

  const quickSort = async (arr, low, high) => {
    if (low >= high) return;
    let pi = await partition(arr, low, high);

    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  };

  const handleQS = () => {
    quickSort(bars, 0, bars.length - 1);

    console.log(bars);
  };

  const handleInsertion = () => {
    insertionSort(bars, bars.length);

    console.log(bars);
  };

  const insertionSort = async (arr, n) => {
    let i, key, j;
    for (i = 1; i < n; i++) {
      key = arr[i];
      j = i - 1;

      /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
      while (j >= 0 && parseInt(arr[j].style.height) > parseInt(key.style.height)) {
        arr[j + 1] = arr[j];
        arr[j + 1].style.backgroundColor = "red";
        updateBarHolder(arr);
        await sleep(200);
        arr[j + 1].style.backgroundColor = "black";
        j = j - 1;
      }
      arr[j + 1] = key;
      arr[j + 1].style.backgroundColor = "red";
      updateBarHolder(arr);
      await sleep(200);
      arr[j + 1].style.backgroundColor = "black";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="barHolder" className="barHolder"></div>
        <button onClick={random}>Generate Random Array</button>
        <button onClick={handleQS}>QuickSort</button>
        <button onClick={handleInsertion}>Insertion Sort</button>
      </header>
    </div>
  );
}

export default App;

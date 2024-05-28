import "./App.css";

function App() {
  const bars = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const random = () => {
    const heights = [];

    console.log("random");

    // for (let i = 0; i < 10; i++) {
    //   heights[i] = getRandomInt(i);
    // }

    const barHolder = document.getElementById("barHolder");

    // console.log(barHolder.childNodes);

    if (barHolder.childNodes.length === 0) {
      for (let i = 1; i < 11; i++) {
        const bar = document.createElement("div");
        bar.id = `bar_${i}`;
        bar.classList.add("1");
        barHolder.appendChild(bar);
        bar.style.width = 50 + "px";
        bar.style.height = getRandomInt(100) + "px";
        bar.style.backgroundColor = "black";
        bars.push(bar);
      }
    }

    console.log(bars);

    console.log(bars[0]);
  };

  const partition = (arr, low, high) => {
    let pivot = arr[high];
    console.log(pivot);
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      // If current element is smaller than the pivot
      if (arr[j].style.height < pivot.style.height) {
        // Increment index of smaller element
        i++;
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    // Swap pivot to its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1; // Return the partition index
  }

  const quickSort = (arr, low, high) => {
    if (low >= high) return;
    let pi = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }

  const handleQS = () => {
    quickSort(bars, 0, bars.length - 1);

    console.log(bars);
  }

  const handleInsertion = () => {
    insertionSort(bars, bars.length);

    console.log(bars);
  }

  const insertionSort = (arr, n) => {  
    let i, key, j;  
    for (i = 1; i < n; i++) 
    {  
        key = arr[i];  
        j = i - 1;  
  
        /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
        while (j >= 0 && arr[j].style.height > key.style.height) 
        {  
            arr[j + 1] = arr[j];  
            j = j - 1;  
        }  
        arr[j + 1] = key;  
    }  
}  

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

import './App.css';

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

    const barHolder = document.getElementById('barHolder');

    // console.log(barHolder.childNodes);

    if (barHolder.childNodes.length === 0)  {

      for(let i = 1; i < 11; i++){
        const bar = document.createElement( 'div' );
        bar.id = `bar_${i}`;
        bar.classList.add('1');
        barHolder.appendChild(bar);
        bar.style.width = 50 + 'px';
        bar.style.height = (Math.random() * 100) + 'px';
        bar.style.backgroundColor = 'black';
        bars.push(bar);

      }
    }

    console.log(bars);

    console.log(bars[0]);

  }

  const quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    let pivot = arr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      }
    }


  }


  return (
    <div className="App">
      <header className="App-header">
        <div id="barHolder" className='barHolder'></div>
        <button onClick={random}>Generate Random Array</button>

      </header>
    </div>
  );
}

export default App;

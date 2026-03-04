# Sorting Visualizer

An interactive web app that animates popular sorting algorithms in real time, built with React. Watch algorithms like Bubble Sort, Merge Sort, and more come to life as they sort randomized arrays bar-by-bar.

---

## Features

- Visual, animated step-by-step playback of sorting algorithms
- Randomize the array to generate a new input at any time
- Clean, color-coded bar chart visualization
- Built with React for a fast, component-driven UI

---

## Algorithms

The following sorting algorithms are (or can be) included:

- Bubble Sort
- Merge Sort
- Quick Sort
- Insertion Sort
- Selection Sort

---

## Project Structure

```
sorting-visualizer/
├── public/       # Static HTML and assets
├── src/          # React source code
│   ├── components/   # UI components (e.g. SortingVisualizer)
│   └── sortingAlgorithms/  # Algorithm implementations
├── package.json
└── .gitignore
```

---

## Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Frontend | React, JavaScript    |
| Styling  | CSS                  |
| Tooling  | Create React App     |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/rdunetz/sorting-visualizer.git
cd sorting-visualizer
npm install
```

### Running Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads automatically as you make changes.

### Building for Production

```bash
npm run build
```

Outputs an optimized production build to the `build/` folder.

---

## Contributing

Feel free to open an issue or pull request to add new algorithms, improve animations, or fix bugs.

---

## License

This project is unlicensed. See the repository for details.

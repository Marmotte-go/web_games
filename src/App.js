import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sudoku from './pages/Sudoku';
import Minesweeper from './pages/Minesweeper';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="sudoku" element={<Sudoku />}/>
          <Route path="minesweeper" element={<Minesweeper />}/>
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;

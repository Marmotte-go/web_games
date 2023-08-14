import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="sidebar">
        <header>
          <h1>Webpage Games</h1>
          <p>Powered by React.js</p>
        </header>
        <ul>
          <li>
            <Link to="/sudoku">Sudoku</Link>
          </li>
          <li>
            <Link to="/minesweeper">Minesweeper</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;

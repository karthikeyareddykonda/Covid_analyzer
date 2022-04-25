import React  , {useState, useEffect} from 'react'
import Country_info from './Country/Country_info';
import World_info from './World/World_info';
import Stats_info from './Stats/Stats_info';
import Country_status from './Country/Country_status';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router ,
  Routes,
  Route,
  Link

} from 'react-router-dom' ;

function App() {
  return (
    <div >
      
      <h1>Home page</h1>

      <Router>

      <ul>

        <li>

          <Link to = "/Country"  > Country </Link>
        </li>

        <li>

          <Link to = "/World" > World</Link>
        </li>

        <li>

        <Link to = "/Stats" > Stats</Link>
        </li>
      </ul>

      <Routes>

        <Route path = "/Country" element = {< Country_info />}></Route>
        <Route path = "/World" element= {<World_info /> } ></Route>
        <Route path = "/Stats" element= {<Stats_info /> } ></Route>
        <Route path = "/Country/status" element = {< Country_status />}></Route>

      </Routes>

      </Router>




    </div>
  );
}

export default App;

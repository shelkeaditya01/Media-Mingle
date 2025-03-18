// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar.js';
import News from './Components/News.js';
import LoadingBar from "react-top-loading-bar";

import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  state={
    progress: 0
  }

  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  
  render(props) {
    return (
      <div>
        <Router>
          <Navbar/>
      <div>
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
        />
      </div>
            <Routes>
              <Route exact path="/" element={<News setProgress={this.setProgress}   key="general" pageSize={5} country={"us"} category={"general"}/>} />
              <Route exact path="/business" element={<News setProgress={this.setProgress}   key="business" pageSize={5} country={"us"} category={"business"}/>}/>
              <Route exact path="/entertainment" element={<News setProgress={this.setProgress}   key="entertainment" pageSize={5} country={"us"} category={"entertainment"}/>}/>
              <Route exact path="/general" element={<News setProgress={this.setProgress}   key="general" pageSize={5} country={"us"} category={"general"}/>}/>
              <Route exact path="/health" element={<News setProgress={this.setProgress}   key="health" pageSize={5} country={"us"} category={"health"}/>}/>
              <Route exact path="/science" element={<News setProgress={this.setProgress}   key="science" pageSize={5} country={"us"} category={"science"}/>}/>
              <Route exact path="/sports" element={<News setProgress={this.setProgress}   key="sports" pageSize={5} country={"us"} category={"sports"}/>}/>
              <Route exact path="/technology" element={<News setProgress={this.setProgress}   key="technology" pageSize={5} country={"us"} category={"technology"}/>}/>
            </Routes>
        </Router>
      </div>
    )
  }
}
import React, { useState } from 'react';
import Camera from './component/Camera';
import Header from './component/Header';
import Navbar from './component/Navbar';
import Information from './component/Information';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Slip from './component/subComponent/Slip';
import Viewdata from './component/Viewdata';

const App = () => {
  const [source, setSource] = useState({
    from:{
      Name:"",
      Pincode:"",
      Mobile:"",
      Address:""
    },
    to:{
      Name:"",
      Pincode:"",
      Mobile:"",
      Address:""
    }
  });
  return <div>

    <Header />
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Camera source={source} setSource={setSource} />} />
      <Route exact path="/View" element={<Viewdata source={source} setSource={setSource} />} />
      <Route exact path="/Slip" element={<Slip/>} />
    </Routes>
    <Navbar />
    <Information />

  </div>;
};

export default App;

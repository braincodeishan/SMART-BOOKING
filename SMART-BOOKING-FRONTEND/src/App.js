import React,{useState} from 'react';
import Camera from './component/Camera';
import './App.css'

const App = () => {
  const [source, setSource] = useState("");
  return <div>
    
    <Camera source={source} setSource={setSource}/>

  </div>;
};

export default App;

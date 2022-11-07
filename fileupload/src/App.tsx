import React from 'react';
import './App.css';
import {Upload} from "antd";
import '~antd/dist/antd.css';
function App() {
  return (
    <div className="App"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
    >
      <Upload>
        <p>Upload</p>
      </Upload>
      </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import axios from "axios";
import {Upload, Button} from "antd";
const initial = {
  filename: "",
  filesize: 0,
}
function App() {
  const [state, setState] = useState(initial);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const handleChange = ({ currentTarget: input }) => {
    setState({ ...state, [input.name]: input.value });
};

  const handleSubmite = (e) =>{
    e.preventDefault();
    if(!fileName || !fileSize){
      window.alert("pls upload and image")
    }
    else{
      axios.post("http://localhost:5000/UploadFile",{
        fileName, fileSize
      }).then(()=>{
        setState({filename: "", filesize: 0})
        setTimeout(()=> loadData(), 500);
      }).catch((err)=>{
        window.alert(err.response.data);
        
      })
    console.log(fileName +", "+ (fileSize)/1000+"kb")
    }
  }
  const [data, setData] = useState([]);
  const loadData = async () =>{
    const response = await axios.get("http://localhost:5000/getFile");
      setData(response.data);
  };
  const DeleteFile = (id) =>{
    if(window.confirm('Are you sure you want to delete the file?')){
      axios.delete(`http://localhost:5000/deleteFile/${id}`);
      window.alert("file deleted successfully");
      setTimeout(()=> loadData(), 500);
    }
  }


  return (
    <div className="App"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // height: "100vh",
    }}
    >
      <div 
      style={{ display:"flex"}}
      >
        <div className='upload' style={{marginTop:"20px", marginBottom:"40px"}}>
          <form onSubmit={handleSubmite}>
          <Upload.Dragger 
      multiple 
      accept='.txt, .doc, .pdf, .zip'
      name='file'
      action={"http://localhost:300/UploadFile"}
      beforeUpload = { (file)=>{
        if(file.size <= 10000000){
         setFileName(file.name)
         setFileSize(file.size)
        }
        else{
          window.alert("file should be less than 10mb")
          window.location.reload();
          return false;
        }
      }}
      >
        <Button className='button'>Upload</Button>
      </Upload.Dragger>
      <input type="text"
            name='filename'
            hidden
            value={fileName}
            onChange= {handleChange}
             />
             <input type="number"
            name='filesize'
            hidden
            value={fileSize}
            onChange= {handleChange}
             />
             <input className='button' type="submit" style={{marginTop:"20px"}}/>
      </form>
      </div>
      <div>
      <Button className='button' onClick={loadData} style={{marginTop:"21px", marginLeft:"20px", marginBottom:"40px"}}>View</Button>
      </div>
      </div>
      <table id='customers'
      style={{marginTop:"10px"}}
      >
        <thead>
          <tr>
            <th>File name</th>
            <th>File Size</th>
            <th>Uploaded Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
       
          {data.map((item: any) =>{
            return (
              <tr key={item.id}>                
                <td>{item.fileName}</td>
                 {/* <td>{item.files}</td> */}
                <td>{((item.fileSize)/1000)}kb</td>
                <td>{item.updatedAt}</td>
                <td ><Button className='button' style={{backgroundColor:"pink", color:"crimson"}} onClick={()=>DeleteFile(item.id)}><i className="fa fa-trash"></i>Delete</Button> </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    
    </div
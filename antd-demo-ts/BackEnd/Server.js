const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

const sequelize = new Sequelize("fileUpload", "root", "",{
    dialect: "mysql",
});


const File = sequelize.define("File",{
 fileName: Sequelize.STRING,
 fileSize: Sequelize.DOUBLE,
}, 
{tableName: "File"}
);
// File.sync({force: true});

sequelize.authenticate().then(()=>{
    console.log('Connection made successfully!')
}).catch((err)=> console.log(err, 'this is error view'))



app.get('/getFile', async(req, res)=>{
    const getAllData = await File.findAll()
    res.json(getAllData);
})

app.delete('/deleteFile/:id', (req, res) =>{
    File.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect("/getFile")
})
app.post("/UploadFile", async(req, res) => {
    const FileName = req.body.fileName;
    const file = req.body.file;
    const FileSize = req.body.fileSize;
    const saveFile = File.build({
        fileName: FileName,
        files: file, 
        fileSize: FileSize,
    });
    await saveFile.save();
    res.send("file uploaded");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require("cors")
// app.use(cors());
// app.use(express.json());
// const {createPool} = require('mysql');


// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "fileUpload",
//     connectionLimit: 10
// })

// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;

// app.get('/fileUpload', (req, res)=>{
//     const SQLInsert = "INSERT INTO `file` (`FID`, `FileName`) VALUES ('10', 'Abibual')";
//     pool.query(SQLInsert, (err, result, fields)=>{
//         if(err){
//             return console.log(err);
//         }
//         return console.log(result);
//     });
//     res.send("Inserted!!!");
// });
// const recordRoutes = express.Router();
// recordRoutes.route("/record").get(function (req, res) {
// // app.get('/display', (req, res)=>{
//     var val;
//     const SQLSelect = "select * from File";
//     pool.query(SQLSelect, (err, result, fields)=>{
//         if(err){
//             return console.log(err);
//         }
//         val = result;
        
//         return console.log(result);
//     });
//     res.send(result);
// });



// app.delete('/display', (req, res)=>{
//     var val;
//     const SQLSelect = "select * from File";
//     pool.query(SQLSelect, (err, result, fields)=>{
//         if(err){
//             return console.log(err);
//         }
//         val = result;
//         return console.log(result);
//     });
//     res.send("display!!!");
// });



// app.listen( port, () =>{
//     console.log("Server running on port 5000");
//     console.log("Server is now ready!!!");
// })

// module.exports = recordRoutes;








// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// const db = require("./models");
// db.sequelize.sync();


// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to FileUpload Web App." });
// });

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
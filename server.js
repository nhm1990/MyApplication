var express = require("express");
var fs = require('fs');
var path = require('path');
var bodyParser = require("body-parser"); //npm install body-parser
var mongodb = require("mongodb");
var database;
const dotenv = require('dotenv');  //npm install dotenv
dotenv.config();
connectionPropertiesProd = getConnectionPropertiesProd();
connectionPropertiesLocal = getConnectionPropertiesLocal();

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
const LOCAL_DATABASE = "mongodb://localhost:27017/app";
const LOCAL_PORT = 8080;
const uri = 'mongodb+srv://nhormesch:Mo2$mart4Uo@cluster0.qeihn.mongodb.net/dbMyApplication?retryWrites=true&w=majority';

//app.use('/pdf', express.static('');
//app.use(express.static('files'));
app.use('/files', express.static(path.join(__dirname, 'files')))

// Init the server
mongodb.MongoClient.connect(MONGODB_URI || uri || LOCAL_DATABASE,{useUnifiedTopology: true, useNewUrlParser: true}, 
                            function (error, client){
                                // Check if there are any problems with the connection to MongoDB database.
                                if (error) {
                                    console.log(error);
                                    process.exit(1);
                                }

                                // Save database object from the callback for reuse.
                                database = client.db();
                                console.log("Database connection done.");

                                // Initialize the app.
                                var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
                                    var port = server.address().port;
                                    console.log("App now running on port", port);
                                });
                            });

app.get("/api/files/pdf", (req, res) => {
    var filePath = req.query.params;
    //var filePath = '/files/pdf/testcompany/motivationsschreiben.pdf';
    console.log("TEMPTESTNH232424 NODEJS /api/files/pdf filePath: " + __dirname + filePath);
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

app.get("/api/documents", function (req, res) {
    var params = req.query.params;
    var queryObject = { verificationCode: params };
    database.collection("colMyApplication").find(queryObject).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get documents.");
        } else {
            console.log("result data: " + data);
            res.status(200).json(data);
        }
    });
});

function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}

function getConnectionPropertiesProd(){
  const connectionPropertiesProd = {
    uri: process.env.MONGODB_URI_PROD,
    port: process.env.MONGODB_PORT_PROD,
  }
  
  return connectionPropertiesProd;
}

function getConnectionPropertiesLocal(){
  const connectionPropertiesLocal = {
  uri: process.env.MONGODB_URI_LOCAL,
  port: process.env.MONGODB_PORT_LOCAL,
  }
  
  return connectionPropertiesLocal;
}




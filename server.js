var express = require("express");
var fs = require('fs');
var path = require('path');
<<<<<<< HEAD
const dotenv = require('dotenv').config();
=======
var bodyParser = require("body-parser"); //npm install body-parser
const dotenv = require('dotenv').config();  //npm install dotenv
>>>>>>> 0cd0ce6e52b2a2fe10cb2f85a76f9701394b467d
var mongodb = require("mongodb");
var database;

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
<<<<<<< HEAD
// to consume and produce data through the exposed APIs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
=======
// to consume and produce data through the 
// exposed APIs
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//app.use('/pdf', express.static('');
//app.use(express.static('files'));
app.use('/files', express.static(path.join(__dirname, 'files')))
>>>>>>> 0cd0ce6e52b2a2fe10cb2f85a76f9701394b467d

// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI_PROD,{useUnifiedTopology: true, useNewUrlParser: true}, 
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
                                var server = app.listen(8080 || process.env.MONGODB_PORT_PROD, function () {
                                    var port = server.address().port;
                                    console.log("App now running on port", port);
                                });
                            });

app.get("/api/files/pdf", (req, res) => {
    var filePath = req.query.params;
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
<<<<<<< HEAD



=======
>>>>>>> 0cd0ce6e52b2a2fe10cb2f85a76f9701394b467d

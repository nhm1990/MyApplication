var express = require("express");
var fs = require('fs');
var path = require('path');
const dotenv = require('dotenv').config();
var mongodb = require("mongodb");
var database;

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the exposed APIs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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




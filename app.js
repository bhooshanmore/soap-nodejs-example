/*jslint node: true */
"use strict";


var soap = require('soap');
var express = require('express');
var fs = require('fs');

function adobeRequest(args) {
    console.log('adobeRequest'+args );
    var customerId = args.customerID;
    var auth = args.auth;
    /*
    call Adobe REST API and mapp responsd to XML
    */ 
    console.log('auth '+auth);
    console.log('customerId '+customerId);
    return {
        result: customerId+auth
        }
}

// the service
var serviceObject = {
  MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: adobeRequest
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: adobeRequest
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('decision.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br />');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/decision/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});
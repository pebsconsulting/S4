/*
Copyright 2016 Ontotext AD

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var https = require("https");
var querystring = require("querystring");

var str = "SELECT * WHERE { ?s ?p ?o } LIMIT 10";

var dataString = querystring.stringify({
    query: str
});

var headers = {
    "Accept": "application/sparql-results+xml",
    "Content-Type": "application/x-www-form-urlencoded"
};

var options = {
    hostname: "lod.s4.ontotext.com",
    path: "/v1/FactForge/sparql",
    method: "POST",
    auth: "<s4 api key>:<s4 key secret>",
    headers: headers
};

// Setup the request.  The options parameter is
// the object we defined above.
var req = https.request(options, function (res) {
    res.setEncoding("utf-8");

    var responseString = "";

    res.on("data", function (data) {
        responseString += data;
    });

    res.on("end", function () {
        console.log(responseString);
        console.log("\nStatus Code: ", res.statusCode);
        console.log("\nHeaders:");
        console.log(res.headers);
    });
});

req.on("error", function (e) {
    console.log(e);
});

req.end(dataString);

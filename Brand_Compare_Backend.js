//I am using express(web framework for node.js) to host static files.
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

console.log(process.env);

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
//app.use(express.json({ limit: "1mb" }));

app.get("/brands", async (request, response) => {
  const fetchResponse = await fetch("https://app.socialinsider.io/api", {
    // fetch getbrands data from API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "partner_api.get_brands",
      params: { projectname: "Automotive" },
    }),
  });
  const jsonrpc = await fetchResponse.json();
  console.log(jsonrpc);
  response.json(jsonrpc);
});

app.get("/data/:start_date/:end_date/:brand_name",async (request, response) => {
    const StartDate = Number(request.params.start_date);
    const EndDate = Number(request.params.end_date);
    const BrandName = request.params.brand_name;

    const fetchResponse = await fetch("https://app.socialinsider.io/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.API_KEY,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "partner_api.get_brand_data",
        params: {
          projectname: "Automotive",
          brandname: BrandName,
          date: { start: StartDate, end: EndDate },
        },
      }),
    });
    const jsonrpc = await fetchResponse.json();
    //console.log(jsonrpc);
    response.json(jsonrpc);
  }
);














/*app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    response.json(data);
  });*/

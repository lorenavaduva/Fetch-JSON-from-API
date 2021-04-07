document.getElementById("submit").addEventListener("click", async (event) => {
  const dateControl = document.getElementById("start");

  //const start_date = dateControl.value.split('-');// year month day
  //console.log(dateControl.valueAsNumber);
  //console.log(dateControl.value);

  const dateControl2 = document.getElementById("end");

  //console.log(dateControl2.valueAsNumber);

  console.log("Importing brands...");

  const response = await fetch("/brands");
  const brand_json = await response.json();
  console.log(brand_json);
  console.log("Successfully imported brands.");

  console.log("Importing brand data...");

  let start_date = dateControl.valueAsNumber;
  console.log(start_date);

  let end_date = dateControl2.valueAsNumber;
  console.log(end_date);
  //console.log(${start_date});

  let brand_name;
  var table = document.getElementById("myTable");
  brand_json.result.forEach(async (element) => {
    brand_name = element.brandname;
    console.log( brand_name);

    const api_url = `/data/${start_date}/${end_date}/${brand_name}`;
    const Data_response = await fetch(api_url);
    const brand_data_json = await Data_response.json();
    console.log(brand_data_json.result);
    console.log( element.brandname); 
    var row = `<tr>
							<td>${brand_data_json.result.brandname}</td>
							<td>${brand_data_json.result.profiles.length}</td>
							<td>${brand_data_json.result.kpis.total_fans.current_period.value}</td>
              <td>${brand_data_json.result.kpis.total_engagement.current_period.value}</td>
					  </tr>`;
    table.innerHTML += row;
     
    //console.log("total engagement");
    //console.log(brand_data_json.result.kpis.total_engagement.current_period.value
  });

  //console.log("total followers");
  //console.log(brand_data_json.result.kpis.total_fans.current_period.value);

  //console.log("total profiles");
  //console.log(brand_data_json.result.profiles.length);
  //console.log("Successfully imported brand data.");
  //plang, hai lori poti

  
});

/*async function testing() {
  console.log("Importing brands...");

  const response = await fetch("/brands");
  const json = await response.json();

  console.log("Successfully imported brands.");

  json.result.forEach(async (element) => {
    const response2 = await fetch("/data");
    const json2 = await response2.json();
    console.log(json2);

    console.log(json.result);
  }); */
//console.log(json.result);

//let numberofbrands = response.result.lenght;

//const response = await fetch("/data");
//const json = await response.json();
//console.log(json);

//testing();

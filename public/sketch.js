let flag = 0;

document.getElementById("submit").addEventListener("click", async (event) => {
  var table = document.getElementById("myTable");

  //const start_date = dateControl.value.split('-');// year month day
  //console.log(dateControl.valueAsNumber);
  //console.log(dateControl.value);

  const dateControl = document.getElementById("start");
  const dateControl2 = document.getElementById("end");
  let start_date = dateControl.valueAsNumber;
  let end_date = dateControl2.valueAsNumber;

  if (start_date > end_date) {
    console.log("error");
    return false;
  }

  //console.log(dateControl2.valueAsNumber);

  console.log("Importing brands...");

  const response = await fetch("/brands");
  const brand_json = await response.json();
  //console.log(brand_json);
  console.log("Successfully imported brands.");

  console.log("Importing brand data...");

  let number_of_brands = brand_json.result.length;
  console.log(number_of_brands);
  //console.log(start_date);

  //console.log(end_date);
  //console.log(${start_date});

  let brand_name;

  for (i = 0; i < number_of_brands; i++) {
    brand_name = brand_json.result[i].brandname;
    console.log(brand_name);

    const api_url = `/data/${start_date}/${end_date}/${brand_name}`;
    const Data_response = await fetch(api_url);
    const brand_data_json = await Data_response.json();
    console.log(brand_data_json.result);

    if (flag == 1) {
      var x = document.getElementById("myTable").rows[i].cells;

      x[1].innerHTML = `${brand_data_json.result.profiles.length}`;
      x[2].innerHTML = `${brand_data_json.result.kpis.total_fans.current_period.value}`;
      x[3].innerHTML = `${brand_data_json.result.kpis.total_engagement.current_period.value}`;
    } else {
      var row = `<tr>
							<td>${brand_data_json.result.brandname}</td>
							<td>${brand_data_json.result.profiles.length}</td>
							<td>${brand_data_json.result.kpis.total_fans.current_period.value}</td>
              <td>${brand_data_json.result.kpis.total_engagement.current_period.value}</td>
					  </tr>`;
      table.innerHTML += row;
    }

    //console.log( element.brandname);
    /*var row = `<tr>
							<td>${brand_data_json.result.brandname}</td>
							<td>${brand_data_json.result.profiles.length}</td>
							<td>${brand_data_json.result.kpis.total_fans.current_period.value}</td>
              <td>${brand_data_json.result.kpis.total_engagement.current_period.value}</td>
					  </tr>`;
    table.innerHTML += row; */

    //console.log("total engagement");
    //console.log(brand_data_json.result.kpis.total_engagement.current_period.value
  }

  //console.log("total followers");
  //console.log(brand_data_json.result.kpis.total_fans.current_period.value);

  //console.log("total profiles");
  //console.log(brand_data_json.result.profiles.length);
  //console.log("Successfully imported brand data.");
  flag = 1;
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

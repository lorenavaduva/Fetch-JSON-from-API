const table = document.getElementById("myTable");
//storing brand names in a global variable
//after importing brands from API
const brands_array = [];

async function createTable() {
  console.log("Importing brands...");
  const response = await fetch("/brands");
  const brand_json = await response.json();
  let number_of_brands = brand_json.result.length;
  //console.log(brand_json);

  for (i = 0; i < number_of_brands; i++) {
    brands_array.push(brand_json.result[i].brandname);
    var row = `<tr>
    <td>${brand_json.result[i].brandname}</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>`;
    table.innerHTML += row;
  }
}

//Creating initial table and fetching brands JSON from API
createTable();

document.getElementById("submit").addEventListener("click", async (event) => {
  //retrieving data input
  const Start_input_data = document.getElementById("start");
  const End_input_data = document.getElementById("end");
  let start_date = Start_input_data.valueAsNumber;
  let end_date = End_input_data.valueAsNumber;

  //check data validation
  if (start_date > end_date) {
    console.log("error");
    return false;
  }

  let brand_name;
  console.log("Importing brand data...");
  for (i = 0; i < brands_array.length; i++) {
    brand_name = brands_array[i];

    const api_url = `/data/${start_date}/${end_date}/${brand_name}`;
    const Data_response = await fetch(api_url);
    const brand_data_json = await Data_response.json();
    console.log(brand_data_json.result);

    var x = document.getElementById("myTable").rows[i].cells;

    x[1].innerHTML = `${brand_data_json.result.profiles.length}`;
    x[2].innerHTML = `${brand_data_json.result.kpis.total_fans.current_period.value}`;
    x[3].innerHTML = `${brand_data_json.result.kpis.total_engagement.current_period.value}`;
  }
});

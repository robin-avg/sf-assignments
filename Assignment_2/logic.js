let tablefromjson = () => {
  document.querySelector("input").value = "Refresh data";
  const data = [
    {
      Roll: "1",
      FirstName: "Robin",
      MiddleName: "Son",
      LastName: "Crusoe",
      Email: "robin.singh@xyz.com",
      Phone: "12345",
      Address: "Kalkaji",
    },
    {
      Roll: "2",
      FirstName: "Vicky",
      MiddleName: "Kumar",
      LastName: "Gupta",
      Email: "vicky.gup@xyz.com",
      Phone: "12345",
      Address: "Govindpuri",
    },
  ];

  let col = [];
  for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  col.push("Modify");

  //Create Table
  const table = document.createElement("table");
  //Create TableRow
  let tr = table.insertRow(-1);
  //Create TableHeader with values inside col array
  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  //Add json to table
  for (let i = 0; i < data.length; i++) {
    //Setting id of first row
    tr = table.insertRow(-1);
    tr.id = "row" + data[i]["Roll"];

    for (let j = 0; j < col.length - 1; j++) {
      let cell = tr.insertCell(-1);

      //Setting ID of each cell
      cell.id = col[j] + "_row" + data[i]["Roll"];

      cell.innerHTML = data[i][col[j]];
    }
    // Setting up the last cell with its attributes
    let td = tr.insertCell(-1);
    td.innerHTML =
      "<input type='button' id='edit_button" +
      data[i]["Roll"] +
      "' value='edit' onclick='edit_row(" +
      data[i]["Roll"] +
      ")'> <input type='button' id='save_button" +
      data[i]["Roll"] +
      "' value='save' onclick='save_row(" +
      data[i]["Roll"] +
      ")'> <input type='button' id='cancel_button" +
      data[i]["Roll"] +
      "' value='cancel' onclick='cancel_row(" +
      data[i]["Roll"] +
      ")'> <input type='button' value='Delete' class='delete' onclick='delete_row(" +
      data[i]["Roll"] +
      ")'>";
  }

  let divData = document.getElementById("showData");
  divData.innerHTML = "";
  divData.appendChild(table);
};

//Function to delete rows
let delete_row = (no) => {
  document.getElementById("row" + no + "").outerHTML = "";
};

//Function to edit rows
let edit_row = (no) => {
  document.getElementById("edit_button" + no).style.display = "none";
  document.getElementById("save_button" + no).style.display = "block";

  let rno = document.getElementById("Roll_row" + no);
  let fname = document.getElementById("FirstName_row" + no);
  let midname = document.getElementById("MiddleName_row" + no);
  let lname = document.getElementById("LastName_row" + no);
  let mail = document.getElementById("Email_row" + no);
  let mob = document.getElementById("Phone_row" + no);
  let address = document.getElementById("Address_row" + no);

  let rno_data = rno.innerHTML;
  let fname_data = fname.innerHTML;
  let midname_data = midname.innerHTML;
  let lname_data = lname.innerHTML;
  let mail_data = mail.innerHTML;
  let mob_data = mob.innerHTML;
  let address_data = address.innerHTML;

  rno.innerHTML =
    "<input type='text' id='Roll_text" +
    no +
    "' value='" +
    rno_data +
    "' name='" +
    rno_data +
    "'>";
  fname.innerHTML =
    "<input type='text' id='FirstName_text" +
    no +
    "' value='" +
    fname_data +
    "' name='" +
    fname_data +
    "'>";
  midname.innerHTML =
    "<input type='text' id='MiddleName_text" +
    no +
    "' value='" +
    midname_data +
    "' name='" +
    midname_data +
    "'>";
  lname.innerHTML =
    "<input type='text' id='LastName_text" +
    no +
    "' value='" +
    lname_data +
    "' name='" +
    lname_data +
    "'>";
  mail.innerHTML =
    "<input type='text' id='Email_text" +
    no +
    "' value='" +
    mail_data +
    "' name='" +
    mail_data +
    "'>";
  mob.innerHTML =
    "<input type='text' id='Phone_text" +
    no +
    "' value='" +
    mob_data +
    "' name='" +
    mob_data +
    "'>";
  address.innerHTML =
    "<input type='text' id='Address_text" +
    no +
    "' value='" +
    address_data +
    "' name='" +
    address_data +
    "'>";
};

//Function to save rows after modifying
let save_row = (no) => {
  let rno_val = document.getElementById("Roll_text" + no).value;
  let fname_val = document.getElementById("FirstName_text" + no).value;
  let midname_val = document.getElementById("MiddleName_text" + no).value;
  let lname_val = document.getElementById("LastName_text" + no).value;
  let mail_val = document.getElementById("Email_text" + no).value;
  let mob_val = document.getElementById("Phone_text" + no).value;
  let address_val = document.getElementById("Address_text" + no).value;

  document.getElementById("Roll_row" + no).innerHTML = rno_val;
  document.getElementById("FirstName_row" + no).innerHTML = fname_val;
  document.getElementById("MiddleName_row" + no).innerHTML = midname_val;
  document.getElementById("LastName_row" + no).innerHTML = lname_val;
  document.getElementById("Email_row" + no).innerHTML = mail_val;
  document.getElementById("Phone_row" + no).innerHTML = mob_val;
  document.getElementById("Address_row" + no).innerHTML = address_val;

  document.getElementById("edit_button" + no).style.display = "inline";
  document.getElementById("save_button" + no).style.display = "inline";
};

//Function to cancel rows
let cancel_row = (no) => {
  let rno_val = document.getElementById("Roll_text" + no).name;
  let fname_val = document.getElementById("FirstName_text" + no).name;
  let midname_val = document.getElementById("MiddleName_text" + no).name;
  let lname_val = document.getElementById("LastName_text" + no).name;
  let mail_val = document.getElementById("Email_text" + no).name;
  let mob_val = document.getElementById("Phone_text" + no).name;
  let address_val = document.getElementById("Address_text" + no).name;

  document.getElementById("Roll_row" + no).innerHTML = rno_val;
  document.getElementById("FirstName_row" + no).innerHTML = fname_val;
  document.getElementById("MiddleName_row" + no).innerHTML = midname_val;
  document.getElementById("LastName_row" + no).innerHTML = lname_val;
  document.getElementById("Email_row" + no).innerHTML = mail_val;
  document.getElementById("Phone_row" + no).innerHTML = mob_val;
  document.getElementById("Address_row" + no).innerHTML = address_val;

  document.getElementById("cancel_button" + no).style.display = "inline";
  document.getElementById("edit_button" + no).style.display = "inline";
  document.getElementById("save_button" + no).style.display = "inline";
};

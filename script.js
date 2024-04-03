document.getElementById("employeeDob").max = new Date()
  .toISOString()
  .split("T")[0];

function validatedForm() {
  const name = document.getElementById("employeeName").value;
  const email = document.getElementById("employeeEmail").value;
  const phone = document.getElementById("employeePhone").value;

  // Validating name
  if (name.length < 4 || name.length > 20 || !/^[a-zA-Z0-9]+$/.test(name)) {
    document.getElementById("validateEmployeeName").innerHTML =
      "Name should be between 4 to 20 characters long and contain only alphanumeric characters.";
    return false;
  }

  // Validating email
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    document.getElementById("validateEmployeeEmail").innerHTML =
      "Please enter a valid email You haven't entered the @ sign or . sign";
    return false;
  }

  // // Validating phone number
  if (phone.length > 0 && (phone.length !== 10 || isNaN(phone))) {
    document.getElementById("validateEmployeePhone").innerHTML =
      "Please enter a valid phone number It must be 10 Digits";
    return false;
  }
  return true;
}

function showEmployee() {
  let employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }

  let html = "";
  employeeList.forEach(function (element, index) {
    html += `<tr>
              <td>${element.employeeName}</td>
              <td>${element.employeeGender}</td>
              <td>${element.employeeDob}</td>
              <td>${element.employeeEmail}</td>
              <td>${element.employeePhone}</td>
              <td>${element.employeeHobbies}</td>
              <td><button onclick="editEmployee('${index}')" class="btn-btn-warnnig">edit</button> 
              <button onclick="deleteEmployee('${index}')" class="btn-btn-danger">delete</button></td>
              </tr>`;
  });
  document.querySelector("#employeeTable tbody").innerHTML = html;
}

function showadvanceEmployee() {
  let employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }

  // Get references to the table rows in the advanced table
  const nameRow = document.getElementById("advancedemployeeName");
  const genderRow = document.getElementById("advancedemployeeGender");
  const dobRow = document.getElementById("advancedemployeeDob");
  const emailRow = document.getElementById("advancedemployeeEmail");
  const phoneRow = document.getElementById("advancedemployeePhone");
  const hobbiesRow = document.getElementById("advancedemployeeHobbies");
  const actionRow = document.getElementById("Actionfield");

  // Clear previous data
  nameRow.innerHTML = "<th>Name</th>";
  genderRow.innerHTML = "<th>Gender</th>";
  dobRow.innerHTML = "<th>DOB</th>";
  emailRow.innerHTML = "<th>Email</th>";
  phoneRow.innerHTML = "<th>Phone</th>";
  hobbiesRow.innerHTML = "<th>Hobbies</th>";
  actionRow.innerHTML = "<th>Actions</th>";

  // Iterate over each employee in the list
  employeeList.forEach(function (employee, index) {
    // Add a new row for each employee
    nameRow.innerHTML += "<td>" + employee.employeeName + "</td>";
    genderRow.innerHTML += "<td>" + employee.employeeGender + "</td>";
    dobRow.innerHTML += "<td>" + employee.employeeDob + "</td>";
    emailRow.innerHTML += "<td>" + employee.employeeEmail + "</td>";
    phoneRow.innerHTML += "<td>" + employee.employeePhone + "</td>";
    hobbiesRow.innerHTML +=
      "<td>" + employee.employeeHobbies.join(", ") + "</td>";
    actionRow.innerHTML += `<td><button onclick="editEmployee('${index}')" class="btn btn-warning">Edit</button> <button onclick="deleteEmployee('${index}')" class="btn btn-danger">Delete</button></td>`;
  });
}
// load all data when documet or page is loaded
window.onload = function() {
  showEmployee();
  showadvanceEmployee();
};

function addEmployee() {
  if (validatedForm() == true) {
    //location.reload();
    const employeeName = document.getElementById(
      "employeeName"
    ).value;
    const employeeGender = document.querySelector(
      'input[name="employeeGender"]:checked'
    ).value;
    const employeeDob = document.getElementById("employeeDob").value;
    const employeeEmail = document.getElementById("employeeEmail").value;
    const employeePhone = document.getElementById("employeePhone").value;
    const hobbies = document.querySelectorAll(".hobby:checked");
    const employeeHobbies = [];
    hobbies.forEach(function (hobby) {
      employeeHobbies.push(hobby.value);
    });

    const newEmployee = {
      employeeName: employeeName,
      employeeGender: employeeGender,
      employeeDob: employeeDob,
      employeeEmail: employeeEmail,
      employeePhone: employeePhone,
      employeeHobbies: employeeHobbies,
    };

    let employeeList;
    if (localStorage.getItem("employeeList") == null) {
      employeeList = [];
      console.log(employeeList);
    } else {
      employeeList = JSON.parse(localStorage.getItem("employeeList"));
    }
    console.log(employeeList)
    employeeList.push(newEmployee);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    showEmployee();
    showadvanceEmployee();
    //resetForm();
  }
}

// function to delete employee
function deleteEmployee(index) {
  alert("Are you sure you want to delete");
  let employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }
  console.log(employeeList);
  employeeList.splice(index, 1);
  console.log(employeeList);
  localStorage.setItem("employeeList", JSON.stringify(employeeList));
  showEmployee();
  showadvanceEmployee();
}

function editEmployee(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }

  document.getElementById("employeeName").value =
    employeeList[index].employeeName;
  const genderRadio = document.querySelectorAll('input[name="employeeGender"]');
  genderRadio.forEach(function (radio) {
    if (radio.value === employeeList[index].employeeGender) {
      radio.checked = true;
    }
  });
  document.getElementById("employeeDob").value =
    employeeList[index].employeeDob;
  document.getElementById("employeeEmail").value =
    employeeList[index].employeeEmail;
  document.getElementById("employeePhone").value =
    employeeList[index].employeePhone;
  const hobbiesCheckboxes = document.querySelectorAll(".hobby");
  hobbiesCheckboxes.forEach(function (checkbox) {
    if (employeeList[index].employeeHobbies.includes(checkbox.value)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });

  // Adding validation on update button click
  document.getElementById("update").onclick = function () {
    if (validatedForm()) {
      // Check if the form is validated
      employeeList[index].employeeName =
        document.getElementById("employeeName").value;
      employeeList[index].employeeGender = document.querySelector(
        'input[name="employeeGender"]:checked'
      ).value;
      employeeList[index].employeeDob =
        document.getElementById("employeeDob").value;
      employeeList[index].employeeEmail =
        document.getElementById("employeeEmail").value;
      employeeList[index].employeePhone =
        document.getElementById("employeePhone").value;
      employeeList[index].employeeHobbies = [];
      document.querySelectorAll(".hobby:checked").forEach(function (hobby) {
        employeeList[index].employeeHobbies.push(hobby.value);
      });
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      showEmployee();
      showadvanceEmployee();
      resetForm();
      // Display submit button and hide update button
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
function resetForm(event) {
  event.preventDefault();
  document.getElementById("employeeName").value = "";
  const genderRadio = document.querySelectorAll('input[name="employeeGender"]');
  genderRadio.forEach(function (radio) {
    radio.checked = false;
  });
  document.getElementById("employeeDob").value = "";
  document.getElementById("employeeEmail").value = "";
  document.getElementById("employeePhone").value = "";
  const hobbiesCheckboxes = document.querySelectorAll(".hobby:checked");
  hobbiesCheckboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
}

//Employee registration from validation
//Validate employee name
$(document).ready(function () {
  //name validation
  function validateName() {
    let name = $("#ename").val().trim();

    let pattern = /^[A-Za-z\s]+$/;

    if (name == "") {
      alert("Name cannot be empty");
      return false;
    }

    if (name.length < 3) {
      alert("Name must contain at least 3 characters");
      return false;
    }

    if (!pattern.test(name)) {
      alert("Name should contain only letters");
      return false;
    }

    return true;
  }

  //mobile number validation
  function validateNumber() {
    let number = $("#mobile-number").val();
    let pattern = /^[0-9]{10}$/;

    if (!pattern.test(number)) {
      alert("Mobile number must contain exactly 10 digits");
      return false;
    }

    return true;
  }

  //Salary Validation
  function validateSalary() {
    let salary = $("#salary").val();

    if (salary <= 0) {
      alert("Invalid Salary");
      return false;
    }
    return true;
  }

  //Validate profile Image type
  function validateProfilePicture() {
    let file = $("#profile-image")[0].files[0];

    if (!file) {
      alert("Please upload a profile picture");
      return false;
    }

    let allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG and PNG are allowed");
      return false;
    }

    let maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size should be less than 2MB");
      return false;
    }

    return true;
  }


  //validate designation
  function validateDesignation(){
    let designation = $("#designation").val().trim();

    let pattern = /^[A-Za-z\s]+$/;

    if (designation == "") {
      alert("designation cannot be empty");
      return false;
    }

    if (designation.length < 3) {
      alert("designation must contain at least 3 characters");
      return false;
    }

    if (!pattern.test(designation)) {
      alert("designation should contain only letters");
      return false;
    }

    return true;
  
  }

  $("#registration-form").submit(function (event) {
    if (
      !validateName() ||
      !validateNumber() ||
      !validateSalary() ||
      !validateProfilePicture()||
      !validateDesignation()
    ) {
      event.preventDefault();
    }
  });
});

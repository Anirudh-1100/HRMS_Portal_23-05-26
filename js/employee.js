let emplist = JSON.parse(localStorage.getItem("employees") || [])
let deplist = JSON.parse(localStorage.getItem("departments") || [])



let maxId = Math.max(
    ...emplist.map(emp =>
        parseInt(emp.employeeId.replace("EMP",""))
    )
);


$("#registration-form").submit((e)=> {
    e.preventDefault()

    console.log($("#profile-image").attr("src"))
    // let newEmp = {
    //     employeeId : "EMP"+ (maxId+1),
    //     employeeName : $("#ename").val(),

    //     emailId : $("#mailid").val(),
    //     mobileNumber : $("#mobile-number").val(),
    //     gender: $("#gender").val(),
    //     department: $("departments").val(),
    //     designation: $("#designation").val(),
    //     salary: $("#salary").val(),
    //     dateOfJoining : $("#joining-date").val(),
    //     address : $("#address").val(),
    //     profilePhoto : $("#profile-image").attr("path")

    // }
})

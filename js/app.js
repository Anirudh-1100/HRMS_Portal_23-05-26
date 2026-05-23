fetch("./js/data.json")
.then((response)=>response.json())
.then((data)=>{
  // localStorage.clear()
  localStorage.setItem("employees",JSON.stringify(data.employees))
  localStorage.setItem("departments",JSON.stringify(data.departments))
  localStorage.setItem("leaveApplications",JSON.stringify(data.leaveApplications))
})

//employees = JSON.parse(localStorage.getItem("employees"))
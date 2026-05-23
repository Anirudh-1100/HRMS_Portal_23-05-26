
if(!localStorage.getItem("employees"))
{
  fetch("./js/data.json")
.then((response)=>response.json())
.then((data)=>{
  localStorage.clear()
  localStorage.setItem("employees",JSON.stringify(data.employees))
  localStorage.setItem("departments",JSON.stringify(data.departments))
  localStorage.setItem("leaveApplications",JSON.stringify(data.leaveApplications))
})
}

employees = JSON.parse(localStorage.getItem("employees"))
departments = JSON.parse(localStorage.getItem("departments"))
leaveApplications=JSON.parse(localStorage.getItem("leaveApplications"))
function getEmpCountInDepts()
{
  deptcnt = {}
  departments.forEach((dept)=>deptcnt[dept.departmentName]=0)
  employees.forEach((emp)=>{
    deptcnt[emp.department]++;
  })
  return deptcnt
}

function getTodayAbsentees() 
{
  return leaveApplications.
  filter((appl)=>{
    today = new Date()
    return (today >= new Date(appl.fromDate) && today <= new Date(appl.toDate))
  })
}

$(".totalemps h5").text(employees.length)

$(".presentemps h5").text(employees.length - getTodayAbsentees().length)

$(".absentemps h5").text(getTodayAbsentees().length)

$(".viewabsentee").click(function(){
   $(".abtable").empty()
      $(".abtable").append(
      `<tr>
      <th>employeeId</th>
      <th>employeeName</th>
      <th>reason</th>
      </tr>
      `
    )
  for (const ab of getTodayAbsentees()) {
    $(".abtable").append(
      `<tr>
      <td>${ab.employeeId}</td>
      <td>${ab.employeeName}</td>
      <td>${ab.reason}</td>
      </tr>`
    )
  }
})

$(".deptempcnt").click(function(){
  dc=getEmpCountInDepts();
   $(".abtable").empty()
      $(".abtable").append(
      `<tr>
      <th>Dept name</th>
      <th>Emp Count</th>
      </tr>
      `
    )
  for (const ab in dc) {
    $(".abtable").append(
      `<tr>
      <td>${ab}</td>
      <td>${dc[ab]}</td>
      </tr>`
    )
  }
})


const xValues = ["Present", "Absent"];

const yValues = [
  employees.length - getTodayAbsentees().length,
  getTodayAbsentees().length
];

const barColors = [
  "#10b981", // elegant green
  "#ef4444"  // elegant red
];

new Chart("myChart", {

  type: "doughnut", // better than pie

  data: {
    labels: xValues,

    datasets: [{
      backgroundColor: barColors,
      data: yValues,
      borderWidth: 0,
      hoverOffset: 12
    }]
  },

  options: {

    responsive: true,

    cutout: "50%%", // donut hole size

    plugins: {

      legend: {
        position: "bottom",

        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 14
          }
        }
      },

      title: {
        display: true,
        text: "Today's Attendance",
        font: {
          size: 20,
          weight: "bold"
        },
        padding: {
          bottom: 20
        }
      }

    },

    animation: {
      animateRotate: true,
      duration: 1500
    }

  }

});
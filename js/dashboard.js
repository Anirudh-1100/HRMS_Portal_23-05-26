$(document).ready(function(){



/* ADD EMPLOYEE */

$("#addEmployee").click(function(){

window.location.href =

"employee.html";

});



});


$(document).ready(function () {



/* LOAD EMPLOYEES */

let employees =

JSON.parse(

localStorage.getItem(
"employees"
)

)

||

[];



displayEmployees();





/* DISPLAY EMPLOYEES */

function displayEmployees() {

$("#employeeTable").html("");



$.each(

employees,

function (index, emp) {



let rowColor =

emp.attendance ===
"Present"

?

"lightgreen"

:

"lightcoral";



$("#employeeTable").append(`

<tr
style=
"background:${rowColor}"

>

<td>

${emp.id}

</td>

<td>

${emp.name}

</td>

<td>

${emp.department}

</td>

<td>

${emp.designation}

</td>

<td>

${emp.salary}

</td>

<td>

${emp.attendance}

</td>

<td>

<button class="editBtn">

Edit

</button>



<button class="deleteBtn">

Delete

</button>

</td>

</tr>

`);

}

);

}





/* ADD EMPLOYEE */

$("#addEmployee").click(function(){

window.location.href =

"employee.html";

});



});



/* LOAD DEPARTMENT FILTER */

loadDepartments();



function loadDepartments(){


let departments =

JSON.parse(

localStorage.getItem(
"departments"
)

)

||

[];



$("#employeeFilter").html(`

<option>

All Departments

</option>

`);




$.each(

departments,

function(index, dept){

$("#employeeFilter").append(`

<option>

${dept.departmentName}

</option>

`);

}

);

}





/* SEARCH EMPLOYEE */

$("#searchEmployee").keyup(function(){


let value =

$(this)
.val()
.toLowerCase();




$("#employeeTable tr")

.each(function(){


let text =

$(this)
.text()
.toLowerCase();



$(this)

.toggle(

text.includes(
value
)

);

});

});






/* FILTER EMPLOYEE */

$("#employeeFilter").change(function(){


let value =

$(this)

.val()

.toLowerCase();




$("#employeeTable tr")

.each(function(){


let dept =

$(this)

.find(
"td:eq(2)"
)

.text()

.toLowerCase();




if(

value ===
"all departments"

||

dept === value

){

$(this)

.show();

}

else{

$(this)

.hide();

}


});

});


/* DELETE EMPLOYEE */

$("#employeeTable").on(

"click",

".deleteBtn",

function(){


let row =

$(this)

.closest("tr")

.index();




employees.splice(

row,

1

);




localStorage.setItem(

"employees",

JSON.stringify(
employees
)

);




displayEmployees();

alert(
"Employee Deleted"
);

}
);


/* EDIT EMPLOYEE */

$("#employeeTable").on(

"click",

".editBtn",

function(){

let row =

$(this)

.closest("tr")

.index();




let employee =

employees[row];




employee.employeeName =

prompt(

"Edit Employee Name",

employee.employeeName

)

||

employee.employeeName;





employee.department =

prompt(

"Edit Department",

employee.department

)

||

employee.department;






employee.designation =

prompt(

"Edit Designation",

employee.designation

)

||

employee.designation;






employee.salary =

prompt(

"Edit Salary",

employee.salary

)

||

employee.salary;





localStorage.setItem(

"employees",

JSON.stringify(
employees
)

);




displayEmployees();

alert(
"Employee Updated"
);

}

);
$(document).ready(function () {

    /* ==========================
       LOAD DEPARTMENTS
    ========================== */

    let departments =

        JSON.parse(
            localStorage.getItem("departments")
        )

        ||

        [

            {
                name: "Development",
                head: "Anirudh",
                employees: 25,
                extension: "EXT101"
            },

            {
                name: "Testing",
                head: "Rahul",
                employees: 15,
                extension: "EXT102"
            }

        ];



    /* ==========================
       DISPLAY DATA ON PAGE
    ========================== */

    displayDepartments();



    /* ==========================
       SAVE TO LOCAL STORAGE
    ========================== */

    function saveDepartments() {

        localStorage.setItem(
            "departments",
            JSON.stringify(
                departments
            )
        );

    }



    /* ==========================
       DISPLAY TABLE + FILTER
    ========================== */

    function displayDepartments() {

        $("#departmentTable").html("");

        $("#filterDept").html(`

        <option>
        All Departments
        </option>

        `);



        $.each(
            departments,

            function (index, dept) {

                /* TABLE ROW */

                $("#departmentTable").append(`

                <tr>

                <td>${dept.name}</td>

                <td>${dept.head}</td>

                <td>${dept.employees}</td>

                <td>${dept.extension}</td>

                <td>

                <button class="deleteBtn">

                Delete

                </button>

                </td>

                </tr>

                `);



                /* FILTER OPTION */

                $("#filterDept").append(`

                <option>

                ${dept.name}

                </option>

                `);

            }

        );

    }




    /* ==========================
       ADD DEPARTMENT
    ========================== */

    $("#addBtn").click(function () {

        let name =
            prompt(
                "Enter Department Name"
            );

        let head =
            prompt(
                "Enter Department Head"
            );

        let employees =
            prompt(
                "Enter Employee Count"
            );

        let extension =
            prompt(
                "Enter Extension Number"
            );



        if (

            name &&
            head &&
            employees &&
            extension

        ) {

            departments.push({

                name,
                head,
                employees,
                extension

            });



            saveDepartments();

            displayDepartments();

            alert(
                "Department Added"
            );

        }

        else {

            alert(
                "Fill all fields"
            );

        }

    });





    /* ==========================
       DELETE DEPARTMENT
    ========================== */

    $("#departmentTable").on(

        "click",

        ".deleteBtn",

        function () {

            let row =

                $(this)
                    .closest("tr")
                    .index();



            departments.splice(
                row,
                1
            );



            saveDepartments();

            displayDepartments();

        }

    );





    /* ==========================
       SEARCH DEPARTMENT
    ========================== */

    $("#searchDept").keyup(function () {

        let value =

            $(this)
                .val()
                .toLowerCase();



        $("#departmentTable tr")
            .each(function () {

                let text =

                    $(this)
                        .find("td:first")
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






    /* ==========================
       FILTER DEPARTMENT
    ========================== */

    $("#filterDept").change(function () {

        let value =

            $(this)
                .val()
                .toLowerCase();



        $("#departmentTable tr")
            .each(function () {

                let text =

                    $(this)
                        .find("td:first")
                        .text()
                        .toLowerCase();



                if (

                    value ===
                    "all departments"

                    ||

                    text === value

                ) {

                    $(this)
                        .show();

                }

                else {

                    $(this)
                        .hide();

                }

            });

    });






    /* ==========================
       SORT A-Z
    ========================== */

    $("#sortBtn").click(function () {

        departments.sort(

            function (a, b) {

                return a.name
                    .localeCompare(
                        b.name
                    );

            }

        );



        saveDepartments();

        displayDepartments();

    });

});
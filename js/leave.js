$(function () {

    let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

    $("#toggleForm").click(function () {
        $("#formBox").slideToggle();
    });

    function showMsg(msg) {
        $("#notification").text(msg).fadeIn().delay(1000).fadeOut();
    }

    $("#applyLeave").click(function () {

        let id = $("#empId").val().trim();
        let name = $("#empName").val().trim();
        let from = $("#fromDate").val();
        let to = $("#toDate").val();

        if (!id || !name || !from || !to) {
            showMsg("Fill all fields");
            return;
        }

        let days = Math.floor((new Date(to) - new Date(from)) / (1000 * 3600 * 24)) + 1;

        leaves.push({
            id,
            name,
            days,
            status: "Pending"
        });

        localStorage.setItem("leaves", JSON.stringify(leaves));

        showMsg("Leave Applied");
        $("input,textarea").val("");

        display();
    });

    function display() {

        let role = $("#role").val();

        $("#leaveTable tbody").empty();
        $("#attendanceTable tbody").empty();

        $.each(leaves, function (i, l) {

            let actionBtns = "";

            // ✅ ONLY HR CAN SEE BUTTONS
            if (role === "HR") {
                actionBtns = `
                    <button class="approve" data-id="${i}">Approve</button>
                    <button class="reject" data-id="${i}">Reject</button>
                    <button class="delete" data-id="${i}">Delete</button>
                `;
            } else {
                actionBtns = "<b>No Access</b>";
            }

            $("#leaveTable tbody").append(`
                <tr>
                    <td>${l.id}</td>
                    <td>${l.name}</td>
                    <td>${l.days}</td>
                    <td class="${l.status.toLowerCase()}">${l.status}</td>
                    <td>${actionBtns}</td>
                </tr>
            `);

            let att = l.status === "Approved" ? "Leave" : "Absent";

            $("#attendanceTable tbody").append(`
                <tr>
                    <td>${l.id}</td>
                    <td>${l.name}</td>
                    <td class="status">${att}</td>
                    <td>
                        <button class="markPresent">Present</button>
                        <button class="markAbsent">Absent</button>
                    </td>
                </tr>
            `);
        });
    }

    // ✅ HR ACTIONS
    $(document).on("click", ".approve", function () {
        let i = $(this).data("id");
        leaves[i].status = "Approved";
        save();
    });

    $(document).on("click", ".reject", function () {
        let i = $(this).data("id");
        leaves[i].status = "Rejected";
        save();
    });

    $(document).on("click", ".delete", function () {
        let i = $(this).data("id");
        leaves.splice(i, 1);
        save();
    });

    function save() {
        localStorage.setItem("leaves", JSON.stringify(leaves));
        display();
    }

    // attendance
    $(document).on("click", ".markPresent", function () {
        let row = $(this).closest("tr");
        row.addClass("present");
        row.find(".status").text("Present");
    });

    $(document).on("click", ".markAbsent", function () {
        let row = $(this).closest("tr");
        row.addClass("absent");
        row.find(".status").text("Absent");
    });

    // role change refresh
    $("#role").change(display);

    display();
});
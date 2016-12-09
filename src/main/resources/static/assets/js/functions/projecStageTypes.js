/**
 * Created by kaxa on 9/8/16.
 */


function loadProjectStageTypes(){
    $.getJSON("/getprojectstagetypes", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < projectStageTypeColumns.length; i++) {
            var currentElement = projectStageTypeColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>"+currentElement["name"] + "</td>"+
                "<td><a value='" + currentElement['id'] + "' class='deleteProduct' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        $(".deleteProduct").click(function () {
            /*)*/
            var deleteValue = $(this).attr("value");
            showBootstrapPrompt("გსურთ წაშალოთ ჩანაწერი", {
                "კი": function () {
                    $.ajax({
                        url: "/deleteelement",
                        data: {
                            id: deleteValue
                        }
                    }).done(function (result) {
                        loadElementTypes();
                    });
                }
            });

        });
        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">დამატება</button>');
        $("#addNewButton").click(function () {
            $("#myModalLabel").html("ახალი პროექტის ეტაპის ტიპის დამატება");
            var modalBody = $("#modalBody");
            modalBody.html(projectStageTypeRegistrationFormTemplate);
            $("#registrationModalSaveButton").unbind();

            $("#registrationModalSaveButton").click(function () {


                var registerData = {
                    name: $("#nameField").val().trim()
                }
                var valid = true;
                for (key in registerData) {
                    if (registerData[key] == "") {
                        valid = false
                    }
                }
                if (valid) {
                    $.ajax({
                        url: "createprojectstagetype",
                        method: "POST",
                        data: registerData
                    }).done(function (msg) {
                        if (msg) {
                            loadProjectStageTypes();
                            $('#myModal').modal("hide");
                        } else {
                            $('#myModal').modal("hide");
                            alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                        }
                    })
                }
                else {
                    alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                }


            });
            $('#myModal').modal("show");

        })
    })
}
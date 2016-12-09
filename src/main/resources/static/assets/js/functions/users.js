/**
 * Created by kakha on 11/12/2015.
 */
function loadUsersData(index, search) {
    $.getJSON("getusers?index=" + index + "&search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < userColumns.length; i++) {
            var currentElement = userColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")

        }
        console.log(result);
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append(
                "<tr><td>" + currentElement["name"] + "</td><td>"
                + currentElement["surname"] + "</td><td>"
                + currentElement["username"] + "</td><td>"
                + currentElement["personalNumber"] + "</td>" +
                "<td>" + currentElement["mobile"] + "</td></tr>"
            );

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadUsersData($(this).val(), "")

        });
        if (canCreateUsers)
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ახალი მომხმარებლის დამატება </button>' +
                '<button id="mostWon" data-target="#myModal" class="btn btn-sm btn-dark">მომხმარებლების მიერ მოგებული პოზიციები</button>')
        else $("#addNewDiv").html('');
        $("#addNewButton").click(function () {
            $("#myModalLabel").html("ახალი მომხმარებლის დამატება")
            var modalBody = $("#modalBody");
            modalBody.html(userRegistrationFormTemplate);
            if (readCookie("projectUserType") === "3") {
                $("#organisationIdField").parent().remove();
                $("#typeField").parent().remove();
                $("#regionIdField").parent().remove();
                $("#zoneIdField").parent().remove();
            }
            $.getJSON("/getfilials", function (result) {
                if (result) {
                    for (i = 0; i < result.length; i++) {
                        $("#filialIdField").append("<option value='" + result[i]["id"] + "'>" + result[i]["name"] + "</option>")
                    }
                }
            })
            for (var key in userTypes) {
                $("#typeField").append("<option value='" + key + "'>" + userTypes[key] + "</option>");
            }
            $('#myModal').modal("show");

            var registerButton=$("#registrationModalSaveButton");
            registerButton.unbind();
            registerButton.click(function () {
                var registerData = {
                    username: $("#usernameField").val().trim(),
                    password: $("#passwordField").val().trim(),
                    email: $("#emailField").val().trim(),
                    name: $("#nameField").val().trim(),
                    surname: $("#surnameField").val().trim(),
                    address: $("#addressField").val().trim(),
                    mobile: $("#mobileField").val().trim(),
                    personalNumber: $("#personalNumberField").val().trim(),
                    filialId:$("#filialIdField").val(),
                    type:$("#typeField").val()
                };
                var valid = true;
                for (key in registerData) {
                    if (registerData[key] == "") {
                        valid = false
                    }
                }
                if (valid) {
                    $.ajax({
                        url: "/createuser",
                        method: "POST",
                        data: registerData
                    }).done(function (msg) {
                        if (msg) {
                            if (msg["code"] == 0) {
                                loadUsersData(0, "")
                                $('#myModal').modal("hide");
                            } else {
                                alert(msg["message"]);
                            }

                        } else {
                            $('#myModal').modal("hide");
                            alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                        }
                    })
                } else {
                    alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                }

            })
        })
        $("#mostWon").click(function () {
            $.getJSON("usersbymostwon", function (result) {
                showModalWithTableInside(function (header, body) {
                    header.html("მომხმარებლების მოგებული პოზიციები");
                    body.append("<table class='table table-hover dataTable table-striped'><thead id='won2TableHead'></thead><tbody id='won2TableBody'></tbody></table>");
                    body.find("#won2TableHead").append("<tr><th>მომხმარებელი</th><th>მოგებული პოზიციები</th></tr>");

                    for(key in result){
                        if(result[key].bidsSize){
                            body.find("#won2TableBody").append(
                                "<tr>" +
                                "<td>"+result[key].name+" "+result[key].surname+"</td><td>"+result[key].bidsSize+"</td></tr>")
                        }

                    }
                    var gridRow2 = $('.gridRow2');
                    var tenderDataTable = $("#tenderDataTable");
                    gridRow2.css('cursor', 'pointer');
                    gridRow2.unbind();


                })

            })

        })

    });


}
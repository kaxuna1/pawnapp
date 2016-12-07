/**
 * Created by kaxa on 11/19/16.
 */
var openUserGlobal;
function loadClientsData(index, search) {
    $("#flaggedParam").unbind();
    $("#flaggedParam").on('ifChanged', function () {
        loadClientsData(0, search);
    });
    $("#mainPanel").slideUp("fast", function () {
        $.getJSON("/getClients?" +
            "index=" + index +
            "&search=" + search +
            "&flagged=" +
            ($("#flaggedParam").is(":checked") ? "true" : "false"),
            function (result) {
                $("#dataGridHeader").html("");
                $("#dataGridBody").html("");
                $("#paginationUl").html("");
                for (i = 0; i < clientColumns.length; i++) {
                    var currentElement = clientColumns[i];
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
                        "<tr class='gridRow " + (currentElement.flagged ? "danger" : "") + "' value='" + i + "'><td> " + '<i class="fa fa-user-circle-o" aria-hidden="true"></i>' + currentElement["name"] + "</td><td>"
                        + currentElement["surname"] + "</td>" +
                        "<td>" + currentElement["personalNumber"] + "</td>" +
                        "<td>" + currentElement["mobile"] + "</td>" +
                        "<td>" + currentElement["loanNumber"] + "</td>" +
                        "</tr>"
                    );

                }
                $("#mainPanel").slideDown("slow");
                for (i = 0; i < totalPages; i++) {
                    $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
                }
                $(".paginate_button").click(function () {
                    //console.log($(this).val())
                    loadClientsData($(this).val(), search)

                });


                $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">' +
                    '<i class="fa fa-plus" aria-hidden="true"></i> ახალი კლიენტის დამატება </button>')
                $("#addNewButton").click(function () {
                    $("#myModalLabel").html("ახალი კლიენტის დამატება")
                    var modalBody = $("#modalBody");
                    modalBody.html(clientRegistrationFormTemplate);
                    $('#myModal').modal("show");

                    var registerButton = $("#registrationModalSaveButton");
                    registerButton.unbind();
                    registerButton.click(function () {
                        var registerData = {
                            name: $("#nameField").val().trim(),
                            surname: $("#surnameField").val().trim(),
                            mobile: $("#mobileField").val().trim(),
                            pn: $("#personalNumberField").val().trim()
                        };
                        var valid = true;
                        var message = "";
                        if (registerData.mobile.length < 9 || registerData.mobile.length > 12) {
                            valid = false;
                            message = "საკონტაქტო ნომერი უნდა იყოს 9 სიმბოლო ან მეტი და 12 სიმბოლოზე ნაკლები!"

                        }
                        for (var key in registerData) {
                            if (registerData[key] == "") {
                                valid = false
                                message = "შეავსეთ ყველა ველი";
                            }
                        }
                        if (valid) {
                            $.ajax({
                                url: "/createClient",
                                method: "POST",
                                data: registerData
                            }).done(function (msg) {
                                if (msg) {
                                    if (msg["code"] == 0) {
                                        loadClientsData(0, "")
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
                            alert(message);
                        }

                    })
                })
                var gridRow = $('.gridRow');
                gridRow.css('cursor', 'pointer');
                gridRow.unbind();
                gridRow.click(function () {
                    var currentElement = dataArray[$(this).attr("value")];
                    openUserGlobal(currentElement);

                })


            });
    });


}
openUserGlobal = function (currentElement) {
    showModalWithTableInside(function (head, body, modal) {
        body.html("");
        head.html("");
        $.getJSON("getClientloans/" + currentElement.id, function (result) {
            head.html("<strong style='font-family: font1'>კლიენტი: " + currentElement.name +
                " " +
                currentElement.surname +
                " // გაცემულია " + result.length + " სესხი</strong>")
            body.html(loansForClientGridTemplate)
            var clientLoansContainerDiv = $("#clientLoansContainerDiv");
            for (key in result) {
                var item = result[key];
                var statusString = '<span style="font-family: font1" class="label label-default"><i class="fa fa-money" aria-hidden="true"></i>' + item.loanSum + ' ლარი</span>' +
                    '<span style="font-family: font1" class="label label-default">გაიცა: ' + moment(new Date(item.createDate)).locale("ka").format("L") + '</span>' +
                    (item.closed ? '<span style="font-family: font1" class="label label-blue">დახურული</span>' : "") +
                    (item.status === 4 ? '<span style="font-family: font1" class="label label-danger">დაგვიანება</span>' : "");
                clientLoansContainerDiv.append('<div value="' + key + '" class="client-loan stage-item message-item media">' +
                    '<div class="media">' +
                    '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                    '   <div class="media-body">' +
                    '   <div style="width: 20%" class="sender">' + item.number + '</div>' +
                    '<div style="width: 70%;" class="subject">' + statusString + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>')
            }
            $(".client-loan").click(function () {
                var item = result[$(this).attr("value")];
                modal.modal("hide");
                openLoanGlobal(item);
            })
        })

    }, function () {

    }, 900)
}
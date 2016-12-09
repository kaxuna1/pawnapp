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
        body.html(clientProfiletemplate);
        var loansDiv = $("#tab5_1");
        var graphsDiv = $("#tab5_2");
        var paymentsDiv = $("#tab5_3");
        var uzrunvelyofaDiv = $("#tab5_4")
        var actionsDiv = $("#tab6_1");
        var infoDiv = $("#tab6_2");
        loansDiv.append('<div class="row">' +
            '<div class="col-md-3">' +
            '<label>' +
            '<input id="closedParamClient" type="checkbox" data-checkbox="icheckbox_square-blue">დახურული' +
            '</label>' +
            '</div><div class="col-md-3">' +
            '<label>' +
            '<input id="openedParamClient" type="checkbox" data-checkbox="icheckbox_square-blue">მიმდინარე' +
            '</label></div><div class="col-md-4"><div class="input-group">            ' +
            '<div class="icheck-list"><label>' +
            '<input id="lateParamClient" type="checkbox" data-checkbox="icheckbox_square-blue">დაგვიანებული' +
            '</label></div></div></div>' +
            '</div>');
        loansDiv.append(clientLoansTableTemplate);
        loansDiv.append(clPaginationTemplate);
        uzrunvelyofaDiv.append(clientProfileUzrunvelyofasTemplate);
        uzrunvelyofaDiv.append(clientProfileUzrunvelyofasPaginationTemplate);
        var clPagination = $("#cLPagination");
        var loansDataTable = $("#clientLoansDataTable");
        var loansDataTableBody = $("#clientLoansDataTableBody");
        var clUzPagination = $("#cLUzPagination");
        var clientUzrunvelyofaDataTableBody = $("#clientUzrunvelyofaDataTableBody");
        var DOMElements = {
            loansDataTable: loansDataTable,
            loansDataTableBody: loansDataTableBody,
            clPagination: clPagination,
            modal: modal,
            actionsDiv: actionsDiv,
            infoDiv: infoDiv,
            clUzPagination: clUzPagination,
            clientUzrunvelyofaDataTableBody: clientUzrunvelyofaDataTableBody
        };
        loadClientLoansToDiv(DOMElements, currentElement.id, 0);
        loadClientUzToDiv(DOMElements, currentElement.id, 0);
        initClientActionsButtons(DOMElements, currentElement);
        initClientInfo(DOMElements, currentElement);
        head.html("");
        $('input').iCheck({
            checkboxClass: 'icheckbox_minimal',
            radioClass: 'iradio_minimal',
            increaseArea: '20%' // optional
        });


    }, function () {

    }, 1024)
};
function initClientInfo(DOMElements, currentElement) {
    DOMElements.infoDiv.append("<div style='padding-left: 20px' class='row'><div class='col-md-4'>სახელი:</div> " +
        "<div class='col-md-4'>" +
        currentElement.name +
        "</div>" +
        "</div>")
    DOMElements.infoDiv.append("<div style='padding-left: 20px' class='row'><div class='col-md-4'>გვარი: </div>" +
        "<div class='col-md-4'>" + currentElement.surname +

        "</div>" +
        "</div>")
    DOMElements.infoDiv.append("<div style='padding-left: 20px' class='row'><div class='col-md-4'>პ/ნ: </div>" +
        "<div class='col-md-4'>" +
        currentElement.personalNumber +
        "</div>" +
        "</div>")
    DOMElements.infoDiv.append("<div style='padding-left: 20px' class='row'><div class='col-md-4'>მობილური: </div>" +
        "<div class='col-md-4'>" +
        currentElement.mobile + "" +
        "</div>" +
        "</div>")
}
function initClientActionsButtons(DOMElements2, currentElement) {
    DOMElements2.actionsDiv.append('<div style=" text-align: center;" class="row">' +
        '<button id="newLoanBtn" style="width: 80%" type="button" class="btn btn-primary btn-rounded">სესხის გაცემა</button></div>')
    $("#newLoanBtn").click(function () {
        sendLoanData = {mobiles: [], laptops: [], gold: [], other: [], homeTech: []};
        var modal7 = $("#myModal7");
        var tab7_1 = $("#tab7_1");
        var tab7_2 = $("#tab7_2");
        var tab7_3 = $("#tab7_3");
        var projectName = $("#projectName2");
        var clientChooserPlace = $("#clientChooserPlace");
        var uzrunvelyofaInputPlace = $("#uzrunvelyofaInputPlace");
        var loanDataBodyDiv = $("#loanDataBodyDiv");
        var loanActionsDiv = $("#loanActionsDiv");
        var DOMElements = {
            projectName: projectName,
            clientChooserPlace: clientChooserPlace,
            uzrunvelyofaInputPlace: uzrunvelyofaInputPlace,
            loanDataBodyDiv: loanDataBodyDiv,
            loanActionsDiv: loanActionsDiv,
            uzrunvelyofaFormPlace: $("#uzrunvelyofaFormPlace"),
            uzrunvelyofaGridPlace: $("#uzrunvelyofaGridPlace"),
            modal: modal7
        };
        projectName.html("ახალი სესხის გაცემა");


        sendLoanData.client = currentElement;
        drawClientChooser(DOMElements);
        drawLoanInfoAdder(DOMElements);
        updateSideInfo(DOMElements)
        modal7.modal("show");
        DOMElements2.modal.modal("hide");
    })
}
function loadClientLoansToDiv(DOMElements, id, page) {
    $("#closedParamClient").unbind();
    $("#closedParamClient").on('ifChanged', function () {
        loadClientLoansToDiv(DOMElements, id, 0);
    });
    $("#openedParamClient").unbind();
    $("#openedParamClient").on('ifChanged', function () {
        loadClientLoansToDiv(DOMElements, id, 0);
    });
    $("#lateParamClient").unbind();
    $("#lateParamClient").on('ifChanged', function () {
        loadClientLoansToDiv(DOMElements, id, 0);
    });
    $.getJSON("getClientloans/" + id + "/" + page + "?closed=" +
        ($("#closedParamClient").is(":checked") ? "true" : "false") +
        "&opened=" +
        ($("#openedParamClient").is(":checked") ? "true" : "false") +
        "&late=" +
        ($("#lateParamClient").is(":checked") ? "true" : "false"), function (result) {
        DOMElements.loansDataTableBody.html("");
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (var i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            console.log(new Date(currentElement["createDate"]));
            var itemLogos = "";
            for (typeKey in currentElement.loanUzrunvelyofaTypes) {
                if (currentElement.loanUzrunvelyofaTypes[typeKey] === 3)
                    itemLogos += "<img style='height: 20px' src='assets/images/gold.png' />";
                if (currentElement.loanUzrunvelyofaTypes[typeKey] === 1)
                    itemLogos += "<img style='height: 20px' src='assets/images/phone.png' />";
                if (currentElement.loanUzrunvelyofaTypes[typeKey] === 2)
                    itemLogos += "<img style='height: 20px' src='assets/images/lap.png' />";
                if (currentElement.loanUzrunvelyofaTypes[typeKey] === 4)
                    itemLogos += "<img style='height: 20px' src='assets/images/homeTech.png' />";
            }
            console.log(currentElement["createDate"]);

            DOMElements.loansDataTableBody.append("<tr class='" + (currentElement.status === 4 ? "danger" : "") + "'>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>" + itemLogos + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>" + '<i class="fa fa-balance-scale" aria-hidden="true"></i> ' + currentElement["number"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'><img style='height: 15px;padding-bottom: 4px;;' src='assets/images/lari.png'>" + currentElement["loanSum"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>" +
                '<i class="fa fa-calendar" aria-hidden="true"></i>' +
                (currentElement.closed ? moment(new Date(currentElement["closeDate"])).locale("ka").format("L")
                    : moment(new Date(currentElement["nextPaymentDate"])).locale("ka").format("L")) + "</td>" +
                "<td><a value='" + currentElement['id'] + "' class='loanActionButton' href='#'> " +
                "<i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
                "</tr>");
        }
        var gridRow = $('.gridRowClient');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log($(this).attr("value"));

            openLoanGlobal(currentElement);
            DOMElements.modal.modal("hide");
        });
        DOMElements.clPagination.html("");
        for (i = 0; i < totalPages; i++) {
            if (i > page - 3 && i < page + 3 || i === 0 || i === (totalPages - 1))
                DOMElements.clPagination.append('<li value="' + i + '" class="paginate_button paginate_button2' + (page == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');

        }
        $(".paginate_button2").click(function () {
            //console.log($(this).val())
            currentPage = $(this).val();
            loadClientLoansToDiv(DOMElements, id, currentPage)

        });


    }, {})
}

function loadClientUzToDiv(DOMElements, id, page) {
    $.getJSON("getClientUzrunvelyofa/" + id + "/" + page, function (result) {
        DOMElements.clientUzrunvelyofaDataTableBody.html("");
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (var i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            console.log(new Date(currentElement["createDate"]));
            var name = "";

            var type = ""
            if (currentElement.type === 3) {
                type += "<img style='height: 20px' src='assets/images/gold.png' />";
                name += "<span style='font-family: font1;'>"+currentElement.name+" სინჯი: "+
                    currentElement.sinji.name+" "+currentElement.mass +" გრამი</span>";
            }
            if (currentElement.type === 1) {
                type += "<img style='height: 20px' src='assets/images/phone.png' />";
                name += "<span style='font-family: font1;'>მობილური: "+currentElement.brand.name+" "+
                    currentElement.model+" imei:"+currentElement.imei+"</span>";
            }
            if (currentElement.type=== 2) {
                type += "<img style='height: 20px' src='assets/images/lap.png' />";
                name += "<span style='font-family: font1;'>კომპ: "+currentElement.brandName+" "+
                    currentElement.modelName+"</span>";name += "<span style='font-family: font1;'>მობილური: "+currentElement.brandName+" "+
                    currentElement.modelName+"</span>";
            }
            if (currentElement.type === 4) {
                type += "<img style='height: 20px' src='assets/images/homeTech.png' />";
            }
            console.log(currentElement["createDate"]);

            DOMElements.clientUzrunvelyofaDataTableBody.append("<tr>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>" + type +" "+ name+ "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>" + currentElement["number"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>" + currentElement["sum"] + "</td>" +
                "<td style='font-family: font1;' value='" + i + "' class='gridRowClient'>"  + loanStatuses[currentElement["status"]] + "</td>" +
                "</tr>");
        }
        var gridRow = $('.gridRowClient');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log($(this).attr("value"));

            openLoanGlobal(currentElement);
            DOMElements.modal.modal("hide");
        });
        DOMElements.clUzPagination.html("");
        for (i = 0; i < totalPages; i++) {
            if (i > page - 3 && i < page + 3 || i === 0 || i === (totalPages - 1))
                DOMElements.clUzPagination.append('<li value="' + i + '" class="paginate_button paginate_button3' + (page == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');

        }
        $(".paginate_button3").click(function () {
            //console.log($(this).val())
            currentPage = $(this).val();
            loadClientUzToDiv(DOMElements, id, currentPage)

        });


    }, {})
}
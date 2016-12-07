/**
 * Created by kakha on 11/12/2015.
 */
var currentProjectID = 0;
function loadProjectsData(index, search) {
    $.getJSON("getprojects?index=" + index + "&search=" + search, function (result) {
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < projectColumns.length; i++) {
                var currentElement = projectColumns[i];
                $("#dataGridHeader").append("<th>" + currentElement + "</th>")
            }
            if (canCreateProject) {
                $("#dataGridHeader").append("<th>*</th>")
            }
            currentData = result;
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                $("#dataGridBody").append("<tr>" +
                    "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["name"] + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["address"] + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["sakadastro"] + "</td>" +
                    "<td><a value='" + currentElement['id'] + "' class='deleteProduct' href='#'><i class='fa fa-times'></i></a></td>" +
                    "</tr>");

            }
            $(".deleteProduct").click(function () {
                /*)*/
                var deleteValue = $(this).attr("value");
                showBootstrapPrompt("გსურთ წაშალოთ ჩანაწერი", {
                    "კი": function () {
                        $.ajax({
                            url: "/deleteproduct",
                            data: {
                                id: deleteValue
                            }
                        }).done(function (result) {
                            loadProductsData(index, search);
                        });
                    }
                });

            });
            var checkboxParcel = $(".checkboxParcel");
            checkboxParcel.unbind();
            checkboxParcel.change(function () {
            });
            var gridRow = $('.gridRow');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            for (i = 0; i < totalPages; i++) {
                $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
            }
            $(".paginate_button").click(function () {
                //console.log($(this).val())

                currentPage = $(this).val();
                loadProjectsData($(this).val(), "")


            });

            //TODO აქ მგონი ტყვილად არის if-ი
            if (canCreateProject) {


                gridRow.click(function () {
                    var currentElement = dataArray[$(this).attr("value")];
                    console.log($(this).attr("value"));

                    var modal6 = $("#myModal6");

                    var tab2_1 = $("#tab2_1");
                    var tab2_2 = $("#tab2_2");
                    var tab2_3 = $("#tab2_3");

                    var buttonsPanelStages = $("#buttonsPanelStages");
                    var bodyPanelStages = $("#bodyPanelStages");
                    var bodyPanelActions = $("#bodyPanelActions");
                    var buttonsPanelActions = $("#buttonsPanelActions");
                    var buttonsPanelAction = $("#buttonsPanelAction");
                    var bodyPanelAction = $("#bodyPanelAction");
                    var projectName = $("#projectName");
                    var currentActiveActions = $("#currentActiveActions");
                    var projectCharts = $("#projectCharts");
                    var projectOtherInfo = $("#projectOtherInfo");
                    var projectInfoColumn2Header = $("#projectInfoColumn2Header");
                    var projectPrarabsList = $("#projectPrarabsList");
                    var projectPrarabAddButtonPanel=$("#projectPrarabAddButtonPanel");
                    var DOMElements = {
                        buttonsPanelStages: buttonsPanelStages,
                        bodyPanelStages: bodyPanelStages,
                        bodyPanelActions: bodyPanelActions,
                        buttonsPanelActions: buttonsPanelActions,
                        bodyPanelAction: bodyPanelAction,
                        buttonsPanelAction: buttonsPanelAction,
                        projectName:projectName,
                        currentActiveActions:currentActiveActions,
                        projectCharts:projectCharts,
                        projectOtherInfo:projectOtherInfo,
                        projectPrarabsList:projectPrarabsList,
                        projectPrarabAddButtonPanel:projectPrarabAddButtonPanel

                    }


                    buttonsPanelActions.hide();
                    bodyPanelActions.hide();
                    buttonsPanelAction.hide();
                    bodyPanelAction.hide();
                    bodyPanelStages.show();
                    buttonsPanelStages.show();
                    buttonsPanelStages.html("");
                    bodyPanelStages.html("");

                    currentProjectID = currentElement["id"];
                    $.getJSON("/getprojectstages/" + currentElement["id"], function (result2) {
                        loadStages(DOMElements, result2);
                    });

                    drawCurrentProjectElementExpansesColumnChart(DOMElements);
                    listCurrentProjectActiveActions(DOMElements);
                    listCurrentProjectPrarabs(DOMElements);

                    projectName.html("<strong>" + currentElement["name"]+ "</strong>")


                    if (canCreateProject) {
                        createButtonWithHandlerr(buttonsPanelStages, "ეტაპის დამატება", function () {
                            showModalWithTableInside(function (header, body, modal) {
                                header.html("ახალი ეტაპის დარეგისტრირება");
                                body.append("<div id='etapiForm'></div>");
                                var formBody = $("#etapiForm");
                                console.log(body);
                                dynamicCreateForm(formBody, "/createprojectstage", {
                                    name: {
                                        name: "სახელი",
                                        type: "text"
                                    },
                                    start: {
                                        name: "უნდა დაიწყოს",
                                        type: "date"
                                    },
                                    end: {
                                        name: "უნდა დამთავრდეს",
                                        type: "date"
                                    },
                                    typeId:{
                                        name: "ეტაპის ტიპი",
                                        type: "comboBox",
                                        valueField:"id",
                                        nameField:"name",
                                        url:"/getprojectstagetypes"
                                    },
                                    id: {
                                        type: "hidden",
                                        value: "" + currentElement["id"]
                                    }
                                }, function () {
                                    modal.modal("hide");
                                    $.getJSON("/getprojectstages/" + currentElement["id"], function (result2) {
                                        loadStages(DOMElements, result2);
                                    });
                                })


                            }, {
                                "დამატებითი ღილაკი": function () {

                                }
                            });
                        })
                    }


                    modal6.modal("show");
                });
                $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ახალი პროექტის დამატება </button>');
                $("#addNewButton").click(function () {
                    $("#myModalLabel").html("ახალი პროექტის დამატება");
                    var modalBody = $("#modalBody");
                    modalBody.html(projectRegistrationTemplate);
                    $("#registrationModalSaveButton").unbind();

                    $("#registrationModalSaveButton").click(function () {


                        var registerData = {
                            address: $("#addressField").val().trim(),
                            name: $("#nameField").val().trim(),
                            x: $("#xField").val().trim(),
                            y: $("#yField").val().trim(),
                            sak: $("#sakField").val().trim()
                        }
                        console.log(registerData);
                        console.log($("#importedField").is(':checked'));
                        var valid = true;
                        for (key in registerData) {
                            if (registerData[key] == "") {
                                valid = false
                            }
                        }
                        if (valid) {
                            $.ajax({
                                url: "createproject",
                                method: "POST",
                                data: registerData
                            }).done(function (msg) {
                                if (msg) {
                                    loadProjectsData(0, "")
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
            }
            else {
                $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">პროდუქციის მოთხოვნა</button>' +
                    '<button class="btn btn-sm btn-dark" id="requestFromRecentTender">არსებული ტენდერიდან მოთხოვნა</button>')
                $("#addNewButton").click(function () {
                    $("#myModalLabel4").html("პროდუქციის მოთხოვნა");
                    $.getJSON("/getmyfilialproductslist", function (result) {
                        console.log(result);
                        var filialProductsDataTable = $("#productsRequestDataTable2");
                        filialProductsDataTable.html("");
                        for (key in result) {
                            filialProductsDataTable.append(
                                "<tr><td> " + result[key].name + (result[key]["imported"] ? " (IMP)" : "(GEO)") + " " + result[key]["barcode"] + ":</td><td> <input class='requestInput' type='number' name='" + result[key].id + "'></td></tr>")
                        }
                        var makeRequestBTN = $("#makeRequestBTN");
                        makeRequestBTN.unbind();
                        makeRequestBTN.click(function () {
                            var sendData = [];
                            $(".requestInput").each(function () {
                                if (this.value) {
                                    sendData.push(JSON.stringify({id: this.name, sum: this.value}));
                                }

                            });
                            $.ajax({
                                url: "/requestProducts",
                                data: {productRequests: JSON.stringify(sendData)},
                                type: "POST"
                            }).done(function (result) {
                                if (result) {
                                    $('#myModal4').modal("hide");
                                    alert("მოთხოვნა მიღებულია");


                                }
                            });
                            console.log(sendData);
                        });

                        $('#myModal4').modal("show");
                    });

                });
                $("#requestFromRecentTender").click(function () {
                    showModalWithTableInside(function (header, body) {
                        header.html("აირჩიენთ ტენდერი რომლიდანაც გსურთ პროდუქციის მოთხოვნა");
                        body.html("<table class='table table-hover dataTable table-striped'>" +
                            "<thead>" +
                            "<th>ტენდერი</th>" +
                            "<th>დასრულების თარიღი</th>" +
                            "</thead>" +
                            "<tbody id='recentTendersBody'>" +
                            "</tbody>" +
                            "</table>");
                        $.getJSON("/getrecenttenders", function (result) {
                            for (key in result) {
                                body.find("#recentTendersBody").append("<tr value='" + key + "' class='gridRow'>" +
                                    "<td>" +
                                    result[key].name +
                                    "</td>" +
                                    "<td>" +
                                    moment(new Date(result[key].endDate)).locale("ka").format("LLLL") +
                                    "</td>" +
                                    "</tr>")
                            }
                            var gridRow = $(".gridRow");
                            gridRow.css('cursor', 'pointer');
                            gridRow.unbind();
                            gridRow.click(function () {
                                var currentElement = result[$(this).attr("value")];
                                console.log(currentElement);
                                showModalWithTableInside(function (header, body) {
                                    header.html("მისაწვდომი პროდუქციის ტიპები ტენდერ: " + currentElement.name + "დან");
                                    $.getJSON("/getavailableproductsfromtender?id=" + currentElement.id, function (result) {
                                        console.log(result);
                                        body.html("<table class='table table-hover dataTable table-striped'>" +
                                            "<thead>" +
                                            "<th>პროდუქცია</th>" +
                                            "<th>რაოდენობა</th>" +
                                            "</thead>" +
                                            "<tbody id='recentTenderProductsBody'>" +
                                            "</tbody>" +
                                            "</table>");
                                        for (key in result) {
                                            body.find("#recentTenderProductsBody").append(
                                                "<tr><td> " + result[key].name + (result[key]["imported"] ? " (IMP)" : " (GEO)") + " " + result[key]["barcode"] + ":</td><td> <input class='requestInput' type='number' name='" + result[key].id + "'></td></tr>")
                                        }
                                    });
                                }, {
                                    "მოთხოვნა": function () {
                                        var sendData = [];
                                        $(".requestInput").each(function () {
                                            if (this.value) {
                                                sendData.push(JSON.stringify({id: this.name, sum: this.value}));
                                            }

                                        });
                                        $.ajax({
                                            url: "/requestProductsFromTender",
                                            data: {productRequests: JSON.stringify(sendData), tender: currentElement.id},
                                            type: "POST"
                                        }).done(function (result) {
                                            if (result) {
                                                $('#myModal4').modal("hide");
                                                alert("მოთხოვნა მიღებულია");

                                            }
                                        });
                                        console.log(sendData);
                                    }
                                });
                            })
                        })
                    }, {})
                });
            }
        }
    )
}
function drawCurrentProjectElementExpansesColumnChart(DOMElements) {
    $.getJSON("/projectexpansescolumnchart/"+currentProjectID,function (result) {
        DOMElements.projectCharts.html('<canvas id="projectColumnChart" width="200" height="400"></canvas>');
        var names=[];
        var values=[];
        for(key in result){
            var current=result[key];
            names.push(current.name);
            values.push(current.sum);
        }
        var ctx = document.getElementById("projectColumnChart");
        var columnChart=drawColumnChart(ctx,names,values);
        console.log(columnChart);

    });
    
}
function listCurrentProjectActiveActions(DOMElements){
    DOMElements.currentActiveActions.html("kaxa")
    $.getJSON("/projectactiveactions/"+currentProjectID,function (result) {
        DOMElements.currentActiveActions.html(projectActiveActionsTemplate);
        var lastActionsContainerDiv=$("#lastActionsContainerDiv");
        var lastActionsTableAction1=$("#lastActionsTableAction1");
        var lastActionsTableAction2=$("#lastActionsTableAction2");
        var lastActionsTableAction3=$("#lastActionsTableAction3");
        for(key in result){
            var element = result[key];
            var statusString='<span class="label label-danger">'+element.actionStatus+'</span> ';
            var actionString='<span class="label label-blue">'+element.stageName+'</span>';
            var dateString='<span class="label label-success">'+moment(element.lastModifyDate).locale("ka").format("L")+'</span>';;
            lastActionsContainerDiv.append('<div value="'+key+'" class="stage-item message-item media">' +
                '<div class="media">' +
                '   <div class="media-body">' +
                '   <div style="width:25%;margin-left: 20px;" class="sender">' + element.name + '</div>' +
                '<div style="width: 70%;" class="subject">'+statusString+actionString+dateString+'</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        }
    })
}
function listCurrentProjectPrarabs(DOMElements) {
    DOMElements.projectPrarabsList.html("");
    DOMElements.projectPrarabAddButtonPanel.html("");
    createButtonWithHandlerr(DOMElements.projectPrarabAddButtonPanel,"პრარაბის დამატება",function () {
        showModalWithTableInside(function (header, body, modal) {
            header.html("პროექტზე პრარაბის დამატება");
            body.append("<div id='addPrarabForm'></div>");
            var formBody=$("#addPrarabForm");
            dynamicCreateForm(formBody, "/giveprojectprarab", {
                id2:{
                    name: "პრარაბი",
                    type: "comboBox",
                    valueField:"id",
                    nameField:"nameSurname",
                    url:"/getallprarabsforproject/"+currentProjectID
                },
                id1: {
                    type: "hidden",
                    value: "" + currentProjectID
                }
            }, function () {
                modal.modal("hide");
                listCurrentProjectPrarabs(DOMElements);
            })
        })
    });
    
    $.getJSON("/getprojectprarabs/"+currentProjectID,function (result) {
        for(key in result){
            DOMElements.projectPrarabsList.append("<div>"+result[key].name+" "+result[key].surname+"</div>")
        }
    })
}

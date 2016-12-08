/**
 * Created by kaxa on 11/19/16.
 */

var openLoanGlobal = null;
var currentLoanID = 0;
var currentLoanObj = null;
var sendLoanData = {};
var brands = {};
var laptopBrands = {};
var sinjebi = {};
var homeTechBrands = {};
var conditions = {};
var indexG = 0;
var searchG = "";
function loadLoansData(index, search, noAnimation) {
    indexG = index;
    searchG = search;
    if (noAnimation)
        dataLoading()
    else
        $("#mainPanel").slideUp("fast", function () {
            dataLoading()
        });
    function dataLoading() {
        $("#closedParam").unbind();
        $("#closedParam").on('ifChanged', function () {
            loadLoansData(0, search);
        });
        $("#openedParam").unbind();
        $("#openedParam").on('ifChanged', function () {
            loadLoansData(0, search);
        });
        $("#lateParam").unbind();
        $("#lateParam").on('ifChanged', function () {
            loadLoansData(0, search);
        });

        $("#addNewDiv").html(
            '<button id="addNewButton" data-target="#myModal" style="font-family: font1;" class="btn btn-sm btn-dark">' +
            '<i class="fa fa-plus" aria-hidden="true"></i>' +
            ' ახალი სესხის გაცემა' +
            '</button>');
        $.getJSON("getloans?index=" + index +
            "&closed=" +
            ($("#closedParam").is(":checked") ? "true" : "false") +
            "&opened=" +
            ($("#openedParam").is(":checked") ? "true" : "false") +
            "&late=" +
            ($("#lateParam").is(":checked") ? "true" : "false") +
            "&start=" +
            moment($("#lstd").val()) +
            "&end=" +
            moment($("#lend").val()) +
            "&search=" + search, function (result) {
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < loanColumns.length; i++) {
                var currentElement = loanColumns[i];
                $("#dataGridHeader").append('<th style="font-family: font1;">' + currentElement + "</th>")
            }
            if (($("#closedParam").is(":checked") ? true : false)) {
                $("#dataGridHeader").append('<th style="font-family: font1;">' + "დახურვის თარიღი" + "</th>")
            } else {
                $("#dataGridHeader").append('<th style="font-family: font1;">' + "მომდევნო გადახდა" + "</th>")
            }
            currentData = result;
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                console.log(new Date(currentElement["createDate"]))

                console.log(currentElement["createDate"])
                $("#dataGridBody").append("<tr class='" + (currentElement.status === 4 ? "danger" : "") + "'>" +
                    "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'>"  + itemLogos + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + '<i class="fa fa-balance-scale" aria-hidden="true"></i> ' + currentElement["number"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" + '<i class="fa fa-user-circle-o" aria-hidden="true"></i> ' + currentElement["clientFullName"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'><img style='height: 15px;padding-bottom: 4px;;' src='assets/images/lari.png'>" + currentElement["loanSum"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" +
                    '<i class="fa fa-calendar" aria-hidden="true"></i>' +
                    moment(new Date(currentElement["createDate"])).locale("ka").format("L") + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" +
                    '<i class="fa fa-calendar" aria-hidden="true"></i>' +
                    (currentElement.closed ? moment(new Date(currentElement["closeDate"])).locale("ka").format("L")
                        : moment(new Date(currentElement["nextPaymentDate"])).locale("ka").format("L")) + "</td>" +
                    "<td><a value='" + currentElement['id'] + "' class='loanActionButton' href='#'> " +
                    "<i class='fa fa-bars' aria-hidden='true'></i></a></td>" +
                    "</tr>");


            }
            if (!noAnimation)
                $("#mainPanel").slideDown("slow");
            var checkboxParcel = $(".checkboxParcel");
            checkboxParcel.unbind();
            checkboxParcel.change(function () {

            });
            var gridRow = $('.gridRow');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            for (i = 0; i < totalPages; i++) {
                if (i > index - 3 && i < index + 3 || i === 0 || i === (totalPages - 1))
                    $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');

            }
            $(".paginate_button").click(function () {
                //console.log($(this).val())
                currentPage = $(this).val();
                loadLoansData(currentPage, search)

            });
            gridRow.click(function () {
                var currentElement = dataArray[$(this).attr("value")];
                console.log($(this).attr("value"));

                openLoanGlobal(currentElement);
            });

            $("#addNewButton").click(function () {
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


                drawClientChooser(DOMElements);
                drawLoanInfoAdder(DOMElements);
                updateSideInfo(DOMElements)


                modal7.modal("show");
            })
        })
    }

}

function drawClientChooser(DOMElements) {
    DOMElements.clientChooserPlace.html(clientChooserTemplate);
    var clientsContainerDiv = $("#clientsContainerDiv");
    DOMElements.clientsContainerDiv = clientsContainerDiv;
    loadClientsDataInChooser(DOMElements, 0, "")
}

function loadClientsDataInChooser(DOMElements, index, search) {
    DOMElements.clientsContainerDiv.html("");
    $.getJSON("/getClients?index=" + index + "&search=" + search, function (result) {
        var data = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];


        for (var key in data) {
            var element = data[key];
            var statusString = '<span style=" margin-right: 0px"  class="label label-default"><i class="fa fa-address-card" aria-hidden="true"></i>' + element.personalNumber + '</span> ' +
                '<span style=" margin-right: 0px" class="label label-default"><i class="fa fa-phone" aria-hidden="true"></i>' + element.mobile + '</span> ';
            DOMElements.clientsContainerDiv.append('<div value="' + key + '" class="client-item stage-item message-item media">' +
                '<div class="media">' +
                '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                '   <div class="media-body">' +
                '   <div style="width: 30%;" class="sender">' + element.name + " " + element.surname + '</div>' +
                '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        var clientItem = $(".client-item");
        clientItem.unbind();
        clientItem.click(function () {
            clientItem.attr("style", "");
            $(this).attr("style", "background-color:grey;")
            sendLoanData.client = data[$(this).attr("value")];
            console.log(sendLoanData);
            updateSideInfo(DOMElements);
        });
        var clientSearch = $("#clientSearch");
        console.log(clientSearch);
        clientSearch.unbind();
        clientSearch.change(function (e) {
            loadClientsDataInChooser(DOMElements, index, clientSearch.val());
        })


    })

}

function drawLoanInfoAdder(DOMElements) {
    DOMElements.uzrunvelyofaInputPlace.html("");
    var createUzrunvelyofaButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
        '<i class="fa fa-cart-plus" aria-hidden="true"></i> მობილური', function () {
            loanConditionChooserButton.enabled(false);
            createUzrunvelyofaButton.enabled(false);
            DOMElements.uzrunvelyofaInputPlace.slideUp("slow");
            DOMElements.uzrunvelyofaFormPlace.slideUp();
            brands = {};
            dynamicCreateToArray(DOMElements.uzrunvelyofaFormPlace, sendLoanData.mobiles, {

                brand: {
                    name: "ბრენდი",
                    type: "comboBox",
                    valueField: "id",
                    nameField: "name",
                    url: "/getbrands/1",
                    IdToNameMap: brands
                },
                model: {
                    name: "მოდელი",
                    type: "text"
                },
                imei: {
                    name: "IMEI",
                    type: "text"
                },
                sum: {
                    name: "შეფასება",
                    type: "number"
                },
                comment: {
                    name: "კომენტარი",
                    type: "text"
                }
            }, function () {
                loanConditionChooserButton.enabled(true);
                createUzrunvelyofaButton.enabled(true);
                drawUzrunvelyofaGrid(DOMElements);
                updateSideInfo(DOMElements);
                DOMElements.uzrunvelyofaInputPlace.slideDown("slow");
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideDown("slow")
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideUp("slow")
            });
        });
    var createLaptopButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
        '<i class="fa fa-cart-plus" aria-hidden="true"></i> ლეპტოპი', function () {
            loanConditionChooserButton.enabled(false);
            createUzrunvelyofaButton.enabled(false);
            DOMElements.uzrunvelyofaInputPlace.slideUp("slow");
            laptopBrands = {};
            dynamicCreateToArray(DOMElements.uzrunvelyofaFormPlace, sendLoanData.laptops, {

                brand: {
                    name: "ბრენდი",
                    type: "comboBox",
                    valueField: "id",
                    nameField: "name",
                    url: "/getbrands/2",
                    IdToNameMap: laptopBrands
                },
                model: {
                    name: "მოდელი",
                    type: "text"
                },
                cpu: {
                    name: "cpu",
                    type: "text"
                },
                gpu: {
                    name: "gpu",
                    type: "text"
                },
                ram: {
                    name: "ram",
                    type: "text"
                },
                hdd: {
                    name: "hdd",
                    type: "text"
                },
                sum: {
                    name: "შეფასება",
                    type: "number"
                },
                comment: {
                    name: "კომენტარი",
                    type: "text"
                }
            }, function () {
                loanConditionChooserButton.enabled(true);
                createUzrunvelyofaButton.enabled(true);
                drawUzrunvelyofaGrid(DOMElements);
                updateSideInfo(DOMElements);
                DOMElements.uzrunvelyofaInputPlace.slideDown("slow");
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideDown("slow")
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideUp("slow")
            });
        });
    var crateHomeTechButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
        '<i class="fa fa-cart-plus" aria-hidden="true"></i> საყოფაცხოვრებო', function () {
            loanConditionChooserButton.enabled(false);
            createUzrunvelyofaButton.enabled(false);
            DOMElements.uzrunvelyofaInputPlace.slideUp("slow");
            laptopBrands = {};
            dynamicCreateToArray(DOMElements.uzrunvelyofaFormPlace, sendLoanData.homeTech, {

                brand: {
                    name: "ბრენდი",
                    type: "comboBox",
                    valueField: "id",
                    nameField: "name",
                    url: "/getbrands/4",
                    IdToNameMap: homeTechBrands
                },
                model: {
                    name: "მოდელი",
                    type: "text"
                },
                name: {
                    name: "დასახელება",
                    type: "text"
                },
                sum: {
                    name: "შეფასება",
                    type: "number"
                },
                comment: {
                    name: "კომენტარი",
                    type: "text"
                }
            }, function () {
                loanConditionChooserButton.enabled(true);
                createUzrunvelyofaButton.enabled(true);
                drawUzrunvelyofaGrid(DOMElements);
                updateSideInfo(DOMElements);
                DOMElements.uzrunvelyofaInputPlace.slideDown("slow");
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideDown("slow")
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideUp("slow")
            });
        });
    var createGoldButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
        '<i class="fa fa-cart-plus" aria-hidden="true"></i> ოქრო', function () {
            loanConditionChooserButton.enabled(false);
            createUzrunvelyofaButton.enabled(false);
            DOMElements.uzrunvelyofaInputPlace.slideUp("slow");
            sinjebi = {};
            dynamicCreateToArray(DOMElements.uzrunvelyofaFormPlace, sendLoanData.gold, {

                sinji: {
                    name: "სინჯი",
                    type: "comboBox",
                    valueField: "id",
                    nameField: "name",
                    url: "/getSinjebi",
                    IdToNameMap: sinjebi
                },
                name: {
                    name: "სახელი",
                    type: "text"
                },
                mass: {
                    name: "წონა(გრამებში)",
                    type: "number"
                },
                sum: {
                    name: "შეფასება",
                    type: "number"
                },
                comment: {
                    name: "კომენტარი",
                    type: "text"
                }
            }, function () {
                loanConditionChooserButton.enabled(true);
                createUzrunvelyofaButton.enabled(true);
                drawUzrunvelyofaGrid(DOMElements);
                updateSideInfo(DOMElements);
                DOMElements.uzrunvelyofaInputPlace.slideDown("slow");
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideDown("slow")
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideUp("slow")
            });
        });
    var loanConditionChooserButton = createButtonWithHandlerr(DOMElements.uzrunvelyofaInputPlace,
        '<i class="fa fa-percent" aria-hidden="true"></i> განაკვეთის მითითება', function () {
            loanConditionChooserButton.enabled(false);
            createUzrunvelyofaButton.enabled(false);
            DOMElements.uzrunvelyofaInputPlace.slideUp("slow");
            dynamicChooserToCallback(DOMElements.uzrunvelyofaFormPlace, {
                name: "საპროცენტო განაკვეთი",
                type: "comboBox",
                valueField: "id",
                nameField: "fullname",
                url: "/getconditions",
                IdToNameMap: conditions
            }, function (value) {
                sendLoanData["condition"] = value;
                loanConditionChooserButton.enabled(true);
                createUzrunvelyofaButton.enabled(true);
                drawUzrunvelyofaGrid(DOMElements);
                updateSideInfo(DOMElements);
                DOMElements.uzrunvelyofaInputPlace.slideDown("slow");
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideDown("slow")
            }, function () {
                DOMElements.uzrunvelyofaFormPlace.slideUp("slow")
            })

        });

}

function drawUzrunvelyofaGrid(DOMElements) {
    DOMElements.uzrunvelyofaGridPlace.html(uzrunvelyofaGridTemplate);
    DOMElements.uzrunvelyofaContainerDiv = $("#uzrunvelyofaContainerDiv");
    var data = sendLoanData.mobiles;
    var lapData = sendLoanData.laptops;
    var goldData = sendLoanData.gold;
    var homeTechData = sendLoanData.homeTech;
    console.log(brands);
    for (var key in data) {
        var element = data[key];
        var statusString = '<span class="label label-danger">' + element.imei + '</span>' +
            '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '<img src="assets/images/phone.png" alt="avatar 3" width="40" class="sender-img">' +
            '   <div class="media-body">' +
            '   <div class="sender">' + brands[element.brand] + " " + element.model + '</div>' +
            '<div style="width: 40%;" class="subject">' + statusString + '<span type="mobile" value="' + key + '" class="remove-uzrunvelyofa label label-danger">X</span></div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    for (var key in lapData) {
        var element = lapData[key];
        var statusString = '<span class="label label-danger">CPU ' + element.cpu + '</span>' +
            '<span class="label label-danger">GPU ' + element.gpu + '</span>' +
            '<span class="label label-danger">RAM ' + element.ram + '</span>' +
            '<span class="label label-danger">HDD ' + element.hdd + '</span>' +
            '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '   <div class="media-body">' +
            '   <div style="width: 22%;margin-left: 17px;" class="sender">' + laptopBrands[element.brand] + " " + element.model + '</div>' +
            '<div style="width: 70%;" class="subject">' + statusString + '<span type="laptop" value="' + key + '" class="remove-uzrunvelyofa label label-danger">X</span></div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    for (var key in homeTechData) {
        var element = homeTechData[key];
        var statusString = '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '   <div class="media-body">' +
            '   <div style="width: 22%;margin-left: 17px;" class="sender">'+element.name+' ' + homeTechBrands[element.brand] + " " + element.model + '</div>' +
            '<div style="width: 70%;" class="subject">' + statusString + '<span type="homeTech" value="' + key + '" class="remove-uzrunvelyofa label label-danger">X</span></div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    $(".remove-uzrunvelyofa").click(function () {
        var key = $(this).attr("value");
        var type = $(this).attr("type");
        if (type === "mobile")
            delete data[key];
        if (type === "laptop")
            delete lapData[key];
        if(type==="gold")
            delete goldData[key];
        if(type==="homeTech")
            delete homeTechData[key];
        updateSideInfo(DOMElements);
        drawUzrunvelyofaGrid(DOMElements);
    })


}

function updateSideInfo(DOMElements) {
    DOMElements.loanDataBodyDiv.html("");
    DOMElements.loanActionsDiv.html("");
    var enabled = true;
    var mobile = true;
    var laptop = true;
    var gold = true;
    var homeTech = true;
    var sum = 0;
    if (sendLoanData.client) {
        DOMElements.loanDataBodyDiv.append("<div>კლიენტი: <strong style='font-family: font1'>" + sendLoanData.client.name + " " + sendLoanData.client.surname + "</strong> </div>");
        DOMElements.loanDataBodyDiv.append("<div>პირადი ნომერი: <strong style='font-family: font1'>" + sendLoanData.client.personalNumber + "</strong> </div>");
    } else {
        enabled = false;
    }
    if (sendLoanData.condition) {
        DOMElements.loanDataBodyDiv.append("<div>საპროცენტო განაკვეთი: <strong style='font-family: font1'>" + conditions[sendLoanData.condition] + "</strong> </div>");
    } else {
        enabled = false;
    }
    if (sendLoanData.mobiles.length > 0) {
        DOMElements.loanDataBodyDiv.append("<div>უზრუნველყოფის მობილურები: </div>");
        for (var mobileKey in sendLoanData.mobiles) {
            var mobile = sendLoanData.mobiles[mobileKey];
            sum += parseFloat(mobile.sum);
            DOMElements.loanDataBodyDiv.append("<div><strong style='font-family: font1'> მობილური: " + brands[mobile.brand] + " " + mobile.model + " " + mobile.sum + " ლარი</strong></div>");
        }
    } else {
        mobile = false;
    }
    if (sendLoanData.laptops.length > 0) {
        DOMElements.loanDataBodyDiv.append("<div>უზრუნველყოფის ლეპტოპები: </div>");
        for (var lapKey in sendLoanData.laptops) {
            var laptopObj = sendLoanData.laptops[lapKey];
            sum += parseFloat(laptopObj.sum);
            DOMElements.loanDataBodyDiv.append("<div><strong style='font-family: font1'> ლეპტოპი: " + laptopBrands[laptopObj.brand] + " " + laptopObj.model + " " + laptopObj.sum + " ლარი</strong></div>");
        }

    } else {
        laptop = false;
    }
    if (sendLoanData.gold.length > 0) {
        DOMElements.loanDataBodyDiv.append("<div>უზრუნველყოფის ოქროული: </div>");
        for (var gKey in sendLoanData.gold) {
            var goldObj = sendLoanData.gold[gKey];
            sum += parseFloat(goldObj.sum);
            DOMElements.loanDataBodyDiv.append("<div><strong style='font-family: font1'> სინჯი: "
                + sinjebi[goldObj.sinji] + " " + goldObj.name + " " + goldObj.sum
                + " ლარი</strong></div>");
        }

    } else {
        gold = false;
    }
    if (sendLoanData.homeTech.length > 0) {
        DOMElements.loanDataBodyDiv.append("<div>საოჯახო ტექნიკა: </div>");
        for (var gKey in sendLoanData.homeTech) {
            var homeTechObj = sendLoanData.homeTech[gKey];
            sum += parseFloat(homeTechObj.sum);
            DOMElements.loanDataBodyDiv.append("<div><strong style='font-family: font1'> სინჯი: "
                + homeTechBrands[homeTechObj.brand] + " " + homeTechObj.name + " " + homeTechObj.sum
                + " ლარი</strong></div>");
        }

    } else {
        homeTech = false;
    }
    if (sum > 0) {
        DOMElements.loanDataBodyDiv.append("<div>ჯამური თანხა: <strong style='font-family: font1'>" + parseFloat(sum) + " ლარი</strong></div>");
    }


    if (enabled && (mobile || laptop || gold || homeTech)) {
        var createLoanButton = createButtonWithHandlerr(DOMElements.loanActionsDiv, "დადასტურება", function () {
            console.log(sendLoanData);
            $.ajax({
                url: "createloan",
                method: "POST",
                data: {json: JSON.stringify(sendLoanData)}
            }).done(function (msg) {
                if (msg) {
                    if (msg.code === 0) {
                        DOMElements.modal.modal("hide")
                        loadLoansData(0, "")
                    }
                } else {

                    alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                }
            })
        });
        createLoanButton.makeDark(true);
        createLoanButton.enabled(true);

    }

}

function loadClientDataForLoan(DOMElements) {
    DOMElements.clientInfoButtonsPlace.html("");
    DOMElements.clientInfoDataPlace.html("");
    DOMElements.clientContactButton = createButtonWithHandlerr(DOMElements.clientInfoButtonsPlace,
        "შეტყობინების გაგზავნა", function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "/sendmessagetoclient", {
                    message: {
                        name: "შეტყობინება",
                        type: "text"
                    },
                    client: {
                        type: "hidden",
                        value: "" + DOMElements.currentObj.client.id
                    }
                }, function () {
                    modal.modal("hide")
                })
            })
        });
    /* DOMElements.clientProfileOpenButton = createButtonWithHandlerr(DOMElements.clientInfoButtonsPlace,
     "პროფილის გახსნა", function () {
     openUserGlobal(DOMElements.currentObj.client);
     });*/
    DOMElements.clientInfoDataPlace.append("<div>კლიენტი: <strong style='font-family: font1'>" +
        DOMElements.currentObj.clientFullName + "</strong></div>");
    DOMElements.clientInfoDataPlace.append("<div>პ/ნ: <strong style='font-family: font1'>" +
        DOMElements.currentObj.clientPN + "</strong></div>");
    DOMElements.clientInfoDataPlace.append("<div>ტელეფონი: <strong style='font-family: font1'>" +
        DOMElements.currentObj.clientMobile + "</strong></div>");
}

function loadLoanInfoData(DOMElements) {
    DOMElements.loanInfoDiv.html("");
    DOMElements.loanInfoDiv.append("<div>გაცემული თანხა: <strong style='font-family: font1'>" + DOMElements.currentObj.loanSum + " ლარი</strong></div>");
    DOMElements.loanInfoDiv.append("<div>დარჩენილი გადასახდელი თანხა: <strong style='font-family: font1'>" + DOMElements.currentObj.leftSum + " ლარი</strong></div>");
    DOMElements.loanInfoDiv.append("<div>სესხის დასახურად გადასახდელი თანხა: <strong style='font-family: font1'>" + DOMElements.currentObj.sumForLoanClose + " ლარი</strong></div>");
    DOMElements.loanInfoDiv.append("<div>საპროცენტო განაქვეთი: <strong style='font-family: font1'>" + DOMElements.currentObj.conditionName + "</strong></div>");
    if (!DOMElements.currentObj.closed) {
        DOMElements.loanInfoDiv.append("<div>მომდევნო %-ის დარიცხვის თარიღი: <strong style='font-family: font1'>" +
            moment(new Date(DOMElements.currentObj.nextInterestCalculationDate)).locale("ka").format("L") + "</strong></div>");
        DOMElements.loanInfoDiv.append("<div>დაერირცხება: <strong style='font-family: font1'>" + DOMElements.currentObj.loanCondition.percent + "% ყოველ " +
            DOMElements.currentObj.loanCondition.period + " " + periodTypes[DOMElements.currentObj.loanCondition.periodType] +
            "ში</strong></div>");
    } else {
        DOMElements.loanInfoDiv.append("<div>სესხის დახურვის თარიღი: <strong style='font-family: font1'>" +
            moment(new Date(DOMElements.currentObj.closeDate)).locale("ka").format("L") + "</strong></div>")
    }

    DOMElements.loanInfoDiv.append("<div>სესხის გამცემი: <strong style='font-family: font1'>" + DOMElements.currentObj.userFullName + "</strong></div>");
    DOMElements.loanInfoDiv.append("<div>პ/ნ: <strong style='font-family: font1'>" + DOMElements.currentObj.userPN + "</strong></div>");

    DOMElements.loanInfoDiv.append("<div>გაცემის დრო: <strong style='font-family: font1'>" +
        moment(new Date(DOMElements.currentObj.createDate)).locale("ka").format("LLLL") + "</strong></div>");
}

function loadUzrunvelyofaDataForLoan(DOMElements) {
    $.getJSON("/getLoanPhones?loan=" + DOMElements.currentObj.id, function (result) {
        DOMElements.currentObj.uzrunvelyofa = result;
        drawUzrunvelyofaGridForLoanInfo(DOMElements);
    })
}

function drawUzrunvelyofaGridForLoanInfo(DOMElements) {
    DOMElements.uzrunvelyofaDataGridDiv.html(uzrunvelyofaGridTemplate);
    DOMElements.uzrunvelyofaContainerDiv = $("#uzrunvelyofaContainerDiv");
    var data = DOMElements.currentObj.uzrunvelyofa;
    for (var key in data) {
        var element = data[key];
        if (element.type !== 1)
            continue;

        var statusString = '<span class="label label-danger">#' + element.number + '</span>' +
            '<span class="label label-danger">' + element.imei + '</span>' +
            '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '<img src="assets/images/phone.png" alt="avatar 3" width="40" class="sender-img">' +
            '   <div class="media-body">' +
            '   <div style="width: 30%;" class="sender">' + element.brand.name + " " + element.model + '</div>' +
            '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    var dataLaps = DOMElements.currentObj.uzrunvelyofa;
    for (var key in dataLaps) {
        var element = dataLaps[key];
        if (element.type !== 2)
            continue;
        var statusString = '<span class="label label-danger">#' + element.number + '</span>' +
            '<span class="label label-danger">CPU ' + element.cpu + '</span>' +
            '<span class="label label-danger">GPU ' + element.gpu + '</span>' +
            '<span class="label label-danger">RAM ' + element.ram + '</span>' +
            '<span class="label label-danger">HDD ' + element.hdd + '</span>' +
            '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '   <div class="media-body">' +
            '   <div style="width: 22%;margin-left: 17px;" class="sender">' + element.brand.name + " " + element.model + '</div>' +
            '<div style="width: 70%;" class="subject">' + statusString + '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    var dataGold = DOMElements.currentObj.uzrunvelyofa;
    for (var key in dataGold) {
        var element = dataGold[key];
        if (element.type !== 3)
            continue;
        var statusString = '<span class="label label-danger">წონა: ' + element.mass + 'გრამი</span>' +
            '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '   <div class="media-body">' +
            '   <div style="width: 42%;margin-left: 17px;" class="sender">' + element.sinji.name + " " + element.name + '</div>' +
            '<div style="width: 50%;" class="subject">' + statusString + '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    var dataHomeTech = DOMElements.currentObj.uzrunvelyofa;
    for (var key in dataGold) {
        var element = dataGold[key];
        if (element.type !== 4)
            continue;
        var statusString =
            '<span class="label label-danger">' + element.sum + ' ლარი</span>';
        DOMElements.uzrunvelyofaContainerDiv.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
            '<div class="media">' +
            '   <div class="media-body">' +
            '   <div style="width: 42%;margin-left: 17px;" class="sender">'+element.name+' ' + element.brand.name + " " + element.model + '</div>' +
            '<div style="width: 50%;" class="subject">' + statusString + '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    $(".uzrunvelyofa-item").click(function () {
        var item = data[$(this).attr("value")];
        showModalWithTableInside(function (head, body, modal) {
            body.append("<div class='row'>" +
                "<div class='col-md-3'><img style='height: 75px;' src='assets/images/phone.png'/></div>" +
                "<div class='col-md-9' style='background: #F7F7F7'>" +
                "<div>შიდა ნომერი: <strong style='font-family: font1;'>" + item.number + "</strong></div>" +
                "<div>ბრენდი: <strong style='font-family: font1;'>" + item.brandName + "</strong></div>" +
                "<div>მოდელი: <strong style='font-family: font1;'>" + item.modelName + "</strong></div>" +
                "<div>IMEI: <strong style='font-family: font1;'>" + item.imei + "</strong></div>" +
                "<div>ჩაბარების ფასი: <strong style='font-family: font1;'>" + item.sum + " ლარი</strong></div>" +
                "<div><p>კომენტარი: <strong style='font-family: font1;'>" + item.comment + "</strong></p></div>" +
                "</div>" +
                "</div>");
        })
    });


}

function loadMovementsDataForLoan(DOMElements) {
    DOMElements.movementsGridDiv.html(loanMovementsGridTemplate);
    DOMElements.loanMovementsContainerDiv = $("#loanMovementsContainerDiv");
    $.getJSON("/getloansmovements/" + DOMElements.currentObj.id, function (result) {
        for (var key in result) {
            var element = result[key];
            var statusString = '<span class="label label-danger">' +
                moment(new Date(element.createDate)).locale("ka").format("LLL") + '</span>';
            DOMElements.loanMovementsContainerDiv.append('<div value="' + key + '" class="movement-item stage-item message-item media">' +
                '<div class="media">' +
                '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                '   <div class="media-body">' +
                '   <div style="width: 40%; font-size: 11px" class="sender">' + element.text + '</div>' +
                '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".movement-item").click(function () {

        })
    })
}

function loadLoanDoActions(DOMElements) {
    DOMElements.loanDoActionsDiv.html("");
    if (!DOMElements.currentObj.closed)
        createButtonWithHandlerr(DOMElements.loanDoActionsDiv, "გადახდა", function () {

            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "makePayment", {
                    loanId: {
                        type: "hidden",
                        value: "" + DOMElements.currentObj.id
                    },
                    paymentType: {
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        name: "გადახდის ტიპი",
                        data: [
                            {id: "1", name: "ნაწილობრივი"},
                            {id: "2", name: "სრული"},
                            {id: "3", name: "პროცენტი"}
                        ]
                    },
                    sum: {
                        type: "number",
                        name: "გადახდის თანხა"
                    }
                }, function () {
                    modal.modal("hide");
                    $.getJSON("/getloan/" + DOMElements.currentObj.id, function (result) {
                        loadLoansData(indexG, searchG, true);
                        openLoanGlobal(result);
                    });

                })
            }, function () {

            }, 500)
        });
    if (!DOMElements.currentObj.closed)
        createButtonWithHandlerr(DOMElements.loanDoActionsDiv, "პროცენტის დაკისრება", function () {
            $.getJSON("/addInterestToLoan/" + DOMElements.currentObj.id, function (result) {
                $.getJSON("/getloan/" + DOMElements.currentObj.id, function (result2) {
                    loadLoansData(indexG, searchG, true);
                    openLoanGlobal(result2);
                });
            });
        });
    if (!DOMElements.currentObj.closed)
        createButtonWithHandlerr(DOMElements.loanDoActionsDiv, "სესხის დახურვა", function () {
            $.getJSON("/getsumforloanclosing/" + DOMElements.currentObj.id, function (result) {
                if (result.code === 0) {
                    showModalWithTableInside(function (head, body, modal) {
                        body.append("<strong style='font-family: font1'>სესიხს დასახურად საჭიროა " +
                            result.message + " ლარის გადახდა.<br> გსურთ დახუროთ სესიხი?</strong>")
                    }, {
                        "სესხის დახურვა": function () {
                            showModalWithTableInside(function (head, body, modal) {
                                body.append("გსურთ დააფიქსიროთ " + result.message + " ლარის გადახდა " +
                                    "და დახუროთ სესხი?");
                            }, {
                                "კი": function () {
                                    $.ajax({
                                        url: "makePayment",
                                        data: {
                                            loanId: DOMElements.currentObj.id,
                                            paymentType: 2,
                                            sum: result.message
                                        }
                                    }).done(function (result) {
                                        console.log(result);
                                        if (result.code === 0) {
                                            $.getJSON("/getloan/" + DOMElements.currentObj.id, function (result2) {
                                                loadLoansData(indexG, searchG, true);
                                                openLoanGlobal(result2);
                                                alert("გადახდა დაფიქსირდა წარმატებით!");
                                            });

                                        }
                                    })
                                }
                            }, 500)
                        }
                    }, 500);
                } else {
                    alert("მოხდა შეცდომა")
                }
            });
        });
    if (!DOMElements.currentObj.closed && DOMElements.currentObj.overdue)
        createButtonWithHandlerr(DOMElements.loanDoActionsDiv, "ნივთების დაკავება", function () {

            showModalWithTableInside(function (head, body, modal) {
                body.append("<strong style='font-family: font1'>გსურთ დააკავოთ დატვირთულ ნივთები" +
                    " დარიცხული პროცენტის გადაუხდელობის გამო?</strong>")
            }, {
                "დაკავება": function () {
                    showModalWithTableInside(function (head, body, modal) {
                        head.html("<strong style='font-family: font1'>დატვირთული ნივთები რომლების დაკავებაც მოხდება</strong>")
                        body.html(uzrunvelyofaGridTemplateConfiscate);
                        DOMElements.uzrunvelyofaContainerDivForConfiscate = $("#uzrunvelyofaConfiscateContainerDiv");
                        var data = DOMElements.currentObj.uzrunvelyofa;
                        for (var key in data) {
                            var element = data[key];
                            if (element.type !== 1)
                                continue;
                            var statusString = '<span class="label label-danger">#:' + element.number + '</span>' +
                                '<span class="label label-danger">imei:' + element.imei + '</span>' +
                                '<span class="label label-danger">' + element.sum + ' ლარი</span>';
                            DOMElements.uzrunvelyofaContainerDivForConfiscate.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
                                '<div class="media">' +
                                '<img src="assets/images/phone.png" alt="avatar 3" width="40" class="sender-img">' +
                                '   <div class="media-body">' +
                                '   <div style="width: 30%;" class="sender">' + element.brandName + " " + element.modelName + '</div>' +
                                '<div style="width: 40%;" class="subject">' + statusString + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                        var dataLaps = DOMElements.currentObj.uzrunvelyofa;
                        for (var key in dataLaps) {
                            var element = dataLaps[key];
                            if (element.type !== 2)
                                continue;
                            var statusString = '<span class="label label-danger">CPU ' + element.cpu + '</span>' +
                                '<span class="label label-danger">GPU ' + element.gpu + '</span>' +
                                '<span class="label label-danger">RAM ' + element.ram + '</span>' +
                                '<span class="label label-danger">HDD ' + element.hdd + '</span>' +
                                '<span class="label label-danger">' + element.sum + ' ლარი</span>';
                            DOMElements.uzrunvelyofaContainerDivForConfiscate.append('<div value="' + key + '" class="uzrunvelyofa-item stage-item message-item media">' +
                                '<div class="media">' +
                                '   <div class="media-body">' +
                                '   <div style="width: 22%;margin-left: 17px;" class="sender">' + element.brandName + " " + element.model + '</div>' +
                                '<div style="width: 70%;" class="subject">' + statusString + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            );
                        }


                    }, {
                        "კი": function () {
                            $.ajax({
                                url: "closewithconfiscation/" + DOMElements.currentObj.id
                            }).done(function (result) {
                                console.log(result);
                                if (result.code === 0) {
                                    $.getJSON("/getloan/" + DOMElements.currentObj.id, function (result2) {
                                        loadLoansData(indexG, searchG, true);
                                        openLoanGlobal(result2);
                                        alert(result.message);
                                    });

                                }
                            })
                        }
                    }, 800)
                }
            }, 500);

        });
}

function loadLoanInterestsGrid(DOMElements) {
    DOMElements.loanInterestsGridDiv.html(loanInterestGridTemplate);
    DOMElements.loanInterestsContainerDiv = $("#loanInterestsContainerDiv");
    $.getJSON("/getloaninterests/" + DOMElements.currentObj.id, function (result) {
        for (var key in result) {
            var element = result[key];
            var statusString = '<span class="label label-blue">' +
                moment(new Date(element.createDate)).locale("ka").format("L") + ' - ' +
                moment(new Date(element.dueDate)).locale("ka").format("L") +
                '</span>' +

                '<span class="label' + (element.payed ? " label-default" : " label-danger") + '">' +


                (element.payed ? "გადახდილია" : (element.payedSum == 0 ? "არ არის გადახდილი" : "გადახდილია " + element.payedSum + "/"
                + element.sum + "-დან")) + '</span>';
            DOMElements.loanInterestsContainerDiv.append('<div value="' + key + '" class="movement-item stage-item message-item media">' +
                '<div class="media">' +
                '   <div class="media-body">' +
                '   <div style="width: 30%; font-size: 11px;margin-left: 20px;" class="sender">დაერიცხა ' + element.percent + "%" +
                " "
                + element.sum + 'ლარი' +
                '</div>' +
                '<div style="width: 65%;" class="subject">' + statusString + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".movement-item").click(function () {

        })
    })
}

function loadLoanPaymentsGrid(DOMElements) {
    DOMElements.loanPaymentsGridDiv.html(loanPaymentGridTemplate);
    DOMElements.loanPaymentsContainerDiv = $("#loanPaymentsContainerDiv");
    $.getJSON("/getloanpayments/" + DOMElements.currentObj.id, function (result) {
        for (var key in result) {
            var element = result[key];
            var statusString = '<span class="label label-blue">' +
                moment(new Date(element.createDate)).locale("ka").format("LLL") + '</span>' +
                '<span class="label label-danger">' +
                (element.usedFully ? "გამოყენებულია" : (element.usedSum == 0 ? "არ არის გამოყენებული" : "გამოყენებულია " + element.usedSum + "/"
                + element.sum + "-დან")) + '</span>';
            DOMElements.loanPaymentsContainerDiv.append('<div value="' + key + '" class="movement-item stage-item message-item media">' +
                '<div class="media">' +
                '   <div class="media-body">' +
                '   <div style="width: 30%;font-weight: bold; font-size: 11px;margin-left: 20px;" class="sender">' +
                "გადახდა "
                + element.sum + 'ლარი' +
                '</div>' +
                '<div style="width: 65%;" class="subject">' + statusString + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".movement-item").click(function () {

        })
    })


};

openLoanGlobal = function (currentElement) {
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
    var movementsGridDiv = $("#movementsGridDiv");
    var projectCharts = $("#projectCharts");
    var uzrunvelyofaDataGridDiv = $("#uzrunvelyofaDataGridDiv");
    var projectInfoColumn2Header = $("#projectInfoColumn2Header");
    var clientInfoDataPlace = $("#clientInfoDataPlace");
    var clientInfoButtonsPlace = $("#clientInfoButtonsPlace");
    var loanInfoDiv = $("#loanInfoDiv");
    var loanDoActionsDiv = $("#loanDoActionsDiv");
    var loanInterestsGridDiv = $("#loanInterestsGridDiv");
    var loanPaymentsGridDiv = $("#loanPaymentsGridDiv");
    var DOMElements = {
        buttonsPanelStages: buttonsPanelStages,
        bodyPanelStages: bodyPanelStages,
        bodyPanelActions: bodyPanelActions,
        buttonsPanelActions: buttonsPanelActions,
        bodyPanelAction: bodyPanelAction,
        buttonsPanelAction: buttonsPanelAction,
        projectName: projectName,
        movementsGridDiv: movementsGridDiv,
        projectCharts: projectCharts,
        uzrunvelyofaDataGridDiv: uzrunvelyofaDataGridDiv,
        clientInfoDataPlace: clientInfoDataPlace,
        clientInfoButtonsPlace: clientInfoButtonsPlace,
        currentObj: currentElement,
        loanInfoDiv: loanInfoDiv,
        loanDoActionsDiv: loanDoActionsDiv,
        loanInterestsGridDiv: loanInterestsGridDiv,
        loanPaymentsGridDiv: loanPaymentsGridDiv

    };


    buttonsPanelActions.hide();
    bodyPanelActions.hide();
    buttonsPanelAction.hide();
    bodyPanelAction.hide();
    bodyPanelStages.show();
    buttonsPanelStages.show();
    buttonsPanelStages.html("");
    bodyPanelStages.html("");
    currentLoanID = currentElement["id"];
    projectName.html("<strong style='font-family: font1'>სესხი #" + currentElement["number"] + " // " + (currentElement.closed ? " დახურული" : currentElement.leftSum + " ლარი") + "</strong>");
    loadClientDataForLoan(DOMElements);
    loadLoanInfoData(DOMElements);
    loadUzrunvelyofaDataForLoan(DOMElements);
    loadMovementsDataForLoan(DOMElements);
    loadLoanDoActions(DOMElements);
    loadLoanInterestsGrid(DOMElements);
    loadLoanPaymentsGrid(DOMElements);
    modal6.modal("show");
}

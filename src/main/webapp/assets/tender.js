/**
 * Created by vakhtanggelashvili on 12/24/15.
 */

function loadTenders(index, type) {
    var url = "/getactivetenders?index=" + index + "&type=" + type;
    if (type === 4) {
        url = "/getmywontenders"
    }
    $.getJSON(url, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < tenderColumns.length; i++) {
            var currentElement = tenderColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button '
                + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            loadProductRequestsData($(this).val())

        });
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr>" +
                "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement["name"] + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + moment(new Date(currentElement["createDate"])).locale("ka").format("LLLL") + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + moment(new Date(currentElement["startDate"])).locale("ka").format("LLLL") + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + moment(new Date(currentElement["endDate"])).locale("ka").format("LLLL") + "</td>" +
                "</tr>");
        }
        var gridRow = $('.gridRow');
        var tenderDataTable = $("#tenderDataTable");
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {

            var currentElement = dataArray[$(this).attr("value")];
            $.getJSON("/tenderpr?id=" + currentElement["id"], function (result) {
                currentTender=parseInt(currentElement["id"]);
                currentElement['productRequests'] = result;
                var modal6 = $("#myModal6");
                var tab2_2 = $("#tab2_2");
                var tab2_3 = $("#tab2_3");
                tab2_2.html('<div id="tenderRequestsTree"></div>');
                tab2_3.html('<div id="tenderProductsTree"></div>');
                tenderDataTable.html("");
                $("#tenderPartNav").remove();
                $("#tab2_4").remove();
                for (key in currentElement) {

                    tenderDataTable.append(returnTenderDataListItem(key, currentElement[key]));
                }
                if (readCookie("projectUserType") === "1" && type == 1) {
                    tenderDataTable.append("<tr><td>მოქმედებები</td><td><button id='deleteTenderBtn' class='btn'>წაშლა</button></td></tr>");
                    $("#deleteTenderBtn").click(function () {
                        $.getJSON("/deletetender?id=" + currentElement["id"], function (result) {
                            if (result) {
                                loadTenders(0, 1);
                                modal6.modal("hide");
                            }
                        })
                    })
                }
                if (readCookie("projectUserType") === "4" && type == 2) {
                    var tenderTabs = $("#tenderTabs");
                    var tenderNavigation = $("#tenderNavigation");
                    tenderNavigation.append('<li id="tenderPartNav" class=""><a href="#tab2_4" data-toggle="tab" aria-expanded="false">მონაწილეობა</a></li>');
                    tenderTabs.append('<div class="tab-pane fade" id="tab2_4">' +
                        '<div id="remainingTime"></div>' +
                        '<div>ტენდერში მონაწილეობის დროს შესაძლებელია 3 შეთავაზების გაკეთება თითოეულ პროდუქციის ტიპზე</div>' +
                        '<div><br><button id="hideShow" class="btn btn-dark">დამალვა</button></div>' +
                        '<table class="table">' +
                        '<thead><tr><th>#</th><th>პროდუქციის ტიპი</th><th>შეთავაზება</th><th>მიმდინარე</th></tr></thead>' +
                        '<tbody id="tenderPartTable"></tbody>' +
                        '</table>' +
                        '</div>');
                    var hidden = false;
                    $("#hideShow").click(function () {
                        var array = [];
                        $(".hideShowCheckbox").each(
                            function () {
                                if (hidden) {
                                    $("#" + this.value + "id").show();
                                } else {
                                    if (!this.checked) {
                                        $("#" + this.value + "id").hide();

                                    } else {
                                        array[this.value] = this.value;
                                    }
                                }
                            }
                        );
                        if (hidden) {
                            $(this).html("დამალვა");
                            hidden = false;
                        } else {
                            $(this).html("ჩვენება");
                            hidden = true;
                        }
                        console.log(array);
                        if (array.length) {
                            createCookie("tender" + currentElement["id"], JSON.stringify(array));
                        }

                    });
                   /* var t = setInterval(function () {
                        $.getJSON('/gettenderbestbids?id=' + currentElement["id"], function (result) {

                            for (key in result) {
                                $("#productBestBid" + result[key]['productID']).html(result[key]['bid']);

                                if (parseInt(result[key]["userID"]) === parseInt(readCookie("userId"))) {
                                    $("#" + result[key]['productID'] + "id").css("background", "green")
                                } else {
                                    $("#" + result[key]['productID'] + "id").css("background", "red")
                                }
                            }
                        })
                    }, 8000);*/
                    connect();
                    var t2 = setInterval(function () {
                        $.getJSON("/getremainingtimefortender?id=" + currentElement["id"], function (result) {

                            if (result > 0)
                                $("#remainingTime").html("<h2>" + secondsToString(result) + "</h2>");
                            else {
                                $("#tab2_4").html("ტენდერი დასრულებულია ნახეთ შედეგები მოგებული ტენდერების გვერდზე")
                                clearInterval(t);
                                clearInterval(t2);
                            }
                        })
                    }, 1000);
                    modal6.on('hidden.bs.modal', function () {
                        disconnect();
                        //clearInterval(t);
                        clearInterval(t2);
                        loadTenders(index, type);
                    });

                }
                if ((readCookie("projectUserType") === "1" ||readCookie("projectUserType") === "2" || readCookie("projectUserType") === "6") && (type == 1 || type == 2)) {
                    var tenderTabs = $("#tenderTabs");
                    var tenderNavigation = $("#tenderNavigation");
                    tenderNavigation.append('<li id="tenderPartNav" class=""><a href="#tab2_4" data-toggle="tab" aria-expanded="false">მონიტორინგი</a></li>');
                    tenderTabs.append('<div class="tab-pane fade" id="tab2_4">' +
                        '<div id="remainingTime"></div>' +
                        '<div>ტენდერში მონაწილეობის დროს შესაძლებელია 3 შეთავაზების გაკეთება თითოეულ პროდუქციის ტიპზე</div>' +
                        '<div><br><button id="hideShow" class="btn btn-dark">დამალვა</button></div>' +
                        '<table class="table">' +
                        '<thead><tr><th>#</th><th>პროდუქციის ტიპი</th><th>მიმდინარე</th><th>მომხმარებელი</th>'+(readCookie("projectUserType") === "1" ||readCookie("projectUserType") === "2"?"<th>მოქმედება</th>":"")+'</tr></thead>' +
                        '<tbody id="tenderPartTable"></tbody>' +
                        '</table>' +
                        '</div>');
                    var hidden = false;
                    $("#hideShow").click(function () {
                        var array = [];
                        $(".hideShowCheckbox").each(
                            function () {
                                if (hidden) {
                                    $("#" + this.value + "id").show();
                                } else {
                                    if (!this.checked) {
                                        $("#" + this.value + "id").hide();

                                    } else {
                                        array[this.value] = this.value;
                                    }
                                }
                            }
                        );
                        if (hidden) {
                            $(this).html("დამალვა");
                            hidden = false;
                        } else {
                            $(this).html("ჩვენება");
                            hidden = true;
                        }
                        console.log(array);
                        if (array.length) {
                            createCookie("tender" + currentElement["id"], JSON.stringify(array));
                        }

                    });
                    var t = setInterval(function () {
                        $.getJSON('/gettenderbestbids?id=' + currentElement["id"], function (result) {

                            $(".tdBestBids").html("0.0");
                            $(".tdBestBidUsers").html("");
                            for (key in result) {
                                $("#productBestBid" + result[key]['productID']).html(result[key]['bid']);
                                $("#productBestBidUser" + result[key]['productID']).html(result[key]['userName']);
                            }
                        })
                    }, 8000);
                    var t2 = setInterval(function () {
                        $.getJSON("/getremainingtimefortender?id=" + currentElement["id"], function (result) {

                            if (result > 0)
                                $("#remainingTime").html("<h2>" + secondsToString(result) + "</h2>");
                            else {
                                $("#tab2_4").html("ტენდერი დასრულებულია ნახეთ შედეგები მოგებული ტენდერების გვერდზე")
                                clearInterval(t);
                                clearInterval(t2);
                            }
                        })
                    }, 1000);
                    modal6.on('hidden.bs.modal', function () {
                        clearInterval(t);
                        clearInterval(t2);
                        loadTenders(index, type);
                    });

                }

                if ((readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2"|| readCookie("projectUserType") === "6") && type == 3) {
                    $("#tenderRewNav").remove();
                    $("#tab2_5").remove();
                    $("#tenderRewNav2").remove();
                    $("#tab2_6").remove();
                    var tenderTabs = $("#tenderTabs");
                    var tenderNavigation = $("#tenderNavigation");
                    tenderNavigation.append('<li id="tenderRewNav" class=""><a href="#tab2_5" data-toggle="tab" aria-expanded="false">შედეგები</a></li>');
                    tenderTabs.append('<div class="tab-pane fade" id="tab2_5">' +
                        '<div id="exportDiv"><a id="reportDown"><button>რეპორტი</button></a></div>' +
                        '<table class="table">' +
                        '<thead><tr><th>პროდუქციის ტიპი</th><th>გამარჯვებული</th><th>ღირებულება</th></tr></thead>' +
                        '<tbody id="tenderRewTable"></tbody>' +
                        '</table>' +
                        '</div>');
                    var exportData = [];
                    $.getJSON("/gettenderbestbids?id=" + currentElement['id'], function (result) {
                        for (key in result) {
                            $("#tenderRewTable").append("<tr>" +
                                "<td>" + result[key]["productName"] + "</td>" +
                                "<td>" + result[key]["userName"] + "</td>" +
                                "<td>" + result[key]["bid"] + " ლარი</td>" +
                                "</tr>");
                        }
                        $("#reportDown").attr("href", "/gettenderwonreportadmin?id=" + currentElement["id"]);

                    })


                    tenderNavigation.append('<li id="tenderRewNav2" class=""><a href="#tab2_6" data-toggle="tab" aria-expanded="false">შემოთავაზებები</a></li>');
                    tenderTabs.append('<div class="tab-pane fade" id="tab2_6">' +
                        '<!--kaxa-->' +
                        '<table class="table">' +
                        '<thead><tr><th>პროდუქციის ტიპი</th><th>მომხმარებელი</th><th>შემოთავაზება</th></tr></thead>' +
                        '<tbody id="tenderHistTable"></tbody>' +
                        '</table>' +
                        '</div>');
                    $.getJSON("/gettenderhistory?id=" + currentElement['id'], function (result) {
                        for (key in result) {
                            $("#tenderHistTable").append("<tr>" +
                                "<td>" + result[key]["productName"] + "</td>" +
                                "<td>" + result[key]["userName"] + "</td>" +
                                "<td>" + result[key]["bid"] + " ლარი</td>" +
                                "</tr>");
                        }
                        $("#reportDown").attr("href", "/gettenderwonreportadmin?id=" + currentElement["id"]);

                    })


                }
                var tenderRequestsTree = $("#tenderRequestsTree");
                var tenderProductsTree = $("#tenderProductsTree");
                //tenderRequestsTree.html("");
                var tenderTreeObject = {
                    'core': {
                        'data': []
                    }
                };
                var tenderProductsTreeObject = {
                    'core': {
                        'data': []
                    }
                };
                var tenderProductsDataObject = {};
                for (key in currentElement['productRequests']) {


                    var productRequest = {
                        'text': currentElement['productRequests'][key].userName + " " + moment(new Date(currentElement['productRequests'][key]["requestDate"])).locale("ka").format("LLLL"),
                        "icon": "fa fa-folder-o c-purple",
                        'state': {
                            'selected': false
                        },
                        'children': []
                    };
                    for (key2 in currentElement['productRequests'][key]["productRequestElements"]) {
                        if (tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]) {
                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]['sum']
                                = tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]['sum'] +
                                parseInt(currentElement['productRequests'][key]["productRequestElements"][key2]['quantity']);
                        } else {

                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]] = {};
                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]["id"] =
                                currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["id"];
                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]['sum']
                                = parseInt(currentElement['productRequests'][key]["productRequestElements"][key2]['quantity']);
                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]['quantType']
                                = quantTypes[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["quantType"]];
                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]['id']
                                = currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["id"];
                            tenderProductsDataObject[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"]]["imported"] =
                                currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["imported"];
                        }


                        productRequest["children"].push({
                            'text': (currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["imported"] ? "(IMP)" : " (GEO)")
                            + (currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["name"] +
                            " " + (currentElement['productRequests'][key]["productRequestElements"][key2]['quantity'] + " "
                            + quantTypes[currentElement['productRequests'][key]["productRequestElements"][key2]["product"]["quantType"]])),
                            "icon": "fa fa-calendar"
                        });

                        //fa fa-calendar
                    }
                    tenderTreeObject['core']['data'].push(productRequest);
                }
                var checkedValues = readCookie("tender" + currentElement["id"]);
                var checkedValuesArray = [];
                if (checkedValues) {
                    checkedValuesArray = JSON.parse(checkedValues);
                }
                console.log(tenderProductsDataObject);
                if (readCookie("projectUserType") === "4" && type == 2) {
                    for (key in tenderProductsDataObject) {
                        console.log(tenderProductsDataObject[key]);
                        $("#tenderPartTable").append("<tr id='" + tenderProductsDataObject[key]["id"] + "id'>" +
                            "<td><input " + (checkedValuesArray[tenderProductsDataObject[key]["id"]] ? "checked" : "") + " class='hideShowCheckbox' value='" + tenderProductsDataObject[key]["id"] + "' id='" + tenderProductsDataObject[key]["id"] + "idCheck' type='checkbox'></td>" +
                            "<td>" + key + " " + (tenderProductsDataObject[key]['imported'] ? "(IMP)" : "(GEO)") + " " + tenderProductsDataObject[key]['sum'] + " " + tenderProductsDataObject[key]['quantType'] + "</td>" +
                            "<td><input id='input" + tenderProductsDataObject[key]['id'] + "' pattern='[0-9]+([\.,][0-9]+)?' step='0.01' class='form-control' style='width: 50%;' type='number'>" +
                            "<button value='"
                            + tenderProductsDataObject[key]['id'] + "' class='submitBid btn btn-dark'>შეთავაზების გაკეთება</button></td>" +
                            "<td id='productBestBid" + tenderProductsDataObject[key]['id'] + "'>0.0</td>" +
                            "</tr>");

                        tenderProductsTreeObject['core']['data'].push({
                            'text': key + " " + tenderProductsDataObject[key]['sum'] + " " + tenderProductsDataObject[key]['quantType'],
                            "icon": "fa fa-star-o",
                            'state': {
                                'selected': false
                            }
                        });

                    }
                    $.getJSON('/gettenderbestbids?id=' + currentElement["id"], function (result) {

                        for (key in result) {
                            $("#productBestBid" + result[key]['productID']).html(result[key]['bid']);

                            if (parseInt(result[key]["userID"]) === parseInt(readCookie("userId"))) {
                                $("#" + result[key]['productID'] + "id").css("background", "green")
                            } else {
                                $("#" + result[key]['productID'] + "id").css("background", "red")
                            }
                        }
                    })
                    $(".submitBid").click(function () {
                        var currentObject = this;
                        if (parseFloat($("#input" + $(currentObject).attr("value")).val()) && parseFloat($("#input" + $(currentObject).attr("value")).val()) > 0) {
                            /*$.ajax({
                                url: "/makebid",
                                data: {
                                    tenderId: currentElement['id'],
                                    productId: $(this).attr("value"),
                                    bidSum: $("#input" + $(currentObject).attr("value")).val()
                                }
                            }).done(function (result) {
                                if (result) {
                                    $("#input" + $(currentObject).attr("value")).val("");
                                    alert("შემოთავაზება მიღებულია");
                                } else {
                                    alert("თქვენი შემოთავაზება არ არის მიღებული. თითო პროდუქტზე შესაძლებელია 3 შეთავაზების გაკეთება. შეთავაზება უნდა იყოს ნაკლები მიმდინარე შემოთავაზებაზე.");
                                }
                            })*/
                            sendBid({
                                sessionId:parseInt(readCookie("projectSessionId")),
                                tenderId: parseInt(currentElement['id']),
                                productId: parseInt($(this).attr("value")),
                                bidSum: parseFloat($("#input" + $(currentObject).attr("value")).val())
                            });
                            $("#input" + $(currentObject).attr("value")).val("");
                        } else {
                            alert("შეიყვანეთ სწორი მნიშვნელობა");
                        }

                    });
                }
                if ((readCookie("projectUserType") === "1" ||readCookie("projectUserType") === "2" || readCookie("projectUserType") === "6") && (type == 1 || type == 2)) {
                    for (key in tenderProductsDataObject) {
                        console.log(tenderProductsDataObject[key]);
                        $("#tenderPartTable").append("<tr id='" + tenderProductsDataObject[key]["id"] + "id'>" +
                            "<td><input " + (checkedValuesArray[tenderProductsDataObject[key]["id"]] ? "checked" : "") + " class='hideShowCheckbox' value='" + tenderProductsDataObject[key]["id"] + "' id='" + tenderProductsDataObject[key]["id"] + "idCheck' type='checkbox'></td>" +
                            "<td>" + key + " " + (tenderProductsDataObject[key]['imported'] ? "(IMP)" : "(GEO)") + " " + tenderProductsDataObject[key]['sum'] + " " + tenderProductsDataObject[key]['quantType'] + "</td>" +
                            "<td class='tdBestBids' id='productBestBid" + tenderProductsDataObject[key]['id'] + "'>0.0</td>" +
                            "<td class='tdBestBidUsers' id='productBestBidUser" + tenderProductsDataObject[key]['id'] + "'></td>" +
                            (readCookie("projectUserType") === "1" ||readCookie("projectUserType") === "2"?"<td><button value='"
                            + tenderProductsDataObject[key]['id'] + "' class='removeBids btn btn-dark'>შემოთავაზებების განულება</button></td>":"") +
                            "</tr>");

                        tenderProductsTreeObject['core']['data'].push({
                            'text': key + " " + tenderProductsDataObject[key]['sum'] + " " + tenderProductsDataObject[key]['quantType'],
                            "icon": "fa fa-star-o",
                            'state': {
                                'selected': false
                            }
                        });

                    }
                    if(readCookie("projectUserType") === "1"){
                    $(".removeBids").click(function () {
                        var currentObject = this;
                        $.ajax({
                            url: "/removebids",
                            data: {
                                tenderId: currentElement['id'],
                                productId: $(this).attr("value")
                            }
                        }).done(function (result) {
                            if (result) {
                                alert("მოქმედება შესრულებულია");
                            } else {
                                alert("მოხდა შეცდომა");
                            }
                        })


                    });
                    }
                }

                tenderProductsTree.jstree(tenderProductsTreeObject);
                tenderRequestsTree.jstree(tenderTreeObject);
                for (key in currentElement["productRequests"]) {
                    //tenderRequestsTable.append("<tr><td>"+currentElement["productRequests"][key]["filial"]["name"]+"</td>" +
                    //    "<td>"+currentElement["productRequests"][key]["filial"]["name"]+"</td>" +
                    //    "</tr>");
                }
                modal6.modal("show");
            });
        });


    });
    function returnTenderDataListItem(key, data) {
        switch (key) {
            case "active":
                return "<tr><td>სტატუსი: </td><td>" + (data ? "აქტიური" : "არა აქტიური") + "</td></tr>";
            case "createDate":
                return "<tr><td>შექმნის დრო: </td><td>" + moment(new Date(data)).locale("ka").format("LLLL") + "</td></tr>";
            case "startDate":
                return "<tr><td>დაწყების დრო: </td><td>" + moment(new Date(data)).locale("ka").format("LLLL") + "</td></tr>";
            case "endDate":
                return "<tr><td>დასრულების დრო: </td><td>" + moment(new Date(data)).locale("ka").format("LLLL") + "</td></tr>";
            case "name":
                return "<tr><td>ტენდერის სახელი:</td><td>" + data + "</td></tr>";
            case "ended":
                return "<tr><td>დასრულებული: </td><td>" + (data ? "დასრულდა" : "არ დასრულებულა") + "</td></tr>";
            case "bids":
                return "<tr><td>ბიჯების რაოდენობა:</td><td>" + data.length + "</td></tr>";
            case "winningBid":
                return "<tr><td>ტენდერი მოგიო:</td><td>" + (data ? (data.user.name + " " + data.user.surname) : "არ არის ცნობილი") + "</td></tr>";
        }
    }
}
function secondsToString(seconds) {
    var numdays = Math.floor((seconds) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    return numdays + " დღე " + numhours + " საათი " + numminutes + " წუთი " + numseconds + " წამი";

}

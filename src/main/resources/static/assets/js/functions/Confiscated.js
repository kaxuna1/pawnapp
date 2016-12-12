/**
 * Created by kaxa on 11/29/16.
 */
function loadConfiscatedData(index, search, noAnimation) {

    var dynamicFilters = addDynamicFilters($("#dynamicFilterRow").html(""),
        {
            type: {
                name: "ტიპი",
                type: "comboBox",
                valueField: "id",
                nameField: "name",
                handler: function (newVal) {
                    console.log(newVal);
                    dataLoading(0, search);
                    if (newVal === 3) {
                        dynamicFilters.sinji.show();
                        dynamicFilters.name.show();
                    }
                    if (newVal === 1 || newVal === 2) {
                        dynamicFilters.brand.show();
                        dynamicFilters.model.show();
                    }

                },
                data: [
                    {id: "1", name: "მობილური"},
                    {id: "2", name: "ლეპტოპი"},
                    {id: "3", name: "ოქრო"},
                    {id: "4", name: "საოჟახო ტექნიკა"},
                    {id: "5", name: "სხვა"}
                ]
            },
            brand: {
                name: "ბრენდი",
                type: "comboBox",
                valueField: "id",
                nameField: "name",
                url: "/getbrands/0",
                handler: function () {
                    dataLoading(0, search);
                }
            },
            sinji: {
                name: "სინჯი",
                type: "comboBox",
                valueField: "id",
                nameField: "name",
                url: "/getSinjebi",
                handler: function () {
                    dataLoading(0, search);
                }
            },
            model: {
                name: "მოდელი",
                type: "text",
                handler: function () {
                    dataLoading(0, search);
                }
            },
            name: {
                name: "სახელი",
                type: "text",
                handler: function () {
                    dataLoading(0, search);
                }
            }
        });

    $("#datvirtuliCheck").unbind().on('ifChanged', function () {
        dataLoading();
    });
    $("#confiscatedCheck").unbind().on('ifChanged', function () {
        dataLoading();
    });
    $("#forSaleCheck").unbind().on('ifChanged', function () {
        dataLoading();
    });
    $("#soldCheck").unbind().on('ifChanged', function () {
        dataLoading();
    });
    $("#freeCheck").unbind().on('ifChanged', function () {
        dataLoading();
    });
    $("#takenCheck").unbind().on('ifChanged', function () {
        dataLoading();
    });


    $("#addNewDiv").html(
        '');
    if (noAnimation)
        dataLoading()
    else
        $("#mainPanel").slideUp("fast", function () {
            dataLoading()
        });
    function dataLoading() {
        $.getJSON("spec?index=" + index +
            "&datvirtuli=" +
            ($("#datvirtuliCheck").is(":checked") ? "true" : "false") +
            "&dakavebuli=" +
            ($("#confiscatedCheck").is(":checked") ? "true" : "false") +
            "&gasayidi=" +
            ($("#forSaleCheck").is(":checked") ? "true" : "false") +
            "&gayiduli=" +
            ($("#soldCheck").is(":checked") ? "true" : "false") +
            "&free=" +
            ($("#freeCheck").is(":checked") ? "true" : "false") +
            "&taken=" +
            ($("#takenCheck").is(":checked") ? "true" : "false") +
            "&brand=" + dynamicFilters.brand.val() +
            "&model=" + dynamicFilters.model.val() +
            "&name=" + dynamicFilters.name.val() +
            "&type=" + dynamicFilters.type.val() +
            "&sinji=" + dynamicFilters.sinji.val() +
            "&search=" + search, function (result) {
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < confiscatedColumns.length; i++) {
                var currentElement = confiscatedColumns[i];
                $("#dataGridHeader").append('<th style="font-family: font1;">' + currentElement + "</th>")
            }
            currentData = result;
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                var name = "";

                var type = ""
                if (currentElement.type === 3) {
                    type += "<img style='height: 20px' src='assets/images/gold.png' />";
                    name += "<span style='font-family: font1;'>" + currentElement.name + " სინჯი: " +
                        currentElement.sinji.name + " " + currentElement.mass + " გრამი</span>";
                }
                if (currentElement.type === 1) {
                    type += "<img style='height: 20px' src='assets/images/phone.png' />";
                    name += "<span style='font-family: font1;'>" + currentElement.brand.name + " " +
                        currentElement.model + " imei:" + currentElement.imei + "</span>";
                }
                if (currentElement.type === 2) {
                    type += "<img style='height: 20px' src='assets/images/lap.png' />";
                    name += "<span style='font-family: font1;'>კომპ: " + currentElement.brand.name + " " +
                        currentElement.model + " cpu: " + currentElement.cpu + "</span>";
                }
                if (currentElement.type === 4) {
                    type += "<img style='height: 20px' src='assets/images/homeTech.png' />";
                }

                $("#dataGridBody").append("<tr>" +
                    "<td><input value='" + currentElement["id"] + "' class='checkboxUz' type='checkbox' /></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + type + " " + name + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["number"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class=''>" +
                    "<a value='" + i + "' class='uzLoanNumber'>" + currentElement["loanNumber"] + "</a></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["sum"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["addedSum"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["payedSum"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + loanStatuses[currentElement["status"]] + "</td>" +
                    "</tr>");


            }
            if (!noAnimation)
                $("#mainPanel").slideDown("slow");
            var checkboxParcel = $(".checkboxParcel");
            checkboxParcel.unbind();
            checkboxParcel.change(function () {

            });
            var gridRow = $('.gridRowClientUz2');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            gridRow.click(function () {

            });
            var loanButton = $('.uzLoanNumber');
            loanButton.css('cursor', 'pointer');
            loanButton.unbind();
            loanButton.click(function () {
                $.getJSON("/getloan/" + dataArray[$(this).attr("value")].loanId, function (result) {
                    openLoanGlobal(result)
                })
            });
            for (i = 0; i < totalPages; i++) {
                if (i > index - 3 && i < index + 3 || i === 0 || i === (totalPages - 1))
                    $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');

            }
            $(".paginate_button").click(function () {
                //console.log($(this).val())
                currentPage = $(this).val();
                loadConfiscatedData(currentPage, search)

            });

        })
    }
}
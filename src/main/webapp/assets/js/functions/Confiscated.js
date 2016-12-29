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
                url: "/getbrands/0"
            },
            sinji: {
                name: "სინჯი",
                type: "comboBox",
                valueField: "id",
                nameField: "name",
                url: "/getSinjebi"
            },

            mass: {
                name: "წონა",
                type: "text",
                operator:{
                    type:"comboBox",
                    data:{
                        1:"=",
                        2:">",
                        3:"<"
                    }
                }
            },
            hdd: {
                name: "HDD",
                type: "text",
                operator:{
                    type:"comboBox",
                    data:{
                        1:"=",
                        2:">",
                        3:"<"
                    }
                }
            },
            model: {
                name: "მოდელი",
                type: "text"
            },
            cpu: {
                name: "CPU",
                type: "text"
            },
            gpu: {
                name: "GPU",
                type: "text"
            },
            name: {
                name: "სახელი",
                type: "text"
            }
        });
    dynamicFilters.brand.par.hide();
    dynamicFilters.model.par.hide();
    dynamicFilters.name.par.hide();
    dynamicFilters.sinji.par.hide();
    dynamicFilters.cpu.par.hide();
    dynamicFilters.gpu.par.hide();
    dynamicFilters.mass.par.hide();
    dynamicFilters.hdd.par.hide();

    dynamicFilters.type.change(function () {
        dynamicFilters.brand.par.hide();
        dynamicFilters.model.par.hide();
        dynamicFilters.name.par.hide();
        dynamicFilters.sinji.par.hide();
        dynamicFilters.cpu.par.hide();
        dynamicFilters.gpu.par.hide();
        dynamicFilters.mass.par.hide();
        dynamicFilters.hdd.par.hide();
        if($(this).val()==="3"){
            dynamicFilters.sinji.par.show();
            dynamicFilters.name.par.show();
            dynamicFilters.sinji.select2();
            dynamicFilters.mass.par.show();
        }
        if($(this).val()==="1"||$(this).val()==="2"||$(this).val()==="4"){
            dynamicFilters.brand.par.show();
            dynamicFilters.model.par.show();
            dynamicFilters.brand.select2();
        }
        if($(this).val()==="5"){
            dynamicFilters.name.par.show();
        }
        if($(this).val()==="2"){
            dynamicFilters.cpu.par.show();
            dynamicFilters.gpu.par.show();
            dynamicFilters.hdd.par.show();
        }
        dataLoading()
    });
    dynamicFilters.brand.change(function () {
        dataLoading();
    });
    dynamicFilters.model.change(function () {
        dataLoading();
    });
    dynamicFilters.name.change(function () {
        dataLoading();
    });
    dynamicFilters.sinji.par.change(function () {
        dataLoading();
    });
    dynamicFilters.cpu.change(function () {
        dataLoading();
    });
    dynamicFilters.gpu.change(function () {
        dataLoading();
    });
    dynamicFilters.mass.change(function () {
        dataLoading();
    });
    dynamicFilters.hdd.change(function () {
        dataLoading();
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
            "&cpu=" + dynamicFilters.cpu.val() +
            "&gpu=" + dynamicFilters.gpu.val() +
            "&mass=" + dynamicFilters.mass.val() +
            "&massOp=" + dynamicFilters.mass.operatorObj.attr("value") +
            "&hdd=" + dynamicFilters.hdd.val() +
            "&hddOp=" + dynamicFilters.hdd.operatorObj.attr("value") +
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
                        currentElement.model + "/ cpu: " + currentElement.cpu +" gpu: " + currentElement.gpu +" hdd:"+currentElement.hdd+ "</span>";
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
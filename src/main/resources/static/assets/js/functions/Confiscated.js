/**
 * Created by kaxa on 11/29/16.
 */
function loadConfiscatedData(index, search, noAnimation) {


    $("#datvirtuliCheck").unbind().on('ifChanged', function () {
        loadConfiscatedData(0, search);
    });
    $("#confiscatedCheck").unbind().on('ifChanged', function () {
        loadConfiscatedData(0, search);
    });
    $("#forSaleCheck").unbind().on('ifChanged', function () {
        loadConfiscatedData(0, search);
    });
    $("#soldCheck").unbind().on('ifChanged', function () {
        loadConfiscatedData(0, search);
    });
    $("#freeCheck").unbind().on('ifChanged', function () {
        loadConfiscatedData(0, search);
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
        $.getJSON("getdakavebulinivtebi?index=" + index +
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
                console.log(new Date(currentElement["createDate"]));
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
                        currentElement.model+" cpu: "+ currentElement.cpu + "</span>";
                }
                if (currentElement.type === 4) {
                    type += "<img style='height: 20px' src='assets/images/homeTech.png' />";
                }
                console.log(currentElement["createDate"]);

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
            gridRow.click(function (){

            });
            var loanButton = $('.uzLoanNumber');
            loanButton.css('cursor', 'pointer');
            loanButton.unbind();
            loanButton.click(function (){
                $.getJSON("/getloan/"+dataArray[$(this).attr("value")].loanId,function(result){
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
/**
 * Created by kaxa on 11/29/16.
 */
function loadConfiscatedData(index,search,noAnimation){
    $("#addNewDiv").html(
        '');
    if (noAnimation)
        dataLoading()
    else
        $("#mainPanel").slideUp("fast",function () {
            dataLoading()
        });
    function dataLoading() {
        $.getJSON("getdakavebulinivtebi?index=" + index +"&search=" + search, function (result) {
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
                console.log(new Date(currentElement["createDate"]))

                console.log(currentElement["createDate"])
                $("#dataGridBody").append("<tr style='" + (currentElement.overdue ? "background-color: red;" : "") + "'>" +
                    "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRow'>" +
                    '<i class="fa fa-balance-scale" aria-hidden="true"></i> ' + currentElement["model"] +
                    "</td>" +
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
                $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
            }
            $(".paginate_button").click(function () {
                //console.log($(this).val())
                currentPage = $(this).val();
                loadLoansData(currentPage, search)

            });

        })
    }
}
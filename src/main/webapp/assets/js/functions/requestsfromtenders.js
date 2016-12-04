/**
 * Created by kakha on 2/9/2016.
 */
function requestsfromtenders(){
    $.getJSON("/getrequestsfromtender", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < requestFromTenderColumns.length; i++) {
            var currentElement = requestFromTenderColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            if(readCookie("projectUserType") === "1"||readCookie("projectUserType") === "2")
                $("#dataGridBody").append("<tr>" +
                    "<td><input value='"  + "' class='checkboxParcel' type='checkbox' /></td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["tender"]["name"] + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + (currentElement["productRequestElement"].product.name +
                    (currentElement["productRequestElement"].product["imported"] ? " (IMP)" : " (GEO)")) + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["productRequestElement"].quantity + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["filial"].name + "</td>"+
                    "</tr>");
            else
                $("#dataGridBody").append("<tr>" +
                    "<td><input value='"  + "' class='checkboxParcel' type='checkbox' /></td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["tender"]["name"] + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + (currentElement["productRequestElement"].product.name +
                    (currentElement["productRequestElement"].product["imported"] ? " (IMP)" : " (GEO)")) + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["productRequestElement"].quantity + "</td>" +
                    "<td value='" + i + "' class='gridRow'>" + currentElement["filial"].name + "</td>"+
                    "<td> <button  value='" + currentElement["productRequestElement"].id +
                    "' class='btn acceptReq'>დადასტურება</button><button  value='" + currentElement["productRequestElement"].id +
                    "' class='btn declineReq'>უარყოფა</button></td>" +
                    "</tr>");


        }
        $(".acceptReq").click(function () {

            $.ajax({
                url: "/confirmRequestElement",
                data: {
                    id: $(this).attr("value")
                }
            }).done(function (result) {
                requestsfromtenders();
            });
        });
        $(".declineReq").click(function () {

            $.ajax({
                url: "/declineRequestElement",
                data: {
                    id: $(this).attr("value")
                }
            }).done(function (result) {
                requestsfromtenders();
            });
        });
        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();

    })
}
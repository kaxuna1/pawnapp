/**
 * Created by kakha on 11/12/2015.
 */

function loadAcceptedRequests(index) {
    $.getJSON("/getacceptedproductrequests?index="+index, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < productRequestsColumns.length; i++) {
            var currentElement = productRequestsColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button '
                + (index == i ? 'active"' : '') + '"<a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadProductRequestsData($(this).val())

        });
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr>" +
                "<td><input value='"+currentElement["id"]+"' class='checkboxParcel' type='checkbox' /></td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement.filialName+ "</td>" +
                "<td value='" + i + "' class='gridRow'>" + moment(new Date(currentElement["requestDate"])).locale("ka").format("LLLL") + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement["productRequestElements"].length + "</td>" +
                "</tr>");
        }
        var gridRow=$('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var modal5=$("#myModal5");
            console.log(dataArray[$(this).attr("value")]);
            var currentElement = dataArray[$(this).attr("value")];
            var myModalLabel5=$("#myModalLabel5");
            myModalLabel5.html("მოთხოვნა ფილიალისგან "+currentElement.filialName);
            var productsRequestDataTable=$("#productsRequestDataTable3");
            productsRequestDataTable.html("");
            for(key in currentElement['productRequestElements']){
                console.log(currentElement['productRequestElements'][key]);
                productsRequestDataTable.append("<tr><td>"
                    +currentElement['productRequestElements'][key]["product"]["name"]
                        +(currentElement['productRequestElements'][key]["product"]["imported"]?"(IMP)":"(GEO)")
                    +"</td>" +
                    "<td>" +
                    currentElement['productRequestElements'][key]['quantity'] +" "
                    +quantTypes[currentElement['productRequestElements'][key]["product"]["quantType"]]+
                    "</td></tr>")
            }
            $.getJSON("/getactivetenderslistforadding", function (result) {
                $("#chooseTenderButtons").html("");
                for(key in result){
                    $("#chooseTenderButtons").append("<tr value='"+result[key]["id"]+"' class='tenderRow'><td>"+result[key]["name"]+"</td></tr>")
                }
                var tenderRow=$('.tenderRow');
                tenderRow.css('cursor', 'pointer');
                tenderRow.unbind();
                tenderRow.click(function(){
                    $.ajax({
                        url:"/addrequesttotender",
                        data:{
                            productRequestId:currentElement["id"],
                            tenderId:$(this).attr("value")
                        }
                    }).done(function (result) {
                        if(result){
                            loadAcceptedRequests(0);
                            alert("წარმატებით დასრულდა მინიჭება");
                            modal5.modal("hide");
                        }else{

                        }
                    })
                });
            });
            modal5.modal("show");

        });

    })
}
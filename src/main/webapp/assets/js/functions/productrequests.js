/**
 * Created by kakha on 11/12/2015.
 */

function loadProductRequestsData(index,sort) {
    $.getJSON("/getallproductrequests?index=" + index+"&sort="+sort, function (result) {
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
            loadProductRequestsData($(this).val(),sort)

        });

        var filialUser=false;
        if(readCookie("projectUserType") === "3"){
            filialUser=true;
        }
        console.log(filialUser)
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            var red=false;
            var green=false;
            if(filialUser){
                if(!currentElement["accepted"]&&!currentElement["active"]){
                   red=true;
                }
                if(currentElement["accepted"]){
                    green=true;
                }
            }
            var tr="<tr>";
            if(red){
                tr="<tr style='background: red;'>"
            }
            if(green){
                tr="<tr style='background: green;'>"
            }

            $("#dataGridBody").append(
                tr +
                "<td><input value='"+currentElement["id"]+"' class='checkboxParcel' type='checkbox' /></td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement.userName + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + moment(new Date(currentElement["requestDate"])).locale("ka").format("LLLL")+ "</td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement["productRequestElements"].length + "</td>" +
                "</>");
        }
        var gridRow=$('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var modal3=$("#myModal3");
            var confirmBtn=$("#confirmBtn").unbind();
            var declineBtn=$("#declineBtn").unbind();
            var resendBtn=$("#resendBtn").unbind();
            var editBtn=$("#editBtn").unbind();


            console.log(dataArray[$(this).attr("value")]);
            var currentElement = dataArray[$(this).attr("value")];

            if(readCookie("projectUserType") === "1"||readCookie("projectUserType") === "2"){
                $.getJSON("requestseen?id="+currentElement["id"], function (result) {

                })

            }


            var myModalLabel3=$("#myModalLabel3");
            myModalLabel3.html("ფილიალი "+currentElement.filialName+(!currentElement["accaptedByAdmin"]?" <strong>(ტენდერს გარე მოთხოვნა)</strong>":""));

            if(readCookie("projectUserType") === "3"){
                $.getJSON("requestseenbyuser?id="+currentElement["id"], function (result) {

                })
                confirmBtn.remove();
                declineBtn.remove();
                resendBtn.remove();
                editBtn.remove();
                if(filialUser&&currentElement["comment"]){
                    myModalLabel3.html(currentElement["comment"]);
                }
                myModalLabel3.append(currentElement["seenByAdmin"]?" <strong>(ნახა ადმინისტრაციამ)</strong>":" <strong>(არ უნდახია ადმინისტრაციას)</strong>")
                if(!currentElement["accepted"]&&!currentElement["active"]){
                    $("#parcelModelFooter3").append('<button type="button" id="editBtn" class="btn btn-default">ცვლილება</button>');
                    $("#parcelModelFooter3").append('<button type="button" id="resendBtn" class="btn btn-default">თავიდან გაგზავნა</button>');

                    $("#resendBtn").click(function () {
                        $.getJSON("/resendrequest?id="+currentElement["id"],function(result){
                            if(result){
                                modal3.modal("hide");
                                loadProductRequestsData(index,sort);
                            }
                        })
                    })
                }


            }

            var requestsMap={};

            var productsRequestDataTable=$("#productsRequestDataTable");
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
                    "</td></tr>");
                requestsMap[currentElement['productRequestElements'][key]["product"]["id"]]=currentElement['productRequestElements'][key]['quantity'];
            }
            console.log(requestsMap);
            $("#editBtn").click(function(){
                $("#myModalLabel4").html("პროდუქციის მოთხოვნა");
                $.getJSON("/getmyfilialproductslist", function (result) {
                    console.log(result);
                    var filialProductsDataTable = $("#productsRequestDataTable2");
                    filialProductsDataTable.html("");
                    for (key in result) {
                        if(requestsMap[result[key].id]){
                            filialProductsDataTable.append(
                                "<tr><td> " + result[key].name+(result[key]["imported"]?" (IMP)":" (GEO)")+ ":</td><td> <input value='"+requestsMap[result[key].id]+"' class='requestInput' type='number' name='" + result[key].id + "'></td></tr>")

                        }else{
                            filialProductsDataTable.append(
                                "<tr><td> " + result[key].name+(result[key]["imported"]?" (IMP)":" (GEO)")+ ":</td><td> <input class='requestInput' type='number' name='" + result[key].id + "'></td></tr>")

                        }
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
                            url: "/requestProductsEdit",
                            data: {
                                productRequests: JSON.stringify(sendData),
                                id:currentElement["id"]
                            },
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

            confirmBtn.click(function () {
                $.getJSON("/confirmrequest?id="+currentElement["id"],function(result){
                    if(result){
                        loadProductRequestsData(0,sort);
                        alert("წარმატებით მოხდა მონაცემების განახლება");
                        modal3.modal("hide");
                    }
                    else{
                        alert("მოხდა შეცდომა");
                        modal3.modal("hide");
                    }

                })
            });
            declineBtn.click(function () {
                var comment=prompt("შეიყვანეთ კომენტარი","");
                $.getJSON("/declinerequest?id="+currentElement["id"]+"&comment="+comment,function(result){
                    if(result){
                        loadProductRequestsData(0,sort);
                        alert("წარმატებით მოხდა მონაცემების განახლება");
                        modal3.modal("hide");
                    }
                    else{
                        alert("მოხდა შეცდომა");
                        modal3.modal("hide");
                    }

                })
            })

            modal3.modal("show");

        })
    });
}
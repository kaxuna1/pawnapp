/**
 * Created by kakha on 1/14/2016.
 */
function loadTendersWon(index) {
    var url = "/getmywontenders?index=" + index;


    $.getJSON(url, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        currentData = result;
        var dataArray = result;
        var tenders = {};
        for (i = 0; i < tenderColumns.length; i++) {
            var currentElement = tenderColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        var damatebitiMotxovnebi={};


        for (var key in dataArray) {
            $("#dataGridBody").append("<tr>" +
                "<td><input value='" + dataArray[key]["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                "<td value='" + key + "' class='gridRow'>" + dataArray[key]["name"]+ "</td>" +
                "<td value='" + key + "' class='gridRow'>" + moment(new Date(dataArray[key]["createDate"])).locale("ka").format("LLLL") + "</td>" +
                "<td value='" + key + "' class='gridRow'>" + moment(new Date(dataArray[key]["startDate"])).locale("ka").format("LLLL") + "</td>" +
                "<td value='" + key + "' class='gridRow'>" + moment(new Date(dataArray[key]["endDate"])).locale("ka").format("LLLL") + "</td>" +
                "</tr>");
        }
        var gridRow = $('.gridRow');
        var tenderDataTable = $("#tenderDataTable");
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {


            var currentElement = dataArray[$(this).attr("value")];
            var tenderId=currentElement["id"];
            $.getJSON("garedates?id="+tenderId,function(result2){
                var tenderData = {};
                var gareData={};
                for(key in result2){
                    var current=result2[key];
                    current=(parseInt(current)+1000*60*60*24);
                    var current2=moment(new Date(current)).zone(0).locale("ka").format('DD/MM/YYYY')
                    gareData[current2]=current;

                }

                for(key in currentElement.productRequests){

                    if(!tenderData[currentElement.productRequests[key].filialName]){
                        tenderData[currentElement.productRequests[key].filialName]=[]
                    }
                    for(key2 in currentElement.productRequests[key].productRequestElements){
                        tenderData[currentElement.productRequests[key].filialName].push(currentElement.productRequests[key].productRequestElements[key2])
                    }

                }

                showModalWithTableInside(function (header, body) {
                    header.html(currentElement["name"]);
                    body.append("<div>ტენდერ გარე<input id='tgR' type='checkbox'><select id='gareSelect'></select></div>");
                    body.find("#won2TableHead").append("<tr><th>ფილიალი</th></tr>");
                    for(key3 in gareData){
                        $("#gareSelect").append("<option value='"+gareData[key3]+"'>"+key3+"</option>")
                    }

                }, {
                    "ექსპორტი": function () {
                        console.log($("#tgR")["0"].checked)
                        if($("#tgR")["0"].checked){

                            var d=new Date($("#tgDate").val());
                            console.log(d.getTime())
                            var ifrm = document.getElementById("frame1");
                            ifrm.src = "/gettenderwonreportgare?id=" + currentElement["id"]+"&date="+ $( "#gareSelect" ).val();
                        }else{
                            var ifrm = document.getElementById("frame1");
                            ifrm.src = "/gettenderwonreport?id=" + currentElement["id"];
                        }

                    }
                })
            });
            });



        /*gridRow.click(function () {

         });*/

    });
    function getProductsSum(currentElement) {
        var product = currentElement["product"]["id"];
        var productSum = 0;
        for (var key in currentElement["tender"]["productRequests"]) {
            for (var key2 in currentElement["tender"]["productRequests"][key]["productRequestElements"]) {
                if (currentElement["tender"]["productRequests"][key]["productRequestElements"][key2]["product"]["id"] === product) {
                    productSum += currentElement["tender"]["productRequests"][key]["productRequestElements"][key2]["quantity"];
                }
            }
        }
        return productSum + " " + quantTypes[currentElement["product"]["quantType"]];
    }

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
/**
 * Created by kakha on 1/27/2016.
 */
function loadMosatani() {
    $.getJSON("/getfilialmosatani", function (result) {
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ექსპორტი</button>')
            $("#addNewButton").click(function () {
                var ifrm = document.getElementById("frame1");
                ifrm.src = "/getmosatanireport";
            });

            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            currentData = result;
            var dataArray = result;
            for (i = 0; i < tenderColumns.length; i++) {
                var currentElement = tenderColumns[i];
                $("#dataGridHeader").append("<th>" + currentElement + "</th>")
            }

            for (key in dataArray) {
                var currentElement = dataArray[key];
                console.log(currentElement);

                $("#dataGridBody").prepend("<tr>" +
                    "<td><input value='" + currentElement["tender"]["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                    "<td value='" + key + "' class='gridRow'>" + currentElement["tender"]["name"] + "</td>" +
                    "<td value='" + key + "' class='gridRow'>" + moment(new Date(currentElement["tender"]["createDate"])).locale("ka").format("LLLL") + "</td>" +
                    "<td value='" + key + "' class='gridRow'>" + moment(new Date(currentElement["tender"]["startDate"])).locale("ka").format("LLLL") + "</td>" +
                    "<td value='" + key + "' class='gridRow'>" + moment(new Date(currentElement["tender"]["endDate"])).locale("ka").format("LLLL") + "</td>" +
                    "</tr>");

            }
            var gridRow = $('.gridRow');
            var tenderDataTable = $("#tenderDataTable");
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            gridRow.click(function () {
                var currentElement = dataArray[$(this).attr("value")];
                console.log(currentElement);
                showModalWithTableInside(function (header, body) {
                    header.html(currentElement["tender"]["name"]);
                    body.append("<table class='table'><thead id='wonTableHead'></thead><tbody id='wonTableBody'></tbody></table>");
                    body.find("#wonTableHead").append("<tr><th>მომწოდებელი</th><th>#</th></tr>");
                    for (key in currentElement["users"]) {
                        body.find("#wonTableBody").append(
                            "<tr>" +
                            "<td>" +
                            currentElement["users"][key]["name"] + " " + currentElement["users"][key]["surname"] +
                            "</td>" +
                            "<td>" +
                            "<button value='" + currentElement["users"][key]["id"] + "' class='btn exportMomwodebeli'>ექსპორტი</button>" +
                            "</td>" +
                            "</tr>")
                    }
                    $(".exportMomwodebeli").click(function () {
                        var value = $(this).attr("value");
                        console.log(value);
                        var ifrm = document.getElementById("frame1");
                        ifrm.src = "/getmosatanireportbyuserandtender?tender=" + currentElement.tender.id + "&user=" + value;

                    });
                    /*  $.getJSON('/gettenderbestbids?id='+currentElement["tender"]["id"], function (result) {
                     for(key2 in result){
                     $("."+result[key2].product.id+"PId").html(result[key2].user.name+" "+result[key2].user.surname)
                     }
                     })*/
                }, {});

            })
        }
    )
}
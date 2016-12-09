/**
 * Created by kakha on 11/12/2015.
 */

function loadRegionsData() {
    $.getJSON("api/getregions", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < regionColumns.length; i++) {
            var currentElement = regionColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        for (i = 0; i < currentData.length; i++) {
            var currentElement = currentData[i];

            $("#dataGridBody").append("<tr><td>" + currentElement["name"] + "</td></tr>");

        }

    })
}
/**
 * Created by kaxa on 9/2/16.
 */
function loadElementTypes(){
    $.getJSON("/getelements", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < elementColumns.length; i++) {
            var currentElement = elementColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>" + currentElement["barcode"] + "</td><td>"+currentElement["name"] + "</td>"+
                "<td><a value='" + currentElement['id'] + "' class='deleteProduct' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        $(".deleteProduct").click(function () {
            /*)*/
            var deleteValue = $(this).attr("value");
            showBootstrapPrompt("გსურთ წაშალოთ ჩანაწერი", {
                "კი": function () {
                    $.ajax({
                        url: "/deleteelement",
                        data: {
                            id: deleteValue
                        }
                    }).done(function (result) {
                        loadElementTypes();
                    });
                }
            });

        });
        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">დამატება</button>');
        $("#addNewButton").click(function () {
            $("#myModalLabel").html("ახალი მასალის ტიპის დამატება");
            var modalBody = $("#modalBody");
            modalBody.html(elementRegistrationFormTemplate);
            $("#registrationModalSaveButton").unbind();

            $("#registrationModalSaveButton").click(function () {


                var registerData = {
                    bar: $("#barcodeField").val().trim(),
                    name: $("#nameField").val().trim()
                }
                console.log(registerData);
                console.log($("#importedField").is(':checked'));
                var valid = true;
                for (key in registerData) {
                    if (registerData[key] == "") {
                        valid = false
                    }
                }
                if (valid) {
                    $.ajax({
                        url: "createelement",
                        method: "POST",
                        data: registerData
                    }).done(function (msg) {
                        if (msg) {
                            loadElementTypes();
                            $('#myModal').modal("hide");
                        } else {
                            $('#myModal').modal("hide");
                            alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                        }
                    })
                }
                else {
                    alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                }


            });
            $('#myModal').modal("show");

        })
    })
}
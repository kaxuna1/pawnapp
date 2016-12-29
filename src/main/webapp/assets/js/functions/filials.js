/**
 * Created by kakha on 11/12/2015.
 */

function loadFilialsData(index, search) {
    $.getJSON("/getfilials", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < filialColumns.length; i++) {
            var currentElement = filialColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        console.log(result);
        currentData = result;
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>" + currentElement["name"] + "</td><td>"+currentElement["address"] + "</td>"+
                "<td><a value='" + currentElement['id'] + "' class='deleteProduct' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        $(".deleteProduct").click(function () {
            /*)*/
            var deleteValue = $(this).attr("value");
            showBootstrapPrompt("გსურთ წაშალოთ ჩანაწერი", {
                "კი": function () {
                    $.ajax({
                        url: "/deletefilial",
                        data: {
                            id: deleteValue
                        }
                    }).done(function (result) {
                        loadProductsData(index, search);
                    });
                }
            });

        });
        var gridRow=$('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            console.log(dataArray[$(this).attr("value")]);
            var currentElement = dataArray[$(this).attr("value")];
            var myModalLabel2=$("#myModalLabel2");
            myModalLabel2.html("ფილიალი "+currentElement["name"]);

            drawProductsForAdding(currentElement["id"]);
            var addProductToFilialButton=$("#addProductToFilial");
            addProductToFilialButton.unbind();
            addProductToFilialButton.click(function () {
                var checkboxProducts=$(".checkboxProducts");
                var productIds=[];
                checkboxProducts.each(function () {
                    if(this.checked){
                        productIds.push(this.value);
                        this.checked=false;
                    }
                });
                $.ajax({
                    url:"/givefilialproduct",
                    data:{
                        filialId:currentElement["id"],
                        productIds:productIds.toString()
                    }
                }).done(function(result){
                    drawProductsForAdding(currentElement["id"]);
                })
            });

            var removeProductFromFilialButton=$("#removeProductFromFilial");
            removeProductFromFilialButton.unbind();
            removeProductFromFilialButton.click(function () {
                var checkboxProducts=$(".checkboxFilialProducts");
                var productIds=[];
                checkboxProducts.each(function () {
                    if(this.checked){
                        productIds.push(this.value);
                        this.checked=false;
                    }
                });
                $.ajax({
                    url:"/removeproductfromfilial",
                    data:{
                        filialId:currentElement["id"],
                        productIds:productIds.toString()
                    }
                }).done(function(result){
                    drawProductsForAdding(currentElement["id"]);
                })
            })



            $('#myModal2').modal("show");
        })

    })
    function drawProductsForAdding(id){
        $.getJSON("/getproductsnotinfilial?filialId="+id, function (result) {
            console.log(result);
            var productsDataTable=$("#productsDataTable");
            productsDataTable.html("");
            for(key in result){
                productsDataTable.append("<tr><td><input class='checkboxProducts' value='"+result[key].id+"' type='checkbox'> "+result[key].name+"</td></tr>")
            }
        });
        $.getJSON("/getfilialproducts?filialId="+id, function (result) {
            console.log(result);
            var filialProductsDataTable=$("#filialProductsDataTable");
            filialProductsDataTable.html("");
            for(key in result){
                filialProductsDataTable.append("<tr><td><input class='checkboxFilialProducts' value='"+result[key].id+"' type='checkbox'> "+result[key].name+"</td></tr>")
            }
        });

    }

}
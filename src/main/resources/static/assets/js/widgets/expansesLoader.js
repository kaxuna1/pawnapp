/**
 * Created by kaxa on 9/7/16.
 */
function loadExpanses(element, DOMElements) {
    $("#expansesUl").html("");
    var actionDataDiv=$("#actionDataDiv");
    actionDataDiv.html("");
    actionDataDiv.append('<canvas id="myChart" width="200" height="200"></canvas>');
    
    var ctx = document.getElementById("myChart");
   
    
    $.getJSON("/getexpenses/" + element["id"], function (result) {
        var names=[];
        var values=[];
        for(key in result){
            var current=result[key]
            names.push(current.elementName);
            values.push(parseFloat(current.price)*parseFloat(current.quantity))
        }






        var myChart =drawColumnChart(ctx,names,values);
        console.log(result)
        for (key in result) {
            $("#expansesUl").append('<li class="high">  ' +
                '   <span class="span-check">           ' +
                '            <div class="icheckbox_square-blue" style="position: relative;">' +
                '<input id="task-1" type="checkbox"' +
                ' data-checkbox="icheckbox_square-blue" ' +
                ' style="position: absolute; opacity: 0;"> ' +
                ' <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%;' +
                ' height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255);  border: 0px; opacity: 0;"></ins>' +
                ' </div> <label for="task-1" class=""></label> </span>     ' +
                '<span class="todo-task editable editable-click">ტიპი: '+result[key]["elementName"]+'. რაოდენობა: '+
                result[key]["quantity"]+'</span> ' +
                ' <div class="todo-date clearfix"> <div class="completed-date"></div> ' +
                ' <div class="due-date">ერთეულის ღირებულება:  <span class="due-date-span ">'+result[key]["price"]+'</span></div>' +
                ' </div> <span class="todo-options pull-right">' +
                ' <a href="javascript:;" class="todo-delete">' +
                '<i class="icons-office-52"></i></a></span>' +
                '<div class="todo-tags pull-right">' +
                '<div class="label label-success">Work</div>' +
                '</div> </li>');
        }
        if(element.status===1){

            $("#addExpanse").unbind();
            $("#addExpanse").click(function () {
                showModalWithTableInside(function (header, body, modal) {
                    header.html("ახალი ხარჯის დამატება");
                    body.append("<div id='elementForm'></div>");
                    var formBody = $("#elementForm");
                    console.log(body);
                    dynamicCreateForm(formBody, "/createxpanse", {
                        e: {
                            name: "მასალის ტიპი",
                            type: "comboBox",
                            valueField:"id",
                            nameField:"nameBarCode",
                            url:"/getelements"
                        },
                        q: {
                            name: "რაოდენობა",
                            type: "text"
                        },
                        a: {
                            type: "hidden",
                            value: "" + element["id"]
                        }
                    }, function () {
                        modal.modal("hide");
                        loadExpanses(element, DOMElements);
                        drawCurrentProjectElementExpansesColumnChart(DOMElements);
                        listCurrentProjectActiveActions(DOMElements);
                    })


                }, {
                    "დამატებითი ღილაკი": function () {

                    }
                });
            })
        }else{
            $("#addExpanse").remove();
        }
    })
}
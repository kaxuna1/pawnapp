/**
 * Created by kaxa on 9/9/16.
 */
function loadProjectsForPrarab(){
    $.getJSON("/loadPrarabProjects",function (result) {
        console.log(result)
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < projectColumns.length; i++) {
            var currentElement = projectColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }

        $("#dataGridHeader").append("<th>*</th>");
        currentData = result;
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            $("#dataGridBody").append("<tr>" +
                "<td><input value='" + currentElement["id"] + "' class='checkboxParcel' type='checkbox' /></td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement["name"] + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement["address"] + "</td>" +
                "<td value='" + i + "' class='gridRow'>" + currentElement["sakadastro"] + "</td>" +
                "<td><a value='" + currentElement['id'] + "' class='endOfLineButton' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        var checkboxParcel = $(".checkboxParcel");
        checkboxParcel.unbind();
        checkboxParcel.change(function () {

        });
        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            currentProjectID=currentElement.id;
            var modal7 = $("#myModal7");
            var tab7_1 = $("#tab7_1");
            var tab7_2 = $("#tab7_2");
            var tab7_3 = $("#tab7_3");
            var projectName = $("#projectName2");
            var currentActiveActions = $("#currentActiveActions2");
            var DOMElements = {
                projectName:projectName,
                currentActiveActions:currentActiveActions
            };
            listCurrentProjectActiveActionsForPrarab(DOMElements);
            projectName.html(currentElement.name);
            modal7.modal("show");
            
        })

    })
}
function listCurrentProjectActiveActionsForPrarab(DOMElements){
    //DOMElements.currentActiveActions.html("kaxa")
    $.getJSON("/getprojectactionsforprarab/"+currentProjectID,function (result) {
        DOMElements.currentActiveActions.html(projectActiveActionsTemplate);
        var lastActionsContainerDiv=$("#lastActionsContainerDiv");
        var lastActionsTableAction1=$("#lastActionsTableAction1");
        var lastActionsTableAction2=$("#lastActionsTableAction2");
        var lastActionsTableAction3=$("#lastActionsTableAction3");
        for(key in result){
            var element = result[key];
            var statusString='<span class="label label-danger">'+element.actionStatus+'</span> ';
            var actionString='<span value="'+element.stageId+'"  class="label label-blue stageButton">'+element.stageName+'</span>';
            var dateString='<span class="label label-success">'+moment(element.lastModifyDate).locale("ka").format("L")+'</span>';;
            lastActionsContainerDiv.append('<div value="'+key+'" class="prarabActionItem stage-item message-item media">' +
                '<div class="media">' +
                '   <div class="media-body">' +
                '   <div style="width:25%;margin-left: 20px;" class="sender">' + element.name + '</div>' +
                '<div style="width: 70%;" class="subject">'+statusString+actionString+dateString+'</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        }
        $(".prarabActionItem").unbind().click(function () {
            
        });
        $(".stageButton").unbind().click(function () {
            var stageId=$(this).attr("value");
            $.getJSON("/getstageactionsforprarab/"+stageId,function (result) {
                console.log(result);
            })
        });
    })
}




















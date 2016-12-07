/**
 * Created by kaxa on 9/3/16.
 */
function loadActions(data, DOMElements) {
    console.log(data);
    DOMElements.bodyPanelStages.hide("slow");
    DOMElements.buttonsPanelStages.hide("slow");
    DOMElements.bodyPanelActions.show("slow");
    DOMElements.buttonsPanelActions.show("slow");
    DOMElements.buttonsPanelActions.html("");
    DOMElements.bodyPanelActions.html("");
    createButtonWithHandlerr(DOMElements.buttonsPanelActions, "უკან დაბრუნება", function () {
        DOMElements.bodyPanelStages.show("slow");
        DOMElements.buttonsPanelStages.show("slow");
        DOMElements.bodyPanelActions.hide("slow");
        DOMElements.buttonsPanelActions.hide("slow");
    });
    loadActionsInGrid(data, DOMElements, 0);
    createButtonWithHandlerr(DOMElements.buttonsPanelActions, "მოქმედების დამატება", function () {
        showModalWithTableInside(function (header, body, modal) {
            header.html("ახალი მოქმედების დარეგისტრირება");
            body.append("<div id='etapiForm'></div>");
            var formBody = $("#etapiForm");
            dynamicCreateForm(formBody, "/createaction", {
                name: {
                    name: "სახელი",
                    type: "text"
                },
                id: {
                    type: "hidden",
                    value: "" + data["id"]
                }
            }, function () {
                modal.modal("hide");

                loadActionsInGrid(data, DOMElements, 0);
            })


        }, {
            "დამატებითი ღილაკი": function () {

            }
        });
    });


}
function loadActionsInGrid(data, DOMElements, type) {
    $.getJSON("/getactions?id=" + data.id + "&type=" + type, function (result) {
        console.log(result);
        DOMElements.bodyPanelActions.html(actionsPageTemplate);
        var actionsContainerDiv = $("#actionsContainerDiv");
        var tab2Content = $("#tab2ContentActions");

        for (key in result) {
            var element = result[key];
            var statusString = '<span class="label label-danger">' + element.actionStatus + '</span> ';
            var actionString = '<span class="subject-text">New contract</span>';


            actionsContainerDiv.append('<div value="' + key + '" class="action-item message-item media">' +
                '<div class="media">' +
                '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
                '   <div class="media-body">' +
                '   <div class="sender">' + element.name + '</div>' +
                '<div style="width: 40%;" class="subject">' + statusString + actionString + '</div>' +
                '<div class="date">' + moment(element.createDate).locale("ka").format("LLLL") + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".action-item").click(function () {
            var currentItem = result[$(this).attr("value")];
            console.log(currentItem);
            DOMElements.bodyPanelActions.hide("slow");
            DOMElements.buttonsPanelActions.hide("slow");
            DOMElements.bodyPanelAction.show("slow");
            DOMElements.buttonsPanelAction.show("slow");
            DOMElements.buttonsPanelAction.html("");
            DOMElements.bodyPanelAction.html("");
            DOMElements.bodyPanelAction.html(actionItemsListTemplate);
            createButtonWithHandlerr(DOMElements.buttonsPanelAction, "უკან დაბრუნება", function () {
                DOMElements.bodyPanelActions.show("slow");
                DOMElements.buttonsPanelActions.show("slow");
                DOMElements.bodyPanelAction.hide("slow");
                DOMElements.buttonsPanelAction.hide("slow");
            });
            if (currentItem.status === 1) {
                createButtonWithHandlerr(DOMElements.buttonsPanelAction, "პრარაბთან გაგზავნა", function () {
                    $.getJSON("/sendactiontoprarab/" + currentItem.id, function (result) {
                        if (result.code == 0) {

                            DOMElements.bodyPanelStages.show("slow");
                            DOMElements.buttonsPanelStages.show("slow");
                            DOMElements.bodyPanelAction.hide("slow");
                            DOMElements.buttonsPanelAction.hide("slow");
                            $.getJSON("/getprojectstages/" + currentProjectID, function (result2) {
                                loadStages(DOMElements, result2);
                            });
                        } else {
                            alert("მოხდა შეცდომა");
                        }

                    })


                });
                createButtonWithHandlerr(DOMElements.buttonsPanelAction, "დამოკიდებული მოქმედების დამატება", function () {
                    showModalWithTableInside(function (header, body, modal) {
                        header.html("მოქმედების იერარქიაში დამატება.");
                        body.append("<div id='actionHierarchyCreate'></div>");
                        var divBody = $("#actionHierarchyCreate");
                        divBody.append('<div class="panel-group panel-accordion dark-accordion" id="actionsChooseAcordion"></div>')
                        var actionsChooseAcordion=$("#actionsChooseAcordion");
                        var treeData = {
                            'core': {
                                'data': []
                            }
                        };
                        var elements={};
                        $.getJSON("/projectswithactionforhierarchytree/"+currentProjectID,function (result) {
                            for(key in result){
                                if(!elements[result[key].stageName]){
                                    elements[result[key].stageName]=[];
                                }
                                elements[result[key].stageName].push(result[key]);

                            }
                            console.log(elements);
                            var first=true;
                            for(key in elements){
                                var inClass='';
                                var aria='false';
                                var classCollapsed='collapsed';
                                if(first){
                                    inClass='in';
                                    aria='true';
                                    classCollapsed='';

                                }
                                first=false;
                                var random=Math.floor((Math.random() * 10000) + 1);
                                var currentArray=elements[key];
                                actionsChooseAcordion.append('<div class="panel panel-default">'+
                                    '<div class="panel-heading">'+
                                    '<h4>'+
                                    '<a class="'+classCollapsed+'" data-toggle="collapse" data-parent="#actionsChooseAcordion" href="#collapseOne'+random+
                                    '" aria-expanded="'+aria+'">'+key+'</a>'+
                                    '</h4>'+
                                    '</div>'+
                                    '<div id="collapseOne'+random+'" class="panel-collapse collapse '+inClass+'" aria-expanded="true">'+
                                '<div class="panel-body" id="stageKeyActions'+random+'">'+
                                '</div>'+
                                '   </div>'+
                                    '   </div>')
                                for(key2 in currentArray){
                                    var currentName=currentArray[key2].name;
                                    $('#stageKeyActions'+random).append("<button value='"+currentArray[key2].id+"' class='btnActionChoise btn btn-block btn-rounded btn-danger'>"+currentName+"</button><br>");
                                }

                            }
                            $(".btnActionChoise").click(function () {
                                var id=$(this).attr("value");
                                $.getJSON("/maponeactiontoanother?id1="+currentItem["id"]+"&id2="+id,function (result) {
                                    if(result){
                                        modal.modal("hide");
                                    }
                                })
                            })



                        });



                        //

                    }, {
                        "დამატებითი ღილაკი": function () {

                        }
                    });
                });
            }
            loadExpanses(currentItem, DOMElements);
            //loadActions(currentItem,DOMElements)
        })
    })
}
/**
 * Created by kaxa on 8/31/16.
 */


function loadStages(DOMElements, data) {
    DOMElements.bodyPanelStages.html(etapebiPageTemplate);
    var etapebiContainerDiv = $("#etapebiContainerDiv");
    var tab2Content = $("#tab2Content");

    for (key in data) {
        var element = data[key];
        var statusString='<span class="label label-danger">'+element.stageStatus+'</span> ';
        var actionString='<span class="subject-text">New contract</span>';


        etapebiContainerDiv.append('<div value="'+key+'" class="stage-item message-item media">' +
            '<div class="media">' +
            '<img src="assets/images/avatars/avatar11_big.png" alt="avatar 3" width="40" class="sender-img">' +
            '   <div class="media-body">' +
            '   <div class="sender">' + element.name + '</div>' +
            '<div style="width: 40%;" class="subject">'+statusString+actionString+'</div>' +
            '<div class="date">'+moment(element.shouldStart).locale("ka").format("LLLL")+'</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    $(".stage-item").click(function () {
        var currentItem=data[$(this).attr("value")];
        //onsole.log(currentItem);
        loadActions(currentItem,DOMElements)
    })

}

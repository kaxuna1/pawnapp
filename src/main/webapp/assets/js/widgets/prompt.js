/**
 * Created by kakha on 1/6/2016.
 */
function showBootstrapPrompt(text,callbacks){
    var popupTemplate =
        '<div id="promptModal" class="modal fade">' +
        '  <div class="modal-dialog">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '        <h4 class="modal-title"></h4>' +
        '      </div>' +
        '      <div class="modal-body">' +
        text +
        '</div>' +
        '      <div id="modalFooterDynamic" class="modal-footer">' +
        '        <button type="button" class="btn btn-link" data-dismiss="modal">გაუქმება</button>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    var thisModal=$(popupTemplate).modal("show").on('hidden.bs.modal', function () {
        $("#promptModal").remove();
    }).on('shown.bs.modal', function () {

        for(var key in callbacks){
            var k=key;
            $(this).find("#modalFooterDynamic").append('<button id="'+key+'Btn" type="button" class="btn btn-link">'+key+'</button>')
            $("#"+k+"Btn").click(function () {
                console.log(k);
                callbacks[k]();
                thisModal.modal("hide");

            });
        }

    });

}
/**
 * Created by kakha on 1/14/2016.
 */
function showModalWithTableInside(callback,callbacks,width) {
    if(!width)
        width=600
    var random=Math.floor((Math.random() * 10000) + 1);
    /*style="width: '+width+'px"*/
    var popupTemplate =
        '<div id="promptModal'+random+ '" class="modal fade">' +
        '  <div id="promptModal'+random+ 'Dialog"  class="modal-dialog">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '        <h4 id="modalWithTableHeader'+random+'" class="modal-title"></h4>' +
        '      </div>' +
        '      <div id="modalWithTableBody'+random+'" class="modal-body">' +
        '</div>' +
        '      <div id="modalFooterDynamic'+random+'" class="modal-footer">' +
        '        <button type="button" class="btn btn-link" data-dismiss="modal">გაუქმება</button>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    "@media only screen and (max-device-width: 480px)"
    document.querySelector('style').textContent +=
        "@media screen and (min-width:"+width+"px) { #promptModal"+random+ "Dialog { width: "+width+"px; }}"
    document.querySelector('style').textContent +=
        "@media screen and (max-width:"+width+"px) { #promptModal"+random+ "Dialog { width: 100%; }}"

    var thisModal = $(popupTemplate).modal("show").on('hidden.bs.modal', function () {
        $("#promptModal"+random).remove();
    }).on('shown.bs.modal', function () {

        callback($(this).find("#modalWithTableHeader"+random),$(this).find("#modalWithTableBody"+random),thisModal);

        for (var key in callbacks) {
            var random2=Math.floor((Math.random() * 10000) + 1);
            $(this).find("#modalFooterDynamic"+random).append('<button id="' + random2 + 'Btn" type="button" class="btn btn-link">' + key + '</button>')
            $("#" + random2 + "Btn").click(function () {
                callbacks[key]();
                thisModal.modal("hide");

            });
        }

    });
}
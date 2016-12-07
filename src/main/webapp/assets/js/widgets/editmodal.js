/**
 * Created by kakha on 1/8/2016.
 */
function showModalEditPage(data,buttons){
    var popupTemplate =
        '<div id="editModal" class="modal fade">' +
        '  <div class="modal-dialog">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '        <h4 class="modal-title"></h4>' +
        '      </div>' +
        '      <div id="editModalBody" class="modal-body">' +
        '</div>' +
        '      <div id="modalFooterDynamic" class="modal-footer">' +
        '        <button type="button" class="btn btn-link" data-dismiss="modal">გაუქმება</button>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    var thisModal=$(popupTemplate).modal("show").on('hidden.bs.modal', function () {
        $("#editModal").remove();
    }).on('shown.bs.modal', function () {
        console.log(data);
        $(this).find("#editModalBody").append('<table class="table" id="modalEditForm"></table>');
        for(key in data){
            $(this).find("#editModalBody").find("#modalEditForm").append('<tr>' +
                '<td><label for="'+key+'Field">'+data[key]["name"]+'</label></td>' +
                ' <td><input value="'+data[key]["value"]+'" type="text" name="'+key+'Field" class="form-control" id="'+key+'Field" placeholder="'+data[key]["name"]+'"></td>' +
                '<td><button style="padding-left: 20px;margin-bottom: 0px;margin-right: 0px;margin-left: 50px;" class="btn btn-dark" id="'+key+'EditBtn">შეცვლა</button></td>' +
                '</tr>');
            $("#"+key+"EditBtn").click(function () {
                var data2={};
                data2[key]=$("#"+key+"Field").val();
                data2["id2"]=+data[key]["id"];
                console.log(data2);
                $.ajax({
                    url:data[key]["url"],
                    data:data2
                }).done(function (result) {
                    if(result)
                    thisModal.modal("hide");
                    return false;
                });
                return false;
            })
        }

        for(var key2 in buttons){
            $(this).find("#modalFooterDynamic").append('<button id="'+key2+'Btn" type="button" class="btn btn-link">'+key2+'</button>')
            $("#"+key2+"Btn").click(function () {
                buttons[key2]()
                thisModal.modal("hide");

            });
        }

    });
}
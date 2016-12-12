/**
 * Created by kakha on 12/12/2016.
 */
function addDynamicFilters(div,data){

    var returnObj={};

    var random = Math.floor((Math.random() * 10000) + 1);
    var random2 = Math.floor((Math.random() * 10000) + 1);
    var random3 = Math.floor((Math.random() * 10000) + 1);
    div.append("<div id='div" + random + "" + random2 + "'></div>");
    div = div.find("#div" + random + "" + random2);

    console.log(data);
    for (key in data) {
        var element = data[key];
        console.log(element);
        if (element.type === "text") {

            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='text' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

        }
        if (element.type === "number") {

            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='number' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

        }
        if (element.type === "hidden") {
            div.append("<input value='" + (element.value ? element.value : "") + "' type='hidden' name='" + key + random + "' id='" + key + random + "'/>")
        }
        if (element.type === "date") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='date' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

        }
        if (element.type === "comboBox") {
            div.append('<div class="col-md-2"><div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<select  data-search='true' class='form-control'   value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
                "<option value='0'>ყველა</option>" +
                "</select>" +
                "</div></div>");
            var obj=$("#"+key + random);
            obj.change(function () {
               element.handler();
            });
            returnObj[key]=obj;
            var localKey = key;
            var localValueField = element.valueField;
            var localNameField = element.nameField;
            var localelement = element;
            if (element.data)
                OuterFuncLocalDataSearch(localKey, localValueField, localNameField, random, element, element.data);
            else
                OuterFuncSearch(localKey, localValueField, localNameField, random, element, element.IdToNameMap);
        }
    }
    return returnObj;
}
function OuterFuncSearch(localKey, localValueField, localNameField, random, element, IdToNameMap) {
    $.getJSON(element.url, function (result) {
        console.log(result);
        console.log(localKey);
        for (key2 in result) {
            if (IdToNameMap) {
                IdToNameMap[result[key2][localValueField]] = result[key2][localNameField];
            }
            $("#" + localKey + random + "").append('<option value="' + result[key2][localValueField] + '">' +
                result[key2][localNameField] + '</option>')
        }
        $("#" + localKey + random + "").select2();
    })
}
function OuterFuncLocalDataSearch(localKey, localValueField, localNameField, random, element, result) {
    for (key2 in result) {
        $("#" + localKey + random + "").append('<option value="' + result[key2][localValueField] + '">' +
            result[key2][localNameField] + '</option>')
    }
    $("#" + localKey + random + "").select2();
}
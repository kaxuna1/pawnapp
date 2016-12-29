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
    for (var key in data) {
        var element = data[key];
        console.log(element);
        if (element.type === "text") {
            var grouptext="";
            if(element.operator){
                grouptext+='<div class="input-group-btn">' +
                    '<button type="button" value="1" class="btn btn-default dropdown-toggle " id="operatorCurrent'+ key + random +'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+element.name+" "+element.operator.data[1]+'<span class="caret"></span></button>' +
                    '<ul class="dropdown-menu dropdown-menu-right">';
                for(key2 in element.operator.data){
                    //grouptext+="<option value='"+key2+"'>"+element.group.data[key2]+"</option>"
                    grouptext+='<li><a class="operator'+ key + random +'" value="'+key2+'" href="#">'+element.operator.data[key2]+'</a></li>';
                }
                grouptext+="</ul></div>"
            }
            //<label for="' + key + random + '">' + element.name + '</label>
            div.append('<div id="div'+key + random+'" class="filterCol col-md-2"><div class="input-group">' +
                grouptext+"<input class='form-control' type='text' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div></div>")
            returnObj[key] = $("#" + key + random);
            returnObj[key].par=$("#div"+key + random);
            returnObj[key].operatorObj=$("#operatorCurrent"+ key + random);
            if(element.operator){
                OuterFuncOperatorInit(key,random,element.operator,element.name);
            }





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
            //<label for="' + key + random + '">' + element.name + '</label>
            div.append('<div id="div'+ key + random +'" class="filterCol col-md-2"><div class="form-group">' +
                "<select  data-search='true' class='form-control'   value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
                "<option value='0'>ყველა "+element.name+"</option>" +
                "</select>" +
                "</div></div>");
            returnObj[key] = $("#" + key + random);
            returnObj[key].par=$("#div"+key + random);
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
    $
    
}
function OuterFuncOperatorInit(key,random,operator,name) {
    $('.operator'+ key + random).click(function () {
        $("#operatorCurrent"+ key + random).html(name+" "+operator.data[$(this).attr("value")]+'<span class="caret"></span>');
        $("#operatorCurrent"+ key + random).attr("value",$(this).attr("value"));
    })
}
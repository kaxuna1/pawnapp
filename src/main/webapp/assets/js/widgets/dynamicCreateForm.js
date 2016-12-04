/**
 * Created by kakha on 8/25/2016.
 */
function dynamicCreateForm(div, url, data, callback) {

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
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<select  data-search='true' class='form-control'   value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
                "</select>" +
                "</div>");
            var localKey = key;
            var localValueField = element.valueField;
            var localNameField = element.nameField;
            var localelement = element;
            if (element.data)
                OuterFuncLocalData(localKey, localValueField, localNameField, random, element, element.data);
            else
                OuterFunc(localKey, localValueField, localNameField, random, element, element.IdToNameMap);
        }
    }
    div.append("<button class='btn' id='save" + random + "'>შენახვა</button>");
    div.append("<button class='btn' id='cancel" + random + "'>გაუქმება</button>");
    $("#save" + random).click(function () {
        var sendData = {};
        for (key in data) {
            if (data[key].type === "date") {
                sendData[key] = moment($("#" + key + random).val().trim()).toDate();
            } else {
                sendData[key] = $("#" + key + random).val().trim();
            }

        }
        $.ajax({
            url: url,
            data: sendData
        }).done(function (result) {
            //TODO ეტაპების განახლება ახლის შექმნის შემდეგ
            if (result)
                callback();
            else
                alert("error");
        });
    })
    $("#cancel" + random).click(function () {
        callback();
        div.remove();
    })
}
function dynamicCreateToArray(div, array, data, callback, afterDraw, beforeDelete) {
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
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<select  data-search='true' class='form-control'   value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
                "</select>" +
                "</div>");
            var localKey = key;
            var localValueField = element.valueField;
            var localNameField = element.nameField;
            var localelement = element;
            OuterFunc(localKey, localValueField, localNameField, random, element, element.IdToNameMap);
        }
    }
    div.append("<button class='btn' id='save" + random + "'>შენახვა</button>");
    div.append("<button class='btn' id='cancel" + random + "'>გაუქმება</button>");
    $("#save" + random).click(function () {
        var sendData = {};
        for (key in data) {
            if (data[key].type === "date") {
                sendData[key] = moment($("#" + key + random).val().trim()).toDate();
            } else {
                if (data[key].type === "number") {
                    sendData[key] = parseFloat($("#" + key + random).val().trim());
                }
                sendData[key] = $("#" + key + random).val().trim();
            }

        }
        array.push(sendData);
        callback();
        if (beforeDelete) {
            beforeDelete();
        }
        div.remove();
    });
    $("#cancel" + random).click(function () {
        if (beforeDelete) {
            beforeDelete();
        }
        callback();
        div.remove();
    });
    if (afterDraw) {
        afterDraw();
    }
}

function dynamicChooserToCallback(div, data, callback,afterDraw, beforeDelete) {

    var random = Math.floor((Math.random() * 10000) + 1);
    var random2 = Math.floor((Math.random() * 10000) + 1);
    var key = Math.floor((Math.random() * 10000) + 1);
    div.append("<div id='div" + random + "" + random2 + "'></div>");
    div = div.find("#div" + random + "" + random2);
    var element = data;
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
        div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
            "<select  data-search='true' class='form-control'   value='" +
            (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
            "</select>" +
            "</div>");
        var localKey = key;
        var localValueField = element.valueField;
        var localNameField = element.nameField;
        var localelement = element;
        OuterFunc(localKey, localValueField, localNameField, random, element, element.IdToNameMap);
    }
    div.append("<button class='btn' id='save" + random + "'>შენახვა</button>");
    div.append("<button class='btn' id='cancel" + random + "'>გაუქმება</button>");
    $("#save" + random).click(function () {
        var sendData = {};
        if (data.type === "date") {
            sendData = moment($("#" + key + random).val().trim()).toDate();
        } else {
            if (data.type === "number") {
                sendData = parseFloat($("#" + key + random).val().trim());
            }
            sendData = $("#" + key + random).val().trim();
        }

        callback(sendData);
        if (beforeDelete) {
            beforeDelete();
        }
        div.remove();
    })
    $("#cancel" + random).click(function () {
        if (beforeDelete) {
            beforeDelete();
        }
        callback(null);
        div.remove();
    })
    if (afterDraw) {
        afterDraw();
    }
}
function OuterFunc(localKey, localValueField, localNameField, random, element, IdToNameMap) {
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
function OuterFuncLocalData(localKey, localValueField, localNameField, random, element, result) {
    for (key2 in result) {
        $("#" + localKey + random + "").append('<option value="' + result[key2][localValueField] + '">' +
            result[key2][localNameField] + '</option>')
    }
    $("#" + localKey + random + "").select2();
}
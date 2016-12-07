/**
 * Created by kakha on 4/19/2016.
 */
/**
 * Created by kakha on 4/19/2016.
 */
function testfunction(sender, eventArgs) {
    var item = eventArgs.get_menuItem();
    if (item.get_text() == "შეცვლა") {
        window.OpenEditWindow("Folders/AddEdit", eventArgs.get_node().get_value(), 400, 250);
    }
}


//<![CDATA[
Telerik.Web.UI.RadSplitter._preInitialize("ctl00_ctl00_Content_MainContent_RadSplitter1");
Telerik.Web.UI.RadPane._preInitialize("ctl00_ctl00_Content_MainContent_RadPanetoolbar", "ctl00_ctl00_Content_MainContent_RadSplitter1", "", "ctl00_ctl00_Content_MainContent_RadSplitBar5", 0, 0, "False");
Telerik.Web.UI.RadRibbonBar._preInitialize("ctl00_ctl00_Content_MainContent_toolbarMenu_RadRibbonBar1");
Telerik.Web.UI.RadSplitBar._preInitialize("ctl00_ctl00_Content_MainContent_RadSplitBar5", "ctl00_ctl00_Content_MainContent_RadSplitter1", "ctl00_ctl00_Content_MainContent_RadPanetoolbar", "ctl00_ctl00_Content_MainContent_RadPane1", 1, 0);
Telerik.Web.UI.RadPane._preInitialize("ctl00_ctl00_Content_MainContent_RadPane1", "ctl00_ctl00_Content_MainContent_RadSplitter1", "ctl00_ctl00_Content_MainContent_RadSplitBar5", "", 2, 1, "True");
Telerik.Web.UI.RadSplitter._preInitialize("ctl00_ctl00_Content_MainContent_RadSplitter3");
Telerik.Web.UI.RadPane._preInitialize("ctl00_ctl00_Content_MainContent_RadPanetree", "ctl00_ctl00_Content_MainContent_RadSplitter3", "", "ctl00_ctl00_Content_MainContent_RadSplitBar3", 0, 0, "False");
Telerik.Web.UI.RadPanelBar._preInitialize("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1");
Telerik.Web.UI.RadTreeView._preInitialize("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i0_RadTreeViewFilters", "0");
Telerik.Web.UI.RadTreeView._preInitialize("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i1_RadTreeViewArchives", "0");
Telerik.Web.UI.RadTreeView._preInitialize("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i2_RadTreeViewFolders", "0");
Telerik.Web.UI.RadTreeView._preInitialize("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i3_FilterRadTreeView", "0");
Telerik.Web.UI.RadSplitBar._preInitialize("ctl00_ctl00_Content_MainContent_RadSplitBar3", "ctl00_ctl00_Content_MainContent_RadSplitter3", "ctl00_ctl00_Content_MainContent_RadPanetree", "ctl00_ctl00_Content_MainContent_RadPane2", 1, 0);
Telerik.Web.UI.RadPane._preInitialize("ctl00_ctl00_Content_MainContent_RadPane2", "ctl00_ctl00_Content_MainContent_RadSplitter3", "ctl00_ctl00_Content_MainContent_RadSplitBar3", "", 2, 1, "True");
Telerik.Web.UI.RadSplitter._preInitialize("ctl00_ctl00_Content_MainContent_RadSplitter2");
Telerik.Web.UI.RadPane._preInitialize("ctl00_ctl00_Content_MainContent_RadPanegrid", "ctl00_ctl00_Content_MainContent_RadSplitter2", "", "ctl00_ctl00_Content_MainContent_RadSplitBar1", 0, 0, "False");
Telerik.Web.UI.RadSplitBar._preInitialize("ctl00_ctl00_Content_MainContent_RadSplitBar1", "ctl00_ctl00_Content_MainContent_RadSplitter2", "ctl00_ctl00_Content_MainContent_RadPanegrid", "ctl00_ctl00_Content_MainContent_RadPanedetail", 1, 0);
Telerik.Web.UI.RadPane._preInitialize("ctl00_ctl00_Content_MainContent_RadPanedetail", "ctl00_ctl00_Content_MainContent_RadSplitter2", "ctl00_ctl00_Content_MainContent_RadSplitBar1", "", 2, 1, "True");
/*(function () {
 function loadHandler() {
 console.log("kaxaaa");
 var hf = $get('RadStyleSheetManager1_TSSM');
 console.log(hf);
 if (!hf._RSSM_init) {
 hf._RSSM_init = true;
 hf.value = '';
 }
 hf.value += ';Telerik.Web.UI, Version=2013.1.220.40, Culture=neutral, PublicKeyToken=121fae78165ba3d4:ka:d8ebf3de-0179-4fa4-89e6-a030e0cf94a1:ef4a543:92753c09:ed2942d4:aac1aeb7:1c2121e:5c0abcde:5885634f:5951aeec:1f65231b:9e1572d6:8cee9284;Telerik.Web.UI.Skins, Version=2013.1.220.40, Culture=neutral, PublicKeyToken=121fae78165ba3d4:ka:570f752b-8ab3-43cb-9159-0950fdbaf409:a4012de0:605d48d6:767a497f:fd3cdbb5:ffbf0211:b75d3e22:7459a2f7:f81bccde:479f9ab6:a70a238f:3f3482cd:c531f12c:b7308cff:590c1b85';
 Sys.Application.remove_load(loadHandler);
 };
 Sys.Application.add_load(loadHandler);
 })();*/
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadFormDecorator, {
        "clientStateFieldID": "ctl00_ctl00_RadFormDecorator1_ClientState",
        "decoratedControls": 65535,
        "enabled": true,
        "skin": "Windows7"
    }, null, null, $get("ctl00_ctl00_RadFormDecorator1"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 49,
        "clientStateFieldID": "ctl00_ctl00_UserEditWindow_ClientState",
        "formID": "MainForm",
        "height": "600px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "UserEditWindow",
        "navigateUrl": "../Accounts/UserEdit.aspx",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "title": "მომხმარებელი",
        "visibleStatusbar": false,
        "width": "870px"
    }, null, null, $get("ctl00_ctl00_UserEditWindow"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 49,
        "clientStateFieldID": "ctl00_ctl00_NewsWindow_ClientState",
        "formID": "MainForm",
        "height": "700px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "NewsWindow",
        "navigateUrl": "../Newses/NewsList.aspx",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "visibleStatusbar": false,
        "width": "970px"
    }, {"close": onNewsWindowClose}, null, $get("ctl00_ctl00_NewsWindow"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 36,
        "clientStateFieldID": "ctl00_ctl00_InfoPopupWindows_ClientState",
        "formID": "MainForm",
        "height": "200px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "InfoPopupWindows",
        "navigateUrl": "infopopup.aspx",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "title": "ახალი დოკუმენტის რეგისტრაცია",
        "visibleStatusbar": false,
        "width": "300px"
    }, null, null, $get("ctl00_ctl00_InfoPopupWindows"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 53,
        "clientStateFieldID": "ctl00_ctl00_WindowWithClose_ClientState",
        "formID": "MainForm",
        "height": "200px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "WindowWithClose",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "visibleStatusbar": false,
        "width": "300px"
    }, null, null, $get("ctl00_ctl00_WindowWithClose"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 36,
        "clientStateFieldID": "ctl00_ctl00_ConclusionsInfoPopupWindows_ClientState",
        "formID": "MainForm",
        "height": "200px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "ConclusionsInfoPopupWindows",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "title": "ახალი დასკვნის რეგისტრაცია",
        "visibleStatusbar": false,
        "width": "300px"
    }, {"close": closeConclusionPopup}, null, $get("ctl00_ctl00_ConclusionsInfoPopupWindows"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "clientStateFieldID": "ctl00_ctl00_DownloadWindow_ClientState",
        "formID": "MainForm",
        "height": "600px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "name": "DownloadWindow",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "visibleStatusbar": false,
        "width": "870px"
    }, null, null, $get("ctl00_ctl00_DownloadWindow"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 49,
        "clientStateFieldID": "ctl00_ctl00_Edit_ClientState",
        "formID": "MainForm",
        "height": "650px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "Edit",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "visibleStatusbar": false,
        "width": "870px"
    }, {"close": onWindowClose}, null, $get("ctl00_ctl00_Edit"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindow, {
        "_dockMode": false,
        "behaviors": 49,
        "clientStateFieldID": "ctl00_ctl00_ContractEdit_ClientState",
        "formID": "MainForm",
        "height": "750px",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "modal": true,
        "name": "ContractEdit",
        "reloadOnShow": true,
        "restrictionZoneID": "MainForm",
        "showContentDuringLoad": false,
        "skin": "Windows7",
        "visibleStatusbar": false,
        "width": "900px"
    }, {"close": onWindowClose}, null, $get("ctl00_ctl00_ContractEdit"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadWindowManager, {
        "clientStateFieldID": "ctl00_ctl00_RadWindowManager1_ClientState",
        "formID": "MainForm",
        "iconUrl": "",
        "minimizeIconUrl": "",
        "name": "RadWindowManager1",
        "restrictionZoneID": "MainForm",
        "skin": "Windows7",
        "windowControls": "['ctl00_ctl00_UserEditWindow','ctl00_ctl00_NewsWindow','ctl00_ctl00_InfoPopupWindows','ctl00_ctl00_WindowWithClose','ctl00_ctl00_ConclusionsInfoPopupWindows','ctl00_ctl00_DownloadWindow','ctl00_ctl00_Edit','ctl00_ctl00_ContractEdit']"
    }, null, {"child": "ctl00_ctl00_UserEditWindow"}, $get("ctl00_ctl00_RadWindowManager1"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadTextBox, {
        "_displayText": "სწრაფი ძებნა",
        "_focused": false,
        "_initialValueAsText": "",
        "_postBackEventReferenceScript": "setTimeout(\"__doPostBack(\\\u0027ctl00$ctl00$Content$Accmenu2$RadMenu1$i1$txtQueickSearch\\\u0027,\\\u0027\\\u0027)\", 0)",
        "_skin": "Windows7",
        "_validationText": "",
        "clientStateFieldID": "ctl00_ctl00_Content_Accmenu2_RadMenu1_i1_txtQueickSearch_ClientState",
        "emptyMessage": "სწრაფი ძებნა",
        "enabled": true,
        "styles": {
            HoveredStyle: ["width:160px;", "riTextBox riHover"],
            InvalidStyle: ["width:160px;", "riTextBox riError"],
            DisabledStyle: ["width:160px;", "riTextBox riDisabled"],
            FocusedStyle: ["width:160px;", "riTextBox riFocused"],
            EmptyMessageStyle: ["width:160px;", "riTextBox riEmpty"],
            ReadOnlyStyle: ["width:160px;", "riTextBox riRead"],
            EnabledStyle: ["width:160px;", "riTextBox riEnabled"]
        }
    }, null, null, $get("ctl00_ctl00_Content_Accmenu2_RadMenu1_i1_txtQueickSearch"));
});

// WebForm_InitCallback();



//momxmareblis tipis shecvla
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadComboBox, {
        "_dropDownWidth": 0,
        "_height": 0,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$Accmenu2$RadMenu1$i2$ddlUSerAppointmemnts\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "_text": "ნარკოლოგიური ექსპერტიზის სამმართველოს უფროსი",
        "_uniqueId": "ctl00$ctl00$Content$Accmenu2$RadMenu1$i2$ddlUSerAppointmemnts",
        "_value": "0ed5a016-94a8-4d19-b51a-024c52d760c4",
        "clientStateFieldID": "ctl00_ctl00_Content_Accmenu2_RadMenu1_i2_ddlUSerAppointmemnts_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{"value": "0ed5a016-94a8-4d19-b51a-024c52d760c4", "selected": true}],
        "localization": "{\"AllItemsCheckedString\":\"All items checked\",\"ItemsCheckedString\":\"items checked\",\"CheckAllString\":\"Check All\"}",
        "selectedIndex": 0
    }, null, null, $get("ctl00_ctl00_Content_Accmenu2_RadMenu1_i2_ddlUSerAppointmemnts"));
});
//momxmareblis chamoshla
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadMenu, {
        "_childListElementCssClass": null,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$Accmenu2$RadMenu1\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "clientStateFieldID": "ctl00_ctl00_Content_Accmenu2_RadMenu1_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{"text": "მთავარი", "templated": true}, {
            "value": "QueickSearcMenuItem",
            "templated": true
        }, {"value": "UserOrgsMenuItem", "templated": true}, {
            "items": [{}, {}, {}],
            "value": "UserInfoMenuItem",
            "templated": true
        }]
    }, {"itemClicking": onClicking}, null, $get("ctl00_ctl00_Content_Accmenu2_RadMenu1"));
});

//perPage amosarchevis gashla
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadComboBox, {
        "_dropDownWidth": 0,
        "_height": 0,
        "_skin": "Vista",
        "_text": "50",
        "_uniqueId": "ctl00$ctl00$Content$MainContent$radgrid$RadGrid1$ctl00$ctl03$ctl01$RadComboBox1",
        "_value": "50",
        "attributes": {},
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00_ctl03_ctl01_RadComboBox1_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{"value": "10"}, {"value": "20"}, {"value": "30"}, {"value": "40"}, {
            "value": "50",
            "selected": true
        }, {"value": "75"}, {"value": "100"}, {"value": "125"}, {"value": "150"}, {"value": "175"}, {"value": "200"}],
        "localization": "{\"AllItemsCheckedString\":\"All items checked\",\"ItemsCheckedString\":\"items checked\",\"CheckAllString\":\"Check All\"}",
        "selectedIndex": 4
    }, {"selectedIndexChanged": RadComboBox1_SelectedIndexChanged}, null, $get("ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00_ctl03_ctl01_RadComboBox1"));
});

//treeView menu inicializacia
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadTreeView, {
        "_postBackOnClick": true,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i0$RadTreeViewFilters\u0027,\u0027arguments\u0027)",
        "_selectedValue": "2",
        "_skin": "Windows7",
        "_uniqueId": "ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i0$RadTreeViewFilters",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i0_RadTreeViewFilters_ClientState",
        "collapseAnimation": "{\"duration\":200}",
        "expandAnimation": "{\"duration\":200}",
        "nodeData": [{
            "value": "1",
            "expanded": 1,
            "items": [{
                "value": "2",
                "expanded": 1,
                "items": [{"value": "3"}, {"value": "4"}, {"value": "17"}, {"value": "5"}],
                "selected": 1
            }, {"value": "6"}, {"value": "7"}, {
                "value": "12",
                "expanded": 1,
                "items": [{"value": "13"}, {"value": "14"}, {"value": "15"}]
            }, {"value": "8", "items": [{"value": "9"}, {"value": "10"}, {"value": "11"}, {"value": "16"}]}]
        }],
        "selectedIndexes": ["0:0"]
    }, null, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i0_RadTreeViewFilters"));
});



Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadSplitBar, {
        "_liveResize": false,
        "_splitterOrientation": 0,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadSplitBar5_ClientState",
        "collapseMode": 2
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadSplitBar5"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadSplitBar, {
        "_liveResize": false,
        "_splitterOrientation": 1,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadSplitBar3_ClientState",
        "collapseMode": 2
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadSplitBar3"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadSplitBar, {
        "_liveResize": false,
        "_splitterOrientation": 0,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadSplitBar1_ClientState",
        "collapseMode": 3
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadSplitBar1"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_height": "262px",
        "_originalHeight": "262px",
        "_originalWidth": "222px",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 1,
        "_width": "222px",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPanetree_ClientState"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPanetree"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadSplitter, {
        "_attachResizeHandler": false,
        "_height": "262px",
        "_isNested": true,
        "_parentPaneId": "ctl00_ctl00_Content_MainContent_RadPane1",
        "_registerWithScriptManager": true,
        "_width": "398px",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadSplitter3_ClientState"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadSplitter3"));
});
/*Sys.Application.add_init(function () {
 $create(Telerik.Web.UI.RadPane, {
 "_childSplitterId": "ctl00_ctl00_Content_MainContent_RadSplitter3",
 "_collapsedDirection": 1,
 "_expandedSize": 0,
 "_originalHeight": "",
 "_originalWidth": "",
 "_scrollLeft": 0,
 "_scrollTop": 0,
 "_splitterOrientation": 0,
 "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPane1_ClientState",
 "scrolling": 4
 }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPane1"));
 });*/

Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_height": "130px",
        "_originalHeight": "130px",
        "_originalWidth": "",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 0,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPanetoolbar_ClientState",
        "scrolling": 4
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPanetoolbar"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPanelBar, {
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "expandMode": 2,
        "itemData": [{
            "text": "დოკუმენტები",
            "expanded": true,
            "imageUrl": "../../Images/PanelBarImages/mail.gif",
            "templated": true,
            "hasContentTemplate": true
        }, {
            "text": "არქივი",
            "imageUrl": "../../Images/PanelBarImages/mail.gif",
            "templated": true,
            "hasContentTemplate": true
        }, {
            "text": "საქაღალდეები",
            "imageUrl": "../../Images/PanelBarImages/foldersList.gif",
            "templated": true,
            "hasContentTemplate": true
        }, {
            "text": "დამახსოვრებული ძებნები",
            "imageUrl": "../../Images/PanelBarImages/SavedFilter.png",
            "templated": true,
            "hasContentTemplate": true
        }]
    }, null, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadTreeView, {
        "_postBackOnClick": true,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i1$RadTreeViewArchives\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "_uniqueId": "ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i1$RadTreeViewArchives",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i1_RadTreeViewArchives_ClientState",
        "collapseAnimation": "{\"duration\":200}",
        "expandAnimation": "{\"duration\":200}",
        "nodeData": [{
            "value": "1",
            "expanded": 1,
            "items": [{"value": "2", "items": [{"value": "3"}, {"value": "4"}, {"value": "5"}]}, {
                "value": "6",
                "items": [{"value": "7"}, {"value": "8"}, {"value": "9"}]
            }, {"value": "10"}]
        }]
    }, null, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i1_RadTreeViewArchives"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadContextMenu, {
        "_childListElementCssClass": null,
        "_skin": "Vista",
        "clickToOpen": true,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i2_RadTreeViewFolders_HelpDeskMenu_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{"value": "Add"}, {"value": "Delete"}]
    }, null, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i2_RadTreeViewFolders_HelpDeskMenu"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadTreeView, {
        "_postBackOnClick": true,
        "_postBackOnContextMenuItemClick": true,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i2$RadTreeViewFolders\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "_uniqueId": "ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i2$RadTreeViewFolders",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i2_RadTreeViewFolders_ClientState",
        "collapseAnimation": "{\"duration\":200}",
        "contextMenuIDs": ["HelpDeskMenu"],
        "expandAnimation": "{\"duration\":200}",
        "nodeData": []
    }, {"contextMenuItemClicked": testfunction}, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i2_RadTreeViewFolders"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadContextMenu, {
        "_childListElementCssClass": null,
        "_skin": "Vista",
        "clickToOpen": true,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i3_FilterRadTreeView_RadTreeViewContextMenu1_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{"value": "Delete"}]
    }, null, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i3_FilterRadTreeView_RadTreeViewContextMenu1"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadTreeView, {
        "_postBackOnClick": true,
        "_postBackOnContextMenuItemClick": true,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i3$FilterRadTreeView\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "_uniqueId": "ctl00$ctl00$Content$MainContent$TreeView$RadPanelBar1$i3$FilterRadTreeView",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i3_FilterRadTreeView_ClientState",
        "collapseAnimation": "{\"duration\":200}",
        "contextMenuIDs": ["RadTreeViewContextMenu1"],
        "expandAnimation": "{\"duration\":200}",
        "nodeData": []
    }, null, null, $get("ctl00_ctl00_Content_MainContent_TreeView_RadPanelBar1_i3_FilterRadTreeView"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadNumericTextBox, {
        "_displayText": "1",
        "_focused": false,
        "_initialValueAsText": "1",
        "_postBackEventReferenceScript": "setTimeout(\"__doPostBack(\\\u0027ctl00$ctl00$Content$MainContent$radgrid$RadGrid1$ctl00$ctl03$ctl01$RadNumericTextBox1\\\u0027,\\\u0027\\\u0027)\", 0)",
        "_skin": "Vista",
        "_validationText": "1",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00_ctl03_ctl01_RadNumericTextBox1_ClientState",
        "enabled": true,
        "incrementSettings": {InterceptArrowKeys: true, InterceptMouseWheel: true, Step: 1},
        "numberFormat": {
            "DecimalDigits": 0,
            "DecimalSeparator": ",",
            "CultureNativeDecimalSeparator": ",",
            "GroupSeparator": " ",
            "GroupSizes": 3,
            "NegativePattern": "-n",
            "NegativeSign": "-",
            "PositivePattern": "n",
            "AllowRounding": true,
            "KeepNotRoundedValue": false,
            "KeepTrailingZerosOnFocus": false,
            "NumericPlaceHolder": "n"
        },
        "styles": {
            HoveredStyle: ["width:25px;", "riTextBox riHover"],
            InvalidStyle: ["width:25px;", "riTextBox riError"],
            DisabledStyle: ["width:25px;", "riTextBox riDisabled"],
            FocusedStyle: ["width:25px;", "riTextBox riFocused"],
            EmptyMessageStyle: ["width:25px;", "riTextBox riEmpty"],
            ReadOnlyStyle: ["width:25px;", "riTextBox riRead"],
            EnabledStyle: ["width:25px;", "riTextBox riEnabled"],
            NegativeStyle: ["width:25px;", "riTextBox riNegative"]
        }
    }, {"valueChanged": RadNumericTextBox1_ValueChanged}, null, $get("ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00_ctl03_ctl01_RadNumericTextBox1"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadContextMenu, {
        "_childListElementCssClass": null,
        "_skin": "Windows7",
        "clickToOpen": true,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_rfltMenu_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "NoFilter"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "Contains"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "DoesNotContain"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "StartsWith"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "EndsWith"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "EqualTo"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "NotEqualTo"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "GreaterThan"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "LessThan"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "GreaterThanOrEqualTo"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "LessThanOrEqualTo"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "Between"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "NotBetween"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "IsEmpty"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "NotIsEmpty"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "IsNull"
        }, {
            "attributes": {"columnUniqueName": "", "tableID": ""},
            "postBack": 0,
            "value": "NotIsNull"
        }, {"attributes": {"columnUniqueName": "", "tableID": ""}, "postBack": 0, "value": "Custom"}],
        "targets": []
    }, null, null, $get("ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_rfltMenu"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_originalHeight": "",
        "_originalWidth": "168px",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 0,
        "_width": "168px",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPanegrid_ClientState"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPanegrid"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_childSplitterId": "ctl00_ctl00_Content_MainContent_RadSplitter2",
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_height": "262px",
        "_originalHeight": "262px",
        "_originalWidth": "",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 1,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPane2_ClientState",
        "scrolling": 4
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPane2"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadSplitter, {
        "_attachResizeHandler": false,
        "_height": "262px",
        "_isNested": true,
        "_orientation": 0,
        "_parentPaneId": "ctl00_ctl00_Content_MainContent_RadPane2",
        "_registerWithScriptManager": true,
        "_width": "168px",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadSplitter2_ClientState"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadSplitter2"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_height": "160px",
        "_originalHeight": "160px",
        "_originalWidth": "168px",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 0,
        "_width": "168px",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPanedetail_ClientState"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPanedetail"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_childSplitterId": "ctl00_ctl00_Content_MainContent_RadSplitter2",
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_height": "262px",
        "_originalHeight": "262px",
        "_originalWidth": "",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 1,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPane2_ClientState",
        "scrolling": 4
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPane2"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadTabStrip, {
        "_postBackOnClick": true,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$detail$RadTabStripDetails\u0027,\u0027arguments\u0027)",
        "_scrollButtonsPosition": 1,
        "_scrollChildren": true,
        "_selectedIndex": -1,
        "_skin": "Windows7",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_detail_RadTabStripDetails_ClientState",
        "multiPageID": "ctl00_ctl00_Content_MainContent_detail_RadMultiPageDetails"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_detail_RadTabStripDetails"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadPane, {
        "_collapsedDirection": 1,
        "_expandedSize": 0,
        "_height": "160px",
        "_originalHeight": "160px",
        "_originalWidth": "168px",
        "_scrollLeft": 0,
        "_scrollTop": 0,
        "_splitterOrientation": 0,
        "_width": "168px",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_RadPanedetail_ClientState"
    }, null, null, $get("ctl00_ctl00_Content_MainContent_RadPanedetail"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadContextMenu, {
        "_childListElementCssClass": null,
        "_postBackReference": "__doPostBack(\u0027ctl00$ctl00$Content$MainContent$radgrid$RadGrid1$rghcMenu\u0027,\u0027arguments\u0027)",
        "_skin": "Windows7",
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_rghcMenu_ClientState",
        "collapseAnimation": "{\"duration\":450}",
        "enableAutoScroll": true,
        "enableImageSprites": true,
        "expandAnimation": "{\"duration\":450}",
        "itemData": [{
            "attributes": {"ColumnName": "", "TableID": ""},
            "value": "SortAsc",
            "cssClass": "rgHCMSortAsc"
        }, {
            "attributes": {"ColumnName": "", "TableID": ""},
            "value": "SortDesc",
            "cssClass": "rgHCMSortDesc"
        }, {
            "attributes": {"ColumnName": "", "TableID": ""},
            "value": "SortNone",
            "cssClass": "rgHCMUnsort"
        }, {"value": "topGroupSeperator", "isSeparator": true}, {
            "attributes": {"ColumnName": "", "TableID": ""},
            "postBack": 0,
            "value": "GroupBy",
            "cssClass": "rgHCMGroup"
        }, {
            "attributes": {"ColumnName": "", "TableID": ""},
            "postBack": 0,
            "value": "UnGroupBy",
            "cssClass": "rgHCMUngroup"
        }, {"value": "bottomGroupSeperator", "isSeparator": true}, {
            "items": [{
                "postBack": 0,
                "text": "imgColumn2",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|imgColumn2",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ნომერი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|DocumentNumber",
                "templated": true
            }, {
                "postBack": 0,
                "text": "შეცვლა/დათვალიერება",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|EditColumn",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ტიპი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|DocumentType",
                "templated": true
            }, {
                "postBack": 0,
                "text": "კლიენტი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|Client",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ავტორი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|CreatedBy",
                "templated": true
            }, {
                "postBack": 0,
                "text": "საფუძველი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|BaseDocument",
                "templated": true
            }, {
                "postBack": 0,
                "text": "შინაარსი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|Content",
                "templated": true
            }, {
                "postBack": 0,
                "text": "დარჩენილი დღეები",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|leftedDaysString",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ბოლო ოპერაციის თარიღი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|specdate",
                "templated": true
            }, {
                "postBack": 0,
                "text": "შემოსვლის თარიღი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|CreateDate",
                "templated": true
            }, {
                "postBack": 0,
                "text": "სტატუსი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|Status",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ბოლო ოპერაცია",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|LastOperation",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ხელმოწერის ავტორი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|SignaturedBy",
                "templated": true
            }, {
                "postBack": 0,
                "text": "ფილიალი",
                "value": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00|BranchName",
                "templated": true
            }], "postBack": 0, "value": "ColumnsContainer", "cssClass": "rgHCMCols"
        }],
        "targets": []
    }, null, null, $get("ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_rghcMenu"));
});
Sys.Application.add_init(function () {
    $create(Telerik.Web.UI.RadGrid, {
        "ClientID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1",
        "ClientSettings": {
            "AllowAutoScrollOnDragDrop": true,
            "AllowColumnsReorder": true,
            "AllowDragToGroup": true,
            "ColumnsReorderMethod": 1,
            "ShouldCreateRows": true,
            "ReorderColumnsOnClient": true,
            "DataBinding": {},
            "Selecting": {"CellSelectionMode": 0},
            "Scrolling": {},
            "Resizing": {},
            "ClientMessages": {
                "DragToGroupOrReorder": "დააგდეთ ჯგუფირების პანელში სორტირებისთვის",
                "DropHereToReorder": "ჩააგდეთ დალაგებისთვის",
                "PagerTooltipFormatString": " \u003cstrong\u003e{0}\u003c/strong\u003e გვერდი \u003cstrong\u003e{1}\u003c/strong\u003eიდან"
            },
            "KeyboardNavigationSettings": {
                "AllowActiveRowCycle": false,
                "EnableKeyboardShortcuts": true,
                "FocusKey": 89,
                "InitInsertKey": 73,
                "RebindKey": 82,
                "ExitEditInsertModeKey": 27,
                "UpdateInsertItemKey": 13,
                "DeleteActiveRow": 127,
                "ExpandDetailTableKey": 39,
                "CollapseDetailTableKey": 37
            },
            "Animation": {}
        },
        "ShowGroupPanel": true,
        "Skin": "Windows7",
        "UniqueID": "ctl00$ctl00$Content$MainContent$radgrid$RadGrid1",
        "_activeRowIndex": "",
        "_controlToFocus": "",
        "_currentPageIndex": 0,
        "_editIndexes": "[]",
        "_embeddedSkin": true,
        "_gridTableViewsData": "[{\"ClientID\":\"ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00\",\"UniqueID\":\"ctl00$ctl00$Content$MainContent$radgrid$RadGrid1$ctl00\",\"PageSize\":50,\"PageCount\":1,\"EditMode\":\"EditForms\",\"AllowPaging\":true,\"CurrentPageIndex\":0,\"VirtualItemCount\":9,\"AllowMultiColumnSorting\":false,\"AllowNaturalSort\":true,\"AllowFilteringByColumn\":true,\"PageButtonCount\":10,\"HasDetailTables\":false,\"HasMultiHeaders\":false,\"PagerAlwaysVisible\":true,\"Name\":\"Master\",\"IsItemInserted\":false,\"clientDataKeyNames\":[],\"hasDetailItemTemplate\":false,\"enableHeaderContextMenu\":true,\"_dataBindTemplates\":false,\"_selectedItemStyle\":\"\",\"_selectedItemStyleClass\":\"rgSelectedRow\",\"isFilterItemExpanded\":true,\"_columnsData\":[{\"UniqueName\":\"column\",\"Resizable\":false,\"Reorderable\":false,\"Selectable\":false,\"Groupable\":false,\"ColumnType\":\"GridGroupSplitterColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"Display\":true},{\"UniqueName\":\"ExpandColumn\",\"Resizable\":false,\"Reorderable\":false,\"Selectable\":false,\"Groupable\":false,\"ColumnType\":\"GridExpandColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"Display\":true},{\"UniqueName\":\"imgColumn2\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"\",\"Display\":true},{\"UniqueName\":\"DocumentNumber\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"DocumentNumber\",\"Display\":true},{\"UniqueName\":\"EditColumn\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"\",\"Display\":true},{\"UniqueName\":\"DocumentType\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"DocumentType\",\"Display\":true},{\"UniqueName\":\"Client\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"Client\",\"Display\":true},{\"UniqueName\":\"CreatedBy\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"CreatedBy\",\"Display\":true},{\"UniqueName\":\"BaseDocument\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"BaseDocument\",\"Display\":true},{\"UniqueName\":\"Content\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"Content\",\"Display\":true},{\"UniqueName\":\"leftedDaysString\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"leftedDaysString\",\"Display\":true},{\"UniqueName\":\"specdate\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"specdate\",\"Display\":true},{\"UniqueName\":\"CreateDate\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.DateTime\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"CreateDate\",\"Display\":true},{\"UniqueName\":\"Status\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"Status\",\"Display\":true},{\"UniqueName\":\"LastOperation\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"LastOperation\",\"Display\":true},{\"UniqueName\":\"SignaturedBy\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"SignaturedBy\",\"Display\":true},{\"UniqueName\":\"BranchName\",\"Resizable\":true,\"Reorderable\":true,\"Selectable\":true,\"Groupable\":true,\"ColumnType\":\"GridTemplateColumn\",\"ColumnGroupName\":\"\",\"DataTypeName\":\"System.String\",\"FilterListOptions\":0,\"CurrentFilterFunction\":0,\"CurrentFilterValue\":\"\",\"AndCurrnetFilterFunction\":0,\"AndCurrentFilterValue\":\"\",\"CurrentFilterFunctionName\":\"NoFilter\",\"AndCurrentFilterFunctionName\":\"NoFilter\",\"DataField\":\"BranchName\",\"Display\":true}]}]",
        "_groupPanelClientID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_GroupPanel_TB",
        "_groupPanelItems": "[{\"HierarchicalIndex\":\"0:0\"}]",
        "_masterClientID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ctl00",
        "_shouldFocusOnPage": false,
        "allowMultiRowSelection": true,
        "clientStateFieldID": "ctl00_ctl00_Content_MainContent_radgrid_RadGrid1_ClientState",
        "expandItems": {}
    }, {
        "columnHiding": ColumnHiding,
        "columnShowing": ColumnShowing,
        "gridCreated": GridCreated
    }, null, $get("ctl00_ctl00_Content_MainContent_radgrid_RadGrid1"));
});


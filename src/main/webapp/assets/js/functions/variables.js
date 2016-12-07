/**
 * Created by kakha on 11/12/2015.
 */
var currentPage = 0;
var currentData;
var projectColumns = ["#","სახელი","მისამართი","საკადასტრო"];
var loanColumns=["#","ნომერი","კლიენტი","რაოდენობა","გაცემის თარიღი"];
var confiscatedColumns=["#","მოდელი"]
var userColumns = ["სახელი", "გვარი", "მომხმარებლის სახელი", "პირადი ნომერი", "მობილური"];
var loanConditionsColumns=["#","სახელი","პროცენტი","პირველი დღის %","პერიოდი","პერიოდის ტიპი"];
var periodTypes={
    "1":"დღე",
    "2":"კვირა",
    "3":"თვე"
}

var clientColumns = ["სახელი", "გვარი","პირადი ნომერი", "საკონტაქტო ნომერი","სესხების რაოდენობა"];
var filialColumns = ["სახელი", 'მისამართი'];
var elementColumns = ["კოდი", 'სახელი'];
var regionColumns = ["სახელი"];
var projectStageTypeColumns = ["სახელი"];
var formatColumns = ["სახელი", "ფასი"];
var productRequestsColumns = ["#","ფილიალი", "თარიღი","მოთხოვნილი პროდუქტების რაოდენობა"];
var mosataniColumns=["#","პროდუქტი","რაოდენობა","მოიტანს"];
var tenderColumns=["#","სახელი","შექმნის დრო","დაწყების დრო","დამთავრების დრო"];
var zoneColumns = ["სახელი", "რეგიონი"];
var tenderWonColumns=["#","ტენდერი","პროდუქტი","რაოდენობა","ფასი"];
var requestFromTenderColumns=["#","ტენდერი","პროდუქტი","რაოდენობა","ფილიალი","#"];

var userTypes = {
    "1": "sa",
    "2":"admin",
    "3":"პრარაბი"
};
var canCreateProject = false;
var canCreateUsers = false;
var topPanelButtons=$("#topPanelButtons");
var addZoneToSelectedVisible=false;
var quantTypes=['','კგ.', "ცალი"];
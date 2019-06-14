
//MODEL
var currentLine, elementsLine;  
function articles(){
    var allArticles = $("tbody > tr");
    return allArticles
}

function modalSet(){
    var id = $("tbody > tr").length+1;
    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });
    $("input[name = 'id']").val(id);
    $("input[name = 'date']").val(new Date().toDateInputValue());
    $("#title").val("");
    $("#content").val("");
    $("#pseudo").val("");

};


function editValues() {
var id = $("#id").val();
var title = $("#title").val();
var content = $("#content").val();
var date = $("#date").val();
var pseudo = $("#pseudo").val();
var newArticle = new article(id, title, content, date, pseudo);
return newArticle;
};




function article(id, title, content, date, pseudo) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date;
    this.pseudo = pseudo;
};

//Vue
var classsToCheck = ["id", "title", "content", "date", "pseudo"];


function newRowCreation(article){
    var tableRow = "";
    tableRow = '<tr class="" id="article' + article.id+'">';
    tableRow += '<td class=" verflow-auto  text-truncate id " style="max-width : 100%">' + article.id + "</td >";
    tableRow += '<td class="  title verflow-auto  text-truncate" style="max-width : 100%" >' + article.title + "</td >";
    tableRow += '<td class=" content verflow-auto  text-truncate" style="max-width : 100%">' + article.content + "</td >";
    tableRow += '<td class=" date verflow-auto  text-truncate " style="max-width : 100%" >' + article.date + "</td >";
    tableRow += '<td class=" pseudo text-truncate verflow-auto  text-truncate" style="max-width : 100%" >' +article.pseudo +"</td >";
    tableRow += '<td class=""><button type="button" class="btn btn-warning modifyButton" style="max-width : 100%">Modify</button></td>';
    tableRow += '<td class=""><button type="button"  class="btn btn-danger deleteButton" style="max-width : 100%">Delete</button></td>';
    tableRow += '</tr>';
    $(tableRow).appendTo("tbody");
};

function modifyModalValues(element) {
    elementsLine = $(element).parents("tr").find("td");

    classsToCheck.forEach(function(element){
        var currentclass = element;
        
        elementsLine.each(function () {

            checker = $(this).hasClass(currentclass)
            if(checker){
                currentvalue=$(this).text();
                currentid='#'+element;
                $(currentid).val(currentvalue)

            }
        })
    });

    return elementsLine;

};

function modifyTabelValues(button){
   
    elementsModal = $(button)
      .parents(".modal-footer")
      .siblings(".modal-body")
        .find(".form-control");
    
     if ($(this).attr('id') == 'id') {
                    var rowId = '#article' + $(this).val()
                }

    var rowId = '#article' + $(button)
        .parents(".modal-footer")
        .siblings(".modal-body")
        .find('#id')
        .val()

    classsToCheck.forEach(function (element) {
        var currentid = element;
        elementsModal.each(function () {
           
            checker = $(this).attr('id')==(currentid)
            
            if (checker) {
               
                currentvalue = $(this).val();
                currentclass = '.' + element;
                console.log(this)
                console.log(currentvalue)
                console.log(currentclass)
                console.log('$('+rowId+').find('+currentclass+')')
                console.log($(rowId).find(currentclass))
                console.log($(rowId).find(currentclass).text())
                $(rowId).find(currentclass).text(currentvalue)
            }
        })
    });

}



function blankValues() {
    $("#id").val("");
    $("#title").val("");
    $("#content").val("");
    $("input[name = 'date']").val("");
    $("#pseudo").val("");
    
};

//controler 


$(function () {
    
    $("#modalTrigger").click(function(){ 
        modalSet();
    });

    $("#addArticle").click(function () {
        if ($(this).text() !== "modify content"){
        var article = editValues();
        newRowCreation(article);
        $("#exampleModal").modal("hide");
        blankValues();
        }else{
            modifyTabelValues($(this));
            $("#exampleModal").modal("hide");
            blankValues();
            $("#addArticle").text("New content");
        }

    });

    $("#exampleModal").on(" hidden.bs.modal ", function() {
      $("#addArticle").text("New content");
    });


    $("tbody").on("click", ".deleteButton", function() {
        $(this).parents("tr").remove();
    });

    $("tbody").on("click", ".modifyButton", function() {
      $('#addArticle').text("modify content");
      modifyModalValues(this);
      $("#exampleModal").modal("show");
    });

});



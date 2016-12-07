/**
 * Created by kakha on 8/25/2016.
 */
function createButtonWithHandlerr(div,name,func){
    var random=Math.floor((Math.random() * 10000) + 1);
    var random2=Math.floor((Math.random() * 10000) + 1);

    div.append("<button class='btn' id='btn"+random+""+random2+"'>"+name+"</button>");
    var obj=$("#btn"+random+""+random2);
    obj.click(func);
    return {
        id:"#btn"+random+""+random2,
        obj:$("#btn"+random+""+random2),
        enabled:function (param) {
            if(!param){
                this.obj.addClass("disabled")
            }else{
                this.obj.removeClass("disabled")
            }
        },
        makeDark:function (dark) {
          if(dark){
              this.obj.addClass("btn-dark");
          }else{
              this.obj.removeClass("btn-dark")  
          }
        },
        setTitle:function (title) {
            this.obj.html(title);
        },
        changeHandler:function (newHandler) {
            this.obj.unbind();
            this.obj.click(newHandler);
            this.currentHandler=newHandler
        },
        currentHandler:func,
        
    }
}
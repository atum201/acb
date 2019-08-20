$(function () {

   $(".menus a").click(function(e){
        var parent=$(this).parent();
        if(parent.find(">ul").length){
            e.preventDefault();
            parent.siblings().removeClass("open");
            if(parent.hasClass("open")){
                parent.removeClass("open");    
            }else{
                parent.addClass("open");    
            }

        }else{
            $(".menus li").removeClass("active");
            parent.addClass("active");
        }    

    });
   $(".nav-toggle").click(function(){
        $(".header .menus").addClass("opened");
        $(".overlay-common").addClass("show");
   });
   $(".overlay-common").click(function(){
        $(".header .menus").removeClass("opened");
        $(this).removeClass("show");
   });
    
});
$(".popup-box .btn-expand").click(function(){
    $(this).parents(".item").toggleClass("active");
    $(this).parents(".item").siblings().removeClass("active");
});
$(function(){
    let pok=[];
   let colorArr=['s','h','d','c'];
   let flag={};
   for (let i=0;i<52;i++){
       let index=Math.floor(Math.random()*colorArr.length);
       let color=colorArr[index];
       let num=Math.floor(Math.random()*13+1);
       while (flag[color+'-'+num]){
           index=Math.floor(Math.random()*colorArr.length);
           color=colorArr[index];
           num=Math.floor(Math.random()*13+1);
       }
       pok.push({color,num});
       flag[color+'-'+num]=true;
   }
   console.log(pok);

   let index=-1;
   for(let i=0;i<8;i++){
       for (let j=0;j<i;j++){
           index++;
           let obj = pok[index];
           let lf = 370-80*j+40*(i-1),tp=45*i-1;
           $('<div>').css({backgroundImage:`url(./imgs/${obj.num}${obj.color}.jpg)`})
               .data('num',obj.num)
               .appendTo('main')
               .delay(index*40)
               .attr('id',i+'_'+j)
               .animate({left:lf+'px',top:tp+'px',opacity:1})
       }
   }
    for (index;index<52;index++){
        console.log(index);
        let obj=pok[index];
        $('<div>').css({backgroundImage:`url(./imgs/${obj.num}${obj.color}.jpg)`})
            .data('num',obj.num)
            .appendTo('main')
            .delay(index*40)
            .attr('id','-2'+'_'+'-2')
            .addClass('left')
            .animate({left:'20px',top:'490px',opacity:1})
    }
    let main=$('main');
    let first=null;
    main.on('click','div',function () {
        let [i,j]=$(this).attr('id').split('_');
        let id1=i*1+1+'_'+j,id2=i*1+1+'_'+(j*1+1);
        if ($('#'+id1).length || $('#'+id2).length){
            return;
        }
        if ($(this).hasClass('active')){
            $(this).removeClass('active').animate({top:'+=10px'},100)
        }
        else{
            $(this).addClass('active').animate({top:'-=10px'},100)
        }
        if (!first){
            first=$(this).data('num');
            if (first===13){
                $('.active').animate({top:'10px',left:'730px'},function () {
                    $(this).remove();
                });
                first=null;
            }
        }
        else{
            let num1=$(this).data('num');
            if (num1 + first ===13) {
                $('.active').animate({top:'10px',left:'730px'},function () {
                    $(this).remove();
                })
            }
            else{
                $('.active').animate({top:'+=10px'},function () {
                    $(this).removeClass('active');
                })
            }
            first=null;
        }
    });
    let n=0;
    $('.change').on('click',function () {
        let left=$('.left');
        left.last().css({zIndex:n++}).addClass('right').removeClass('left').animate({left:'140px',top:'490px'},100);
        if (!left.length) {
            $('.right').css({zIndex:n}).addClass('left').removeClass('right').animate({left:'20px',top:'490px'})
        }
    })
});
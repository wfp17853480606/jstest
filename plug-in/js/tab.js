(function($) {
    $.fn.extend({
        h_tab: function(tabId) {
            var oLinks = $('a');
            var Arrays=$(['我是第一','我是第二','我是第三','我是第四']);//从这往下的部分只是对一些知识的练习
            $.each(oLinks,function(i,val){
                $(this).click(function(){
                    $(this).html(function(){
                        $(this).html(Arrays.get(i));
                        })
                    });    
            })

            
           /* var oCons = document.getElementById(tabId).getElementsByTagName('section');
            for (var i = 0; i < oLinks.length; i++) {
                oLinks[i].index = i;
                oLinks[i].onclick = function() {
                    for (var j = 0; j < oLinks.length; j++) {
                        oLinks[j].className = "";
                        oCons[j].style.display = "none";
                    }
                    this.className = "cur";
                    oCons[this.index].style.display = "block";
                }
            }*/
        }
    });
})(jQuery);

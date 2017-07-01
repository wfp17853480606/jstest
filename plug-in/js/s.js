
;(function($){
    function multiSelect(ele,options){
        this.parent=ele; // 代表当前的父元素
        this.parentObj=ele.get(0);
        this.options=options; // 传递过来的参数
        this.currentLevel=0; // 代表当前的渲染级别
    }

    multiSelect.prototype.init=function(){
        
        var that=this;
        // 先初始化level个select
        for (var i =0; i < that.options.level ; i++) {
            var select=document.createElement("select");
            select.id=that.options.name+"_"+i;
            select.name=this.options.name+"["+i+"]";
            select.dataset.level=i;
            // console.log(select)
            that.defopt(select);
            that.parentObj.appendChild(select);
        }
        // 获取一级选择，即省数据
        that.getData(0,function(options){
            that.select(0,options);
        });

    }

    multiSelect.prototype.defopt=function(select){
        var def_opt=document.createElement("option");
        def_opt.text="--请选择--";
        select.appendChild(def_opt);
    }

    /**
     * 添加select标签
     * @param  {int} level   
     * @param  {array} options 
     * @return {}
     */
    multiSelect.prototype.select=function(level,options){
        var that=this;
        var select=document.getElementById(that.options.name+"_"+level);
        // console.log(select);
        // console.log(that.options.name+"_"+level);
        // var select=document.createElement("select");
        // select.name=this.options.name+"["+level+"]";
        // select.dataset.level=level;
        select.innerHTML="";
        that.defopt(select);
        options.forEach(function(option,index){
            var obj=document.createElement("option");
            obj.value=option.value;
            obj.text=option.name;
            // select.innerHTML="";
            select.appendChild(obj);
        })
        // that.parentObj.appendChild(select);
        level<that.options.level-1 && select.addEventListener('change',function(){
            var select_level=select.dataset.level;
            if(select_level==0 && that.currentLevel){
                // that.parentObj.innerHTML="";
                // that.currentLevel=0;
            }
            var next_level=parseInt(select_level)+1;
            that.getData(next_level,function(options){
                that.select(next_level,options);
            });
        });
    }
    /**
     * 获取数据并渲染select标签及数据
     * @param  int level 
     * @param  function callback 
     * @return
     */
    multiSelect.prototype.getData=function(level,callback){
        var that=this;
        $.getJSON(this.options.url,{level:level},function(data){
            // 成功获取之后将级别+1
            callback(data);
        })
    }

    $.fn.multiSelect=function(options){

        var defaults={
            level:3, // 代表是第几级选项,当参数传递给url
            url:'/address.json', // 获取数据的url
            name:"address" // 对应的select，name[1] name[2]
        };

        var setting=$.extend({},defaults,options);

        var multi=new multiSelect(this,setting);

        multi.init();

        // console.log(multi.select(0,[{value:"1",text:"山东"},{value:"2",text:"北京"}]));
    }

})(jQuery);
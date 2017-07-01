$(function() {
    //实现左边栏部分功能
    $('ul .nav-header').click(function() {
        var $ul = $(this).find('ul');
        if ($ul.hasClass('hover')) {
            $ul.removeClass('hover');
        } else {
            $ul.addClass('hover');
        }
    }); //完成点击出现与消失
    var $li = $('ul .nav-header');
    $li.find('ul li a').click(function() {
        $(this).parent().siblings().find('a').removeClass('bg');
        $(this).parent().parent().parent().siblings().find('a').removeClass('bg');
        $(this).addClass('bg');
        return false;
    }); //阻止向上冒泡;实现了点击北京变为绿色
    $li.find('li').hover(function() {
            $(this).css('background-color', '#f4f5f9');
        }, function() {
            $(this).css('background-color', '#fff');
        }) //小li的移入移除实现
    $('li').on('onselectstart', function(event) {
            return false;
        })
        //input的效果实现
    $('.box-search-input').on('keyup', function() {
    	if($(this).val().length!='')
        	{$(this).next().css('display','block');  }
        else
        {
        	$(this).next().css('display','none')
        }
    });
    $('.box-search-style').on('click',function(){
        $('.box-search-input').val('');
        $(this).css('display','none')
    })

})

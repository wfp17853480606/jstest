;
(function($) {
    $.extend({
        select: function(url) {
            var oProvince = $('.province');
            var oCity = $('.city');
            var oDistrict = $('.district');
            oCity.css({
                'display': 'none',
            });
            oDistrict.css({
                'display': 'none',
            });
            var str;
            //初始化一下省
            $.getJSON(url, function(data) {
                $.each(data, function(i, info) {
                    str += '<option value="' + info.p + '">' + info.p + '</option>';
                });
                oProvince.html(str);
            });
            //赋值市
            oProvince.on('change', function() {
                oCity.css('display', 'inline-block');
                oDistrict.css('display', 'none')
                $.getJSON('area.json', function(data) {
                    var str = '';
                    var n = oProvince.get(0).selectedIndex;
                    var m = oCity.get(0).selectedIndex;
                    if (typeof data[n].c[m].d == 'undefined') {
                        oDistrict.css('display', 'none');
                    }
                    $.each(data[n].c, function(i, info) {
                        str += '<option value="' + info.ct + '">' + info.ct + '</option>';
                    })
                    oCity.html(str);
                })
            });
            //赋值区
            oCity.on('change', function() {
                $.getJSON('area.json', function(data) {
                    var str = '';
                    var n = oProvince.get(0).selectedIndex;
                    var m = oCity.get(0).selectedIndex;
                    if (typeof data[n].c[m].d == 'undefined') {
                        oDistrict.css('display', 'none');
                    } else {
                        oDistrict.css('display', 'inline-block');
                        $.each(data[n].c[m].d, function(i, info) {
                            str += '<option value="' + info.dt + '">' + info.dt + '</option>';
                        })
                        oDistrict.html(str);
                    }
                })
            })
        }
    })
})(jQuery)

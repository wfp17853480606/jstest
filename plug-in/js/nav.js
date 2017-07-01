;(function($) {
    $.fn.extend({
        'nav':function(background,color) {
            this.find('.nav').css({
                'margin': 0,
                'padding': 0,
                'list-style-type':'none',
                'display': 'none',
                'color':color,
                'background':background
            });
            this.find('.nav').parent().hover(function() {
                $(this).find('.nav').slideDown('normal')
            }, function() {
                $(this).find('.nav').stop(true, true).slideUp('normal')
            })
        }
    })
})(jQuery);

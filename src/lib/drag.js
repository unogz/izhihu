//拖动, 用法 $('目标的css selector').drags({handler:'拖动对象的css selector'})
(function($) {
    $.fn.drags = function(opt) {
        opt = $.extend({handler:"",cursor:"move"}, opt);

        if(opt.handler === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handler);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handler === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handler === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    }
})($);

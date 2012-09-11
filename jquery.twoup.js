(function($) {
  $.fn.twoup = function(options) {
    var content_width = 0;
    var scroll_width = 0;

    var content = this;
    var slider = $("<div></div>");
    var padding = $("<div></div>").css("overflow", "hidden");

    content.before(padding);
    padding.append(slider);
    slider.append(content.detach());

    var box_styles = ["width", "height", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top",
     "margin-right", "margin-bottom", "margin-left", "border-top", "border-right", "border-bottom", "border-left"];

    $.each(box_styles, function(i, s) {
      padding.css(s, content.css(s));
      content.css(s, 0);
    });

    function twoup() {
      var inner_width = padding.width();
      var inner_height = padding.height();
      var padding_length = parseInt(padding.css("padding"));
      var column_gap_width = (padding_length * 2);
      var column_width = Math.floor((inner_width - column_gap_width) / 2);
      scroll_width = (column_width + column_gap_width) * 2;

      content.css({ "width": inner_width + "px", "height": inner_height + "px", "-webkit-column-width": column_width + "px",
       "-moz-column-width": column_width + "px", "column-width": column_width + "px", "-webkit-column-gap": column_gap_width + "px",
       "-moz-column-gap": column_gap_width + "px", "column-gap": column_gap_width + "px" });
      content_width = content[0].scrollWidth;
    };

    $(window).resize(twoup);
    twoup();

    function get_index() {
      var index = parseInt(location.hash.substr(1)); 
      if(isNaN(index)) index = 0;
      return index;
    }

    function get_max_index() {
      return Math.ceil(content_width / (scroll_width + 0.0));
    }

    $(window).bind('hashchange', function() {
      slider.animate({ "margin-left": -(scroll_width * get_index()) + "px" }, 500, "swing");
    }).trigger('hashchange');

    $(window).keydown(function(event) {
      var index = get_index();

      if(event.keyCode == 32 || event.keyCode == 39) {
        event.preventDefault();
        index++;
        if(index >= get_max_index()) index = get_max_index() - 1;
      }
      else if(event.keyCode == 8 || event.keyCode == 37) {
        event.preventDefault();
        index--;
        if(index < 0) index = 0;
      }

      location.hash = "#" + index;
    });

    return this;
  };
})(jQuery);

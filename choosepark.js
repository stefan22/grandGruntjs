/* 
 * jQuery necessary for choose park block.
 * 
 * I chose to re-use the same markup across all three menus on the corp 
 * homepage because 99% of the markup is identical. The only differences
 * are the link destinations and the form action.
 */
(function($){
  $(document).ready(function(){
    
    // Choose park div
    $('div#choose-park-top a#choose-park-link').click(function(event){
      event.preventDefault();
      event.stopPropagation();
      var show = true;
      if($(this).hasClass('active')) {
        $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a, div#choose-park-top a#choose-park-link').removeClass('active');
        show = false;
      } else {
        $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a, div#choose-park-top a#choose-park-link').removeClass('active');
        sixflags_choosepark_menu_change('choose-park');
        $(this).addClass('active');
      }
      $('div#choose-park-menu').removeClass('tickets season-pass').addClass('choose-park').toggle(show);
    });
    
    // Tickets link
    $('.menu-name-menu-corporate-menu li.menu-mlid-1245 a').click(function(event){
      event.preventDefault();
      event.stopPropagation();

      var show = true;
      if($(this).hasClass('active')) {
        $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a, div#choose-park-top a#choose-park-link').removeClass('active');
        show = false;
      } else {
        $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a, div#choose-park-top a#choose-park-link').removeClass('active');
        sixflags_choosepark_menu_change('tickets');
        $(this).addClass('active');
      }
      $('div#choose-park-menu').removeClass('season-pass choose-park').addClass('tickets').toggle(show);
    });
    
    // Season pass link
    $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a').click(function(event){
      event.preventDefault();
      event.stopPropagation();
      var show = true;
      if($(this).hasClass('active')) {
        $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a, div#choose-park-top a#choose-park-link').removeClass('active');
        show = false;
      } else {
        $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a, div#choose-park-top a#choose-park-link').removeClass('active');
        sixflags_choosepark_menu_change('season-pass');
        $(this).addClass('active');
      }
      $('div#choose-park-menu').removeClass('tickets choose-park').addClass('season-pass').toggle(show);
    });
    
    $('div#choose-park-menu').click(function(event){
      event.stopPropagation();
    });
    
    // click anywhere off the menu, hide it.
    $(document).click(function(){
      $('.menu-name-menu-corporate-menu li.menu-mlid-1246 a, .menu-name-menu-corporate-menu li.menu-mlid-1245 a').removeClass('active');
      $('div#choose-park-menu').removeClass('season-pass tickets choose-park').hide();
    });
    
    /*
     * MAP MODAL
     */
    //map modal initialize
    $("#map-modal").dialog({
            autoOpen: false,
            height: 390,
            width: 997,
            modal: true,
			show: {effect: "fade",duration: 500},
 	        hide: {effect: "drop",duration: 100},
	        open: function(event, ui) { $('.ui-widget-overlay').bind('click', function(){
				$("#map-modal").dialog('close'); 
		  	    flowplayer().play();
				}); }
    	});
    $('#block-sixflags-blocks-sixflags-blocks-homepage-video').click(function(){
      $("#map-modal").dialog("open");
	  flowplayer().pause();
    });
    
    $('#choose-park-middle img').click(function(){
      $("#map-modal").dialog("open");
	  flowplayer().pause();
    });
	
    $('div.ui-widget-overlay.ui-front').click(function(){
      $("#map-modal").dialog("close");
	  flowplayer().play();
    });
	
    $('#map-modal-close').click(function(){
      $("#map-modal").dialog("close");
	  flowplayer().play();
    });
//	$('#map-modal').mouseleave(function(){
//		$("#map-modal").dialog("close");
//	})
    
        // set the wrapper width and height to match the img size
    $('#map-wrap').css({'width':$('#map-wrap img').width(),
                      'height':$('#map-wrap img').height()
    });
    
    //tooltip direction
    var tooltipDirection;
    var sfUITop;
                 
    for (i=0; i<$(".pin").length; i++) {				
      // set tooltip direction type - up or down             
      if ($(".pin").eq(i).hasClass('pin-down')) {
        tooltipDirection = 'tooltip-down';
      } else {
        tooltipDirection = 'tooltip-up';
      }
    
      // append the tooltip
      $("#map-wrap").append("<div style='left:"+$(".pin").eq(i).data('xpos')+"px;top:"+$(".pin").eq(i).data('ypos')+"px' class='" + tooltipDirection +"'>\
                                            <div class='tooltip "+$(".pin").eq(i).data('ttclass')+"' >" + $(".pin").eq(i).html() + "</div>\
                                    </div>");
    }
    
    // show/hide the tooltip

    $('#map-wrap').bind('mouseover', function(event) {
        $('.tooltip-down').find('.tooltip').hide();
	});


    $('.tooltip-up, .tooltip-down').bind('mouseover', function(event) {
        event.stopPropagation();
		if($(this).children('.tooltip').is(":hidden")) {
	        $('#map-wrap').find('.tooltip').hide();
		}
        $(this).children('.tooltip').fadeIn(100, function() {
          var offset = $(this).offset(); 
          if(offset.top < 0){
            var width = $(this).width();
            var height = $(this).height();
            //$(this).css({'position': 'relative', 'padding-top' : '1px'}).offset({top: (height + offset.top + 50), left: (offset.left - (width / 2) - 30)});
            var modal = $('.ui-dialog').offset();
            sfUITop = modal.top;
            $('.ui-dialog').animate({
              top: (modal.top - offset.top)
            }, 300);            
          } else if(sfUITop > 0) {
            $('.ui-dialog').animate({
              top: sfUITop
            }, 300, function() {
              sfUITop = 0;
            });
          }
        });
     });
    $(document).click(function(){
      $('#map-wrap').find('.tooltip').fadeOut(100);
      if(sfUITop > 0) {
        $('.ui-dialog').animate({
          top: sfUITop
        }, 300, function() {
          sfUITop = 0;
        });
       }
    });
    
    $('.tooltip, .tooltip a').bind('click',function(event){
      event.stopImmediatePropagation();
      return FALSE;
    });
  });
  /*******************************
   * resets the links and the form action based on the menu item clicked.
   * 
   * I chose to re-use the same markup across all three menus on the corp 
   * homepage because 99% of the markup is identical. The only differences
   * are the link destinations and the form action - this function switches
   * them appropriately.
   */
  function sixflags_choosepark_menu_change(menu) {
    switch (menu){
      case 'choose-park':
        $('div#choose-park-menu-body a').each(function(){
          var href = $(this).attr('href').split('/');
          if(href[0] != 'http:') {
            $(this).attr('href', '/' + href[1]);
          }
        });
        break;
      case 'tickets':
        $('div#choose-park-menu-body a').each(function(){
          var href = $(this).attr('href').split('/');
          if(href[0] != 'http:') {
            $(this).attr('href', '/' + href[1] + '/tickets');
          }          
        });
        break;
      case 'season-pass':
        $('div#choose-park-menu-body a').each(function(){
          var href = $(this).attr('href').split('/');
          if(href[0] != 'http:') {
            $(this).attr('href', '/' + href[1] + '/season-pass');
          }
        });
        break;
    }
  }    
})(jQuery);
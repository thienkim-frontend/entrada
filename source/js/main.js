jQuery(document).ready(function ($) {
	var windowWidth = $(window).width();
	new WOW().init();
	if(windowWidth <= 480){
    accorToggle(".footer-section", ".widget-title", ".widget-list", true);
  } 
  function accorToggle(wrapperEl, titleEl, contentEl, openFirstEl){
    // $(wrapperEl).on("click tap", titleEl, function(){
    //     if($(this).hasClass("active")){
    //         $(this).removeClass("active").parent().find(contentEl).slideUp(500);
    //     }else{
    //         $(wrapperEl + " " +contentEl).hide();
    //         $(wrapperEl + " " +titleEl).removeClass("active");
    //         $(this).addClass("active").parent().find(contentEl).slideDown(500);
    //     }
    // });
    // if(openFirstEl){
    //   $(wrapperEl + " " +titleEl).eq(0).click();
    // }
    $(wrapperEl).on("click tap", titleEl, function(){
    	$(wrapperEl + " " +titleEl).removeClass("active");
    	$(this).toggleClass("active");
    });
    if(openFirstEl){
      $(wrapperEl + " " +titleEl).eq(0).addClass("active");
    }
  }
	$('[data-toggle="tooltip"]').tooltip(); 
	$("[data-fancybox]").fancybox({
		// Try to focus on the first focusable element after opening
    autoFocus : false,
    trapFocus : false,
		touch     : false,
		afterLoad : function( instance, current ) {
			$('[data-selectCustom]').select2();
			$("#start_date").datepicker({
			    dateFormat: 'dd/mm/yy',
			    dayNamesMin: [ "T2", "T3", "T4", "T5", "T6", "T7", "CN" ],
			    // monthNamesShort: [ "Tháng 1", "Tháng 2", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
			    changeMonth: true,
			    changeYear: true,
			    minDate: '0',
			    onClose: function( selectedDate ) {
			    $( "#end_date" ).datepicker( "option", "minDate", selectedDate );
			    }
			});
			$("#end_date").datepicker({
			    dateFormat: 'dd/mm/yy',
			    dayNamesMin: [ "T2", "T3", "T4", "T5", "T6", "T7", "CN" ],
			    changeMonth: true,
			    changeYear: true,
			    minDate: '0',
			    onClose: function( selectedDate ) {
			    $( "#start_date" ).datepicker( "option", "maxDate", selectedDate );
			    }
			});
			console.info( instance );
		},
		beforeClose: function( instance, current ) {
			$( ".datepicker input" ).datepicker( "hide" );
		}
	});


	$('.header-section').affix({
	  offset: {
	    top: function () {
	      return (this.top = $('.header-section').outerHeight(true))
	    }
	  }
	})
	$('.is-fixed-nav').affix({
	  offset: {
	    top: function () {
	      return (this.top = $('.is-fixed-nav').offset().top - 80);
	    }
	  }
	})
	// $(".navbar").on('affix.bs.affix', function(){

  // });
  if($("#slider_filter_price").length){
  	var $slider = $("#slider_filter_price");
  	var $input = $( ".price-input") ;
  	$slider.slider({
  		min: 0,
  		max: 5000,
  		step: 200,
  		values: [ 0, 5000 ],
  		slide: function( event, ui ) {
  			$input.val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + " vnd");
  			console.log(ui.values[0]);
  		}
  	});
  	$input.val( $slider.slider( "values", 0 ) + " - " + $slider.slider( "values", 1 ) + " vnd");
  }

  function initDisplayLayout(el){
  	$("#" + el).click(function(event) {
  		$(".filter_by_layout a").removeClass('active');
  		$(this).addClass('active');
  		$(".search-container").find('.post-item').attr('class', 'post-item ' +el);
  		event.preventDefault();
  	});
  }
  initDisplayLayout("layout-list");
  initDisplayLayout("layout-grid");


	$('[data-selectCustom]').select2().on("select2:select", function (e) {
    var selected_element = $(e.currentTarget);
    var select_val = selected_element.val();
    console.log(select_val);
    $('#faq-tab a[href="'+ select_val + '"]').tab('show');
	});
	$('.nav-tabs-wrapper a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  e.target // newly activated tab
	  e.relatedTarget // previous active tab
  	$('[data-selectCustom]').select2().on("select2:select", function (e) {
      var selected_element = $(e.currentTarget);
      var select_val = selected_element.val();
      console.log(select_val);
      $('#faq-tab a[href="'+ select_val + '"]').tab('show');
  	});
	})

	function doAnimations(){
	    var elems= $(".owl-item.active .caption-wrapper").find('.animation');
	    elems.each(function () {
	    	elems.removeAttr('style');
        var $this = $(this),
            $animationType = $this.data('animation'),
            $animationDelay= $this.data('delay');
        $this.addClass(" animated "+ $animationType).css({"animation-delay":$animationDelay}) ;   
	    });
	}

	function animateCaption(el){
		if($(el).length){
		  $(el).owlCarousel({
		  	items:1,
		  	nav: false,
		  	onInitialized: function () {
            doAnimations();
        },
        onTranslate: function (event) {
          var elems= $(".owl-item.active .caption-wrapper").find('.animation');
          elems.each(function () {
              var $this = $(this),
                  $animationType = $this.data('animation');
              $this.removeClass(" animated "+ $animationType) ;   
          });
          elems.removeAttr('style');

        },

        onTranslated: function () {
            doAnimations()
        }
		  });
		}
	}
	animateCaption(".hero-slider");

	function initOwlCarousel(element){
		$.each($(element), function(index, item) {
			var $responsiveXs = $(this).data("xs")  || { items:1 },
			    $responsiveSm = $(this).data("sm")  || { items:1 },
			    $responsiveMd = $(this).data("md")  || { items:1 },
			    $nav = $(this).data("nav")  || false;
			console.log($responsiveXs);
			$(this).owlCarousel({
				responsive:{
		      0: $responsiveXs,
		      678: $responsiveSm,
		      992: $responsiveMd
		  	},
		  	nav: $nav,
			});
			
		});
	}
	initOwlCarousel(".is-simple-carousel");
  
	$('.destination-slider').owlCarousel({
		responsive:{
      0:{
        items:1,
      },
      678:{
        items: 2,
        center:true,
        loop:true,
        margin: 15,
      },
      992:{
      	items: 3,
      	margin: 15,
      }
  	},
		nav: true,
		navText: ["<div class='img-wrapper'><div class='img-holder' /></div>", "<div class='img-wrapper'><div class='img-holder' /></div>"],
		onInitialized: initImageNav,
		onTranslated: initImageNav
	});
	function initImageNav(event){
		var el = event.target;
		var currentItem = event.item.index; // Position of the current item
		var size = event.page.size; // Number of items per page
		var prevItem, nextItem;

		if(currentItem > 0){
			prevItem = currentItem - 1;
			nextItem = currentItem + size;
		}else {
			prevItem = 0;
			nextItem = size;
		}
		function getImgUrl(index){
			return $(el).find(".owl-item").eq(index).find(".slider-item").attr("style");
		}
		$(el).find(".owl-prev .img-holder").attr("style", getImgUrl(prevItem));
		$(el).find(".owl-next .img-holder").attr("style", getImgUrl(nextItem));
		// console.log(currentItem + " " + prevItem);
	}
	
	/*-----------------------------------------
    SMOOTH SCROLL - https://github.com/kswedberg/jquery-smooth-scroll
    ------------------------------------------*/
	init_navigation_scroll = function() {
    $('a.smooth-scroll').smoothScroll({
      speed: 600,
      offset: 0
    });
  };
	init_navigation_scroll();

	$("#crollToTop").click(function(event) {
		$('html,body').animate({scrollTop:0},'slow');return false;
	});
	
	if ( ($(window).height() + 100) < $(document).height() ) {
	    $('#crollToTop').removeClass('hidden').affix({
	        offset: {top:100}
	    });
	}
	if($("#wanderlust-google-map").length){
		initMap();
	}
	
});

$(window)
  .on( 'load', function() {
  	// $("#loading").fadeOut();
  })
  .on( 'resize', function() {
  })
  .on( 'scroll', function() {

  }); 

function initMap(){
  // New map
  var map = new google.maps.Map(document.getElementById('wanderlust-google-map'), {
    zoom:15,
    center:{lat:10.790024,lng:106.684164},
    fullscreenControl: true
  });

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(event){
    addMarker({coords:event.latLng});
  });
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
	});

  // Array of markers
  var markers = [{
      coords:{lat:10.790024,lng:106.684164}, 
      content:'<h3>Vietnam, HCMC</h3>'
    }];

  for(var i = 0;i < markers.length;i++){
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
      icon:'http://demo.deliciousthemes.com/patti/wp-content/themes/patti/images/map-pin.png',
      // content:props.content
    });
  }
  
}
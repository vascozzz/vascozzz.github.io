/* Initiate globals */
var $window = $(window);
var offset = 200;
var viewport = $(window).height() - offset;


/* Handle mobile navbar */
$(".lines-button").click(function() {
	$(this).toggleClass("open");
});


/* Handle header-text re-sizing */
$(".intro-body-header h1").fitText(1, {minFontSize: "55px"});


/* Force animations to run once as soon as the page is loaded */
collapseNavbar();
revealOnScroll();


/* Handle scrolling events */
$window.scroll(function() {
	collapseNavbar();
	revealOnScroll();
});


/* Handle resizing events */
$window.resize(function() {
	if ($window.width() >= 768) {
		closeMenu();
	}
});


/* Close collapsed menu version of navbar */
function closeMenu() {
	$("#navbar-modal").modal("hide");
	$(".lines-button").removeClass("open");
} 


/* Toggle a class for the navbar after user scrolls a certain amount */
function collapseNavbar() {
	var offsetTop = $(".navbar").offset().top;

    if (offsetTop > viewport) {
    	$(".navbar.navbar-fixed-top").addClass("top-nav-collapse");
    } 
    else {
        $(".navbar.navbar-fixed-top").removeClass("top-nav-collapse");
    }
}


/* Handle all scrolling-related animations */
function revealOnScroll() {
 	var scrolled = $window.scrollTop();

 	$(".scroll-animate:not(.animated)").each(function () {
   		var $this = $(this);
       	var offsetTop = $this.offset().top;

	   	if (scrolled + viewport > offsetTop) {
	     	if ($this.data("timeout")) {
	       		window.setTimeout(function() {
	         		$this.addClass("animated " + $this.data("animation"));
	       		}, 
	       		parseInt($this.data("timeout"), 10));
	    	} 
		    else {
		       $this.addClass("animated " + $this.data("animation"));
		    }
    	}
	});
}


/* Handle smooth scrolling when clicking a link (using the Easing Plugin)*/
$("a.page-scroll").bind("click", function(event) {
    var anchor = $(this);

    closeMenu();
    
    $("html, body").stop().animate({
        scrollTop: $(anchor.attr("href")).offset().top
    }, 1500, "easeInOutExpo");
    
    event.preventDefault();
});


/* Textillate objects */
$(".intro-white").textillate({ 
	in: { 
		effect: "fadeIn", 
		shuffle: true, 
		callback: function() {
			// once the initial animation is finished, we can do something else

		} 
	} 
});


/* Google maps init and customization */
google.maps.event.addDomListener(window, "load", init);

function init() {
	var style = [
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#a2daf2"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.man_made",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#f7f1df"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.natural",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#d0e3b4"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape.natural.terrain",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.park",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#bde6ab"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.medical",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#fbd3da"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.business",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#ffe15f"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "color": "#efd151"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#ffffff"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "black"
	            }
	        ]
	    },
	    {
	        "featureType": "transit.station.airport",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#cfb2db"
	            }
	        ]
	    }
	];

	var latLng = new google.maps.LatLng(41.177875, -8.597916);

    var mapOptions = {
    	center: latLng,
        zoom: 12,
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: true,
        styles: style
    };

    var mapElement = document.getElementById("map-container");
    var map = new google.maps.Map(mapElement, mapOptions);

	var marker = new google.maps.Marker({
	    position: latLng,
	    map: map,
	    icon: "./assets/img/map-marker.png",
	});

	//add custom buttons for the zoom-in/zoom-out on the map (http://codyhouse.co/gem/custom-google-map/)
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map 
	  	var controlUIzoomIn= document.getElementById('map-zoom-in'),
	  		controlUIzoomOut= document.getElementById('map-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
}
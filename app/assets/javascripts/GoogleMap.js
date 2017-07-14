var map;

var style = [
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];
//Google Map 初期化
map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(35.7, 139.7),
    styles:style,
    scrollwheel: false
});

var point_check = d3.select("#point_check");

point_check.on("click", function(){
    if(d3.select(this).property("checked")){
        d3.selectAll(".point").attr("r",6);
    }else{
        d3.selectAll(".point").attr("r",0);
    }
})

var t = 0;
var p = 0;

var slider = new Slider("#ex1");
slider.on("slide", function(sliderValue) {
    document.getElementById("ex1SliderVal").textContent = sliderValue;
    t = sliderValue;
    overlay.draw(sliderValue, p/100);
});

var slider2 = new Slider("#ex2");
slider2.on("slide", function(sliderValue2) {
    document.getElementById("ex2SliderVal").textContent = sliderValue2;
    p = sliderValue2;
    overlay.draw(t, sliderValue2/100);
});

var overlay = new google.maps.OverlayView(); //Make overlay obj

d3.json("map/point", function(error, point){
    overlay.onAdd = function(){
	var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
	var svg = layer.append("svg");
	var svgoverlay = svg.append("g").attr("class", "AdminDivisions");
	var markerOverlay = this;
	var overlayProjection = markerOverlay.getProjection();
	
	var googleMapProjection = function (coordinates) {
            var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
            var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
            return [pixelCoordinates.x+4000, pixelCoordinates.y+4000];
	}

	var set_color = function (probability) {
	    var ra = 255, ga = 255, ba = 130;
	    var rb = 255, gb = 0, bb = 0;
	    var r = (rb - ra) * probability + ra;
	    var g = (gb - ga) * probability + ga;
	    var b = (bb - ba) * probability + ba;
	    
	    return d3.rgb(r,g,b);
	}
	
	overlay.draw = function(time, set_p) {
	    var point_positions = [];
	    var point_probability = [];
	    
	    point[time].forEach(function(d) {
		point_positions.push(googleMapProjection([d.lng,d.lat]));
		point_probability.push(d.val);
	    });

	    var point_circleAttr = {
                "cx":function(d, i) { return point_positions[i][0]; },
                "cy":function(d, i) { return point_positions[i][1]; },
                "r":function(d, i) {
		    if(point_probability[i] >= set_p){
			if(point_check.property("checked")){
			    return 6;
			}else{
			    return 0;
			}
		    }else{
			return 0;
		    }
                },
                "fill":function(d, i) { return set_color(point_probability[i]); },
		"opacity":0.65,
                class:"point"
            }
	    
            svgoverlay.selectAll(".point")
                .data(point[time])
                .attr(point_circleAttr)
                .enter()
                .append("svg:circle")
                .attr(point_circleAttr);
	};
	overlay.draw(0, 0);
    };
    overlay.setMap(map);
});

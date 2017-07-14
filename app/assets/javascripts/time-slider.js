var slider = new Slider("#ex2");
slider.on("slide", function(sliderValue2) {
    document.getElementById("ex2SliderVal").textContent = sliderValue2;
});

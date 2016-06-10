function() { //leave the extra parameters empty
  //Draw The Image
  stone: function() {
        for(var y = 100; y < 125; y++) {
            for(var x = 0; x < 25; x++) {
                var noiseVal;
                var noiseScale = 0.02;
                noiseDetail(8, 0.6);
                noiseVal=noise((x+10) * noiseScale,(y+100) * noiseScale);
                stroke(noiseVal * 150, noiseVal * 150, noiseVal * 150);
                point(x, y);
            }
        }

  //Make the function display the image
  return get(0, 100, 25, 25);
}

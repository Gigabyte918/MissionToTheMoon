function() { //leave the extra parameters empty
  //Draw The Image
  for(var y = 75; y < 100; y++) {
    for(var x = 0; x < 25; x++) {
      var noiseVal;
      var noiseScale = 0.02;
      noiseDetail(8,0.6);
      noiseVal=noise((x+200) * noiseScale,(y+200) * noiseScale);
      stroke(noiseVal * 160, noiseVal * 112, noiseVal * 0);
      point(x, y);
    }
  }

  //Make the function display the image
  return get(0, 75, 25, 25);
}

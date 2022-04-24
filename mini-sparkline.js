function miniSparkline(container, maxSamples, color, lineWidth, alpha) {
  var container = document.querySelector(container);
  var samples = new Array(maxSamples);
  function update(value) {
    if (value !== undefined) {
      samples.push(value);
      samples.shift();
    }
    var nonNullSamples = samples.filter(function(s) {
      return s !== null && s !== undefined;
    })
    var minSample = Math.min.apply(Math, nonNullSamples);
    var maxSample = Math.max.apply(Math, nonNullSamples);
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = lineWidth || 3;
    ctx.strokeStyle = color || 'black';
    ctx.globalAlpha = alpha || 0.5;
    var scale = maxSample-minSample;
    if (scale) {
      ctx.beginPath();
      samples.forEach(function(y, i) {
        var py = height*0.9-(y-minSample)/scale*height*0.8;
        var px = (width/maxSamples)*i;
        ctx.lineTo(px, py);
        ctx.arc(px, py, ctx.lineWidth/2, 0, 2 * Math.PI);
        ctx.moveTo(px, py);
      })
      ctx.stroke();
    }
    container.style.backgroundImage = "url(" + canvas.toDataURL() + ")";
  }
  new ResizeObserver(function(){update()}).observe(container)
  return update;
}

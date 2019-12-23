// (c) Dean McNamee <dean@gmail.com>.  All rights reserved.

var lats =30;
var lons =30;
var tot = lats * lons;

window.addEventListener('load', function() {
Earth.Init()

  var screen_canvas = document.getElementById('canvas');
  var renderer = new Pre3d.Renderer(screen_canvas);

  var shape = Pre3d.ShapeUtils.makeSphere(60, lats,lons);
  Pre3d.ShapeUtils.triangulate(shape); 
  Pre3d.ShapeUtils.forEachVertex(shape, function(v, i, s) {
    s.vertices[i] = Pre3d.Math.unitVector3d(v);  // TODO(deanm): inplace.
  });
 
	
	var img = new Image(); 
	img.src = 'earth.jpg';
	var w = img.width/lats;
	var h = img.height/lons;

  function selectTexture(quad_face, quad_index, shape) {
   
    // Each face is two triangles, the newly triangulated triangles last.
		var qi = quad_index<  tot ? quad_index: quad_index - tot;
	
	  var col = (qi)%lats;//y
	  var row = (qi - col)/lons ;//x	
 
	 //console.log("quad: " + qi + " col: " + col + " row: "+ row);
	  
	  var ti = new Pre3d.TextureInfo();
	  ti.image = img;  	 
  
	 if(quad_index < tot)
	  {
	  
	  ti.u0 = col * w;
	  ti.v0 = row * h; 
	  
	  ti.u1 = ti.u0;
	  ti.v1 = ti.v0 + h;
	  
	  ti.u2 = ti.u0 + w;
	  ti.v2 = ti.v1 ;
	 }
	 else
	 { 
	 
	  row = row -1;
	  ti.u0 = col * w;
	  ti.v0 = row * h; 
	 
	  ti.u1 = ti.u0 + w;
	  ti.v1 = ti.v0 + h;
	  
	  ti.u2 = ti.u0 + w;
	  ti.v2 = ti.v0 ;
	 }
	
	 renderer.texture =  ti ;
	if(row==lats - 1)return true
	  return false;
  }

  renderer.quad_callback = selectTexture;
  
  
  // We need to rebuild the normals after extruding the vertices.
  Pre3d.ShapeUtils.rebuildMeta(shape);
  renderer.draw_overdraw = false;
  renderer.fill_rgba = null;
  //renderer.ctx.lineWidth = 0.9;
  //renderer.stroke_rgba = new Pre3d.RGBA(0x45/255, 0xb4/255, 0xef/255, 0.4);
 
  function setTransform(x, y) {
    var ct = renderer.camera.transform;
    ct.reset();
    ct.rotateZ(0.0);
    ct.rotateY(-2.06 * x - 0.5);
    ct.rotateX(2.2 * y + 1.5);
    ct.translate(0, 0, -12);
  }

  renderer.camera.focal_length = 11;
  setTransform(0, 0);

  function draw() {
    renderer.clearBackground();
    renderer.bufferShape(shape);
    renderer.drawBuffer();
    renderer.emptyBuffer();
  }

  document.addEventListener('mousemove', function(e) {
    setTransform(e.clientX / 400, e.clientY / 400);
    draw();
  }, false);

  draw();
}, false);
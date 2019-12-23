/* 
   ========================================================================== 
         script: Canvas Earth 
         author: Varun Pant 
	     date: 27 June, 2010 
	     site: http://www.varunpant.com 
		 3D Lib by Dean M http://deanm.github.com/pre3d/
               ------------ 
        license: CC-BY-NC - please do not remove this notice ! 
   ========================================================================== 
*/ 
var Earth =
{
  lats  :30,
  lons  :30,
  tot   :0,
  screen_canvas:null,
  renderer:null,
  model3D:null,
  strokeWidth:0.9,
  textureImage:null,
  w:0,
  h:0,
  Init:function()
  {
     with(Earth){

	   tot =lats * lons;
       screen_canvas = document.getElementById('canvas');
	   renderer = new Pre3d.Renderer(screen_canvas);
	   model3D = Pre3d.ShapeUtils.makeSphere(1, lats, lons);

	   Pre3d.ShapeUtils.triangulate(model3D);
       Pre3d.ShapeUtils.forEachVertex(model3D, function(v, i, s) {
																s.vertices[i] = Pre3d.Math.unitVector3d(v);
														  });
	   Pre3d.ShapeUtils.rebuildMeta(model3D);
	   renderer.draw_overdraw = false;
	   renderer.fill_rgba = null;
	  
	
	   renderer.camera.focal_length = 15;
	   
	   renderer.quad_callback = OnPaint;

	   DemoUtils.autoCamera(renderer, 0, 0, -30, 0.40, -2.06, 0, Invalidate);

	   Invalidate();
	   
	   document.addEventListener('mousewheel',Zoom);
	 }
  },
  ApplyTextureSource:function(img)
  {
     with(Earth)
	 {
		 textureImage = new Image();
		 textureImage.src = img;
		 w=textureImage.width/lats;
		 h=textureImage.height/lons;
	 }
  },
  OnPaint:function(quad_face, quad_index, shape)
  {
	 with(Earth)
	 {
	  
	  var qi = quad_index<  tot ? quad_index: quad_index - tot;
	
	  var col = (qi)%lats;//y
	  var row = (qi - col)/lons ;//x	
	  
	  var ti = new Pre3d.TextureInfo();
	  ti.image = textureImage;  	 
  
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
  },
  Zoom:function()
  {
	 var delta = 0;
	 if (!event) event = window.event;
	 if (event.wheelDelta) 
	 {
		delta = event.wheelDelta/120; 
		if (window.opera) delta = -delta; 
	 } 
	 else if (event.detail) 
	 {
		delta = -event.detail/3; 
	 }
	if (delta)
	{
		 with(Earth)
		 {
			if (delta < 0)
			{		
				if(renderer.camera.focal_length>6)
				renderer.camera.focal_length-=5; 			
			}          
			else
			{		    
				 renderer.camera.focal_length+=5;
			}
			
			Invalidate();
		 }
	}
  },
  Invalidate:function()
  {
		with(Earth)
		{
			renderer.clearBackground();
			renderer.bufferShape(model3D);
			renderer.drawBuffer();
			renderer.emptyBuffer();
		}
  },
  ToggleStoke:function(obj)
  {
	if(obj.checked)
	{
	   Earth.renderer.ctx.lineWidth =  Earth.strokeWidth;
	   Earth.renderer.stroke_rgba = new Pre3d.RGBA(0x45/255, 0xb4/255, 0xef/255, 0.4);
	}
	else
	{
	   Earth.renderer.ctx.lineWidth =  0;
	   Earth.renderer.stroke_rgba = null;
	}
	 Earth.Invalidate();
  },
  ToggleTexture:function(obj)
  {
   Earth.ApplyTextureSource(obj.value);
   Earth.Invalidate();
  }
}

onload = function()
{ 
   //preload Images
	 
	for(i=1;i<5;i++)
	{
		var img = document.createElement('img'); 
		img.src = "http://www.varunpant.com/static/resources/Earth/" + i + ".jpg";
		img.id=i; 
		img.onload = function()
		{		
		 document.getElementById("r"+ this.id).style.visibility = "visible";
		 if(this.id==1)
		 {		   
			 //Earth.ApplyTextureSource(this.src);
			  document.getElementById("r1").click();
			 document.getElementById("MSG").style.display="none";
			 Earth.Init();
		 }
		} 
		document.getElementById("preloadCache").appendChild(img);
	}
	
	
}

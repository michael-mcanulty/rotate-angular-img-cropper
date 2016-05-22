'use strict';
angular.module('rotate-angular-img-cropper', ['angular-img-cropper']).config(function($provide) {
  $provide.decorator('imageCropperDirective', function($delegate, $rootScope) {
     var directive = $delegate[0];
     var _link = directive.link;
     directive.compile = function() {
         return function(scope, element, attrs) {
     	     _link.apply(this, arguments);
		     var template = '<div>'+
	 				'   <div class="rotate-btn">'+
                    '	   <i></i>'+
                    '      <div class="rotate-label">Rotate</div>' +
					'   </div>'+
                    '</div>';

			 // template logic
			element.parent().append(template);
			var button = $(element.siblings()[0]).context;
			$(button).children().children('i').addClass(attrs.btnGlyph);
			$(button).children().addClass(attrs.btnClass);
			$(element.siblings()[0]).bind('click', function(){
				$rootScope.$broadcast('rotatedCanvas');
			});
			
	        // rotate logic
			scope.$on('rotatedCanvas', function(){
			    rotateCanvas();
		   });
		   	function rotateCanvas (){
				    var w = 0; // width
				    var h = 0;  // height
				    var c = document.createElement("canvas");
				    var ctx = c.getContext("2d");
				    var image = new Image();
				    scope.currDegree = 90;
				    image.src = scope.image;
					w = image.width;
					h = image.height;
		
			        //One  rotate test
				    switch(scope.currDegree){
				    case 90:  rotate(90, h, 0);
					    break;
				    case 180:  rotate(180, 0, h);
					    break;
				    case 270: rotate(270, 0, w);
					    break;
				    case 360: rotate(360, 0, w);
					    break;
					  
					  // no default
					}
				   scope.currDegree +=90;
				   if(scope.currDegree > 360){
					    scope.currDegree = 90;
				   }
				   function rotate( _deg, _t1, _t2){
				       c.width = h;
					   c.height = w;
					   ctx.translate(_t1, _t2);
					   ctx.rotate(_deg * Math.PI / 180);
					   ctx.drawImage(image,0,0, w, h);
					   ctx.restore(); 
					   scope.image = c.toDataURL();
					   scope.$apply();
				} 
    } //end rotate
       };
   };
    return $delegate;
  });
});
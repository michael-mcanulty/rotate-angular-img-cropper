'use strict';
angular.module('rotate-angular-img-cropper', ['angular-img-cropper']).config(function($provide) {
  $provide.decorator('imageCropperDirective', function($delegate, $rootScope, $compile) {
     var directive = $delegate[0];
     var _link = directive.link;
     directive.compile = function() {
         return function(scope, element, attrs) {
		 scope.rotateImgCropper = {};
			 scope.rotateImgCropper.spinner = {};
			 scope.rotateImgCropper.canvas = {};
			 scope.rotateImgCropper.canvas.width = attrs.width;
			 scope.rotateImgCropper.canvas.height = attrs.height;
			 scope.rotateImgCropper.canvas.rotate = (/^true$/i).test(attrs.rotate);
			 
			 // only make changes if the rotate="true" attr is present
			 //this is here for multiple canvases on a page
				  _link.apply(this, arguments);
				  var template = '<div ng-show="rotateImgCropper.canvas.rotate" rotate-button btn-class="'+
                                                      attrs.btnClass+'" btn-glyph="'+attrs.btnGlyph+'"></div>';
				  // template logic
				  var linkFn = $compile(template);
				  var content = linkFn(scope);
				  element.after(content);
				  element.css('display', 'block');
				  // rotate logic
				  scope.$on('rotatedCanvas', function(){
					  console.log('processed click');
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
								 //stop spinner when loaded
								 image.onload = function(){
									scope.rotateImgCropper.spinner.loading = false;
									scope.$apply();
								 };	 
					  } 
		  } //end rotate
	 }; // end if
   };
    return $delegate;
  });
}).directive('rotateButton', ['$rootScope','$timeout', function($rootScope){
	return{
		restrict: 'A',
		replace: false,
	 	template: '<div>'+
		          '    <div class="rotate-btn">'+
                  '	       <i class="rotate-glyph"></i>'+
                  '        <div class="rotate-label">Rotate</div>' +
                  '    </div>'+
		          '</div>'+
				  '<div class="loading-spinner" ng-show="rotateImgCropper.spinner.loading"' +
				      ' ng-style="rotateImgCropper.spinner.style">'+
    	                          '    <i style="font-size:60px"  class="fa fa-spinner fa-spin"></i>'+
                           '</div>',
				  
	    link: function(scope, element, attrs){
			var top = element.offset().top;
			var left = element.offset().left;
			
			//spinner 
			var spinnerWidth = 60;
			scope.rotateImgCropper.spinner.spinnerTop = {};
			scope.rotateImgCropper.spinner.spinnerLeft = {};
			scope.rotateImgCropper.spinner.spinnerTop = top + - 8 + (scope.rotateImgCropper.canvas.width / 2);
			scope.rotateImgCropper.spinner.spinnerLeft =  left - spinnerWidth/2 + 
			    (scope.rotateImgCropper.canvas.height / 2);
			    
			//subtract half of spinner width
			scope.rotateImgCropper.spinner.style = {'position':'fixed','color':'yellow',
			    'left':scope.rotateImgCropper.spinner.spinnerLeft,
				'margin':'auto','text-align':'center','top':scope.rotateImgCropper.spinner.spinnerTop,'z-index':505};
			
			//add classes to the rotate button	
			element.css('margin','8px 0');
			element.addClass(attrs.btnClass);
			element.find('i').addClass(attrs.btnGlyph);
			element.bind('click', function(){
				if(scope.croppedImage !== null){
					scope.rotateImgCropper.spinner.loading = true;
					$rootScope.$broadcast('rotatedCanvas');
					scope.$apply();
					}
			});   
		   }	  
		};
	}]);

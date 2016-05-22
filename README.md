# rotate-angular-img-cropper
Rotates the source image in angular-img-cropper.


<h1>Requirements</h1>

- Modern Browser supporting `<canvas>`

- angular-img-cropper on GitHub.


<h1>Installation</h1>


Download

- Download rotate-angular-img-cropper files from GitHub.

Or

- Install with Bower


```
bower install rotate-angular-img-cropper
```

Add dependency


Add the image cropper module as a dependancy to your application module:

```
angular.module('myApp', ['rotate-angular-img-cropper']);
```


<h1>Rotate Button</h1>

Add two additional attributes to the `<canvas>`

with the image-cropper attribute.

- btn-class

- btn-glyph


Add your custom button class, or use Twitter bootstrap. Also, pick an icon such as twitter's glyphicon, or FontAwesome like below:

```
 ...btn-class="btn btn-default btn-sm" btn-glyph="fa fa-repeat"></canvas>
```


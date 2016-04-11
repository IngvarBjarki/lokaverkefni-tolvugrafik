var canvas;
var gl;

var BLUE = vec4(0.0, 0.0, 1.0, 1.0);
var RED = vec4(1.0, 0.0, 0.0, 1.0);
var GREEN =vec4(0.0, 1.0, 0.0, 1.0);
var YELLOW = vec4(1.0,1.0, 0.0, 1.0);
var CYAN = vec4(0.0, 1.0, 1.0, 1.0);
var MAGNETA = vec4(1.0, 0.0, 1.0, 1.0);
var BLACK = vec4(0, 0, 0, 1.0);
var DarkGREEN = vec4(0.1, 0.5, 0.1, 1.0);
var BROWN = vec4(0.545, 0.27, 0.075, 1.0);
var numGroundVertices  = 6;



// current viewpoint
var view = 1;

var colorLoc;
var mvLoc;
var pLoc;
var proj;

var groundBuffer;
var vPosition;
var cubeBuffer;

var lookHeight=0.0;
var lookX=10.0;
var lookY=0.0;

var mvLoc;

var cars = [];
var logs = [];


var grSize=1;
// the 6 vertices of the ground
var groundVertices = [
    // bottom side:
    vec3(  -grSize, -grSize,  -grSize ), vec3( grSize, -grSize,  -grSize ), vec3( grSize, grSize, -grSize ),
    vec3( grSize, grSize, -grSize ), vec3(  -grSize, grSize, -grSize ), vec3(  -grSize, -grSize,  -grSize )
];

// fyrir kassan a.k.a froskinn
var cubeVertices = [
    // front side:
    vec3( -0.5,  0.5,  0.5 ), vec3( -0.5, -0.5,  0.5 ), vec3(  0.5, -0.5,  0.5 ),
    vec3(  0.5, -0.5,  0.5 ), vec3(  0.5,  0.5,  0.5 ), vec3( -0.5,  0.5,  0.5 ),
    // right side:
    vec3(  0.5,  0.5,  0.5 ), vec3(  0.5, -0.5,  0.5 ), vec3(  0.5, -0.5, -0.5 ),
    vec3(  0.5, -0.5, -0.5 ), vec3(  0.5,  0.5, -0.5 ), vec3(  0.5,  0.5,  0.5 ),
    // bottom side:
    vec3(  0.5, -0.5,  0.5 ), vec3( -0.5, -0.5,  0.5 ), vec3( -0.5, -0.5, -0.5 ),
    vec3( -0.5, -0.5, -0.5 ), vec3(  0.5, -0.5, -0.5 ), vec3(  0.5, -0.5,  0.5 ),
    // top side:
    vec3(  0.5,  0.5, -0.5 ), vec3( -0.5,  0.5, -0.5 ), vec3( -0.5,  0.5,  0.5 ),
    vec3( -0.5,  0.5,  0.5 ), vec3(  0.5,  0.5,  0.5 ), vec3(  0.5,  0.5, -0.5 ),
    // back side:
    vec3( -0.5, -0.5, -0.5 ), vec3( -0.5,  0.5, -0.5 ), vec3(  0.5,  0.5, -0.5 ),
    vec3(  0.5,  0.5, -0.5 ), vec3(  0.5, -0.5, -0.5 ), vec3( -0.5, -0.5, -0.5 ),
    // left side:
    vec3( -0.5,  0.5, -0.5 ), vec3( -0.5, -0.5, -0.5 ), vec3( -0.5, -0.5,  0.5 ),
    vec3( -0.5, -0.5,  0.5 ), vec3( -0.5,  0.5,  0.5 ), vec3( -0.5,  0.5, -0.5 )
];

var numCubeVertices = 36;
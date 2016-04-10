var canvas;
var gl;

var BLUE = vec4(0.0, 0.0, 1.0, 1.0);
var RED = vec4(1.0, 0.0, 0.0, 1.0);
var GREEN =vec4(0.0, 1.0, 0.0, 1.0);
var GRAY = vec4(0.4, 0.4, 0.4, 1.0);

var numCubeVertices  = 6;



// current viewpoint
var view = 1;

var colorLoc;
var mvLoc;
var pLoc;
var proj;

var groundBuffer;
var vPosition;

var lookHeight=0.0;
var lookX=0.0;
var lookY=0.0;

// the 6 vertices of the ground
var groundVertices = [
    // bottom side:
    vec3(  -10, -10,  -10 ), vec3( 10, -10,  -10 ), vec3( 10, 10, -10 ),
    vec3( 10, 10, -10 ), vec3(  -10, 10, -10 ), vec3(  -10, -10,  -10 ),

];

// fyrir kassan a.k.a froskinn
var squareVertices = [
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

squareVertices = 36;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0.5, 1, 0.5 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // VBO for the ground
    groundBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundVertices), gl.STATIC_DRAW );

    //Buffer fyrir froskinn
    frogBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, frogBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(squareVertices));


    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "fColor" );

    mvLoc = gl.getUniformLocation( program, "modelview" );

    // set projection
    pLoc = gl.getUniformLocation( program, "projection" );
    proj = perspective( 50.0, 1.0, 1.0, 500.0 );
    gl.uniformMatrix4fv(pLoc, false, flatten(proj));

    render();
}


// draw a house in location (x, y) of size size
function ground( x, y, size, mv ) {

    gl.uniform4fv( colorLoc, GREEN );

    mv = mult( mv, translate( x, y, size/2 ) );
    mv = mult( mv, scalem( size, size, size ) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );
}


// draw the ground
function drawGround( mv ,size) {

    gl.uniform4fv( colorLoc, GREEN );

    mv = mult( mv, translate( -100, 0, size/2 ) );
    mv = mult( mv, scalem( size, size, size ) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );

}



function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();
    mv = lookAt( vec3(250.0+lookY, 0.0+lookX, -10), vec3(-10.0+lookY, 0+lookX, 0.0), vec3(0.0, 0.0, 1.0) );
    drawGround( mv,10);
    // Distant and stationary viewpoint
    mv=mult(mv,scalem(100,100,0));



    requestAnimFrame( render );
}


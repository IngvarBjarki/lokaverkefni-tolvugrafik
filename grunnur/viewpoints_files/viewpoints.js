var canvas;
var gl;

var BLUE = vec4(0.0, 0.0, 1.0, 1.0);
var RED = vec4(1.0, 0.0, 0.0, 1.0);
var GREEN =vec4(0.0, 1.0, 0.0, 1.0);
var BLACK = vec4(0, 0, 0, 1.0);

var numGroundVertices  = 6;



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

var grSize=1;
// the 6 vertices of the ground
var groundVertices = [
    // bottom side:
    vec3(  -grSize, -grSize,  -grSize ), vec3( grSize, -grSize,  -grSize ), vec3( grSize, grSize, -grSize ),
    vec3( grSize, grSize, -grSize ), vec3(  -grSize, grSize, -grSize ), vec3(  -grSize, -grSize,  -grSize )

];

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


    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "fColor" );
    
    mvLoc = gl.getUniformLocation( program, "modelview" );

    // set projection
    pLoc = gl.getUniformLocation( program, "projection" );
    proj = perspective( 50.0, 1.0, 1.0, 500.0 );
    gl.uniformMatrix4fv(pLoc, false, flatten(proj));

    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 65: // a
                lookX-=2.0;
                break;
            case 83: // s
                lookY+=2.0;
                break;
            case 87: // w
                lookY-=2.0;
                break;
            case 68: // d
                lookX+=2.0;
                break;

        }
    } );

    render();
}    

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();
    mv = lookAt( vec3(350+lookY, 0.0+lookX, 1), vec3(-50+lookY, lookX, -5), vec3(0.0, 0.0, 1.0) );
    drawGround( mv,100);    
    drawStreet(mv,30);
    drawRiver(mv,30);
    
    requestAnimFrame( render );
}


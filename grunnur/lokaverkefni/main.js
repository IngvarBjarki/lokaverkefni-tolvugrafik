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

    frog = new frog();
 // utbum bilana
    //colors = [BLUE, RED, YELLOW, CYAN, MAGNETA, GREEN];
    var carColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    ];
    //-------------------------------------------------------------------------------------------------
    //utbum bilana, svo lika i render og objectinu cars
    //----------------------------------------------------------------------------------------------
    var numCars = 20; // maeti breyta yfir i global seinna
    colors = [BLUE, RED, CYAN, YELLOW, MAGNETA, BLACK];
/*
    for (var i = 0; i<numCars/4; i++){
        color = vec4(Math.random(), Math.random(), Math.random(), 1);
        whatColor = Math.round((Math.random()*(colors.length-1)));
        cars.push(new car(colors[whatColor], 20*i - 90, 40, 1));

    }
*/

    for (var i = 0; i<numCars; i++){
        color = vec4(Math.random(), Math.random(), Math.random(), 1);
        whatColor = Math.round((Math.random()*(colors.length-1)));
        if(i > 15){
            cars.push(new car(colors[whatColor], 20*i - 100, 55, 1));
        }
        else if(i > 4 && i<8){
            cars.push(new car(colors[whatColor], 20*i - 100, 30, -3));
            //cars.push(new car(colors[whatColor], 20*i - 100, 0, 2));
        }
        else if(i > 4 && i<8){
            cars.push(new car(colors[whatColor], 20*i - 100, 0, 2));
        }
        else{
            cars.push(new car(colors[whatColor], 20*i - 100, 45, -0.5));
        }
}
//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
    //Buffer fyrir froskinn
    cubeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cubeVertices), gl.STATIC_DRAW);


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

            case (65 || 37): // a eða left arrow
                if (frog.frogYPos>-40){
                    frog.frogYPos-=frog.frogSize;
                    frog.frogAngle = 180;
                }
                break;
            case (83 || 40): // s eða back arrow
                if (frog.frogXPos<90){
                    frog.frogXPos+=2*frog.frogSize;
                    frog.frogAngle = 270;
                }
                break;
            case (87 || 38 ) : // w eða upp arrow
                if (frog.frogXPos>-70){
                    frog.frogXPos-=2*frog.frogSize;
                    frog.frogAngle = 90;
                }
                break;
            case (68 || 39): // d eða right arrow
                if (frog.frogYPos<120){
                    frog.frogYPos+=frog.frogSize;
                    frog.frogAngle = 0;
                }
                break;

        }});

    render();
};


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();


    //mv = lookAt( vec3(frog.frogXPos+30,frog.frogYPos, 10 ), vec3(frog.frogXPos,frog.frogYPos,5.0 ), vec3(0.0, 0.0, 1.0) );
    mv = lookAt( vec3(frog.frogXPos+60,frog.frogYPos, 40 ), vec3(frog.frogXPos-60,frog.frogYPos,5.0 ), vec3(0.0, 0.0, 1.0) );
    frog.render(mv);

//-------------------------------------------------------------------------------------------------------------------------
// renduerum bilana þannig .þeir birtist stoðugt upp a nytt og eru stoðugt a hreyfingu
//--------------------------------------------------------------------------------------------------------------------------
    for(var j = 0; j<cars.length; j++){
        cars[j].render(mv);
        cars[j].update();
    }
//-----------------------------------------------------------------------------------------------------------------------------------
// teiknum grunninn
//-----------------------------------------------------------------------------------------------------------------------------------
    drawStreet(mv,20,500);
    drawRiver(mv,20,500);
    drawGround( mv,500);

    requestAnimFrame( render );
}


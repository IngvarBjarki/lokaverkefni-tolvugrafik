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
            case 65: // a
                frog.frogYPos-=frog.frogSize;
                break;
            case 83: // s
                frog.frogXPos+=2*frog.frogSize;
                break;
            case 87: // w
                frog.frogXPos-=2*frog.frogSize;
                break;
            case 68: // d
                frog.frogYPos+=frog.frogSize;
                break;

        }});


 window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 37: // left arrow
                frog.frogAngle = 200;
                frog.update(0);
                console.log(frog.frogXPos);
                console.log(frog.frogAngle);
                console.log("her er frog dir" + frog.frogDirectionX);
                console.log("her er frog dirY" + frog.frogDirectionY);
                break;
            case 38: // upp arrow
                frog.frogAngle = 180;
                 frog.update();

                break;
            case 39: // right arrow
                frog.frogAngle = 90;
                 frog.update();
                break;
            case 40: // down arrow
                frog.frogAngle = 270;
                frog.update();
                break;

        }});


    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();

    //mv = lookAt( vec3(0+lookY, 0.0+lookX, 5), vec3(-50+lookY, lookX, -5), vec3(0.0, 0.0, 1.0) );
    mv = lookAt( vec3(frog.frogXPos+50,frog.frogYPos, 100 ), vec3(frog.frogXPos,frog.frogYPos,5.0 ), vec3(0.0, 0.0, 1.0) );
    frog.render(mv);

    drawStreet(mv,20);
    drawRiver(mv,20);
    drawGround( mv,80);




    requestAnimFrame( render );
}


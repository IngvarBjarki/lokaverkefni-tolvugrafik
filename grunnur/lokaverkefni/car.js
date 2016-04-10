function car(){



}

function drawCar() {
    var mv = mat4();
    mv = mult( mv, translate( carXPos, carYPos, 0.0 ) );
    mv = mult( mv, rotateZ( carDirection ) ) ;
    drawCar( mv );
    // set color to blue
    gl.uniform4fv( colorLoc, BLUE );
    
    gl.bindBuffer( gl.ARRAY_BUFFER, cubeBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    // lower body of the car
    mv = mult( mv, translate( 0.0, 0.0, 5 ) );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );

    var mv1=mv;

    // upper part of the car
    mv1 = mult( mv1, translate( -0.2, 0.0, 6.5 ) );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );
}


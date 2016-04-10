function car(){



}

function drawCar(mv) {

    // set color to blue
    gl.uniform4fv(colorLoc, BLUE);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);


    //mv = mult(mv, translate( 50, 40, 5));

      var mv1 = mv;
    // lower body of the car

    mv = mult( mv, scalem( 30.0, 9.0, 6.0 ) );
    mv = mult( mv, translate( 0.0, 0.0, 0.5 ) );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    // upper part of the car
    mv1 = mult( mv1, scalem( 12.0, 9.0, 6.0 ) );
    mv1 = mult( mv1, translate( -0.2, 0.0, 1.5 ) );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays(gl.TRIANGLES, 0, 36);

}


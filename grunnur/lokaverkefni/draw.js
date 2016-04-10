// draw the ground
function drawGround( mv ,size) {

    gl.uniform4fv( colorLoc, GREEN );
    
    mv = mult( mv, scalem( size, size, 0 ) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );
}

function drawStreet( mv ,size) {

    gl.uniform4fv( colorLoc, BLACK );
    
    mv = mult( mv, translate(40, 0, 0 ) );
    mv = mult( mv, scalem( size, 100, -0.1) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );

}
function drawRiver( mv ,size) {

    gl.uniform4fv( colorLoc, BLUE );
    
    mv = mult( mv, translate(-40, 0, 0 ) );
    mv = mult( mv, scalem( size, 100, -0.1) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );    
}
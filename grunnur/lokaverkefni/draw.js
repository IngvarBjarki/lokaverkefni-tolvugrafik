// draw the ground
function drawGround( mv ,size) {

    gl.uniform4fv( colorLoc, GREEN );
    
    mv = mult( mv, scalem( size, size, 0 ) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );
}

function drawStreet( mv ,width,size) {

    gl.uniform4fv( colorLoc, BLACK );
    
    mv = mult( mv, translate(40, 0, 0 ) );
    mv = mult( mv, scalem( width, size, -0.01) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );

}
function drawRiver( mv ,width,size) {

    gl.uniform4fv( colorLoc, BLUE );
    
    mv = mult( mv, translate(-40, 0, 0 ) );
    mv = mult( mv, scalem( width, size, -0.01) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );    
}

function drawEndOfWorld( mv ,width,size,i) {

    gl.uniform4fv( colorLoc, RED );
    
    mv = mult( mv, translate(i*10, i*107, 0 ) );
    mv = mult( mv, scalem( width, size, -0.1) );

    gl.bindBuffer( gl.ARRAY_BUFFER, cubeBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );    
}

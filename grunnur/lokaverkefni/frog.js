function frog(){

    this.frogXPos = 0.0;
    this.frogYPos = 0.0;
    this.frogSize = 5.0;
    this.frogAngle = 90;
    this.frogDirectionX = Math.cos(radians(this.frogAngle)); // til þess hann fari ekki i x at þegar hann a ad fara i y att
    this.frogDirectionY = Math.sin(radians(this.frogAngle)); // -||-
    this.frogStepSize = 1.5;
    this.frogWidth = this.frogSize;
    this.frogLenegth = this.frogSize;

}


frog.prototype.update = function(){

// utbum switch settningu fyrir hvada orvatakkar eru valdir


};

frog.prototype.render = function(mv){
    //var mv=vec4;
    mv = mult(mv, translate(this.frogXPos, this.frogYPos, this.frogWidth));
    // ef vid viljum rotadea ta kemur tad her
    mv = mult(mv, scalem(this.frogSize, this.frogSize, this.frogSize));

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.uniform4fv(colorLoc, GREEN);

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, numCubeVertice);

};

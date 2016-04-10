function frog(angle){

    this.frogXPos = 92.5;
    this.frogYPos = 32.5;
    this.frogSize = 5.0;
    this.frogAngle = angle || 90;
    this.frogDirectionX = Math.cos(radians(this.frogAngle)); // til þess hann fari ekki i x at þegar hann a ad fara i y att
    this.frogDirectionY = Math.sin(radians(this.frogAngle)); // -||-
    this.frogStepSize = 1.5;
    this.frogWidth = this.frogSize;
    this.frogLength = this.frogSize;

}


frog.prototype.update = function(angle){
this.frogAngle = angle;
// utbum switch settningu fyrir hvada orvatakkar eru valdir
//this.frogXpos += this.frogDirectionX * this.frogStepSize ;
//this.frogYpos += this.frogDirectionY * this.frogStepSize ;
this.frogXPos += 2*this.frogDirectionX;
this.frogYPos += 2*this.frogDirectionY;
};

frog.prototype.render = function(mv){
    //var mv=vec4;
    mv = mult(mv, translate(this.frogXPos, this.frogYPos, this.frogWidth));
    // ef vid viljum rotadea ta kemur tad her
    mv = mult(mv, rotateZ(-this.frogAngle));
    mv = mult(mv, scalem(this.frogSize, this.frogSize +3, this.frogSize));

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.uniform4fv(colorLoc, DarkGREEN);

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, numCubeVertice);

};

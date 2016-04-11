function log(xPos, yPos, Speed, length){

    this.logXPos = xPos;
    this.logYPos = yPos;
    this.logSpeed = Speed;
    this.logColor = BROWN;
    this.logLength = length;
    this.logWidth = 8;
    this.logHeight = 1;
}

log.prototype.update = function(){

    if(this.logYPos > 150){
    this.logYPos = -100 + Math.random()*10;
}
else if(this.logYPos < -150){
    this.logYPos = 130 + Math.random()*10;
}
else{
    this.logYPos += this.logSpeed;
}
    frog.logCollisionCheck(this);

};

log.prototype.render = function(mv){
//debugger;
gl.uniform4fv(colorLoc, this.logColor);
gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

mv = mult(mv, translate(this.logXPos, this.logYPos, 2));
mv = mult(mv, scalem(this.logWidth, this.logLength, this.logHeight));

gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
gl.drawArrays(gl.TRIANGLES, 0, 36);
};
function frog(angle){

    this.frogXPos = 70;
    this.frogYPos = 30;
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
    gl.drawArrays(gl.TRIANGLES, 0, 36);

};

frog.prototype.collisionCheck = function(c){
    fx1=this.frogXPos-this.frogLength/2;
    fx2=this.frogXPos+this.frogLength/2;
    fy1=this.frogYPos-this.frogWidth/2;
    fy2=this.frogYPos+this.frogWidth/2;

    cx1=c.carXPos-c.carWidth/2
    cx2=c.carXPos+c.carWidth/2
    cy1=c.carYPos-c.carLength/2
    cy2=c.carYPos+c.carLength/2
    if (fx1<=cx2 && fy1<=cy2 && fx1>=cx1 && fy2>=cy1){
        this.frogXPos=70;
        this.frogYPos=0;
        alert("You lost");
    }
};
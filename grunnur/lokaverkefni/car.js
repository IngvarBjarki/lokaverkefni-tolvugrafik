function car(color, yPos, xPos, speed){

    this.carXPos = xPos;
    this.carYPos = yPos;
    this.carSize = 0.0;
    this.carWidth = 8.0; // this.carSize ;//+3; // gedi plus 3 ingvar
    this.carLength = 15.0 ; //this.carSize;// +10; // gerdi plus 10 ingvar
    this.carHeight = 5.0 ;
    this.carColor = color ;
    this.carSpeed = speed;
    this.ShiftX = - 0.2;
    this.ShiftY = - 1;
    this.ShiftZ = 7;
    //mv = mult(mv, scalem(8+this.carSize,15+this.carSize,5+this.carSize));

}

//car.prototype.carUpperX = this.carXPos  - 0.2;
car.prototype.update = function(){


  //mv1 = mult(mv1, translate(-0.2+this.carXPos, -1+this.carYPos, 7+this.carWidth));

    if(this.carSpeed < 0){
        this.ShiftY= 1;
    }

    // ef bilinn er komin x langt utfyrir
    if(this.carYPos > 150){
        this.carYPos = -100 + Math.random()*10;
    }
    else if(this.carYPos < -150){
        this.carYPos = 130 + Math.random()*10;
    }
    else{
        this.carYPos += this.carSpeed;
    }
    frog.carCollisionCheck(this);


};

car.prototype.render = function(mv){
    // Setjum lit a bilinn og setjum i cubebuffer
    gl.uniform4fv(colorLoc, this.carColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    var mv1 = mv;
//---------------------------------------------------------------------------------------------------------------------
// lower body of the car
//---------------------------------------------------------------------------------------------------------------------
    mv = mult(mv, translate(this.carXPos, this.carYPos, 3+this.carSize));
   // mv = mult(mv, scalem(8+this.carSize,15+this.carSize,5+this.carSize));
   mv = mult(mv, scalem(this.carWidth, this.carLength, this.carHeight));

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
//------------------------------------------------------------------------------------------------------------------------
// upper part of the car
//------------------------------------------------------------------------------------------------------------------------
    mv1 = mult(mv1, translate(this.ShiftX + this.carXPos, this.ShiftY + this.carYPos, this.ShiftZ+this.carSize));
   //mv1= mult(mv1, scalem(8+this.carSize, 6+this.carSize, 4+this.carSize));
   mv1 = mult(mv1, scalem(this.carWidth, this.carLength-9, this.carHeight -1));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays(gl.TRIANGLES, 0, 36);

};

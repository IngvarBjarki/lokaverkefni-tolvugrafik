function car(color, yPos){

    this.carXPos = 0.0;
    this.carYPos = yPos;
    this.carSize = 0.0;
    this.carAngle = 180;
    this.carDirectionX = Math.cos(radians(this.carAngle)); // til þess hann fari ekki i x at þegar hann a ad fara i y att
    this.carDirectionY = Math.sin(radians(this.carAngle)); // -||-
    this.carStepSize = 1.5;
    this.carWidth = this.carSize ;//+3; // gedi plus 3 ingvar
    this.carLength = this.carSize;// +10; // gerdi plus 10 ingvar
    this.carColor = color ; //BLUE
    this.carSpeed = 0.0;

}
car.prototype.update = function(){

// utbum switch settningu fyrir hvada orvatakkar eru valdir


};

car.prototype.render = function(mv){

    // set color to blue
    gl.uniform4fv(colorLoc, this.carColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);


    //mv = mult(mv, translate( 50, 40, 5));

      var mv1 = mv;
    // lower body of the car
     // fra joni
    mv = mult(mv, translate(this.carXPos, this.carYPos, 3+this.carWidth));
    mv = mult(mv, scalem(8+this.carSize,15+this.carSize,5+this.carSize));
    //mv = mult(mv, rotateZ(this.carAngle));


/*
    mv = mult(mv, translate(this.carXPos, this.carYPos, 0.5+this.carSize));
    mv = mult(mv, rotateZ(this.carAngle));
    mv = mult(mv, scalem(this.carLength, this.Width, 2+this.carSize));
*/

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
//console.log("hér er carXpos" + carXpos);
    // upper part of the car
    mv1 = mult(mv1, translate(-0.2+this.carXPos, -1+this.carYPos, 7+this.carWidth));
    mv1= mult(mv1, scalem(8+this.carSize, 6+this.carSize, 4+this.carSize));
     //mv1 = mult(mv1, rotateZ(this.carAngle));
    //mv1 = mult(mv1, rotateZ(-this.carAngle));

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays(gl.TRIANGLES, 0, 36);

}


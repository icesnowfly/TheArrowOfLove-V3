//The platform that characters stand on

function Platform(spriteTexture,x,y,w,h,move=false,min=0,max=0,moveSpeed=0.2) {

    this.minH = min;
    this.maxH = max;
    this.isMove = move;
    this.mMoveSpeed = moveSpeed;
    this.mDirection = 1;
    this.mPlatform = new SpriteRenderable(spriteTexture);
    this.mPlatform.setColor([1,1,1,0]);
    this.mPlatform.getXform().setPosition(x,y);
    this.mPlatform.getXform().setSize(w,h);
    this.mPlatform.setElementPixelPositions(0,512,0,64);
    //this.mPlatform.setElementPixelPositions();
    GameObject.call(this,this.mPlatform);

    var r = new RigidRectangle(this.getXform(), w, h);
    r.setMass(0);
    this.setRigidBody(r);
    r.setRestitution(0);
   // this.toggleDrawRenderable();
   //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Platform,GameObject);

Platform.prototype.update = function(){
    var xform = this.mPlatform.getXform();
    if (this.isMove) {
        xform.setYPos(xform.getYPos() + this.mDirection*this.mMoveSpeed);
        if (xform.getYPos()>this.maxH || xform.getYPos()<this.minH)
            this.mDirection *= -1;
    }
    GameObject.prototype.update.call(this);
}

Platform.prototype.getSpeed = function () {
    return this.mMoveSpeed;
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Role(spriteTexture, x, y, n){
    this.kFallinlove = "assets/AudioTest/Fallinlove.mp3";

    this.mRole = new SpriteRenderable(spriteTexture);
    this.mRole.getXform().setPosition(x, y);
    this.mRole.getXform().setSize(6, 20);
    this.mRole.setColor([1,1,1,0]);
    this.xpos = x;
    this.mHeart = new SpriteRenderable(spriteTexture);
//    this.mHeart.getXform().setPosition(x, y + 10);
    this.mHeart.getXform().setSize(6, 6);
    
    if(n === 1){
        this.mRole.setElementPixelPositions(100, 340, 10, 744);
        this.mHeart.setElementPixelPositions(60, 240,800,980 );
    }
    else{
        this.mRole.setElementPixelPositions(700, 940, 10, 783);
        this.mHeart.setElementPixelPositions(700, 880,800,980 );
    }
    GameObject.call(this, this.mRole);

    this.mIsHit = false;
    this.mIsMoving = false;
    this.mDirection = 1;
    this.mSpeed = 0.2;
    this.mTimer = 0;
    var r = new RigidRectangle(this.getXform(), 6, 20);
    this.setRigidBody(r);
    this.getRigidBody().setRestitution(0);
    this.getRigidBody().setFriction(1);
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Role, GameObject);

Role.prototype.draw = function(camera){
    this.mRole.draw(camera);
    if(this.mIsHit)
        this.mHeart.draw(camera);
};

Role.prototype.update = function(ArrowSet){
    GameObject.prototype.update.call(this);
    var info = new CollisionInfo();
    if (!this.mIsMoving)
        this.mRole.getXform().setXPos(this.xpos);
    for (var i=0;i<ArrowSet.size();i++){
        if (this.getRigidBody().collisionTest(ArrowSet.getObjectAt(i).getRigidBody(),info))
        {
            gEngine.AudioClips.playACue(this.kFallinlove);
            if (ArrowSet.getObjectAt(i).getIsFire()) {
                this.mIsMoving = true;
                var xform = ArrowSet.getObjectAt(i).getXform();
                if (xform.getXPos() < this.getXform().getXPos()) {
                    this.mDirection = 1;
                } else this.mDirection = -1;
                ArrowSet.getObjectAt(i).setIsFire(false);
            }
            this.mIsHit = true;
            this.mHeart.getXform().setPosition(this.mRole.getXform().getXPos(), this.mRole.getXform().getYPos() + 13);
//          this.mRole.setColor([1,0.6,0.8,0.8]);
            this.mTimer = 0;
        }
    }
    if (this.mIsHit)
    {
        this.mTimer += 1;
    }
    if (this.mIsMoving)
    {
        this.getXform().setXPos(this.getXform().getXPos()+this.mSpeed * this.mDirection);
        this.mHeart.getXform().setPosition(this.mRole.getXform().getXPos(), this.mRole.getXform().getYPos() + 13);
    }
    if (this.mTimer > 180)
    {
        this.mIsHit = false;
        this.mIsMoving = false;
        this.mTimer = 0;
//        this.mRole.setColor([1,1,1,0]);
    }
    this.getXform().setRotationInRad(0);
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Arrow(spriteTexture, Cupid, cosT, sinT, speed, bounceNum, isFire) {
    this.kHit = "assets/AudioTest/Hit.mp3";

    var w = 15;
    var h = 3;

    var bowXform = Cupid.mBow.getXform();
    this.mAllFire = new GameObjectSet();
    var fParams = new FireParams(20,13,2,0,1,0,0,2,7,0,3.5,5,25,75);
    this.mFire = new Fire(fParams);
    this.mAllFire.addToSet(this.mFire);

    this.mArrow = new SpriteRenderable(spriteTexture);
    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setPosition(bowXform.getXPos(), bowXform.getYPos());
    this.mArrow.getXform().setSize(w, h);
    this.mArrow.setElementPixelPositions(100,370,461,512);
    this.mIsDead = false;
    this.mSpeedX = 0.0;
    this.mSpeedY = 0.0;
    this.mIsHit = false;
    this.mHalfLength = w/2;
    this.mTimes = bounceNum;
    this.mIsFire = isFire;

    GameObject.call(this, this.mArrow);
    
    var r;
    r = new RigidRectangle(this.getXform(), w, h);
    this.mSpeedX = cosT * speed;
    this.mSpeedY = sinT * speed;
    r.setVelocity(this.mSpeedX, this.mSpeedY);

    //Initialize the fire position
    var xform = this.mArrow.getXform();
    var radian = Math.atan2(r.mVelocity[1] , r.mVelocity[0]);
    var headX = this.mHalfLength * Math.cos(radian);
    var headY = this.mHalfLength * Math.sin(radian);
    this.mFire.setPos(xform.getXPos()+headX,xform.getYPos()+headY);

    r.mXform.setRotationInRad(bowXform.getRotationInRad());
    r.setMass(1);
    r.setRestitution(0);
    this.setRigidBody(r);
  //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Arrow, GameObject);

Arrow.prototype.draw = function(aCamera){
    this.mArrow.draw(aCamera);
    if (this.mIsFire)
        this.mAllFire.draw(aCamera);
};

Arrow.prototype.update = function (World) {
    var xform = this.getXform();
    var hitPosition = new vec2.create();
    var PlatformSet = World.mPlatformSet;

    gEngine.ParticleSystem.update(this.mAllFire);

    //Set the arrow's rotation
    var r = this.getRigidBody();
    var radian = Math.atan2(r.mVelocity[1] , r.mVelocity[0]);
    this.getRigidBody().mXform.setRotationInRad(radian);
    //Set the fire
    var headX = this.mHalfLength * Math.cos(radian);
    var headY = this.mHalfLength * Math.sin(radian);
    this.mFire.setPos(xform.getXPos()+headX,xform.getYPos()+headY);

    //Deal with the collision
    var info = new CollisionInfo();
    for (var i=0;i<PlatformSet.size();i++)
    {
        var tempx = this.getRigidBody().getVelocity()[0];
        var tempy = this.getRigidBody().getVelocity()[1];
        var tempxf = PlatformSet.getObjectAt(i).getXform();
        var touchX = this.getXform().getXPos() + 7.5 * tempx / Math.sqrt(tempx * tempx + tempy * tempy);
        var touchY = this.getXform().getYPos() + 7.5 * tempy / Math.sqrt(tempx * tempx + tempy * tempy);
        var xmin = tempxf.getXPos() - tempxf.getWidth()/2;
        var xmax = tempxf.getXPos() + tempxf.getWidth()/2
        var ymin = tempxf.getYPos() - tempxf.getHeight()/2
        var ymax = tempxf.getYPos() + tempxf.getHeight()/2;

        if(touchX > tempxf.getXPos() - tempxf.getWidth()/2
            && touchX < tempxf.getXPos() + tempxf.getWidth()/2
            && touchY > tempxf.getYPos() - tempxf.getHeight()/2
            && touchY < tempxf.getYPos() + tempxf.getHeight()/2){
            if(this.mTimes > 0){
                this.mTimes--;
                var disx = (touchX - xmin > xmax - touchX)?(xmax - touchX) : (touchX - xmin);
                var disy = (touchY- ymin > ymax - touchY)?(ymax - touchY) : (touchY - ymin);
                if(disx < disy)
                    this.getRigidBody().setVelocity(-this.getRigidBody().getVelocity()[0], this.getRigidBody().getVelocity()[1]);
                else
                    this.getRigidBody().setVelocity(this.getRigidBody().getVelocity()[0], -this.getRigidBody().getVelocity()[1]);
            }
            else {
                this.mIsHit = true;
                gEngine.AudioClips.playACue(this.kHit);
            }
        }
        //if (this.getBBox().intersectsBound(PlatformSet.getObjectAt(i).getBBox()))
        //if (this.pixelTouches(PlatformSet.getObjectAt(i),hitPosition))
    }

    if (xform.getXPos()>300 || xform.getXPos()<-100 || xform.getYPos()>250 || xform.getYPos()<-100 || this.mIsHit) //Out of the world bound
    {
        this.mIsDead = true;
    }

    GameObject.prototype.update.call(this);
}

Arrow.prototype.getIsFire = function () {
    return this.mIsFire;
}

Arrow.prototype.setIsFire = function (flag) {
    this.mIsFire = flag;
}
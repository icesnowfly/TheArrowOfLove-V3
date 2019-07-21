//The Game World

function World(Cupid,PlatformSet,Boy,Girl) {
    this.kWinSound = "assets/AudioTest/Win.mp3";
    this.kFail = "assets/AudioTest/Fail.mp3";

    GameObjectSet.call(this);
    //this.addToSet(Cupid);
    this.addToSet(Boy);
    this.addToSet(Girl);
    this.mCupid = Cupid;
    this.mBoy = Boy;
    this.mGirl = Girl;
    this.mPlatformSet = PlatformSet;
    this.mIsWin = false;
    this.mIsLose = false;
    for (var i=0;i<PlatformSet.size();i++)
    {
        this.addToSet(PlatformSet.getObjectAt(i));
    }
}
gEngine.Core.inheritPrototype(World,GameObjectSet);

World.prototype.update = function (aCamera, msg) {
    this.mCupid.update(this);
    this.mPlatformSet.update();
    if (!this.mIsWin) {
        this.mBoy.update(this.mCupid.mArrowSet);
        this.mGirl.update(this.mCupid.mArrowSet);
    }
    gEngine.Physics.processCollision(this,[]);
    if (this.mBoy.mIsHit && this.mGirl.mIsHit)
    {
        this.mIsWin = true;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playACue(this.kWinSound);
    }
    var xform = this.mCupid.getXform();
    if (xform.getYPos()<-20) //Out of the world bound
    {
        this.mIsLose = true;
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playACue(this.kFail);
    }
}
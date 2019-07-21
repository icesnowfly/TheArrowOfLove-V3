/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(levelID) {
    this.kTexture = "assets/kTexture.png";
    this.kWood = "assets/RigidShape/Wood.png";
    this.kRole = "assets/Role.png";
    this.kWin = "assets/WinPage.png";
    this.kLose = "assets/LosePage.png";
    this.kEnergyBar = "assets/EnergyBar.png";
    this.kGameBGM = "assets/AudioTest/PlayBGM.mp3";
    this.kArrowfast = "assets/AudioTest/Arrowfast.mp3";
    this.kArrowslow = "assets/AudioTest/Arrowslow.mp3";
    this.kFail = "assets/AudioTest/Fail.mp3";
    this.kHurray = "assets/AudioTest/Hurray.mp3";
    this.kHit = "assets/AudioTest/Hit.mp3";
    this.kFallinlove = "assets/AudioTest/Fallinlove.mp3";
    this.kWinSound = "assets/AudioTest/Win.mp3";
    this.mButtonSelect = null;
    this.mBackButton = null;
    this.mWinButton = null;
    // The camera to view the scene
    this.mCamera = null;
    this.mWinPage = null;
    this.mCurrentLevel = levelID;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kRole);
    gEngine.Textures.loadTexture(this.kTexture);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kWin);
    gEngine.Textures.loadTexture(this.kLose);
    gEngine.Textures.loadTexture(this.kEnergyBar);
    gEngine.AudioClips.loadAudio(this.kGameBGM);
    gEngine.AudioClips.loadAudio(this.kArrowfast);
    gEngine.AudioClips.loadAudio(this.kArrowslow);
    gEngine.AudioClips.loadAudio(this.kFail);
    gEngine.AudioClips.loadAudio(this.kFallinlove);
    gEngine.AudioClips.loadAudio(this.kHurray);
    gEngine.AudioClips.loadAudio(this.kHit);
    gEngine.AudioClips.loadAudio(this.kWinSound);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kRole);
    gEngine.Textures.unloadTexture(this.kWin);
    gEngine.Textures.unloadTexture(this.kLose);
    gEngine.Textures.unloadTexture(this.kEnergyBar);
    gEngine.AudioClips.unloadAudio(this.kGameBGM);
    gEngine.AudioClips.unloadAudio(this.kArrowfast);
    gEngine.AudioClips.unloadAudio(this.kArrowslow);
    gEngine.AudioClips.unloadAudio(this.kFail);
    gEngine.AudioClips.unloadAudio(this.kFallinlove);
    gEngine.AudioClips.unloadAudio(this.kHurray);
    gEngine.AudioClips.unloadAudio(this.kHit);
    gEngine.AudioClips.unloadAudio(this.kWinSound);
    if(this.mButtonSelect === "Back")
        gEngine.Core.startScene(new Menu());
    else if(this.mButtonSelect === "Next")
        gEngine.Core.startScene(new MyGame(this.mCurrentLevel+1));
    else if(this.mButtonSelect === "Restart")
        gEngine.Core.startScene(new MyGame(this.mCurrentLevel));
    else if(this.mButtonSelect === "Level")
        gEngine.Core.startScene(new Level());
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.92, 0.92, 0.952, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    //Set up the Cupid and platforms and roles according to levelID
    this.mPlatformSet = new PlatformSet();
    if (this.mCurrentLevel === 1) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 20, 200, 10));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 120, 45, 5, 40));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,60,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 25, 50, 0);
        this.mGirl = new Role(this.kRole, 175, 50, 1);
    }
    if (this.mCurrentLevel === 2) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 20, 200, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 40, 90, 90, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 130, 45, 40, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 65, 25, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 85, 77.5, 5, 30));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 110, 55, 5, 25));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,60,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 25, 50, 0);
        this.mGirl = new Role(this.kRole, 25, 120, 1);
    }
    if (this.mCurrentLevel === 3) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 30, 20, 60, 5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 100, 40, 70, 5,true,40,110,0.5));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 170, 120, 60, 5));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,30,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 15, 30, 0);
        this.mGirl = new Role(this.kRole, 160, 140, 1);
    }
    if (this.mCurrentLevel === 4) {
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 20, 100, 10));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 50, 90, 100, 10));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 60, 115, 5, 40));
        this.mPlatformSet.addToSet(new Platform(this.kWood, 150, 20, 50, 10, true, 20, 80, 0.2));
        this.mCupid = new Cupid(this.kTexture,this.mCamera,60,50,this.mPlatformSet);
        //Set up the boy and the girl
        this.mBoy = new Role(this.kRole, 25, 50, 0);
        this.mGirl = new Role(this.kRole, 25, 120, 1);
    }

    this.mWorld = new World(this.mCupid,this.mPlatformSet,this.mBoy,this.mGirl);

    // Set up the message
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(5, 10);
    this.mMsg.setTextHeight(5);

    this.mBackButton = new UIButton(this.BackSelect, this, [700, 50], [100, 40], "Back", 6);
    this.mWinPage = new WinPage(this.kWin, this.mCurrentLevel);
    this.mLosePage = new LosePage(this.kLose);

    gEngine.AudioClips.playBackgroundAudio(this.kGameBGM);
    gEngine.AudioClips.setBackgroundVolume(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.92, 0.92, 0.952, 1]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mWorld.draw(this.mCamera);
    this.mCupid.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);

    this.mBackButton.draw(this.mCamera);
    if (this.mWorld.mIsWin){
        this.mWinPage.draw(this.mCamera);
    }
    else if (this.mWorld.mIsLose){
        this.mLosePage.draw(this.mCamera);
    }
};

MyGame.prototype.update = function () {
    //Update all the things in the scene
    if (!this.mWorld.mIsWin && !this.mWorld.mIsLose) {
        var msg = "   Charge: " + this.mCupid.mSpeedCount/*this.mCupid.mSpeedCount < 100 ? this.mCupid.mSpeedCount : 100)*/
        + "    Current Level: " + this.mCurrentLevel;
        this.mMsg.setText(msg);
        this.mWorld.update(this.mCamera, this.mMsg);
        this.mBackButton.update();
    }
    if (this.mWorld.mIsWin){
        this.mWinPage.update();
        this.mButtonSelect = this.mWinPage.mStatus;
        if(this.mButtonSelect !== null)
            gEngine.GameLoop.stop();
    }else if (this.mWorld.mIsLose)
    {
        this.mLosePage.update();
        this.mButtonSelect = this.mLosePage.mStatus;
        if (this.mButtonSelect !== null)
            gEngine.GameLoop.stop();
    }
};

MyGame.prototype.BackSelect = function(){
    this.mButtonSelect = "Back";
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
};
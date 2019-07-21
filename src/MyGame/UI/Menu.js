/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";

function Menu(){
    this.kMenu = "assets/Menu.png";
    this.kTitleBGM = "assets/AudioTest/WeddingBGM.mp3";
    this.kUIButton = "assets/UI/SimpleButton.png";
//    this.kWrong = "assets/Wrong.png";
    
    this.mCamera = null;
    this.StartButton = null;
    this.LevelButton = null;
    this.HelpButton = null;
    this.LevelSelect = null;
    this.mBackground = null;
}
gEngine.Core.inheritPrototype(Menu, Scene);

Menu.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kMenu);
    gEngine.AudioClips.loadAudio(this.kTitleBGM);
//    gEngine.Textures.loadTexture(this.kWrong);
//    gEngine.Textures.loadTexture(this.kUIButton);
};

Menu.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kMenu);
    gEngine.AudioClips.unloadAudio(this.kTitleBGM);
//    gEngine.Textures.unloadTexture(this.kWrong);
//    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect === "Start"){
        gEngine.Core.startScene(new MyGame(1));
    }
    if(this.LevelSelect === "Level"){
        gEngine.Core.startScene(new Level());
    }
    else if(this.LevelSelect === "Help"){
        gEngine.Core.startScene(new Help());
    }
};

Menu.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,1,1,1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    this.mBackground = new TextureRenderable(this.kMenu);
    this.mBackground.getXform().setPosition(50, 40);
    this.mBackground.getXform().setSize(128, 128);
    this.mBackground.setColor([1,1,1,0]);
    
    this.StartButton = new UIButton(this.StartSelect, this, [400, 300], [300, 60], "Start", 6);
    this.LevelButton = new UIButton(this.LevelSelected, this, [400, 200], [300, 60], "Level", 6);
    this.HelpButton = new UIButton(this.HelpSelect, this, [400, 100], [300, 60], "Help", 6);
    gEngine.AudioClips.playBackgroundAudio(this.kTitleBGM);
};

Menu.prototype.draw = function(){
    gEngine.Core.clearCanvas([1,1,1,1]);
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.StartButton.draw(this.mCamera);
    this.LevelButton.draw(this.mCamera);
    this.HelpButton.draw(this.mCamera);
};

Menu.prototype.update = function(){
    this.StartButton.update();
    this.LevelButton.update();
    this.HelpButton.update();
};

Menu.prototype.StartSelect = function(){
    this.LevelSelect = "Start";
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.GameLoop.stop();
};

Menu.prototype.LevelSelected = function(){
    this.LevelSelect = "Level";
    gEngine.GameLoop.stop();
};

Menu.prototype.HelpSelect = function(){
    this.LevelSelect = "Help";
    gEngine.GameLoop.stop();
};
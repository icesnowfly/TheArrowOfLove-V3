/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function WinPage(spriteTexture, currentLevel){
    this.BG = new SpriteRenderable(spriteTexture);
    this.BG.getXform().setPosition(100, 75);
    this.BG.getXform().setSize(80, 80);
    this.BG.setElementPixelPositions(0, 512, 0, 512);
    this.BG.setColor([1,1,1,0]);
    if (currentLevel ===4) {
        this.NextButton = new UIButton(this.BackSelect, this, [400, 330], [200, 40], "Back", 6);
    }
    else
    {
        this.NextButton = new UIButton(this.NextSelect, this, [400, 330], [180, 40], "Next Level", 6);
    }
    this.RestartButton = new UIButton(this.RestartSelect, this, [400, 270], [130, 40], "Restart", 6);
    this.NextButton.setBGColor([0.8,0.8,0.8,1]);
    this.NextButton.setBGHoverColor([0.9,0.9,0.9,1]);
    this.RestartButton.setBGColor([0.8,0.8,0.8,1]);
    this.RestartButton.setBGHoverColor([0.9,0.9,0.9,1]);
    this.mStatus = null;
}

WinPage.prototype.draw = function(Camera){
    this.BG.draw(Camera);
    this.NextButton.draw(Camera);
    this.RestartButton.draw(Camera);
};

WinPage.prototype.update = function(){
    this.NextButton.update();
    this.RestartButton.update();
};

WinPage.prototype.NextSelect = function(){
    this.mStatus = "Next";
};

WinPage.prototype.BackSelect = function(){
    this.mStatus = "Back";
};

WinPage.prototype.RestartSelect = function(){
    this.mStatus = "Restart";
};
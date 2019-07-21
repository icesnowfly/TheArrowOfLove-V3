/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Trap(spriteTexture, x, y){
    this.mTrap = new SpriteRenderable(spriteTexture);
    this.mTrap.setColor([1,1,1,0]);
    this.mTrap.getXform().setPosition(x, y);
    this.mTrap.getXform().setSize(15, 3);
    this.mTrap.setElementPixelPositions(0,128,0, 512);
    GameObject.call(this, this.mTrap);
    this.mTimer = 0;
    this.mHeight = 0;
}
gEngine.Core.inheritPrototype(Trap, GameObject);

Trap.prototype.update = function(){
    if(this.mTimer < 120)
        this.mTimer++;
    else if(this.mTimer >= 240)
        this.mTimer = 0;
    else{
        this.mHeight = ( 60 - Math.abs(this.mTimer - 180) ) /20;
        this.mTrap.getXform().setSize(15, this.mHeight);
        this.mTimer++;
    }
};

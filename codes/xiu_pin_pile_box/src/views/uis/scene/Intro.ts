/**
 *
 * @author Jing
 *
 */
class Intro extends egret.gui.SkinnableComponent
{
    public imgBg: egret.gui.UIAsset;

    public constructor()
    {
        super();
        this.skinName = skins.scene.IntroSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchMove, this);
    }



    private onTouchMove(e: egret.TouchEvent): void
    {
        AudioDevice.playEffect(AudioName.CLICK);
        //Alert.show("hello world");
        Global.UI_LAYER.addElementAt(new Rule(), 0);
        egret.Tween.get(this).to({ y: -Global.stage.stageHeight }, 500);
        //  Global.UI_LAYER.removeElement( this );
        // Global.GAME_LAYER.addChild( new Game());
    }
}

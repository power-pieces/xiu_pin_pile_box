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
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }



    private onTouchMove(e: egret.TouchEvent): void
    {
        Alert.show("hello world");
        //  Global.UI_LAYER.removeElement( this );
        // Global.GAME_LAYER.addChild( new Game());
    }
}

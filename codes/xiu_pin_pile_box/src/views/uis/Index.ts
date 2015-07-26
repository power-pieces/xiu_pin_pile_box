/**
 *
 * @author 
 *
 */
class Index extends egret.gui.SkinnableComponent
{
    public btnStart: egret.gui.Button;
    
	public constructor() {
        super();
        this.skinName = skins.scene.IndexSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}
	
    public createCompleteEvent(event:egret.gui.UIEvent):void{
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        this.btnStart.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );
    }
    
    
	
	private onTouchTap(e:egret.TouchEvent):void
    {
        Alert.show("hello world");
      //  Global.UI_LAYER.removeElement( this );
       // Global.GAME_LAYER.addChild( new Game());
	}
}

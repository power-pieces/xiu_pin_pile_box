class ExHelp extends egret.gui.SkinnableComponent
{
    public btnBack: egret.gui.Button;

    public constructor()
    {
        super();
        this.skinName = skins.scene.ExHelpSkin;
    }

    public createChildren(): void
    {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
    }

    private btnBack_touchTapHandler(e: egret.TouchEvent): void
    {
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Share());

    }
} 
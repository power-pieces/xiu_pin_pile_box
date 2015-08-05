/**
*
* @author Jing
*
*/
class Rule extends egret.gui.SkinnableComponent
{
    public btnGame: egret.gui.Button;
    public btnLottery: egret.gui.Button;

    public constructor()
    {
        super();
        this.skinName = skins.scene.RuleSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        

        this.addListeners();
    }

    public addListeners(): void
    {
        this.btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGame_touchTapHandler, this);
        this.btnLottery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLottery_touchTapHandler, this);
    }

    public removeListeners(): void
    {
        this.btnGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGame_touchTapHandler, this);
        this.btnLottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLottery_touchTapHandler, this);
    }

    private btnGame_touchTapHandler(e: egret.TouchEvent): void
    {
        AudioDevice.playEffect(AudioName.CLICK);
        if (DataCenter.power <= 0)
        {
            Alert.show("alert_tip_1");
            return;
        }

        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Game());
        new StatisticCmd().run("进入游戏");
    }

    private btnLottery_touchTapHandler(e: egret.TouchEvent): void
    {
        AudioDevice.playEffect(AudioName.CLICK);
        //Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new ExHelp());
        new StatisticCmd().run("查看秀品好礼");
    }
}
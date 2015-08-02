/**
*
* @author Jing
*
*/
class LotteryInfoWindow extends egret.gui.SkinnableComponent
{
    private static ins: LotteryInfoWindow = null;

    public static show(type: number, key: string)
    {
        if (null == LotteryInfoWindow.ins)
        {
            LotteryInfoWindow.ins = new LotteryInfoWindow();
        }
        egret.gui.PopUpManager.addPopUp(LotteryInfoWindow.ins, true, true);
        LotteryInfoWindow.ins.addListeners();
        LotteryInfoWindow.ins.update(type, key);
    }

    public static close()
    {
        egret.gui.PopUpManager.removePopUp(LotteryInfoWindow.ins);
        LotteryInfoWindow.ins.removeListeners();
    }


    public imgTitle: egret.gui.UIAsset;
    public imgIcon: egret.gui.UIAsset;
    public txtKey: egret.gui.TextInput;
    public btnKeys: egret.gui.Button;
    public btnEx: egret.gui.Button;
    public btnSumbit: egret.gui.Button;

    private _type: number;
    private _key: string;
    private _isCreated: boolean = false;
    public constructor()
    {
        super();
        this.skinName = skins.windows.LotteryInfoWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this._isCreated = true;
        this.addListeners();
        this.refresh();

    }

    public addListeners(): void
    {
        if (this._isCreated == false)
        {
            return;
        }
        this.btnSumbit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnSumbit_touchBeginHandler, this);
        this.btnEx.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnEx_touchBeginHandler, this);
        this.btnKeys.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnKeys_touchBeginHandler, this);
    }

    public removeListeners(): void
    {
        this.btnSumbit.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnSumbit_touchBeginHandler, this);
        this.btnEx.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnEx_touchBeginHandler, this);
        this.btnKeys.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnKeys_touchBeginHandler, this);
    
    }

    public btnKeys_touchBeginHandler(e: egret.TouchEvent): void
    {
        Global.UI_LAYER.addElement(new Keys());
    }

    public btnEx_touchBeginHandler(e: egret.TouchEvent): void
    {
        //LotteryInfoWindow.close();
        //Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new ExHelp());
    }

    public btnSumbit_touchBeginHandler(e: egret.TouchEvent): void
    {
        LotteryInfoWindow.close();
        Global.UI_LAYER.removeAllElements();
        Global.UI_LAYER.addElement(new Share());
    }

    public update(type: number, key: string):void
    {
        this._type = type;
        this._key = key;
        this.refresh();
    }

    private refresh(): void
    {
        if (this.initialized == false || this._type == null)
        {
            return;
        }

        this.imgTitle.source = "r_title_" + this._type + "_png";
        this.imgIcon.source = "r_icon_" + this._type + "_png";
        this.txtKey.text = this._key;
    }
}
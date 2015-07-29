/**
 *
 * @author 
 *
 */
class LockWindow extends egret.gui.SkinnableComponent
{

    private static instance: LockWindow = null;
    
    public static show(content:string)
    {
        if(null == LockWindow.instance)
        {
            LockWindow.instance = new LockWindow( content );
        }
        else
        {
            LockWindow.instance.setContent( content );
        }
        
        egret.gui.PopUpManager.addPopUp(LockWindow.instance, true, true);
    }
    
    public static close()
    {
        if ( LockWindow.instance )
        {
            egret.gui.PopUpManager.removePopUp( LockWindow.instance );
        }
    }
    
    
    private _content: string;
    public txtContent: egret.gui.Label = null;
    
	public constructor(content:string) {        
        super();
        this.skinName = skins.windows.LockWindowSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
       // super.createChildren();
        //this.txtContent.text = content;
        this._content = content;
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        this.txtContent.text = this._content;
    }
	
	public setContent(content:string)
    {
        this._content = content;
        this.txtContent.text = content;
	}
}

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
    
    
    
    public txtContent: egret.gui.Label = null;
    
	public constructor(content:string) {        
        super();
        this.skinName = skins.windows.LockWindowSkin;
        super.createChildren();
        this.txtContent.text = content;
	}
	
	public setContent(content:string)
	{
        this.txtContent.text = content;
	}
}

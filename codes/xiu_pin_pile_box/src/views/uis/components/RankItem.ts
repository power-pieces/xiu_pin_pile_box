/**
 *
 * @author Jing
 *
 */
class RankItem extends egret.gui.SkinnableComponent
{
    public imgBg: egret.gui.UIAsset;

    public constructor()
    {
        super();
        this.skinName = skins.components.RankItemSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }
}

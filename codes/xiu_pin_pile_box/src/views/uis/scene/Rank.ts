/**
*
* @author Jing
*
*/
class Rank extends egret.gui.SkinnableComponent
{
    public rank0: RankItem;
    public rank1: RankItem;
    public rank2: RankItem;
    public btnBack: egret.gui.Button;



    public constructor()
    {
        super();
        this.skinName = skins.scene.RankSkin;
        this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
    }

    public createCompleteEvent(event: egret.gui.UIEvent): void
    {
        this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);

        this.rank0.init(1, null, "", 0);
        this.rank1.init(2, null, "", 0);
        this.rank2.init(3, null, "", 0);

        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);

        

        NoticeManager.addNoticeAction(GameNotice.GOT_RANK, this.gotRankNotice.bind(this));
        new GetRankCmd().run(DataCenter.id);
    }

    private btnBack_touchTapHandler(e: egret.TouchEvent): void
    {
        Global.UI_LAYER.removeAllElements();
        Global.GAME_LAYER.addChild(new Share());

    }

    private gotRankNotice(n: GameNotice): void
    {
        for (var i: number = 0; i < DataCenter.rankList.length; i++)
        {
            var info: any = DataCenter.rankList[i];
            var rankItem: RankItem = <RankItem>this["rank" + i];
            if (null != rankItem)
            {
                rankItem.init(i + 1, info.pic, info.name, +info.total_score);
            }
        }
    }
}
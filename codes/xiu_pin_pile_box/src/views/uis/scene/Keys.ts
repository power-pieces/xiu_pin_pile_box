class Keys extends egret.gui.SkinnableComponent
{
    public btnBack: egret.gui.Button;
    public list: egret.gui.Group;

    public constructor()
    {
        super();
        this.skinName = skins.scene.KeysSkin;

    }

    public childrenCreated(): void
    {
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);

        //将奖励分类
        var rewardDic: any = {};
        for (var i: number = 0; i < DataCenter.rewards.length; i++)
        {
            var reward: any = DataCenter.rewards[i];
            if (null == rewardDic[reward.type])
            {
                rewardDic[reward.type] = [];
            }

            var array: any[] = rewardDic[reward.type];
            array.push(reward);
        } 

        for (var k in rewardDic)
        {
            var item: KeysItem = new KeysItem(rewardDic[k]);
            this.list.addElement(item);
        }

        this.invalidateDisplayList();

        egret.gui.PopUpManager.addPopUp(this, true);
    }

    private btnBack_touchTapHandler(e: egret.TouchEvent): void
    {
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBack_touchTapHandler, this);
        //Global.UI_LAYER.removeAllElements();
        //Global.GAME_LAYER.addChild(new Share());
        //Global.UI_LAYER.removeElement(this);
        egret.gui.PopUpManager.removePopUp(this);
    }


}
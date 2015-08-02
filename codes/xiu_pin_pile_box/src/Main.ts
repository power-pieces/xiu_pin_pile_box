//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer
{

    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;

    public constructor()
    {
        super();

        //TODO 获取外部资源
        var openInfo:any = Extend.callWindow("getInfo");
        if(null == openInfo)
        {
            openInfo = {};
            openInfo.inviter = "test_id";
            openInfo.id = "test_id";
            openInfo.name = "test_name";
            openInfo.pic = "";
        }
        DataCenter.inviter = openInfo.inviter;
        DataCenter.id = openInfo.id;
        DataCenter.nickname = openInfo.name;
        DataCenter.pic = openInfo.pic;
        DataCenter.openInfo = openInfo;
        //alert(JSON.stringify(openInfo));
        
        
        Extend.callReadyShare();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event)
    {
        Global.stage = this.stage;
        //inject the custom material parser
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void
    {
        if (event.groupName == "preload")
        {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void
    {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void
    {
        if (event.groupName == "preload")
        {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    private createScene(): void
    {
        this.stage.frameRate = 60;

        AudioDevice.prep([AudioName.CLICK,
            AudioName.HIT_BOX,
            AudioName.LOTTERY,
            AudioName.BGM,
            AudioName.BGM_GAME,
            AudioName.BOX_HEIGHT_ENOUGH,
            AudioName.DROP_BOX,
            AudioName.GAME_RESULT,
            AudioName.LOTTERY_FAIL,
            AudioName.LOTTERY_SUCCESS],
            this.stage,
            function (): void
            {
                AudioDevice.playBGM(AudioName.BGM);
            });

        //this.setConfig();
        DataCenter.cfg = RES.getRes("config_json");
        //Global.stage = this.stage;
        //游戏场景层，游戏场景相关内容可以放在这里面。        
        this.addChild(Global.GAME_LAYER);
        //GUI的组件必须都在这个容器内部,UIStage会始终自动保持跟舞台一样大小。        
        this.addChild(Global.UI_LAYER);

        //Global.GAME_LAYER.addChild(new Game());
        //Global.UI_LAYER.addElement(new Intro());
        
        //LockWindow.show( "hello world" );

        NoticeManager.addNoticeAction(GameNotice.LOGIN_SUCCESS, this.onLoginSuccess);
        new LoginCmd().run(DataCenter.id, DataCenter.nickname, DataCenter.pic);

    }

    private onLoginSuccess(n:GameNotice): void
    {       
        if (null == DataCenter.inviter)
        {
            Global.UI_LAYER.addElement(new Intro());
            //Global.GAME_LAYER.addChild(new Game());
        }
        else
        {
            Global.UI_LAYER.addElement(new BeShare());
            //Global.UI_LAYER.addElement(new Keys());
        }        
    }
}



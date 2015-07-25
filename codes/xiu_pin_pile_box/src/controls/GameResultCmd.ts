class GameResultCmd extends ACmd
{
    public run(id: string, score: number): void
    {
        var args: any = {};
        args.id = id;
        args.score = score;
        NetManager.implicitCall("game_result", args, this.onResponse, this);
    }

    private onResponse(jsonStr: string): void
    {
        var data: any = JSON.parse(jsonStr);
        if (data.error)
        {

        }
        NoticeManager.sendNotice(new GameNotice(GameNotice.GIVE_POWER_SUCCESS));
    }
}
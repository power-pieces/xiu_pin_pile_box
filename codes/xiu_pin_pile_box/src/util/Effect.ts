class Effect
{
    public static getEffectSheet(res:string, first: string, start: number, end: number): egret.Texture[]
    {
        var sheet: egret.Texture[] = [];

        var ss: egret.SpriteSheet = RES.getRes(res);

        var tName: string;
        for (var i: number = start; i <= 9; i++)
        {
            tName = first + "1000" + i;
            sheet.push(ss.getTexture(tName));
        }

        for (var i: number = 10; i <= end; i++)
        {
            tName = first + "100" + i;
            sheet.push(ss.getTexture(tName));
        }
        return sheet;
    }
}
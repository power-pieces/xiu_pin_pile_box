var Effect = (function () {
    function Effect() {
    }
    Effect.getEffectSheet = function (res, first, start, end) {
        var sheet = [];
        var ss = RES.getRes(res);
        var tName;
        for (var i = start; i <= 9; i++) {
            tName = first + "1000" + i;
            sheet.push(ss.getTexture(tName));
        }
        for (var i = 10; i <= end; i++) {
            tName = first + "100" + i;
            sheet.push(ss.getTexture(tName));
        }
        return sheet;
    };
    return Effect;
})();

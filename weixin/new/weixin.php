<?php
//jsapi_ticket有效期
define("TICKET_EXPIRES_IN", 5400);

/**
 * 微信接入需要的php
 * 作用：获取SDK
 * Created by PhpStorm.
 * User: Jing
 * Date: 2015/8/6
 * Time: 19:33
 */
class WeiXin
{
    //用户的标识，对当前公众号唯一
    public $openid = "";
    //用户的昵称
    public $nickname = "";
    //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    public $sex = 0;
    //用户所在城市
    public $city = "";
    //用户所在国家
    public $country = "";
    //用户所在省份
    public $province = "";
    //用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
    public $headimgurl = "";

    //生成签名的时间戳
    public $timestamp;
    //生成签名的随机串
    public $noncestr;
    //签名
    public $signature;

    //分享人openId
    public $share = "";

    //第三方用户唯一凭证
    public $appid;
    //第三方用户唯一凭证密钥，即appsecret
    private $_appsecrect;
    //存储access_token的位置
    private $_tokenPath;

    public function __construct($appid, $appsecrect, $tokenPath, $noncestr = 'code_by_jing')
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        if(isset($_GET["share"]))
        {
            $this->share = $_GET["share"];
        }

        $this->appid = $appid;
        $this->_appsecrect = $appsecrect;
        $this->_tokenPath = $tokenPath;
        $this->noncestr = $noncestr;
        $this->timestamp = time();
    }

    /**
     * 初始化开房平台信息
     */
    public function initOpenInfo()
    {
        if (isset($_SESSION['openid'])) {
            $this->initFromSession();
        } else if (isset($_GET['code'])) {
            //echo "initFromCode";
            $this->initFromCode();
        } else {
            $this->init($this->appid, $this->_appsecrect, $this->_tokenPath);
        }
    }

    /**
     * 初始化JS-API信息
     */
    public function initApiInfo()
    {
        $this->createSignature();
    }


    private function init()
    {
        $site = $this->getSite();
        $url = "Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=" . $this->appid . "&redirect_uri=" . urlencode($site) . "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";
        header($url);
    }

    private function initFromCode()
    {
        $code = $_GET['code'];
        $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $this->appid . "&secret=" . $this->_appsecrect . "&code=" . $code . "&grant_type=authorization_code";

        $result = $this->requestURL($url);
        $res = json_decode($result, true);
        if (isset($res['errcode'])) {
            echo $result;
            die();
        }

        $token = $res['access_token'];
        $openid = $res['openid'];

        $url = "https://api.weixin.qq.com/sns/userinfo?access_token=" . $token . "&openid=" . $openid;
        $result =$this->requestURL($url);
        $res = json_decode($result, true);
        if (isset($res['errcode'])) {
            echo $result;
            die();
        }

        $this->openid = $res['openid'];
        $this->nickname = $res['nickname'];
        $this->sex = $res['sex'];
        $this->city = $res['city'];
        $this->country = $res['country'];
        $this->province = $res['province'];
        $this->headimgurl = $res['headimgurl'];


        $_SESSION["openid"] = $this->openid;
        $_SESSION["nickname"] = $this->nickname;
        $_SESSION["sex"] = $this->sex;
        $_SESSION["city"] = $this->city;
        $_SESSION["country"] = $this->country;
        $_SESSION["province"] = $this->province;
        $_SESSION["headimgurl"] = $this->headimgurl;
    }

    private function initFromSession()
    {
        $this->openid = $_SESSION['openid'];
        $this->nickname = $_SESSION['nickname'];
        $this->sex = $_SESSION['sex'];
        $this->city = $_SESSION['city'];
        $this->country = $_SESSION['country'];
        $this->province = $_SESSION['province'];
        $this->headimgurl = $_SESSION['headimgurl'];
    }

    private function getSite()
    {
        $pageURL = 'http';

        if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {
            $pageURL .= "s";
        }
        $pageURL .= "://";

        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
        }
        return $pageURL;
    }

    //创建签名
    private function createSignature()
    {
        $ticket = $this->getTicket();
        $noncestr = $this->noncestr;
        $timestamp = $this->timestamp;
        $url = $this->getSite();
        $s = "jsapi_ticket=" . $ticket . "&noncestr=" . $noncestr . "&timestamp=" . $timestamp . "&url=" . $url;
        $this->signature = sha1($s);
    }

    private function getTicket()
    {
        if (file_exists($this->_tokenPath)) {
            $localTicketData = file_get_contents($this->_tokenPath);
            $localTicketData = unserialize($localTicketData);
            $dataTime = +$localTicketData['time'];
            if ($this->timestamp - $dataTime < TICKET_EXPIRES_IN) {
                return $localTicketData['ticket'];
            }
        }

        //如果之前没有返回，则需要重新获取Ticket
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $this->appid . "&secret=" . $this->_appsecrect;
        $result =$this->requestURL($url);
        $res = json_decode($result, true);
        if (isset($res['errcode'])) {
            echo $result;
            die();
        }

        $accessToken = $res['access_token'];

        $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" . $accessToken . "&type=jsapi";
        $result =$this->requestURL($url);
        $res = json_decode($result, true);
        if (isset($res['errcode'])) {
            echo $result;
            die();
        }

        $ticket = $res['ticket'];

        $arr = array("token" => $accessToken, "ticket" => $ticket, "time" => $this->timestamp);
        $ss = serialize($arr);
        $fp = fopen($this->_tokenPath, "w");
        fputs($fp, $ss);
        fclose($fp);

        $logf = file_get_contents($this->_tokenPath . "log");
        $logf .= "\n";
        $logf .= json_encode($arr);
        $fp = fopen($this->_tokenPath . "log", "w");
        fputs($fp, $logf);
        fclose($fp);

        return $ticket;
    }

    private function requestURL($url)
    {
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $data = curl_exec($ch);
        //$rescode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $data;
    }
}

?>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    <?php
        $file = "C:/wamp4/www/token.txt";
        $appid = "wx2c9e2b3c3e0cc058";
        $appsecrect = "cf67d528c6aab80cebbfcd0ac20c8aee";
        $noncestr = "dajiagame";
        $wx = new WeiXin($appid, $appsecrect, $file, $noncestr);
        $wx->initOpenInfo();
        $wx->initApiInfo();
    ?>

    var sharesuccessfunc;
    var sharefuncobj;

    var obj = {};
    //邀请人
    obj.inviter = "<?php echo $wx->share;?>";
    //openId
    obj.id = "<?php echo $wx->openid;?>";
    //昵称
    obj.name = "<?php echo $wx->nickname;?>";
    //图片
    obj.pic = "<?php echo $wx->headimgurl;?>";
    if ("" == obj.inviter) {
        obj.inviter = null;
    }
    //alert(JSON.stringify(obj));


    //分享的具体信息，请自行添加修改。
    function setTimeLine(shareid, shareName) {
        //分享到朋友圈的设置
        wx.onMenuShareTimeline({
            title: '微信接口DEMO', // 分享标题
            desc: '', // 分享描述
            link: 'http://www.g6game.com/h5game/xp_box/client/index.php?share=' + shareid, // 分享链接
            imgUrl: 'http://www.g6game.com/h5game/xp_box/client/share.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                if (sharesuccessfunc != null)
                    sharesuccessfunc.apply(sharefuncobj, []);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数

            }
        });
    }


    //获取游戏需要的信息
    function getInfo() {
        return obj;
    }

    function setAppMessage(shareid) {
        //分享给朋友的设置
        wx.onMenuShareAppMessage({
            title: '微信接口DEMO', // 分享标题
            desc: '', // 分享描述
            link: 'http://www.g6game.com/h5game/xp_box/client/index.php?share=' + shareid, // 分享链接
            imgUrl: 'http://www.g6game.com/h5game/xp_box/client/share.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                if (sharesuccessfunc != null)
                    sharesuccessfunc.apply(sharefuncobj, []);
            },
            cancel: function () {
            }
        });
    }

    //准备分享
    function readyShare() {
        alert("分享者ID：" + obj.id + "   名称：" + obj.name);
        setTimeLine(obj.id, obj.name);
        setAppMessage(obj.id, obj.name);
    }

    wx.config({
        debug: true,
        appId: '<?php echo $wx->appid;?>',
        //在share.php里面有储值
        timestamp: '<?php echo $wx->timestamp;?>',
        nonceStr: '<?php echo $wx->noncestr;?>',
        signature: '<?php echo $wx->signature?>',
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });

    wx.ready(function () {
        alert("准备成功");
        readyShare();
    });
    wx.error(function(res){
        alert("产生错误");
    });

</script>

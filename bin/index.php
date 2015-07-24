<?php
include 'weixin.php';
?>


<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>湖北手机摄影俱乐部</title>
    <link rel="stylesheet" type="text/css" href="css/reset.css" />
    <link rel="stylesheet" type="text/css" href="css/web.css" />
</head>
<body onload="init()">
	<!--头部-->
	<header id="header">
		<!--2015-4-13-->
		<a href="#" onclick="Index.goHomePage()" class="logo-link"><img id="headimg" class="user-headimg" /></a>
		<!--添加照片-->
		<a href="add_photo.php" class="add-photo btn">添加照片</a>
		<!--搜索入口-->
		<a href="javascript:;" class="icon-search"></a>
		<!--分类入口-->
		<a href="category.html" class="icon-category"></a>
	</header>
	<!--头部结束-->
	
	<!--搜索-->
	<div class="search-bg" id="searchBg"></div>
	<div class="search-wrap" id="searchWrap">
		<span class="search-btn" id="searchBtn"></span><input type="text" placeholder="请输入关键字"/>
	</div>
<!--内容区-->
<div class="main" id="wrapper">
    <div class="scroller">
        <!--广告区（注：图片名不要用带ad的命名,有些浏览器会行进过滤对这种命名的结构不显示）
        <div class="banner"></div>-->

        <div id="slider" class="swipe">
            <div id="swipe_list" class="swipe-wrap">
            </div>
            <span class="propagation" id="Pagation"><em class="on"></em><em></em><em></em></span>
        </div>

        <!--图文列表-->
        <div id="pullDown" class="ub ub-pc c-gra">
            <div class="pullDownIcon"></div>
            <div class="pullDownLabel">下拉刷新</div>
        </div>

        <div class="photo-list">
            <ul id="img_list">
            </ul>
        </div>

        <div id="pullUp" class="ub ub-pc c-gra">
            <div class="pullUpIcon"></div>
            <div class="pullUpLabel">上拉显示更多...</div>
        </div>
    </div>
</div>
<!--内容区结束-->
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/iscroll.js"></script>
<script  type="text/javascript" src="js/swipe.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript">

    function init(){
        try {
            if(null == Cache.get(Const.CACHE_OPEN_INFO)) {
                var user = Index.user;
                user.inviter = "<?php echo $shareid;?>";
                user.openId = "<?php echo $p->openid;?>";
                user.nickname = "<?php echo $p->username;?>";
                user.headimgurl = "<?php echo $p->avatar;?>";
                user.sex = "<?php echo $p->sex;?>";
                user.sex = +user.sex - 1;
                user.adress = "<?php echo $p->area;?>";

                if("" == user.openId || "-1" == user.sex)
                {
                    alert("获取微信信息错误!");
                    return;
                }


                Cache.set(Const.CACHE_OPEN_INFO, user);
            }
            else{
                Index.user = Cache.get(Const.CACHE_OPEN_INFO);
            }
            //alert("user" + JSON.stringify(user));


            var wxConfigObj = {
                debug: true,
                appId: '<?php echo $appid;?>',
                //在share.php里面有储值
                timestamp: '<?php echo $GLOBALS["timestamp"];?>',
                nonceStr: '<?php echo $GLOBALS["noncestr"];?>',
                signature: '<?php echo getsignature();?>',
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage','uploadImage']
            };
            //alert("cache wxconfig " + JSON.stringify(wxConfigObj));
            Weixin.cache(wxConfigObj);

            //if(null ==  Cache.get(Const.CACHE_WX_ATOKEN))
            //{
                var accessToken = '<?php echo $GLOBALS["atoken"];?>';
                Cache.set(Const.CACHE_WX_ATOKEN, accessToken);
                //alert("设置accesss_token:" + accessToken);
            //}

            Index.init();
        }
        catch(e)
        {
            alert(e);
        }
    }



</script>

</html>
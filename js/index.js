/**
 * 
 * 声明公共变量和函数
 * 
 */
// 声明全局变量
var pageWidth;		// 获取显示页面的宽度
var pageHeight;		// 获取显示页面的高度
var wrapper;		// 获取id为wrapper的元素
var count_move = 0;	// 移动次数
var num_move = 0;	// 移动像素
var taskid;			// 清除延迟
var show_div;		// 获取id为show_div的元素
var start_btn;		// 获取id为start_btn的元素，是container1的开始按钮图片
var img_list;		// container2中的预览预览图片列表
var lists;			// img_list列表的子元素类数组
var unames;			// 图片上的用户名显示
var flag_style = 0;	// 主题样式模式
var upfile;			// “上传照片”按钮
var info;			// “请上传图片”提示框
var btn_con3_menu_c1;	// container3中的按钮
var btn_con3_menu_c2;	// container3中的按钮


// 获得全局变量
function getVar() {
	wrapper = document.getElementById("wrapper");
	show_div = document.getElementById("show_div");
	start_btn = document.getElementById("start_btn");
	img_list = document.getElementById("img_list");
	lists = img_list.children;
	unames = document.getElementsByClassName("uname");
	upfile = document.getElementById("upfile");
	info = document.getElementById("info_con");
	btn_con3_menu_c1 = document.getElementById("con3_menu_c1").children[1];
	btn_con3_menu_c2 = document.getElementById("con3_menu_c2").children[0];
}

/**
 * 
 * 目标：运行更多的window.onload事件
 * 
 */
function moreOnload(func) {
	var old_onload = window.onload;
	if (typeof old_onload == "function") {
		window.onload = function() {
			old_onload();
			func();
		};
	} else {
		window.onload = func;
	}
}

/**
 * 
 * 目标：通过点击按钮，实现显示页面切换
 * 
 */
// 实时改变wrapper的left属性，保证改变窗口大小时container不错位。
function currentLeft() {
	taskid = setInterval(function() {
		num_move = count_move * (pageWidth + 20);
		wrapper.style.left = -num_move + "px";
	}, 100);
}

// wrapper移动
function wrapperMoveNext() {
	clearInterval(taskid);
	wrapper.style.left = -(num_move - 20) + "px";
	count_move++;
	num_move = count_move * (pageWidth + 20);
	setTimeout(function() {
		wrapper.style.left = -(num_move + 20) + "px";
	}, 500);
	setTimeout(function() {
		wrapper.style.left = -num_move + "px";
		currentLeft();
	}, 1000);
}

function wrapperMoveBack(obj) {
	clearInterval(taskid);
	wrapper.style.left = -(num_move + 20) + "px";
	count_move--;
	num_move = count_move * (pageWidth + 20);
	setTimeout(function() {
		wrapper.style.left = -(num_move - 20) + "px";
	}, 500);
	setTimeout(function() {
		wrapper.style.left = -num_move + "px";
		currentLeft();
	}, 1000);
}

/**
 * 
 * 目标：点击按钮切换样式
 * 
 */
// 样式模板
function styleModel(bgc, c, bgc2, c2) {
	var btn_con2_menu = document.getElementById("con2_menu").children[1];
	var con3_menu = document.getElementById("con3_menu");
	var con3_menu_c1_div = document.getElementById("con3_menu_c1").children[0];
	var con3_menu_c2 = document.getElementById("con3_menu_c2");
	var con4_menu = document.getElementById("con4_menu");
	var share = document.getElementById("share");
	var start = document.getElementById("start");
	
	show_div.style.backgroundColor = bgc;
	btn_con2_menu.style.borderColor = c;
	btn_con2_menu.style.color = c;
	con3_menu.style.borderColor = c;
	con3_menu.style.color = c;
	con3_menu_c1_div.style.borderBottomColor = c;
	con3_menu_c2.style.borderRightColor = c;
	btn_con3_menu_c1.style.color = c;
	btn_con3_menu_c2.style.color = c;
	con4_menu.style.borderColor = c;
	share.style.backgroundColor = bgc2;
	share.style.color = c2;
	//start.style.color = c;
}

// 浅蓝主色调样式
function changeLightBlueStyle() {
	styleModel("rgb(184,224,255)", "rgb(0, 160, 233)", "white", "rgb(0, 160, 233)");
	flag_style = 1;
}

// 浅粉色主色调样式
function changeLightPinkStyle() {
	styleModel("rgb(229,201,255)", "rgb(0, 160, 233)", "white", "rgb(0, 160, 233)");
	flag_style = 2;
}

// 浅绿色主色调样式
function changeLightGreenStyle() {
	styleModel("rgb(201,247,239)", "rgb(0, 160, 233)", "white", "rgb(0, 160, 233)");
	flag_style = 3;
}

// 浅黄色主色调样式
function changeLightYellowStyle() {
	styleModel("rgb(253,232,207)", "rgb(0, 160, 233)", "white", "rgb(0, 160, 233)");
	flag_style = 4;
}

// 草绿色主色调样式
function changeGrassGreenStyle() {
	styleModel("rgb(207,253,219)", "rgb(0, 160, 233)", "white", "rgb(0, 160, 233)");
	flag_style = 5;
}

/**
 * 
 * 改变用户名称
 * 
 */
function changeUserId(u) {
	if (typeof u != "string") {
		alert("用户名不是字符串");
		return;
	}
	var spans_use = document.getElementsByClassName("uname");
	for (var i = 0; i < spans_use.length; i++) {
		spans_use[i].innerHTML = u;
	}
}


/*
 * 
 * 检测屏幕宽和高函数
 * 
 */
function getScreenWH() {
	pageWidth = window.innerWidth;
	pageHeight = window.innerHeight;
	
	// 提升兼容性
	if (typeof pageWidth != "number") {
		if (document.compatMode == "CSS1Compat") {
			pageWidth = document.documentElement.clientWidth;
			pageHeight = document.documentElement.clientHeight;
		} else {
			pageWidth = document.body.clientWidth;
			pageHeight = document.body.clientHeight;
		}
	} 
}

/*****************container1*******************/
// 点击“开始发现”切换样式并切换页面
function startFind() {
	start_btn.onclick = function() {
		show_div.removeAttribute("style");
		wrapper.removeAttribute("style");
		wrapperMoveNext(this);
		setTimeout(function() {
			changeLightBlueStyle();
		}, 600);
	};
}


/*****************container2*******************/
/**
 * 
 * 目标：实现id为pic_wrapper的div元素宽度，
 * 	        是id为show_pic的div元素的宽度的4倍
 * 
 */
function setPicWrapWidth() {
	var show_pic = document.getElementById("show_pic");
	var pic_wrapper = document.getElementById("pic_wrapper");
	pic_wrapper.style.width = show_pic.offsetWidth * 4 + "px";
}


/**
 * 
 * 目标：点击小预览图片: 1、切换菜单样式
 *  				2、切换大预览图片
 * 
 */
// id为pic_wrapper的div元素移动函数
function changeImage(liCtrl) {
	var li_id = liCtrl.getAttribute("id");
	var pic_wrapper = document.getElementById("pic_wrapper");
	var offset0 = document.getElementById("sbg0").offsetWidth;
	var offset1 = document.getElementById("sbg1").offsetWidth;
	var offset2 = document.getElementById("sbg2").offsetWidth;
	var offset3 = document.getElementById("sbg3").offsetWidth;
	var offset4 = document.getElementById("sbg4").offsetWidth;
    
    switch (li_id) {
    	case "sbg0_min":
    		pic_wrapper.style.left = "0px";
    		changeLightBlueStyle();
    		
    		changeCon3Iamge(0);
    		
    		break;
    		
    	case "sbg1_min":
    		pic_wrapper.style.left = -offset0 + "px";
    		changeLightPinkStyle();
    		
    		changeCon3Iamge(1);
    		
    		break;
    		
    	case "sbg2_min":
    		pic_wrapper.style.left = -(offset0 + offset1) + "px";
    		changeLightGreenStyle();
    		
    		changeCon3Iamge(2);
    		
    		break;
    		
    	case "sbg3_min":
    		pic_wrapper.style.left = -(offset0 + offset1 + offset2) + "px";
    		changeLightYellowStyle();
    		
    		changeCon3Iamge(3);
    		
    		break;
    		
    	case "sbg4_min":
    		pic_wrapper.style.left = -(offset0 + offset1 + offset2 + offset3) + "px";
    		changeGrassGreenStyle();
    		
    		changeCon3Iamge(4);
    		
    		break;
    }
}

// 点击小预览图片的样式
function minImageStyle(liCtrl) {
	for (var i = 0; i < lists.length; i++) {
		lists[i].style.border = "none";
	}
	
	switch (liCtrl) {
		case lists[0]:
			unames[0].style.color = "rgb(28,142,221)";
			unames[5].style.color = "rgb(28,142,221)";
			break;
		case lists[1]:
			unames[1].style.color = "rgb(225,225,225)";
			unames[5].style.color = "rgb(225,225,225)";
			break;
		case lists[2]:
			unames[2].style.color = "rgb(47,201,87)";
			unames[5].style.color = "rgb(47,201,87)";
			break;
		case lists[3]:
			unames[3].style.color = "rgb(229,95,68)";
			unames[5].style.color = "rgb(229,95,68)";
			break;
		case lists[4]:
			unames[4].style.color = "rgb(64,219,192)";
			unames[5].style.color = "rgb(64,219,192)";
			break;
	}
	
	liCtrl.style.border = "1px solid rgb(0,160,233)";
}

// 点击小预览图片功能
function onClickMinImage() {
	var img_list = document.getElementById("img_list");
	var lists = img_list.children;
	for (var i = 0; i < lists.length; i++) {
		lists[i].onclick = function() {
			minImageStyle(this);
			changeImage(this);
		};
	}
}

// 默认调用
function defaultOnClick() {
	var sbg0_min = document.getElementById("sbg0_min");
	minImageStyle(sbg0_min);
	changeImage(sbg0_min);
}

/**
 * 
 * 目标：实现“下一步”按钮功能： 1、切换到第三页
 * 						 2、改变第三页显示的图片
 * 						 3、改变第三页按钮菜单样式
 * 
 */
// 切换第三页的显示图片
function changeCon3Iamge(i) {
	var posterImg = document.getElementById("posterImg");
	var sp2_foundImg = document.getElementById("sp2_foundImg");
	var sp2_textImg = document.getElementById("sp2_textImg");
	
	var pic_wrapper = document.getElementById("pic_wrapper");
	
	var pic_box = document.getElementsByClassName("pic_box")[i];
	var pImg = pic_box.lastElementChild;
	var fImg = pic_box.children[1];
	var tImg = pic_box.children[2];
	
	posterImg.src = pImg.src;
	sp2_foundImg.src = fImg.src;
	sp2_textImg.src = tImg.src
}

// 点击第二页“下一步”按钮，切换第三页"点击上传图片"样式
// 第三页"点击上传图片"样式
function upFileStyle(bgc, c) {
	var label = document.getElementsByTagName("label")[0];
	label.style.backgroundColor = bgc;
	label.style.color = c;
}

// 第三页“下一步”、“上一步”按钮样式
function con3BtnStyle (bgc, c) {
	btn_con3_menu_c1.style.backgroundColor = bgc;
	btn_con3_menu_c1.style.color = c;
}

// 第二页“下一页”按钮功能实现
function nextBtnToChangeUpFile () {
	var btn_con2_menu = document.getElementById("con2_menu").children[1];
	btn_con2_menu.onclick = function() {
		// 切换到第三页
		wrapperMoveNext(this);
		// 第三页样式变化
		if (upfile.value) {
			upFileStyle("white", "rgb(0,160,233)");
			con3BtnStyle ("rgb(0,160,233)", "white");
		} else {
			upFileStyle("rgb(0,160,233)", "white");
			con3BtnStyle ("white", "rgb(0,160,233)");
		}
	};
}

/*****************container3*******************/
/**
 * 
 * 目标：“上传图片”按钮功能实现：1、改变按钮菜单样式
 * 						  2、改变预览图片
 * 
 */
// 根据show_pic2的高度，来决定预览图片的高度
function previewPicHeight() {
	var show_pic2 = document.getElementById("show_pic2");
	var height = show_pic2.offsetHeight;
	var preview_pic = document.getElementById("preview_pic");
	preview_pic.style.height = (height * 0.61) + "px";
}

// “上传图片”按钮功能实现
var img_pt;
function changeUpFile() {
	upfile.onchange = function() {
		// 决定预览图片的高度
		previewPicHeight();
		// 改变按钮菜单样式
		con3BtnStyle ("rgb(0,160,233)", "white");
		upFileStyle("white", "rgb(0,160,233)");
		
		// 改变预览图片
		if (typeof img_pt == "undefined") {
			var preview_pic = document.getElementById("preview_pic"); 
			img_pt = document.createElement("div");
			preview_pic.appendChild(img_pt);
		}
		
		//img_pt.src = window.URL.createObjectURL(this.files[0]);
		img_pt.style.backgroundImage = "url(" + window.URL.createObjectURL(this.files[0]) + ")";
	};
}

/**
 * 
 * 目标：“下一步”按钮功能实现： 1、当没有上传图片时，显示提示，并且留在当前页面
 * 						   2、当有上传图片时，进入下一页，并且将网页转换成图片
 * 
 */
// 显示或不显示提示框
function isShowInfo(boo) {
	if (boo) {
		info.style.zIndex = "99";
		info.style.opacity = "1";
	} else {
		info.style.zIndex = "-1";
		info.style.opacity = "0";
	}
}

// 提示框关闭按钮
function closeInfo() {
	var close_info = document.getElementById("close_info");
	close_info.onclick = function() {
		isShowInfo(false);
	};
}

// 将HTML转换成图片
function htmlToImage() {
	var show_pic3 = document.getElementById("show_pic3");
    html2canvas(document.querySelector("#show_pic2")).then(function(canvas) {
    	var img = document.createElement("img");
    	img.src = canvas.toDataURL("image/png");
    	show_pic3.appendChild(img);
     })
}

// “生成海报”按钮功能实现
function nextBtntoChangeHtml() {
	btn_con3_menu_c1.onclick = function() {
		if (upfile.value) {
			htmlToImage();
			wrapperMoveNext(this);
		} else {
			isShowInfo(true);
		}
	};
}

/**
 * 
 * 目标：“上一步”按钮功能实现： 返回上一页
 * 						   
 * 
 */
function goBack() {
	btn_con3_menu_c2.onclick = function() {
		wrapperMoveBack(this);
	}
}


/*****************container4*******************/
// 点击“再试一次”切换样式并返回“开始发现”页面
function toStart() {
	var btn_start = document.getElementById("start");
	btn_start.onclick = function() {
		location.reload();
		/*show_div.style.transition = "none";
		wrapper.style.transition = "none";
		wrapper.style.left = "0px";
		count_move = 0;
		num_move = count_move * pageWidth;
		changeRedStyle();*/
	};
}

/******************自动播放音乐*******************/
function autoPlayAudio() {
	var music = document.getElementById("music");
	// 普通浏览器播放
	music.play();
	// safari点击播放
	var touchEvent = new Event("touchstart");
	document.addEventListener("touchstart", function() {
		music.play();
	}, false);
	document.dispatchEvent(touchEvent);
	// 微信中自动播放
	document.addEventListener("WeixinJSBridgeReady", function() {
		music.play();
	}, false);
	// 循环播放
	music.onended = function() {
		music.load();
		music.play();
	};
}

/*****************函数调用***********************/
// 全局
moreOnload(getVar);
moreOnload(currentLeft);
moreOnload(function() {
	changeUserId("用户名");
});
// 获得屏幕宽和高
moreOnload(getScreenWH);
// container1
moreOnload(startFind);
// container2
moreOnload(setPicWrapWidth);
moreOnload(defaultOnClick);
moreOnload(onClickMinImage);
moreOnload(nextBtnToChangeUpFile);
// container3
moreOnload(changeUpFile);
moreOnload(closeInfo);
moreOnload(nextBtntoChangeHtml);
moreOnload(goBack);
// container4
moreOnload(toStart);
// 音乐自动播放
moreOnload(autoPlayAudio);

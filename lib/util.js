//创建数组
var array = Array.apply(null, Array(10)).map(function() {
	return 0
});
//es6
var arr = new Array(10).fill(0, 0, 5).fill(1,5);
//fill(value, start, end)不接收函数，value为要填充的值，start--填充开始的位置，end -- 填充结束的位置
//end
//格式化日期
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").slice(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).slice(("" + o[k]).length)));
		}
	}
	return fmt;
}
var time1 = new Date(1550102809 * 1000).Format("yyyy-MM-dd hh:mm:ss");
//获取前7天时间,后七天将减号改为加号
var day = [...Array(7).keys()].map(days => (new Date(Date.now() + 86400000 * days)).Format("yyyy-MM-dd hh:mm:ss"));
//end
//将图片转为base64数据
function imgChange(e) {
//		console.log();
//	    console.info(e.target.files[0]);//图片文件
//	    var dom =$("#imgTest")[0];
//	    console.info(dom.value);//这个是文件的路径 C:\fakepath\icon (5).png
//	    console.log(e.target.value);//这个也是文件的路径和上面的dom.value是一样的
    var reader = new FileReader();
    reader.onload = (function (file) {
        return function (e) {
           console.info(this.result); //这个就是base64的数据了
            $("#showImage")[0].src=this.result;
        };
    })(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
};
//end
//哈希匹配
var itemTypeReg = {
		'0':'',
		'1':'行政许可',
		'2':'非行政许可',
		'3':'公共服务事项',
		'4':'备案',
		'5':'其他',
		'6':'行政征收',
		'7':'行政确认',
		'8':'行政年检',
		'9':'其他行政权力',
		'10':'行政处罚',
		'11':'行政强制',
		'12':'行政给付',
		'13':'行政检查',
		'14':'行政奖励',
		'15':'行政裁决'
};
//itemType为1~15的数，哈希匹配的方法，例子仅供参考
var itemType = itemTypeReg["1"];
//end
//数组映射
const MAP = [
	{ ret: 'sample_hash', match: ['sampleHash', 'apkMd5'] },
	{ ret: 'program_name', match: ['programName', 'appName'] },
	{ ret: 'imei', match: ['imei'] },
	{ ret: 'package_name', match: ['packageName', 'apkName', 'apppackageName'] },
	{ ret: 'sensitive_strings_email', match: ['sensitiveStringsEmail', 'developerEmail'] },
	{ ret: 'cert_list_keyhash', match: ['keyhash'] },
	{ ret: 'sensitive_strings_domain', match: ['sensitiveStringsDomain'] },
	{ ret: 'sensitive_strings_ip', match: ['sensitiveStringsIp'] },
	{ ret: 'sensitive_strings_sp', match: ['sensitiveStringsSp'] },
	{ ret: 'id', match: ['id'] }
]
function getQueryType(item) {
	const r = MAP.find(m => m.match.some(s => item.indexOf(s) > -1));
	if (!r) {
		return null
	}
	return r.ret
}
console.log(getQueryType("sensitiveStringsSp"));
//end
//归并算法，适用于数据量大且重复率高的情况
function merge (left, right) {
	var result = [];
	while (left.length > 0 && right.length > 0) {
		if(left[0] < right[0]){
			result.push(left.shift())
		}else{
			result.push(right.shift())
		}
	}
	return result.concat(left).concat(right);
}
function mergeSort (arr) {
	if(arr.length == 1){
		return arr;
	}
	var len = Math.floor(arr.length / 2);
	var left_arr = arr.slice(0, len);
	var right_arr = arr.slice(len);
	return merge(mergeSort(left_arr), mergeSort(right_arr));
}
var arr = Array.apply(null, Array(10)).map(function(){
	return Number((Math.random() * 100).toFixed(0));
});
var res = mergeSort(arr);
//end
//判断输入法为中文还是英文
var isPinyin = false;
$('#selectMatchInput').on('compositionstart', function () { 
	console.log("拼音")
	isPinyin = true 
});//此时为拼音输入法

$('#selectMatchInput').on('compositionend', function () { 
	isPinyin = false 
	send('拼音输入法')
});//此时为直接输入，包括数字、字符和英文输入
$('#selectMatchInput').on('input', function() {
	if(!isPinyin){
		send('英文输入法')
	}
})
function send (msg) {
	console.log(msg + '请求')
}
// 判断设备是pc端还是移动端
function _isMobile() {
	let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	return flag;
}
if (this._isMobile()) {
  	alert("手机端");
} else {
  	alert("pc端");
}
//end
//注意事项 -- 曾经遇见的问题
/*--disable-web-security --user-data-dir  浏览器跨域 在浏览器属性的目标栏最后面添加，要空一格*/
/*iview 使用render函数创建时，如果元素是img的src或a的href属性等，不能用props来加，要使用attrs来添加
render: function(h,parmas){
	return h("div",[
		h("img",{
			attrs: {
				src: "xx"
			}
		})
	])
}*/
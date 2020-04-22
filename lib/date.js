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
//var time1 = new Date(1550102809 * 1000).Format("yyyy-MM-dd hh:mm:ss");


/*
 * @Description 获取前一个月的时间
 * 
 */
function getLastMonth() {
	return (new Date()).getTime() - 30 * 24 * 60 * 60 * 1000;
}

/*
 * @Description 获取本月的时间
 * 
 */
function getNowMonth() {
	return new Date().Format("yyyy-MM") + "-01";
}

/*
 * @Description 获取季度
 * 
 */
function getQuarter() {
	let month = new Date().getMonth();
	let months = 0;
	let quarter = 1;
	if (month <= 2) { 
		quarter = 1;
	  	months =  0; 
	}else if (month <= 5) { 
		quarter = 2;
	  	months = 3; 
	}else if (month <= 8) { 
		quarter = 3;
	  	months = 6; 
	}else { 
		quarter = 4;
	  	months = 9; 
	}
	return quarter;//返回当前为第几季度
//	return new Date(now.getFullYear(), months, 1).Format("yyyy-MM-dd");//返回该季度的第一天
}
/*
 * @Description 获取前某个月的开始和结束时间
 * params:{num|number} 要获取的月份，当前月为0，上一月为1，下一月为-1
 */

function getStartAndEnd(num) {
	var month = Number(num);
	if(isNaN(month)){
		alert("参数类型错误，请传入Number！");
		return "参数类型错误，请传入Number！";
	}
	var date1 = new Date();
		date1.setMonth(date1.getMonth() - month);
	var year1 = date1.getFullYear();
	var month1 = date1.getMonth() + 1;
	month1 = (month1 < 10 ? "0" + month1 : month1);
	sDate = (year1.toString() + '-' + month1.toString() + '-01');
	var lastDay= new Date(year1.toString(),month1.toString(),0).Format("yyyy-MM-dd");
	
	return {startTime: sDate, endTime: lastDay};
}

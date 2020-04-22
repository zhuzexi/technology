;(function(global, factory, plug){
	global[plug] = factory.call(global);
})(this, function(option){
	var options = {};
	var meatData = [];
	var imgBase64 = [];
	var imageSuffix = []; //图片后缀
	var zip = new JSZip();
	var img = zip.folder("images");//压缩包里文件路径，根路径
	var imgExtens = ["bmp", "jpg", "jpeg", "png", "gif"];//文件后缀名
	var __CORE__ = {
		init: function (opt) {
			options = opt;
			meatData = opt.meatData;
			if(meatData.constructor !== Array) {
				console.log("meatData必须为数组");
				return;
			}else {
				this.load();
			}
		},
		load: function () {
			this.packageImages();
		},
		packageImages: function () {//处理图片数据，获取图片后缀及图片base64数据
			for(var i = 0; i < meatData.length; i++) {
				var src = meatData[i];
				var suffix = src.substring(src.lastIndexOf("."));
				if(imgExtens.indexOf(suffix) != -1){
					imageSuffix.push(suffix);
					this.getBase64(src).then(function(base64) {
						imgBase64.push(base64.substring(22));
					}, function(err) {
						console.log(err); //打印异常信息
					});
				} else {
					zip.file("Hello.txt", "Hello World\n");
				}
				
			}
			this.download();
		},
		download: function () {//下载zip
			setTimeout(() => {
				if(meatData.length == imgBase64.length) {
					for(var i = 0; i < meatData.length; i++) {
						img.file("img" + i + imageSuffix[i], imgBase64[i], {
							base64: true
						});
					}
					zip.generateAsync({
						type: "blob"
					}).then(function(content) {
						// see FileSaver.js
						status = saveAs(content, options.name + ".zip");
					});
				} else {
					this.download();
				}
			}, 100);
		},
		//传入图片路径，返回base64
		getBase64: function(img) {
			var image = new Image();
			image.crossOrigin = 'Anonymous';
			image.src = img;
			var deferred = $.Deferred();
			if(img) {
				image.onload = () => {
					deferred.resolve(this.getBase64Image(image)); //将base64传给done上传处理
				}
				return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
			}
		},
		getBase64Image: function (img, width, height) {//cavans转换图片,返回base64数据
			//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
			var canvas = document.createElement("canvas");
			canvas.width = width ? width : img.width;
			canvas.height = height ? height : img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			var dataURL = canvas.toDataURL();
			return dataURL;
		}
	};
	
	return __CORE__;
}, "DownloadImgZip");

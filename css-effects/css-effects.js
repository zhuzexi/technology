;(function(global, factory, plug){
	global[plug] = factory.call(global);
})(this || window, function(option){
	var duration = 0.8;
	var delay = 0.3;
	var __CORE__ = {
		interlockCenter: function(dom) {//分割文字，交错动画（从中间往两边）
			let revealText = dom;
			revealText.classList.add("interlock-center");
			let letters = revealText.textContent.split("");
			revealText.textContent = "";
			let middle = letters.filter(e => e !== " ").length / 2;
			letters.forEach((letter, i) => {
			  let span = document.createElement("span");
			  span.textContent = letter;
			  span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
			  revealText.append(span);
			});
		},
		interlockLeft: function(dom){
			let landInTexts = dom;
			landInTexts.classList.add("interlock-left");
			let letters = landInTexts.textContent.split("");
			landInTexts.textContent = "";
			letters.forEach((letter, i) => {
			    let span = document.createElement("span");
			    span.textContent = letter;
			    span.style.animationDelay = `${i * 0.05}s`;
			    landInTexts.append(span);
			});
		}
	};
	
	return __CORE__;
}, "cssEffects");

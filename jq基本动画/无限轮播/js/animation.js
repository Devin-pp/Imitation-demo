// 匀速动画

	function animation(obj, target, speed,times) {
 			clearInterval(obj.timer);

 			obj.timer = setInterval(function() {
 				obj.style.left = obj.offsetLeft + speed + 'px';

 				if(obj.offsetLeft >=target) {
 					clearInterval(obj.timer);
 				}
 			},times)
	}
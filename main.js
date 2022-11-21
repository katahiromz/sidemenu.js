document.addEventListener('DOMContentLoaded', function(){
	const swipe_threshold = 50;

	function getTouches(e) {
		return e.touches || e.originalEvent.touches;
	}

	function setTouchFunctions(id, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown){
		let xOld = null, yOld = null;
		id.addEventListener('touchstart', function(e){
			const firstTouch = getTouches(e)[0];
			xOld = firstTouch.clientX;
			yOld = firstTouch.clientY;
		}, false);

		id.addEventListener('touchmove', function(e){
			if (!xOld || !yOld) {
				return;
			}

			let xNew = e.touches[0].clientX, yNew = e.touches[0].clientY;
			let xDiff = xNew - xOld, yDiff = yNew - yOld;

			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				if (Math.abs(xDiff) > swipe_threshold) {
					if (xDiff < 0) {
						if (onSwipeRight) {
							onSwipeRight();
						}
					} else {
						if (onSwipeLeft) {
							onSwipeLeft();
						}
					}
				}
			} else {
				if (Math.abs(yDiff) > swipe_threshold) {
					if (yDiff < 0) {
						if (onSwipeDown) {
							onSwipeDown();
						}
					} else {
						if (onSwipeUp) {
							onSwipeUp();
						}
					}
				}
			}
		}, false);

		id.addEventListener('touchend', function(e){
			xOld = yOld = null;
		}, false);
	}

	setTouchFunctions(sidemenu, function(){
		sidemenu_checkbox.checked = true;
	}, function(){
		sidemenu_checkbox.checked = false;
	});
	setTouchFunctions(main, function(){
		sidemenu_checkbox.checked = true;
	}, function(){
		sidemenu_checkbox.checked = false;
	});
	
	main.addEventListener('click', function(e){
		if (sidemenu_checkbox.checked){
			sidemenu_checkbox.checked = false;
			e.preventDefault();
		}
	});
	sidemenu.addEventListener('click', function(e){
		if (sidemenu_checkbox.checked){
			sidemenu_checkbox.checked = false;
		}
	});
});

document.addEventListener('DOMContentLoaded', function(){
	const swipe_threshold = 50;

	function getTouches(e){
		return e.touches || e.originalEvent.touches;
	}

	function setTouchFunctions(id, onClick, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown){
		let xOld = null, yOld = null;
		let touched = false;

		id.addEventListener('click', function(e){
			if (onClick){
				onClick(e);
			}
		}, false);
		
		id.addEventListener('touchstart', function(e){
			const firstTouch = getTouches(e)[0];
			xOld = firstTouch.clientX;
			yOld = firstTouch.clientY;
			touched = false;
		}, false);

		id.addEventListener('touchmove', function(e){
			if (!xOld || !yOld){
				return;
			}

			let xNew = e.touches[0].clientX, yNew = e.touches[0].clientY;
			let xDiff = xNew - xOld, yDiff = yNew - yOld;

			if (Math.abs(xDiff) > Math.abs(yDiff)){
				if (Math.abs(xDiff) > swipe_threshold){
					touched = true;
					if (xDiff < 0){
						if (onSwipeRight){
							onSwipeRight(e);
						}
					} else {
						if (onSwipeLeft){
							onSwipeLeft(e);
						}
					}
				}
			} else {
				if (Math.abs(yDiff) > swipe_threshold){
					touched = true;
					if (yDiff < 0){
						if (onSwipeDown){
							onSwipeDown(e);
						}
					} else {
						if (onSwipeUp){
							onSwipeUp(e);
						}
					}
				}
			}
		}, false);

		id.addEventListener('touchend', function(e){
			if (touched){
				e.preventDefault();
			}

			xOld = yOld = null;
			touched = false;
		}, false);
	}

	setTouchFunctions(sidemenu, function(e){
		if (sidemenu_checkbox.checked){
			sidemenu_checkbox.checked = false;
		}
	}, function(e){
		sidemenu_checkbox.checked = true;
	}, function(e){
		sidemenu_checkbox.checked = false;
	});

	setTouchFunctions(main, function(e){
		if (sidemenu_checkbox.checked){
			sidemenu_checkbox.checked = false;
		}
		e.preventDefault();
	}, function(e){
		sidemenu_checkbox.checked = true;
	}, function(e){
		sidemenu_checkbox.checked = false;
	});
});

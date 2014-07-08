(function () {

	var Carousal = function (config) {
		this.slideShowTime = 1000;
		this.images = [];
		this.currentSlide = 0;
	}

	Carousal.prototype = {
		init: function () {
			var oThis = this;
			oThis.attachEventListener();
			oThis.images = oThis.getImages(oThis);			
		},

		attachEventListener: function () {
			var next = document.getElementById("nextSlide"),
				prev = document.getElementById("prevSlide"),
				oThis = this;

			next.addEventListener("click", oThis.showNextSlide.bind(oThis));
			prev.addEventListener("click", oThis.showPrevSlide.bind(oThis));
		},

		showNextSlide: function () {
			var oThis = this;

			if (oThis.currentSlide === oThis.images.length) {
				oThis.currentSlide = 0;
			} else {
				oThis.currentSlide++;
			}			
			oThis.startSlideShow();
		},

		showPrevSlide: function () {
			var oThis = this;

			if (oThis.currentSlide === 0) {
				oThis.currentSlide = oThis.images.length;
			} else {
				oThis.currentSlide -= 2;
			}			
			oThis.startSlideShow();
		},

		getImages: function () {
			var oThis = this,
				myReq;

			if (window.XMLHttpRequest) {
				myReq = new XMLHttpRequest();
			} else {
				myReq = new ActiveXObject("Microsoft.XMLHTTP");
			}

			myReq.open("GET", "images.json", true);
			myReq.send();
			myReq.onreadystatechange = function () {
                if (myReq.readyState == 4) {
                    if (myReq.status == 200) {
                    	oThis.images = JSON.parse(myReq.responseText);
                    	oThis.images = oThis.images.images;
                        oThis.startSlideShow();
                    }
                }
			}
		},
	
		showSlide: function (slideNo) {
			var el = document.getElementById("imageSlideShow"),
				li, a, img,
				oThis = this,
				image = oThis.images[slideNo];

			li = document.createElement("li");
			li.className = "one_photo";
			a = document.createElement("a");
			a.setAttribute("href", image.href);
			img = document.createElement("img");
			img.setAttribute("src", image.src);
			img.setAttribute("alt", img.alt);

			img.appendChild(a);
			li.appendChild(img);
			el.appendChild(li);
		},

		startSlideShow: function () {
			var oThis = this,
				len = oThis.images.length, i;

			oThis.clearSlide();
			oThis.showSlide(oThis.currentSlide++);

			setTimeout(oThis.showNextSlide.bind(oThis), 5000);
		},

		showNextSlide: function () {
			var oThis = this,
				len = oThis.images.length;

			if(oThis.currentSlide === len) {
				oThis.currentSlide = 0;
			}
			oThis.clearSlide();
			oThis.showSlide(oThis.currentSlide++);
			setTimeout(oThis.showNextSlide.bind(oThis), 5000);
		},

		clearSlide: function () {
			var el = document.getElementById("imageSlideShow");
			el.innerHTML = "";
		}

	};

	(function () {
		var main = new Carousal();
		main.init();
	})();
	
})();
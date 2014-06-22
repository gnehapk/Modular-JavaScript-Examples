(function() {

	var CreateHotelBody = function () {
		this.dataCollection = [];
	};

	CreateHotelBody.prototype = {
		init: function () {
			this.readResponse();
			
		},
		readResponse: function () {
			var oThis = this;
			$.getJSON('hotels.json', function (data) {
				oThis.dataCollection = data;
				oThis.buildDOM();
			});	
		},
		buildDOM: function () {
			var oThis = this;

			//oThis.dataCollection.forEach(function (data) {
				oThis.buildHeader(oThis.dataCollection[0]);
				oThis.addPhotos(oThis.dataCollection[0].details.images);
				oThis.addDescription(oThis.dataCollection[0].details.description);
				oThis.addFacilities(oThis.dataCollection[0].details.facilities);
				oThis.addRoomDetails(oThis.dataCollection[0].details.roomsDetails);
				oThis.addReviewList(oThis.dataCollection[0].details.reviews);
			//});			
		},
		addReviewList: function (reviews) {
			var oThis = this,
				ul = $('<ul />').addClass('reviews_list'),
				container = $('.reviews h2');

			reviews.forEach(function (review){
				list = $('<li />').addClass('one_review');
				score = $('<strong />').addClass('review_score').html(review.reviewScore);
				cite = $('<cite />').html(review.cite);
				content = $('<blockquote />')
					.addClass('review_content')
					.html(review.reviewContent)
					.append(cite);
				list.append(score, content);
				ul.append(list);
			});
			ul.insertAfter(container);
			
		},
		addPhotos: function (images) {
			var img,
				anchor,
				list, 
				ul = $('<ul />'),
				container = $('.photos');

			images.forEach(function (image) {
				img = $('<img />')
					.attr({'alt': image.alt, 'src': image.src});
				anchor = $('<a />')
						.attr({'href': image.href})
						.append(img);
				list = $('<li />')
						.addClass('one_photo')
						.append(anchor);
				ul.append(list);
			})
			container.append(ul);
		},
		addDescription: function (desc) {
			var p,
				container = $('.description h2');

			desc.forEach(function (d) {
				p = $('<p />').html(d);
				p.insertAfter(container);
			});
		},
		addFacilities: function (facilities) {
			var list,
				ul = $('<ul />'),
				container = $('.facilities');

			facilities.forEach(function (facility) {
				list = $('<li />').html(facility);
				ul.append(list);
			});
			container.append(ul);
		},
		buildHeader: function (data) {
			$('.hotel_name').html(data.name);
			$('.hotel_address').html(data.details.address);
		},
		addRoomDetails: function (rooms) {
			var oThis = this,
				row,
				tbody = $('<tbody />')
				container = $('.rooms_table');

			rooms.forEach(function (room) {
				row = oThis._createRow();
				row.append($('<td />').addClass('room_name').html(room.RoomName));
				row.append($('<td />').addClass('room_occupancy').html(room.Occupancy));
				row.append($('<td />').addClass('room_price').html(room.PricePerRoom));
				row.append($('<td />').addClass('room_quantity').append(oThis._createSelectBox(room.NoOfRooms)))
				tbody.append(row);
			});
			container.append(tbody);
		},
		_createSelectBox: function (noOfRooms) {
			var select = $('<select />'),
				length = noOfRooms.length,
				i;
			for (i = 0; i < length; i++) {
				select.append($('<option />').attr('value', i).html(i));
			}
			return select;
		},
		_createRow: function (dom) {
			return $('<tr />').addClass('one_room');
		},
	};

	(function () {
		var main = new CreateHotelBody();
		main.init();
	})();
	
})();
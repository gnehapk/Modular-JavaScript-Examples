(function() {

	var CreateHotelBody = function () {
		this.dataCollection = [];
		this.parentEl = $(".hotelPage");
	};

	CreateHotelBody.prototype = {
		init: function () {
			this.readResponse();
			
		},
		readResponse: function () {
			var oThis = this;
			$.getJSON('hotels.json', function (data) {
				oThis.dataCollection = data;
				oThis.buildDOM(0);
				oThis.addEventListener();
			});	
		},
		addEventListener: function () {
			var oThis = this;
			$(".hLinks").click($.proxy(oThis.showHotelPage, oThis));
		},
		showHotelPage: function (e) {
			var id = $(e.target).attr("data-id"),
				oThis = this;
			oThis.clear();
			oThis.buildDOM(id);
			oThis.addEventListener();
		},
		clear: function () {
			$(".hotelPage").empty();
			$(".hotelLinks").empty();
		},
		buildDOM: function (id) {
			var oThis = this,
				length = oThis.dataCollection.length,
				el = $(".hotelLinks"),
				i, a;

			oThis.buildHeader(oThis.dataCollection[id]);
			oThis.addPhotos(oThis.dataCollection[id].details.images);
			oThis.addDescription(oThis.dataCollection[id].details.description);
			oThis.addFacilities(oThis.dataCollection[id].details.facilities);
			oThis.addRoomDetails(oThis.dataCollection[id].details.roomsDetails);
			oThis.addReviewList(oThis.dataCollection[id].details.reviews);
			oThis.addFooter();
			for (i = 0; i < length; i++) {
				if (i!== parseInt(id, 10)) {
					a = $("<a />").html(oThis.dataCollection[i].name)
						.attr({"href": "#", "data-id": i}).addClass("hLinks");
					el.append(a);
				}	
			}
		},
		addFooter: function () {
			var container = $("<section />").addClass("footer").html("&copy;2014 Booking.com"),
				oThis = this;

			oThis.parentEl.append(container);			
		},
		addReviewList: function (reviews) {
			var oThis = this,
				ul = $('<ul />').addClass('reviews_list'),
				container = $("<section />").addClass("reviews"),
				h2 = $("<h2 />").addClass("reviews_list");

			container.append(h2);

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
			container.append(ul);
			this.parentEl.append(container);			
		},
		addPhotos: function (images) {
			var img,
				anchor,
				list, 
				ul = $('<ul />'),
				container = $("<section />").addClass("photos");

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
			this.parentEl.append(container);
		},
		addDescription: function (desc) {
			var p,
				container = $("<section />").addClass("description"),
				h2 = $("<h2 />").html("Description");
			container.append(h2);
			this.parentEl.append(container);

			desc.forEach(function (d) {
				p = $('<p />').html(d);
				p.insertAfter(container);
			});

		},
		addFacilities: function (facilities) {
			var list,
				ul = $('<ul />'),
				container = $("<section />").addClass("facilities"),
				h2 = $("<h2 />").html("Facilities");

			container.append(h2);

			facilities.forEach(function (facility) {
				list = $('<li />').html(facility);
				ul.append(list);
			});
			container.append(ul);
			this.parentEl.append(container);
		},
		buildHeader: function (data) {
			var header = $("<header />").addClass("header"),
				h1 = $("<h1 />").addClass("hotel_name").html(data.name),
				span = $("<span />").addClass("stars"),
				address = $("<address />").html(data.details.address);

			h1.append(span);
			header.append(h1, address);
			this.parentEl.append(header);
		},
		_createTableHeader: function () {
			var thead = $("<thead />"),
				tr = $("<tr />"),
				th1 = $("<th />").addClass("room_name").html("Room Name"),
				th2 = $("<th />").addClass("room_occupancy").html("Occupancy"),
				th3 = $("<th />").addClass("room_price").html("Price per Room"),
				th4 = $("<th />").addClass("room_quantity").html("No. Rooms");

			tr.append(th1, th2, th3, th4);
			thead.append(tr);
			return thead;
		},
		_createTableFooter: function () {
			var tfoot = $("<tfoot />"),
				tr = $("<tr />"),
				td = $("<td />").attr("colspan", 4),
				button = $("<button />").addClass("button").attr("type", "submit").html("Book Now");

			td.append(button);
			tr.append(td);
			tfoot.append(tr);
			return tfoot;
		},
		addRoomDetails: function (rooms) {
			var oThis = this,
				row,
				tbody = $('<tbody />')
				container = $("<section />").addClass("rooms"),
				h2 = $("<h2 />").html("Select Your Room"),
				form = $("<form />").addClass("rooms_table_form").attr("method", "post"),
				table = $("<table />").addClass("rooms_table").attr({"cellpadding": 0, "cellspacing": 0});

			thead = oThis._createTableHeader();
			tfoot = oThis._createTableFooter();

			rooms.forEach(function (room) {
				row = oThis._createRow();
				row.append($('<td />').addClass('room_name').html(room.RoomName));
				row.append($('<td />').addClass('room_occupancy').html(room.Occupancy));
				row.append($('<td />').addClass('room_price').html(room.PricePerRoom));
				row.append($('<td />').addClass('room_quantity').append(oThis._createSelectBox(room.NoOfRooms)))
				tbody.append(row);
			});
			table.append(thead, tbody, tfoot);
			form.append(table);
			container.append(h2, form);
			oThis.parentEl.append(container);
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
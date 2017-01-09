"use strict";

$(document).ready(function () {
	let l = new Loader();
	$('input[type=submit]').click(() => { l.makeRequest() });
});


function Loader() {
	this.token = 0;
	this.wlId = '';

	this.makeRequest = function () {
		if (this.token == 0)
			this.token = this.getRandomInt(1, 99999);
		alert(this.token);
		this.wlId = $('input[type=text]').val();
		let jqxhr = $.post("http://localhost:8888/parse", JSON.stringify({ token: this.token, id: this.wlId }));
		jqxhr.done((data) => {
			//alert(data._resultMessage);
			this.drawList(data._steamItems);
		});
	};

	this.drawList = function (data){
		var tmpl = doT.template($('#wishlist').html());
		$('#wishlistTbl').html(tmpl(data));
	};

	this.getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
};


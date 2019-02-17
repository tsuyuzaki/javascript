(function () {
	'use strict';
	var reciever = {
		requestCallback : function(callback) {
			callback();
		},
	};
	
	var obj = new MyObject("obj1");
	// thisの利用の間違い例。js/object.jsに解説記載。
	obj.callRequestCallback(reciever);
	
})();
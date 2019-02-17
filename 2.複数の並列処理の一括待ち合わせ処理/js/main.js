(function () {
	'use strict';
	
	function asyncFunc(index, msec) {
		var deferred = $.Deferred();
		window.setTimeout(function() {
			console.log("index is " + index + ". wait msec is " + msec);
			deferred.resolve();
		}, msec);
		return deferred.promise();
	};
	
	// ルーチン処理で取得したpromiseを一括でwhen待ち合わせしたいケースがある。
	// そのような場合はapplyとpromiseの配列を利用すると待ち合わせが可能となる。
	var promises = [];
	for (var i = 0; i < 10; i++) {
		var msec = Math.floor(Math.random() * 500); // 0-500までの乱数。
		promises.push(asyncFunc(i, msec));
	}
	
	// 以下は$.when(promises[0], promises[1], ..., promises[9]).done(...と同じ処理。
	$.when.apply($, promises).done(function () {
		console.log("All request ended!");
	});
	
})();
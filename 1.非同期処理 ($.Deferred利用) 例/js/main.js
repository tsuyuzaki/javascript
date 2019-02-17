(function () {
	'use strict';
	// 非同期処理は$.Deferredを利用するとそれぞれの並列処理の並列化、
	// シーケンシャル処理の組み換えがしやすくなる。($はJQueryを意味します。)
	// 以下、非同期処理の待ち合わせ例。
	function asyncFunc1() {
		var deferred = $.Deferred();
		window.setTimeout(function() { // window.setTimeout関数：第二引数のmsec後に第一引数のメソッドを処理する。
			console.log("func1");
			deferred.resolve();
		}, 400);
		return deferred.promise();
	};
	
	function asyncFunc2() {
		var deferred = $.Deferred();
		window.setTimeout(function() {
			console.log("func2");
			deferred.resolve();
		}, 200);
		return deferred.promise();
	};
	
	// ■ケース1:asyncFunc1後にasyncFunc2を処理したいケース
	asyncFunc1().then(function() {
		return asyncFunc2();
	}).then(function() {
		console.log("foo");
	});
	
	
	// ■ケース2:asyncFunc1とasyncFunc2を並列処理し、両方の処理を待ち合わせたいケース
	/*
	$.when(asyncFunc1(), asyncFunc2()).done(function() { // asyncFunc1/2が並列に処理され、両方のdeferred.resolve()されるとdoneのメソッドが処理される。
		console.log("foo");
	}).fail(function() {
		console.log("failed");
	});
	*/
	
	// whenはどちらかの処理のdeferred.reject(失敗相当)されると他の並列処理を待たずにfailに入るので注意！！
	// $.Deferredの利用方法は以下参照。ネットに色々情報があるので調べてみてください。
	// https://techblog.yahoo.co.jp/programming/jquery-deferred/
	
	// ※$.Deferred (だけでなく、Underscore(_)などの処理、JSONの仕様などは) 
	// 　かなり使い方を間違えやすいので、よく理解して利用する必要があるので注意！！
})();
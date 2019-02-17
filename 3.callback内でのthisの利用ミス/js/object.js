'use strict';

function MyObject(name) {
	this._name = name;
};

MyObject.prototype = {
	callRequestCallback : function(receiver) {
		// ■エラー1
		// receiverが呼び出すthis.callbackメソッド内でthisを参照しているとTypeErrorとなる。
		receiver.requestCallback(this.callback);
		
		
		// ■エラー2
		// this.callbackの後に()を付けるとメソッドではなくthis.callback()を呼び出した戻り(undefined)が渡される。
		/*
		receiver.requestCallback(this.callback()); 
		*/
		
		
		// ★解決策1:$.proxyを使う。
		// $.proxy：第一引数のメソッドが返される。第二引数が第一引数のメソッドが呼ばれる際のthisになる。
		/*
		receiver.requestCallback($.proxy(this.callback, this));
		*/
		
		
		// ★解決策2:メソッド内のローカル変数にthisを保持し、thisを保持したローカル変数経由で処理を行う。
		/*
		var that = this;
		receiver.requestCallback(function() { console.log(that._name); });
		*/
	},
	
	callback : function() {
		console.log(this._name);
	},
};

// ======================================================================
// 背景調整
// ======================================================================
taco.jquery.extend( "backgroundStretch", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		offset: 0
	}, options );
	var vars = {
		// 初期化
		init: function () {
		}
	};
	// 背景をフィットさせる
	self.fit = function ( height ) {
		if ( height === undefined ) {
			element
				.height( "100%" )
				.height( element.height() - opts.offset );
		}
		else {
			element.height( height );
		}
	}
} );

// ======================================================================
// ドロップダウンメニュー
// ======================================================================
taco.jquery.extend( "dropDownButton", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		mouseover: $.noop,
		mouseout: $.noop,
		dropdown: null,
		container: null,
		openDelay: 500,
		closeDelay: 500,
		openSpeed: 1000,
		closeSpeed: 1000
	}, options );
	var vars = {
		dropdownHeight: 0,
		timer: null,
		// 初期化
		init: function () {
			// ドロップダウンを閉じるさいの閉じ遅延用タイマーの初期化
			vars.timer = taco.timer();
			// ドロップダウンへのマウスオーバーアウト
			element.mouseover( vars.mouseover );
			element.mouseout( vars.mouseout );
			// ドロップダウンの領域を保存する
			vars.dropdownHeight = opts.dropdown.height();
			// ドロップダウンを初期位置へ移動
			opts.container.css( "top", vars.dropdownHeight * -1 );
		}
	};
	// マウスオーバー
	vars.mouseover = function ( evt ) {
		opts.mouseover.call( self, evt );
	}
	// マウスアウト
	vars.mouseout = function ( evt ) {
		opts.mouseout.call( self, evt );
	}
	// 表示非表示切り替え
	vars.toggle = function ( isShow ) {
		var t,
			h,
			d,
			q = false;
		// 表示のケース
		if ( isShow === true ) {
			t = 0;
			h = vars.dropdownHeight;
			d = opts.openSpeed;
			opts.dropdown.show();
			opts.dropdown.height( h );
		}
		else {// 非表示
			t = vars.dropdownHeight * -1;
			h = 0;
			d = opts.closeSpeed;
		}
		// コンテナをスライドさせる
		opts.container.velocity( {
			top: t,
		}, {
			duration: d,
			queue: q,
			complete: function () {
				if ( isShow === false ) {
					opts.dropdown.height( h );
				}
			}
		} );
	}
	// 表示する
	self.open = function () {
		vars.timer.pause();
		vars.timer.start( {
			duration: opts.openDelay,
			stop: function () {
				vars.toggle( true );
			}
		} )
		
	}
	// 非表示に
	self.close = function () {
		vars.timer.pause();
		vars.timer.start( {
			duration: opts.closeDelay, 
			stop: function () {
				vars.toggle( false );
			} 
		} );
	}
	// 初期化
	vars.init.call( self );
} );

// ======================================================================
// タブメニュー
// ======================================================================
taco.jquery.extend( "tabMenu", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		init: $.noop,
		change: $.noop
	}, options );
	var vars = {
		items: null,
		currentIndex: 0,
		// 初期化
		init: function () {
			// タブボタンを全て取得する
			vars.items = element.find( ".tab-item" );
			vars.items.each( function ( index ) {
				// クリックリスナの付与とインデックスの割り振り
				$( this )
					.click( vars.click )
					.attr( "data-index", index );
			} );
			// 初期化のコール
			opts.init.call( self );
		}
	}
	// タブボタンのクリック
	vars.click = function ( evt ) {
		evt.preventDefault();
		// クリックしたタブのdata-indexを取得
		var nextIndex = Number( $( this ).attr( "data-index" ) );
		// 現在のインデックスと一致するなら処理を中止
		if ( nextIndex === vars.currentIndex )
			return;
		// 現在のインデックスを更新してチェンジ呼び出し
		vars.currentIndex = nextIndex;
		self.change( vars.currentIndex );
	}
	// 切り替え
	self.change = function ( index ) {
		// 全てのタブを非アクティブにしたのち、クリックしたタブのみアクティブにする
		vars.items
			.removeClass( "active" )
			.eq( index ).addClass( "active" );
		// チェンジのコール
		opts.change.call( self, {
			index: index
		} );
	}
	vars.init.call( self );
} );

// ======================================================================
// トップへもどる
// ======================================================================
taco.jquery.extend( "windowScroll", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		openSpeed: 100,
		closeSpeed: 100
	}, options );
	var vars = {
		button: null,
		buttonWidth: 0,
		scrollElement: null,
		// 初期化
		init: function () {
			// スクロール用エレメントを取得
			vars.scrollElement = $( taco.window().scrollElement() );
			// 内包しているボタンを取得
			vars.button = element.find( ".button" );
			// ボタンの横幅を取得
			vars.buttonWidth = vars.button.width();
			// ボタンのクリック
			vars.button.click( function ( evt ) {
				evt.preventDefault();
				vars.scrollElement.stop().animate( {
					scrollTop: 0
				}, {
					queue: false,
					duration: 100
				} );
			} );
		}
	}
	// 表示する
	self.open = function () {
		vars.toggle( true );
	}
	// 隠す
	self.close = function () {
		vars.toggle( false );
	}
	// 表示トグル
	vars.toggle = function ( isShow ) {
		var r,
			d;
		if ( isShow === true ) {
			r = 0,
			d = opts.openSpeed;
		} else {
			r = vars.buttonWidth * -1,
			d = opts.closeSpeed;
		}
		vars.button.velocity( {
			right: r
		}, {
			queue: false,
			duration: d
		} );
	}
	// 初期化
	vars.init.call( self );
} );
// ======================================================================
// チャプター切り替えスイッチ
// ======================================================================
taco.jquery.extend( "previewSwitch", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		click: $.noop,
		open: $.noop,
		close: $.noop,
		init: $.noop,
		changeStatus: $.noop,
		visible: true
	}, options );
	var vars = {
		openClassName: "active",
		switchingTarget: null
	};
	var on = {
		// 初期化
		init: function () {
			vars.switchingTarget = $( taco.string.build( "#", element.data( "target-id" ) ) );
			// 開閉ターゲットが存在するなら処理を続ける
			if ( vars.switchingTarget.size() > 0 ) {
				if ( opts.visible === true ) {
					element.addClass( vars.openClassName );
				}
				else {
					element.removeClass( vars.openClassName );
				}
				// クリックのリスナを追加
				element.click( on.click );
			}
			// 初期化呼び出し
			opts.init.call( self, {
				visible: opts.visible,
				switchingTarget: vars.switchingTarget
			} );
		},
		// クリックイベント
		click: function ( evt ) {
			evt.preventDefault();
			on.toggle( evt );
		},
		// トグル：開閉に振り分ける
		toggle: function ( evt ) {
			evt.switchingTarget = vars.switchingTarget;
			if ( opts.visible === true ) {
				on.close.call( self, evt );
			}
			else {
				on.open.call( self, evt );
			}
			// 表示フラグの反転
			opts.visible = !opts.visible;
			// ステータスチェンジ
			opts.changeStatus.call( self, {
				visible: opts.visible
			} );
		},
		open: function ( evt ) {
			// CSSクラスの付け替え
			element.addClass( vars.openClassName );
			opts.open.call( self, evt );
		},
		close: function ( evt ) {
			element.removeClass( vars.openClassName );
			opts.close.call( self, evt );
		}
	}
	// 初期化
	on.init.call( self );
} );

// ======================================================================
// プレビューコンテンツ
// ======================================================================
taco.jquery.extend( "previewContent", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		duration: 100
	}, options );
	var vars = {
		switchingContent: null
	};
	var on = {
		// 初期化
		init: function () {
			// 子要素を取得
			vars.switchingContent = element.find( ".chapter-preview" );
		}
	}
	// トグル
	on.toggle = function ( height, duration ) {
		var d = opts.duration;
		if ( duration !== undefined ) {
			d = duration;
		}
		if ( d === 0 ) {
			element.height( height );
		}
		else {
			element.velocity( {
				height: height
			}, {
				queue: false,
				duration: opts.duration
			} );
		}
	}
	// 開く
	self.open = function ( duration ) {
		on.toggle( vars.switchingContent.height(), duration );
	}
	// 閉じる
	self.close = function ( duration ) {
		on.toggle( 0, duration );
	}
	// 初期化
	on.init.call( self );
} );

// ======================================================================
// 初期化
// ======================================================================
$( function () {
	// トップか否かフラグ
	var isTop = $( "body" ).attr( "class" ).indexOf( "top" ) > -1;

	// ドロップダウンメニュー
	// ======================================================================
	$( ".main-navi-item" ).each( function () {
		var self = $( this ),
			subNavi = self.find( ".sub-navi" );
		// ドロップダウンがない場合はcontinue
		if ( subNavi.size() < 1 )
			return true;
		// ドロップダウンの初期化
		self.dropDownButton( {
			dropdown: self.find( ".sub-navi" ),
			container: self.find( ".sub-navi-container" ),
			openSpeed: 100,
			closeSpeed: 200,
			openDelay: 200,
			closeDelay: 500,
			// マウスオーバー
			mouseover: function () {
				// 表示する
				this.open();
			},
			// マウスアウト
			mouseout: function () {
				// 非表示に
				this.close();
			}
		} );
	} );	

	// スクロールトップの初期化
	// ======================================================================
	var scrollTop = $( "#scroll-top" ).windowScroll( {
		openSpeed: 100,
		closeSpeed: 100
	} );



	if ( isTop === true ) {
	// チャプターリスト
	// ======================================================================
		// プレビューのクッキーをゲット
		var previewStatusCookieName = "preview_status",
			previewStatusCookieProps = {
				days: 365
			},
			previewStatus = taco.cookies.get( previewStatusCookieName );

		// クッキーが未セットなら
		if ( previewStatus === undefined ) {
			// 空の値をセットして値を初期化
			previewStatus = { "history": "" };
		}
		else {
			// JSONクッキーをパース
			previewStatus = taco.string.evalJSON( previewStatus );
		}
		// クッキーに保存されている更新テキストと、現在の更新テキストに差があった場合は、
		// 更新後の初訪問とみなす
		var isFirst = previewStatus.history !== updateHistory;
		if ( isFirst === true ) {
			// 新たな更新テキストをセットしてクッキーを上書き
			previewStatus.history = updateHistory;
			taco.cookies.set( 
				previewStatusCookieName, taco.json.serialize( previewStatus ), previewStatusCookieProps );
		}

		// 切り替えコンテンツの初期化
		$( ".toggle-content" ).previewContent();

		// 切り替えヘッダの初期化
		$( ".toggle-head" ).each( function ( index ) {
			var self = $( this ),
				// クッキーに保存していた開閉状態を代入
				selfStatus = previewStatus[ self.attr( "id" ) ],
				// 子要素がNEWか否かフラグ
				isNew = self.attr( "class" ).indexOf( "is-new" ) > -1;

			// 開閉状態が未設定、開閉状態が「開く」の状態
			// 開閉が「閉じ」の状態だがNEWフラグ立っていて、かつ更新後初訪問なら開く
			if ( selfStatus === undefined || selfStatus === 1
				|| ( selfStatus === 0 && isNew === true && isFirst === true ) ) {
				visible = true;
			}
			else {
				visible = false;
			}

			// 無効ヘッダの場合は処理を飛ばす
			if ( self.attr( "class" ).indexOf( "disabled" ) > -1 ) 
				return true;
			// トグルの初期化
			self.previewSwitch( {
				visible: visible,
				init: function ( evt ) {
					if ( evt.visible === true ) {
						evt.switchingTarget.previewContent( "open", 0 );
					} else {
						evt.switchingTarget.previewContent( "close", 0 );
					}
				},
				open: function ( evt ) {
					evt.switchingTarget.previewContent( "open" );
				},
				close: function ( evt ) {
					evt.switchingTarget.previewContent( "close" );
				},
				changeStatus: function ( evt ) {
					// 表示なら１、非表示なら０をセット
					previewStatus[ self.attr( "id" ) ] = evt.visible ? 1 : 0;
					// クッキーの上書き
					taco.cookies.set( 
						previewStatusCookieName, taco.json.serialize( previewStatus ), previewStatusCookieProps );
				}
			} );
		} );

		$( "#top-chapter-list" ).css( "visibility", "visible" );
	}

	// ウィンドウ監視の初期化
	// ======================================================================
	var subHeaderMove = $( "#sub-header-move" );
	var mainNaviMove = $( "#main-navi-move" );
	// 子ページの場合
	if ( isTop === false ) {
		var sqexHeaderHeight = 38;
		var scrollTopSwitchHeight = 200;
		taco.window( {
			position: [ sqexHeaderHeight, scrollTopSwitchHeight ],
			changeStatus: function ( evt ) {
				// ヘッダ＆メニューの追随
				if ( evt.position > 0 ) {
					subHeaderMove.addClass( "fixed" );
					mainNaviMove.addClass( "fixed" );
				}
				else {
					subHeaderMove.removeClass( "fixed" );
					mainNaviMove.removeClass( "fixed" );
				}
				// スクロールトップの開閉
				if ( evt.position < 2 ) {
					scrollTop.windowScroll( "close" );
				}
				else {
					scrollTop.windowScroll( "open" );
				}
			}
		} );
	}
	// トップページの場合
	else {
		var moveSwitchHeight = 230;
		taco.window( {
			position: [ moveSwitchHeight ],
			scroll: function ( evt ) {
				var offset = evt.top - moveSwitchHeight;
				if ( offset >= 0 && offset <= 100 ) {
					subHeaderMove.css( "opacity", offset * 0.01 );
				}
				else if ( offset > 100 ) {
					subHeaderMove.css( "opacity", 1 );
				}
			},
			changeStatus: function ( evt ) {
				if ( evt.position > 0 ) {
					subHeaderMove.addClass( "fixed" );
					mainNaviMove.addClass( "fixed" );
					scrollTop.windowScroll( "open" );
				}
				else {
					subHeaderMove.removeClass( "fixed" );
					subHeaderMove.css( "opacity", 0 );
					mainNaviMove.removeClass( "fixed" );
					scrollTop.windowScroll( "close" );
				}
			}
		} );
	}
} );
var stretch = null;

$( window )
	.ready( function () {
		// 背景ストレッチ
		// ======================================================================
		// 背景ストレッチの初期化
		stretch = $( "#main-two-column-middle" ).backgroundStretch( {
			offset: 120
		} );

		// ドロップダウンメニュー
		// ======================================================================
		var that;
		$( ".main-navi-item" ).each( function () {
			that = $( this );
			that.dropDownButton( {
				dropdown: that.find( ".sub-navi" ),
				container: that.find( ".sub-navi-container" ),
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

		// スクロールトップ
		// ======================================================================
		var scrollTop = $( "#scroll-top" ).windowScroll( {
			openSpeed: 100,
			closeSpeed: 100
		} );
		taco.window( {
			position: [ 100 ],
			changeStatus: function ( evt ) {
				if ( evt.position === 0 ) {
					scrollTop.windowScroll( "close" );
				}
				else {
					scrollTop.windowScroll( "open" );
				}
			}
		} )
		
	} )
	.load( function () {
		// 背景ストレッチ
		stretch.backgroundStretch( "fit" );
	} );



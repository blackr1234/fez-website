$( window )
	.ready( function () {

		// ドロップダウンメニュー
		// ======================================================================
		var that,
			mainNaviItem = $( ".main-navi-item" );
		if ( mainNaviItem.size() > 0 ) {
			mainNaviItem.each( function () {
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
		}



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
		
	} );



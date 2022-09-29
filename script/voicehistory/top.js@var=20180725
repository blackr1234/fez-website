( function ( $ ) {

// ======================================================================
// 声プレイヤー
// ======================================================================
taco.jquery.extend( "voicePlayer", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
	}, options );
	var vars = {
		initialized: false,
		swfPath: taco.string.build( BASE_PATH, 'script/lib/jplayer' ),
		supplied: "m4a, ogg",
		m4a: null,
		ogg: null,
		playButton: null
	};
	var on = {
		// 初期化
		init: function () {
			vars.m4a = element.data( "m4a" );
			vars.ogg = element.data( "ogg" );
			vars.playButton = element.data( "play-button-id" );
			vars.playButton = $( taco.string.build( "#", vars.playButton ) );
			// 再生ボタンがヒットしなければ処理中止
			if ( vars.playButton.size() == 0 )
				return;
			// プレイボタンのクリック
			vars.playButton.click( on.click );
		}
	}
	// 再生ボタンのクリック
	on.click = function ( evt ) {
		evt.preventDefault();
		// プレイヤーの初期化がまだなら、まずは初期化する
		if ( vars.initialized === false ) {
			element = element.jPlayer( {
				ready: function () {
					$( this )
						.jPlayer( "setMedia", {
							m4a: vars.m4a,
							ogg: vars.ogg
						} )
						.jPlayer( "play" );
				},
				preload: "none",
				supplied: vars.supplied,
				swfPath: vars.swfPath
			} );
			vars.initialized = true;
		}
		else {
			element.jPlayer( "play", 0 );
		}
	}
	// 初期化
	on.init.call( self );
} );

	function onReady () {
		var headerObj = $( "#header" );
		var noNaviObj = $( "#no-navi" );

		taco.window( {
			position: [ 38 ],
			changeStatus: function ( evt ) {
				if ( evt.position > 0 ) {
					headerObj.addClass( "fixed" );
					noNaviObj.addClass( "fixed" );
				}
				else {
					headerObj.removeClass( "fixed" );
					noNaviObj.removeClass( "fixed" );
				}
			}
		} );

		// 声再生の初期化
		$( ".voice-player" ).voicePlayer();
	}

	$( onReady );

} )( jQuery )
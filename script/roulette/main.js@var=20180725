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

// ======================================================================
// モーダルボタンの初期化
// ======================================================================
taco.jquery.extend( "openModalButton", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		click: $.noop
	}, options );
	var vars = {
		id: null,
		type: null
	};
	var on = {
		// 初期化
		init: function () {
			element.click( on.click );
			vars.id = element.data( "id" );
			vars.type = element.data( "type" );
		}
	}
	// クリック
	on.click = function ( evt ) {
		evt.preventDefault();
		opts.click.call( self );
	}
	// 初期化
	on.init.call( self );
} );

// ======================================================================
// 初期化
// ======================================================================o
$( function () {

	// アイテムボックスの初期化
	$( ".equip-box" ).each( function () {
		var thisObj = $( this );
		if ( thisObj.attr( "class" ).indexOf( "disabled" ) == -1 ) {
			thisObj.colorbox( {
				transition: "fade",
				speed: 200,
				closeButton: false,
				onComplete: function () {
					$.colorbox.resize();
				}
			} );
		}
	} );

	$( "#cboxContent" ).click( function () {
		$.colorbox.next();
	} );

	// 声再生の初期化
	$( ".voice-player" ).voicePlayer();

} );
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
		ogg: null
	};
	var on = {
		// 初期化
		init: function () {
			vars.m4a = element.data( "m4a" );
			vars.ogg = element.data( "ogg" );
		}
	}
	// 再生
	self.play = function () {
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
// タブボタン
// ======================================================================
taco.jquery.extend( "tabButton", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		click: $.noop,
		activated: false
	}, options );
	var vars = {
		target: null
	}
	var on = {
		// 初期化
		init: function () {
			element.click( on.click );
		},
		click: function ( evt ) {
			evt.preventDefault();
			if ( opts.activated === true )
				return;
			if ( vars.target === null ) {
				vars.target = element.data( "target" );
			}
			opts.click.call( self, {
				target: vars.target
			} );
		}
	}
	self.activate = function ( isActive ) {
		if ( isActive === true ) {
			element.addClass( "active" );
		}
		else {
			element.removeClass( "active" );
		}
		opts.activated = isActive;
	}
	// 初期化
	on.init.call( self );
} );

// ======================================================================
// 切り替えボックス
// ======================================================================
// ===== ボックスマネージャー =====
var fadeBoxManager = function ( options ) {
	return new ( function ( options ) {
		var self = this;
		var opts = $.extend( {
			boxList: null
		}, options );
		var vars = {
			enabled: true,
			boxMap: {}
		}
		var on = {
			// 初期化
			init: function () {
				var $this;
				opts.boxList.each( function () {
					$this = $( this );
					vars.boxMap[ $this.attr( "id" ) ] = $this;
				} );
			}
		}
		self.openById = function ( targetId, complete ) {
			var targetBox = vars.boxMap[ targetId.replace( "#", "" ) ];
			targetBox.fadeBox( "open", complete );
		}
		self.close = function ( complete ) {
			// 表示されている箱
			var visibleBox = opts.boxList.filter( ":visible" );
			visibleBox.each( function ( i ) {
				if ( i === visibleBox.size() - 1 ) {
					$( this ).fadeBox( "close", complete );
				}
				else {
					$( this ).fadeBox( "close" );
				}
			} );
		}
		// 切り替え可能かどうかのセットゲット
		self.enabled = function ( isEnabled ) {
			if ( isEnabled !== undefined ) {
				vars.enabled = isEnabled;
			}
			else {
				return vars.enabled;
			}
		}
		// 初期化
		on.init.call( self );
	} )( options );
}
// ===== 切り替えボックス =====
taco.jquery.extend( "fadeBox", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
	}, options );
	var vars = {
	}
	var on = {
		// 初期化
		init: function () {
		}
	}
	self.open = function ( complete ) {
		element
			.css( "opacity", 0 )
			.show()
			.velocity( {
				opacity: 1
			}, {
				queue: false,
				duration: 200,
				complete: function () {
					if ( complete !== undefined )
						complete();
				}
			} );
	}
	self.close = function ( complete ) {
		element.velocity( {
			opacity: 0
		}, {
			queue: false,
			duration: 200,
			complete: function () {
				element.hide();
				if ( complete !== undefined )
					complete();
			}
		} );
	}
	// 初期化
	on.init.call( self );
} );

// ======================================================================
// パージ完了
// ======================================================================
$( function () {
	$( ".modal-open" ).colorbox( {
		transition: "fade",
		speed: 200,
		closeButton: false,
		onComplete: function () {
			$.colorbox.resize();
		}
	} );

	$( "#cboxContent" ).click( function () {
		$.colorbox.next();
	} );

	var voice = $( ".voice-player" );

	if ( voice.size() > 0 ) {
		// 音声プレイヤーの初期化
		voice.voicePlayer();

		// 再生ボタンの初期化
		$( ".voice-play-button" ).click( function ( evt ) {
			evt.preventDefault();
			var $this = $( this ),
				player = $this.data( "player" );
			// IDで保存しているdataの中身をエレメントに置換
			if ( typeof player === "string" ) {
				player = $( player );
				$this.data( "player", player );
			}
			player.voicePlayer( "play" );
		} );
	}

	// タブナビの初期化
	var itemBox = $( ".fade-box" );
	if ( itemBox.size() > 0 ) {
		// フェードボックスの初期化
		itemBox.fadeBox();
		// ボックスマネージャの初期化
		var itemBoxManager = fadeBoxManager( {
			boxList: itemBox
		} );
		// タブボタンの初期化
		var tabButtons = $( ".roulette-tab" );
		tabButtons.each( function ( i ) {
			$( this ).tabButton( {
				activated: i === 0,
				click: function ( evt ) {
					// アイテムボックスが有効なら
					if ( itemBoxManager.enabled() === true ) {
						// タブを全て無効に
						tabButtons.each( function () {
							$( this ).tabButton( "activate", false );
						} );
						// 自分（タブ）を有効に
						this.activate( true );
						// アイテムボックスを一時的に無効に
						itemBoxManager.enabled( false );
						itemBoxManager.close( function () {
							itemBoxManager.openById( evt.target, function () {
								itemBoxManager.enabled( true );
							} );
						} );
						
					}
				}
			} )
		} );
	}

} );
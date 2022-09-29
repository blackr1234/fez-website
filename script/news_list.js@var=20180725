// ======================================================================
// ニュースデータの管理クラス
// ======================================================================
var newsDataStore = function ( options ) {
	return new ( function ( options ) {
		var self = this;
		var opts = $.extend( {
			data: null
		}, options );
		var vars = {
			data: new Array( [], [], [], [], [], [] ),
			// 初期化
			init: function () {
				var i = 0,
					l = opts.data.length,
					d;
				for ( ; i < l; i++ ) {
					d = opts.data[ i ];
					// 新着は全て対象
					vars.data[ 0 ].push( d );
					// カテゴリーIDで振り分ける
					switch ( Number( d.category_id ) ) {
						// お知らせ
						case 1:
						case 9:
						case 10:
							vars.data[ 1 ].push( d );
						break;
						// イベント
						case 6:
						case 8:
							vars.data[ 2 ].push( d );
						break;
						// アップデート
						case 2:
							vars.data[ 3 ].push( d );
						break;
						// メンテナンス情報
						case 4:
							vars.data[ 4 ].push( d );
						break;
						// 障害情報
						case 5:
						case 7:
							vars.data[ 5 ].push( d );
						break;
					}
				}
				// 不要になったデータをリリース
				opts.data = null;
				delete opts.data;
			}
		};
		// データをインデックスで返す
		self.listByIndex = function ( index ) {
			return vars.data[ index ];
		}
		// 初期化
		vars.init.call( self );
	} )( options );
}

// ======================================================================
// ニュース一個を生成して返す
// ======================================================================
var newsCreator = function ( options ) {
	return new ( function ( options ) {
		var self = this;
		var opts = $.extend( {
			code: ''
		}, options );
		var vars = {
			replacer: null,
			// 初期化
			init: function () {
				vars.replacer = taco.string.bracketReplacer( '{', '}' );
			}
		}
		// ソースコードを生成して返す
		self.createCode = function ( data ) {
			return vars.replacer.replace( aNews, data );
		}
		// 初期化
		vars.init.call( self );
	} )( options );
}

// ======================================================================
// ニュースリストスイッチャー
// ======================================================================
taco.jquery.extend( "newsSwitcher", function ( element, options ) {
	var self = this,
		element = $( element );
	var opts = $.extend( {
		inSpeed: 500,
		outSpeed: 500
	}, options );
	var vars = {
		// 初期化
		init: function () {
		}
	};
	// 切り替える
	self.change = function ( complete ) {
		// 高さ固定でフェードアウト
		element
			.height( element.height() )
			.velocity( {
				opacity: 0
			}, {
				queue: false,
				duration: opts.outSpeed, 
				complete: function () {
					// 引数のコンプリートを実行
					if ( complete !== undefined ) {
						complete.call( self );
					}
					// 高さオートでフェードイン
					element
						.height( "auto" )
						.velocity( {
							opacity: 1
						}, {
							queue: false,
							duration: opts.inSpeed
						} );
					// 背景ストレッチ
					stretch.backgroundStretch( "fit" );
				}
			} )
	}
	// 初期化
	vars.init.call( self );
} );


// ======================================================================
// 初期化
// ======================================================================
$( function () {

	// ======================================================================
	// ニュースデータ管理の初期化
	// ======================================================================
	var dataStore = newsDataStore( {
		data: $.parseJSON( newsJson )
	} );

	// ======================================================================
	// ニュース生成の初期化
	// ======================================================================
	var creator = newsCreator( {
		code: aNews
	} );

	// ======================================================================
	// ニューススイッチャーの初期化
	// ======================================================================
	var switcher = $( "#news-list-main" ).newsSwitcher( {
		inSpeed: 250,
		outSpeed: 100
	} );

	// ======================================================================
	// タブメニューの初期化
	// ======================================================================
	var isChangeFirst = true;
	$( "#news-tab-content" ).tabMenu( {
		// 初期化
		init: function () {
			// 新着情報のタブをアクティブにする
			this.change( 0 );
		},
		// タブが切り替えられた
		change: function ( evt ) {
			// 初回時は飛ばす
			if ( isChangeFirst === true ) {
				isChangeFirst = false;
				return;
			}
			// ニュース記事一覧の切り替え
			switcher.newsSwitcher( "change", function () {
				var data = dataStore.listByIndex( evt.index ),
					i = 0
					l = data.length
					a = [];
				// 記事一覧の件数が０ならありませんを表示
				if ( l === 0 ) {
					switcher.html( noNews );
					return;
				}
				// 記事を１件ずつ生成して表示
				for ( ; i < l; i++ ) {
					// HTML側で定義している変数を参照する
					if ( maxNewsListSize === null || i < maxNewsListSize ) {
						a.push( creator.createCode( data[ i ] ) );
					}
				}
				switcher.html( a.join( "" ) );
			} );
		}
	} );
} );
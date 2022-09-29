$( function () {
	// ======================================================================
	// ローテバナーの初期化
	// ======================================================================
	var slideSpeed = 200,
		slideInterval = 5000,
		largeSlide = $( "#rotation-banner-imgs-slide" ),
		smallSlide = $( "#rotation-banner-navi-slide" ),
		nextButton = $( "#rotation-banner-navi-next" ),
		prevButton = $( "#rotation-banner-navi-prev" ),
		slideNum = largeSlide.find( "li" ).size();

	// 小バナーのアクティブ切り替え
	var activateSmallSlideByIndex = function ( index ) {
		smallSlideChildren.removeClass( "active" )
			.filter( "[data-index=" + index + "]" ).addClass( "active" );
	}

	// スライドがヒットしなければ、以降の処理を中止する
	if ( largeSlide.size() === 0 || smallSlide.size() === 0 )
		return;



	if ( slideNum > 3 ) {
		// 大バナーの初期化
		largeSlide
			.slick( {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: slideSpeed,
				fade: true
			} );
		// 小バナースライドの初期化
		smallSlide
			.on( "init", function ( evt, slick ) {
				// 小バナーの複製後の子要素を全て取得する
				smallSlideChildren = smallSlide.find( "li" );
				// １番をアクティブにする
				activateSmallSlideByIndex( 0 );
				// 小バナーへのマウスオーバー＆アウト
				$( this ).find( "li" )
					.mouseover( function ( evt ) {
						var index = $( this ).data( "index" );
						// 大バナーを同期させる
						largeSlide.slick( "slickGoTo", index );
						// 小バナーをアクティブにする
						activateSmallSlideByIndex( index );
					} );
			} )
			.on( "beforeChange", function ( evt, slick, currentSlide, nextSlide ) {
				// 大バナーを同期させる
				largeSlide.slick( "slickGoTo", Number( nextSlide ) + 1 );
			} )
			.on( "afterChange", function ( evt, slick, currentSlide ) {
				// アクティブなスライドを求める
				var activeSlide = currentSlide + 1;
				// アクティブなスライドのインデックスが上限を超えてしまったら
				// 0を代入する
				if ( activeSlide >= slideNum ) {
					activeSlide = 0;
				}
				// 小バナーのアクティブ切り替え
				activateSmallSlideByIndex( activeSlide );
			} )
			.slick( {
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				speed: slideSpeed,
				initialSlide: -1,
				autoplay: true,
				autoplaySpeed: slideInterval
			} );

		// 次へ前への初期化
		nextButton.click( function ( evt ) {
			evt.preventDefault();
			smallSlide.slick( "slickNext" );
		} ).find( "A" ).css( "visibility", "visible" );

		prevButton.click( function ( evt ) {
			evt.preventDefault();
			smallSlide.slick( "slickPrev" );
		} ).find( "A" ).css( "visibility", "visible" );
	}
	else if ( slideNum > 1 && slideNum <= 3 ) {
		// 大バナーの初期化
		largeSlide
			.slick( {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: slideSpeed,
				initialSlide: 1,
				fade: true
			} );
		// 小バナーを全て取得する
		smallSlideChildren = smallSlide.find( "li" );
		smallSlideChildren
			// 小バナーのマウスオーバー
			.mouseover( function () {
				timer.pause();
				// ページャの切り替え
				pager.page( Number( $( this ).data( "index" ) + 1 ) );
			} )
			// 小バナーのマウスアウト
			.mouseout( function () {
				// 真ん中のバナーに戻す
				pager.page( 2 );
				timer.start();
			} );
		var lastSlide = false,
			isFirst = true,
			// ページャの初期化
			pager = taco.pager( {
				length: smallSlideChildren.size(),
				init: function ( evt ) {
					// ２番をアクティブにする
					activateSmallSlideByIndex( 1 );
				},
				change: function ( evt ) {
					if ( isFirst === true ) {
						isFirst = !isFirst;
						return;
					}
					activateSmallSlideByIndex( evt.index );
					// 大バナーを同期させる
					largeSlide.slick( "slickGoTo", evt.index );
				},
				last: function () {
					// 最後フラグを真に
					lastSlide = true;
				}
			} ),
			// タイマーの初期化
			timer = taco.timer( {
				interval: slideInterval,
				progress: function () {
					if ( lastSlide === false ) {
						// 次のページへ
						pager.next();
					}
					else {
						// 最初に戻す
						pager.first();
						lastSlide = false;
					}
				}
			} );
		// タイマースタート
		timer.start();
	}

	// ローテバナーを表示
	$( "#rotation-banner" ).css( "visibility", "visible" );

} );
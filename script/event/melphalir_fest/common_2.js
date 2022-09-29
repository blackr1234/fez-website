taco.jquery.extend( "scrollTo", function ( element, options ) {
	var self = this,
		element = $( element ),
		target = element.attr( "href" );
	target = $( target );
	if ( target.size() === 0 )
		return;
	element.click( function ( evt ) {
		evt.preventDefault();
		taco.jquery.scrollTop( target.offset().top );
	} );
} );

$( function () {

	var body = $( "body" ),
		menu = $( "#menu" );

	// スクロールトップの初期化
	var scrollTop = $( "#scroll-top" ).windowScroll( {
		openSpeed: 100,
		closeSpeed: 100
	} );

	taco.window( {
		position: [ 38, 100 ],
		changeStatus: function ( evt ) {
			if ( evt.position === 0 ) {
				menu.removeClass( "fixed" );
				// 背景の固定解除
				body.removeClass( "bg-fixed" );
				// スクロールトップしまう
				scrollTop.windowScroll( "close" );
			}
			else {
				menu.addClass( "fixed" );
				// 背景を固定する
				body.addClass( "bg-fixed" );
			}
			if ( evt.position >= 2 ) {
				// スクロールトップ出す
				scrollTop.windowScroll( "open" );
			}
		}
	} );

	// ページ内移動の初期化
	$( ".scroll-to" ).scrollTo();

} );
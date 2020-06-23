function changePage( path ){

  $( '#inner-page' ).attr( 'src', './pages/' + path + '/index.html' );

}

function processNavButtonClicks(){

  $menu = $( '#nav-menu' );
  $nav = $( 'nav' );

  $( '#nav-button' ).click( (e) => {

    if( window.matchMedia('( orientation: portrait )').matches ){

      if( $menu.css('display') == 'flex' ){

        $menu.css( 'display', 'none' );
        $nav.css( 'height', 'auto' );

      }else{

        $menu.css( 'display', 'flex' );
        $nav.css( 'height', '100%' );

      }

      e.stopPropagation();

    }

  })

  $( 'html' ).click( (e) => {

    if( window.matchMedia('( orientation: portrait )').matches ){

      if( e.target != $menu ){

        $menu.css( 'display', 'none' );
        $nav.css( 'height', 'auto' );

      }

    }

  })

  $( '#inner-page' ).on( 'load', () => {

    $($( '#inner-page' )[0].contentWindow).on( 'click', (e) => {

      if( window.matchMedia('( orientation: portrait )').matches ){

        $menu.css( 'display', 'none' );
        $nav.css( 'height', 'auto' );

      }

    });

  });

}

window.onload = () => {

  window.changePage = changePage;
  changePage( 'home' );
  processNavButtonClicks();

}
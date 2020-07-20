window.onload = () => {

  window.changePageTo = changePageTo;
  
  generateOnclickForNavButtons();
  processNavButtonsClicks();
  loadIframe();

}

function changePageTo( page, title = null ){
  
  var state = {};

  if( !title ){

    var $a = $( 'a[data-page=\"' + page + '\"]' );
    title = $a.html();

  }
  
  var url = '/' + page;

  $( '#inner-page' ).attr( 'src', url );
  history.pushState( state, title, url );

}

function generateOnclickForNavButtons(){

  $('a').click( (e) => {

    changePageTo( $(e.target).data('page'), $(e.target).html() );

  } );

}

function processNavButtonsClicks(){

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

function loadIframe(){

  const urlParams = new URLSearchParams( window.location.search );
  const page = urlParams.get( 'page' );

  changePageTo( page ? page : 'home' );

}
window.onload = () => {

  document.changePageTo = changePageTo;
  document.getCurrentAnchor = getCurrentAnchor;
  
  updateMenuOrientantionCorrectly();
  generateOnclickForNavButtons();
  processNavButtonsClicks();
  loadIframe();

}

function updateMenuOrientantionCorrectly(){

  var $menu = $( '#nav-menu' );
  var $nav = $( 'nav' );

  window.onresize = function(){

    if( window.matchMedia('( orientation: portrait )').matches ){
      
      $menu.css( 'display', 'none' );
      $nav.css( 'height', 'auto' );

    }else{

      $menu.css( 'display', 'flex' );
      $nav.css( 'height', '100%' );

    }

  };

}

function generateOnclickForNavButtons(){

  $('a').click( (e) => {

    changePageTo( $(e.target).data('page'), $(e.target).html() );

  } );

}

function processNavButtonsClicks(){

  var $menu = $( '#nav-menu' );
  var $nav = $( 'nav' );

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
  const hash = urlParams.get( 'hash' );

  const destination = page ? page : 'home';
  changePageTo( destination, null, hash ? '#' + hash : null );

}

function changePageTo( page, title = null, anchor = null ){
  
  const state = {};

  if( !title ){

    var $a = $( 'a[data-page=\"' + page + '\"]' );
    title = $a.html();

  }

  const url = '/' + page;
  const innerURL = document.location.hostname == 'localhost' ? url : '/japanese-tips/' + url;

  $( '#inner-page' ).attr( 'src', innerURL );
  history.pushState( state, title, url );

  document.currentAnchor = anchor;

}

function getCurrentAnchor(){

  return document.currentAnchor;

}
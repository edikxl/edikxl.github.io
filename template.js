if( window.parent == window ){

  const url = new URL( window.location ).pathname.slice(1,-1);
  const hash = $(location).attr('hash').slice(1); // Removing # symbol, because it causes problems with URL params

  const page = 'japanese-tips/index.html?page=' + url + '&hash=' + hash;

  changePageTo( page );

}

window.onload = () => {

  document.goToAnchor = goToAnchor;

  createAnchorsAndFillTableOfContains();

  const anchor = parent.getCurrentAnchor();
  anchor ? goToAnchor( anchor ) : null;

}

function createAnchorsAndFillTableOfContains(){

  var $tableOfContains = $( '#table-of-contains' );

  $.each( $( '.title' ), ( index, elem ) => {

    $( elem ).html( $( elem ).html().replaceAll( '<br>', ' ' ) );
    const id = $( elem ).text();

    $( elem ).attr( 'id', id );

    if( index != 0 ){ // Skiping first title ( main for the page )

      $tableOfContains.append( $( '<div></div>' ).html( $( elem ).html() ).click( () => { goToAnchor( '#' + id ) } ) );

    }

  });

  window.parent.dispatchEvent( new CustomEvent( 'anchors-created', { bubbles: true } ) );

}

function changePageTo( path ){

  try { parent.changePageTo( path ); } // On server ( If you change the page from menu )
  catch(err) { // On local ( If you use a direct link to the page )

    window.location = '../../' + path;

  }

}

function goToAnchor( anchor ){

  document.location.assign( anchor );
  parent.history.replaceState( null, document.title, anchor );

}
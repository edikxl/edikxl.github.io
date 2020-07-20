if( window.parent == window ){

  var url = new URL( window.location );
  changePageTo( 'index.html?page=' + url.pathname.slice(1,-1) );

}

function changePageTo( path ){

  try { window.parent.changePageTo( path ); } // On server ( If you change page from menu )
  catch(err) { // On local ( If you use direct link to the page )

    window.location = '../../' + path;

  }

}

function goto( id ){ document.location.assign(id); }

$( document ).ready( () => {

  var $table_of_contains = $( '#table-of-contains' );

  $.each( $( '.title' ), ( index, elem ) => {

    var id = $( elem ).text().toLowerCase().replace( ' ', '-' );

    $( elem ).attr( 'id', id );

    if( index != 0 ){ // Skiping first title ( main for the page )

      $table_of_contains.append( $( '<div></div>' ).html( $( elem ).html() ).click( () => { goto( '#' + id ) } ) );

    }

  });

});
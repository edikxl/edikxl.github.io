function changePage( path ){

  try { window.parent.changePage( path ); } // On server
  catch(err) { // On local

    window.location = '../../' + path + '/index.html';

  }

}

function goto(id){ document.location.assign(id); }

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
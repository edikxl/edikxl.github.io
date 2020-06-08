function changePage( path ){

  document.getElementById( 'inner-page' ).src = './pages/' + path + '/index.html'

}

window.onload = () => {

  changePage( 'home' )

}
$( ".inner-switch" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
      $( "body" ).removeClass( "dark" );
      $( ".inner-switch" ).text( "OFF" );
    } else {
      $( "body" ).addClass( "dark" );
      $( ".inner-switch" ).text( "ON" );
    }
});
var el = document.getElementById('date');
el.onchange = function() {
    if (el.value === '') {
        el.classList.add("empty");
    } else {
        el.classList.remove("empty");
    }
} 
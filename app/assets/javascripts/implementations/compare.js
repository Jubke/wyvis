var App = App || {};

App.implementations.compare = function() {
  $( ".implementation" ).wyvis();

  var container = $( ".implementation-container" );
  container.delegate(".top-controls .btn-impl-enlarge", "click", function (e) {
    $( e.currentTarget ).toggleClass("active");
    $( e.delegateTarget ).toggleClass("full-width");

    if ( container.not( e.delegateTarget ).is(":last-child") ) {
      

    } else {        
      $( ".implementation-container" ).not( e.delegateTarget ).toggleClass("zero-width").delay(500).queue(function () {
        // $( this ).toggle();
        $( this ).dequeue();
      }); 
    }
  });
};
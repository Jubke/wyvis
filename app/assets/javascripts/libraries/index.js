var App = App || {};
App.libraries.index = function() {

  // initialize live-search
  window.liveSearch = $.liveSearch({
    selectorContainer: "#live-search",
    selectorElementsToSearch: ".search-tile",
    attributeToSearch: false,
    selectorInputSearch: "#search-query",
    minCharacters: 1,
    typeDelay: 200,
  });

  // cache library thumbs and containers
  var library_thumbs = $( ".library-thumb" );
  var library_containers = $( ".details-container" );

  // bind library selection
  $("#live-search").on("click", ".library-thumb", selectLibrary);
  // set first library as active
  library_thumbs.first().addClass("active");
  library_containers.first().addClass("active");

  // initialize affix for side panel with library containers
  $('#affix').affix({
    offset: {
      top: 180
    }
  });


  /**
   * Sets the 'active' class on the library thumb
   * and the container.
   * @param  {Event} e the event that tiggered the action
   * @return {undefined}
   */
  function  selectLibrary(e) {
    var that = $( e.currentTarget ),
        lib = $( "#" + that.data("name") );

    library_containers.removeClass("active");
    library_thumbs.removeClass("active");

    that.addClass("active");
    lib.addClass("active");
  }
};

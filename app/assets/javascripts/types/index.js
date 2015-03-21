var App = App || {};
App.types.index = function() {

  // initialize live-search
  window.liveSearch = $.liveSearch({
    selectorContainer: "#live-search",
    selectorElementsToSearch: ".search-tile",
    attributeToSearch: false,
    selectorInputSearch: "#search-query",
    minCharacters: 1,
    typeDelay: 200,
  });

  // cache type thumbs and containers
  var type_thumbs = $( ".vis-type-thumb" );
  var type_containers = $( ".details-container" );

  // bind type selection
  $("#live-search").on("click", ".vis-type-thumb", selectLibrary);
  // set first type as active
  type_thumbs.first().addClass("active");
  type_containers.first().addClass("active");

  // initialize affix for side panel with type containers
  $('#affix').affix({
    offset: {
      top: 180
    }
  });


  /**
   * Sets the 'active' class on the type thumb
   * and the container.
   * @param  {Event} e the event that tiggered the action
   * @return {undefined}
   */
  function  selectLibrary(e) {
    var that = $( e.currentTarget ),
        lib = $( "#" + that.data("name") );

    type_containers.removeClass("active");
    type_thumbs.removeClass("active");

    that.addClass("active");
    lib.addClass("active");
  }
};

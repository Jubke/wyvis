var App = App || {};
App.packages.index = function() {
  window.liveSearch = $.liveSearch({
    selectorContainer: "#live-search",
    selectorElementsToSearch: ".search-tile",
    attributeToSearch: false,
    selectorInputSearch: "#search-query",
    minCharacters: 1,
    typeDelay: 200,
  });
};

var datahub = (function(DataHub) {
  var datahub;

  $.ajax({
    url:"/libraries.json",
    async: false
  }).success(function(data){
    
    datahub = new DataHub({
      name: "library_release_dates",
      data: data
    });


    return datahub;
  });

  return datahub;

})(DataHub);
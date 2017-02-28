$(function(){
  //console.log("begin document ready");
  var makes;
  var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["make"],
  id: ["make"]
  //keys: []
  };
  var fuse;

  $.getJSON("makes.json",function(data){
    //console.log("in getJSON function");
    //$.each( data, function( key, val ) {
      //console.log(val);
    //});
   /*var i=0;
   for(i=0;i<data.length;i++){
      makes[i]=data[i];
      //console.log(makes[i]);
    }*/
    makes=data;
    //makes = Object.keys(data).map(function(key) { return { id: key, make: data[key]}; });
    //console.log(makes);
    fuse = new Fuse(makes, options); // "makes" is the item array
  });

  $( "#tags" ).autocomplete({
    source: function(request, response) {
      //console.log("in autocomplete function");
      //console.log(makes);
      //var results = $.ui.autocomplete.filter(makes, request.term);
      //console.log(fuse);
      var results = fuse.search(request.term);
      //console.log(results);
      response(results.slice(0, 10));
    }
  });
});

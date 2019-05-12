  //Materialize items initializer
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
    var collapsibleElem = document.querySelector('.collapsible');
    var collapsibleInstance = M.Collapsible.init(collapsibleElem);

    $("select[required]").css({display: "inline", height: 0, padding: 0, width: 0});

    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
    });

    $(document).ready(function(){
       $('.tooltipped').tooltip();
     });

     $(document).ready(function(){
      $('.modal').modal();
    });
});


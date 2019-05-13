var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

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

//LOGOUT
$('#logOut').on('click', function(){
  // cargar email y password  
  $.ajax({
    url: 'http://localhost:3000/users/logout',
    //url: 'https://examenfinallizzie.herokuapp.com/users/login',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    success: function(data){
      // guardar token en localstorage o cookie
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert((error_msg["responseText"]));
    }
  });
})
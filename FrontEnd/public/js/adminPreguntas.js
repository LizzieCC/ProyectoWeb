//Load Materias
loadSubjects();

function loadSubjects() {
    var token = localStorage.getItem('token');
    $('#listMaterias').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'http://localhost:3000/subjects',
      //url: 'https://examenfinal818821.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
  
        for( let i = 0; i < data.length; i++) {
            setSubjects(data[i])
          }
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

//Show users in html page
function setSubjects(data){    
        $('#listMaterias').append('<h4 class="block">'+data.name+'</h4><ul class="collapsible" id="'+data.name+'"></ul>')

        $.ajax({
            url: 'http://localhost:3000/getQuestions/' + data.name,
            //url: 'https://examenfinal818821.herokuapp.com/todos',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
            },
            method: 'GET',
            dataType: 'json',
            success: function(temaData){
        
                for( let i = 0; i < temaData.length; i++) {
                    console.log(temaData[i].pregunta)
                    setQuestions(temaData[i], data.name)
                  }

            },
            error: function(error_msg) {
              alert((error_msg['responseText']));
            }
          });
}

function setQuestions(data, materia){
    $('#'+materia+'').append(
        '<li id="'+data._id+'"><div class="collapsible-header"><i class="material-icons">book</i>'+data.pregunta+ 
        '</div><div id="body" class="collapsible-body">'+
        '<p>Imagen de Pregunta: <img src="'+data.imagenDeApoyo+'" alt="Smiley face" height="42" width="42"></p>'+
        '<p>Tema: '+data.tema+'</p>'+
        '<p>Opción A: '+data.opcionA+
        '<br>Opción B: '+data.opcionB+
        '<br>Opción C: '+data.opcionC+ '</p>'+
        '<p>Respuesta: '+data.respuesta+'</p>'
        +'</div></li>')
    $('.collapsible').collapsible();


}



$(document).ready(function(){
    $('.collapsible').collapsible();
  });
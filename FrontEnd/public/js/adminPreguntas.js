//Load Materias
loadSubjects();

$(".switch").find("input[type=checkbox]").on("change",function() {
    var status = $(this).prop('checked');
    if(!status){
        //If it is checked, show the delete buttons
        $('.secondary-content').addClass("hidden");
    }
    else{
        $('.secondary-content').removeClass("hidden");
    }
});

function loadSubjects() {
    var token = localStorage.getItem('token');
    $('#listMaterias').empty();
    $("#checkEliminar").prop( "checked", false );

    $.ajax({
      url: 'https://preparatemas.herokuapp.com/subjects',
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
            url: 'https://preparatemas.herokuapp.com/getQuestions/' + data.name,
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
            '<p>Imagen de Pregunta: <img src="'+data.imagenDeApoyo+'" alt="" height="42"></p>'+
            '<p>Tema: '+data.tema+'</p>'+
            '<p>Opción A: '+data.opcionA+
            '<br>Opción B: '+data.opcionB+
            '<br>Opción C: '+data.opcionC+ '</p>'+
            '<p>Respuesta: '+data.respuesta+'</p>'+
            '<p>Explicación: '+data.explicacion+'</p>'+
            '<p>Imagen de Explicación: <img src="'+data.imagenExplicativa+'" alt="" height="42"></p>'+
            '<a href="#!" class="secondary-content hidden" id="deleteIcon"><i class="material-icons red-text text-darken-4" onclick="deleteElement(this)">delete</i></a>'
            +'</div></li>')

            $('.collapsible').collapsible();
    
}


//Eliminar Pregunta
function deleteElement(element){
    var token = localStorage.getItem('token');
    let id = $(element).parent().parent().parent().attr('id');

    console.log(id);
    
    $.ajax({
      url: 'https://preparatemas.herokuapp.com/deleteQuestion/' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      success: function(){
        loadSubjects();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


$(document).ready(function(){
    $('.collapsible').collapsible();
  });
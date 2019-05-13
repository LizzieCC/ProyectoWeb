![Preparate+Logo](/FrontEnd/public/img/LogoColor.png)
# Plataforma de Administración - Prepárate+
Proyecto Final de Desarollo Web.

## Descripción General
Se trata de un sistema de administración que permite a los administradores agregar, modificar y eliminar el contenido de la app Preparate+.
Los administradores son los únicos que pueden tener el permiso para hacer cambios en el contenido, además de ser los únicos permitidos para crear otros administradores.

Las preguntas son de libre acceso, es decir, se pueden consultar sin necesidad de autentificarse.

Para el alcance de este proyecto solo se desarrolló el sistema de administraciones y los end-point del backend para obtener las preguntas. No se desarolló un front-end para visualizar las preguntas ya que la app móvil en sí será la responsable de hacer dicha conexión.

## Seguridad
Los administradores deberán autentificarse para poder realizar cualquier cambio en el contenido (Materias y Preguntas) del sistema.

Las preguntas están libres, cualquiera puede accederlas por lo que no será necesario autentificarse.

## Funcionalidades
Los administradores podrán realizar las siguientes acciones:
* Agregar Materia
* Eliminar Materia
* Modificar Materia
* Agregar Pregunta
* Eliminar Pregunta
* Modificar Pregunta <<<???

Cualquier usuario podrá realizar las siguientes acciones:
* Consultar preguntas por materia
* Consultar todas las materias


## Estructura de los esquemas
Hay 3 esquemas diferentes:

### Users
Estos son los administradores del sistema.
```
{
  name: string,
  email: string,
  password: string,
  tokens: []
}
```

### Materias
Este es el listado principal de materias que existen
```
{
  name: string
}
```


### Temas
Cada Tema le pertenece a una Materia.
```
{
  name: string,
  materia: Materia
}
```

### Preguntas
Se tratan de preguntas de opción múltiple. Cada pregunta le pertenece a un tema.
```
{
  pregunta: string,
  descripcion: string,
  imagenDeApoyo: url,
  opcionA: string,
  opcionB: string,
  opcionC: string,
  respuesta: char (A || B || C),
  explicacion: string,
  imagenDeExplicacion: url,
  tema: Tema 
}
```

Este proyecto fue desarollado por:
* Jonathan Cárdenas @jonathancrd
* Lizzie Cañamar @lizziecc

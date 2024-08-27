# GENERAL

Se usó la version de node **v16.20.0**
Se usó version de angular: **v15.2.0**
Se usó el cli **v15.2.11**

Trabaje en **visual studio code** con las extensiones nesesarias para optimizar el trabajo.

Con el comando: **ng new testFront** cree el proyecto para el front con el archivo de enrutamiento.

Dentro de la carpeta **src>app>** cree carpetas como: **components, interfaces, pages, services.**

Para trabajar con modales instale la libreria de material con: **ng add @angular/material**

Se usó la **v8** de **.NET FrameWork**

Se usaron los paquetes:
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.VisualStudio.Web.CodeGeneration.Design
- Swashbuckle.AspNetCore

##(BASE DE DATOS)
crear base de datos (taskSql)
Y se creo la tabla Tasks:
```sql
CREATE TABLE [dbo].[Tasks](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [nvarchar](20) NOT NULL,
	[descripcion] [nvarchar](80) NOT NULL,
	[estado] [bit] NULL,
 CONSTRAINT [PK_task] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO```

## (BACK)
se configuro cadena de conexión de la Base de datos en el **appSettings.json:**
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=taskSql;User Id=sa;Password=develop1008;TrustServerCertificate=True;"
}```

- Cree un **entity **para el modelo de la task
- Cree unos **Dtos** para poder manipular ciertos datos
- Crear **crud** con .NET Core que gestione una base de datos de tareas


------------


## (FRONT)
El programa se encarga de listar tareas y trabajar sobre ellas(To Do List):
Esta lista viene predeterminada desde el back para que primero me muestre a aquellas tareas no completadas teniendo en cuenta que son las primordiales.

Y mediante un servicio llamado **CrudService** hago las peticiones necesarias a esa api para asi manipular esos datos de la lista.

Donde puedo **Listar, Crear, Editar, Obtener una, Eliminar**.

En este programa me comunique mediante Inputs y Outputs.

Dentro del **appModule** realicé todas las importaciones debidas para poder utilizar los **componentes y modulos** que son necesarios.
-Cree mi primer componente llamado **list-to-do**
Que es para listar todas las tareas que tengo sea completadas o no completadas.

**"Para tener en cuenta:"**
- Las tareas completadas son aquellas que tienen un cuadro verde con un check.
- Las no completadas son aquellas que tienen un cuadro Azul vacio.

Esta vista es muy amigable para cualquier usuario ya que:
Estas tareas las muestro de dos formas una es a traves una lista de cards y la otra forma es a traves de una tabla, la opcion que desee
el usuario la puede escoger mediante unos iconos en la parte superior.

Hay un filtro de:** (Todas, Completas, Incompletas)**.


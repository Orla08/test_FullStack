## (SQL:)
se instalo **sql server express** en local
se instalo el **management** de sql server
probar **conexión base de datos** (management)

crear base de dato **(testSql)**
Crear tabla employees:
- crear columnas de la tabla
- asignar indetity y primary key
script de base de datos: 


CREATE TABLE [dbo].[Employees](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NULL,
	[Email] [nvarchar](100) NOT NULL,
	[PhoneNumber] [nvarchar](15) NULL,
	[HireDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

Se creo un **procedimiento almacenado** para obtener los empleados a partir de una fecha especifica:


CREATE PROCEDURE sp_obtenerEmpleadoPorFecha 
	@fechaContrato DATE 
AS
BEGIN
	Select * 
	From Employees
	Where HireDate >= @fechaContrato 
	Order By HireDate
END


VISUAL STUDIO
se intalo **visual studio 2022**
se creo **proyecto web api**
se configuro cadena de conexión de la BD en el appSettings:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=testSql;User Id=sa;Password=develop1008;TrustServerCertificate=True;"
}

Se creo **DbContext**
se creo una clase de entidad (**employeEntity** 'modelo'), se agregaron dataAnotaciones **([Table] , [Key])** al modelo.

se creo un controlador (**employeController**) a través de la opción **scaffolding con entity**.

se creo método dentro del controlador para consumir el sp **(sp_obtenerEmpleadoPorFecha)**.

Se implementaron **tres pruebas unitarias**:
- Para obtener todos los empleados
- Para obtener un empleado existente
- Para obtener un empleado no existente.






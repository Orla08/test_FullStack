using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApi.Controllers;
using WebApi.Data;
using Xunit;

namespace TestProject1
{
    public class UnitTest1
    {
        private readonly EmployeController _controller;
        private readonly ApplicationDbContext _context;

        public UnitTest1()
        {
            // Configura un DbContext en memoria
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "EmployeDatabase")
                .Options;
            _context = new ApplicationDbContext(options);

            // Popula la base de datos con datos iniciales
            SeedDatabase();

            // Crea el controlador
            _controller = new EmployeController(_context);
        }
       
        private void SeedDatabase()
        {
            var employees = new List<EmployeEntity>
            {
                new EmployeEntity { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", PhoneNumber = "1234567890", HireDate = new DateTime(2020, 1, 1) },
                new EmployeEntity { FirstName = "Jane", LastName = "Doe", Email = "jane.doe@example.com", PhoneNumber = "0987654321", HireDate = new DateTime(2021, 2, 1) },
            };

            _context.Employees.AddRange(employees);
            _context.SaveChanges();
        }

        [Fact]
        public void ObtenertTodos()
        {
            // Act
            var result = _controller.GetEmployees();

            // Assert
            var okResult = Assert.IsType<Task<ActionResult<IEnumerable<EmployeEntity>>>>(result);
            var returnValue = Assert.IsType<Task<ActionResult<IEnumerable<EmployeEntity>>>>(okResult);
            Assert.NotNull(returnValue);
        }


        [Fact]
        public async void obtenerUno()
        {
            // Act
            var result = _controller.GetEmployeEntity(1);

            // Assert
            var actionResult = Assert.IsType<Task<ActionResult<EmployeEntity>>>(result);
            var returnValue = Assert.IsType<Task<ActionResult<EmployeEntity>>>(actionResult);
            Assert.Equal(1, returnValue.Result.Value.EmployeeId);
        }

        [Fact]
        public async void obtenerUnoNoExistente()
        {
            // Act
            var result = _controller.GetEmployeEntity(10);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result.Result);
        }

    }
}
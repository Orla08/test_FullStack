import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ListToDoComponent } from './list-to-do.component';
import { CrudApiService } from 'src/app/services/crud-api.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CardModel } from 'src/app/interfaces/card-model';

// Crear mocks para los servicios
class MockCrudApiService {
  getAll() {
    return of([]); // Simular una respuesta vacía
  }
}

class MockSnackBarService {
  show(message: string) {
    console.log('Mock SnackBar:', message);
  }
}

class MockMatDialog {
  open() {
    return {
      afterClosed: () => of(true) // Simular que el diálogo se cerró
    };
  }
}

describe('ListToDoComponent', () => {
  let component: ListToDoComponent;
  let fixture: ComponentFixture<ListToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListToDoComponent],
      imports: [FormsModule], // Agrega FormsModule aquí
      providers: [
        { provide: CrudApiService, useClass: MockCrudApiService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las tareas al inicializar', () => {
    spyOn(component, 'loadTasks');
    component.ngOnInit();
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('debería filtrar las tareas correctamente', () => {
    const mockTasks: CardModel[] = [
      { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', estado: true },
      { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', estado: false }
    ];
    component.Tasks = mockTasks;

    component.filterState('1');
    expect(component.TasksForFilters.length).toBe(2);

    component.filterState('2');
    expect(component.TasksForFilters.length).toBe(1);
    expect(component.TasksForFilters[0].estado).toBe(true);

    component.filterState('3');
    expect(component.TasksForFilters.length).toBe(1);
    expect(component.TasksForFilters[0].estado).toBe(false);
  });

  it('debería abrir el modal y recargar las tareas después de cerrarlo', () => {
    spyOn(component, 'loadTasks');
    component.createModal();
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('debería manejar errores al cargar las tareas', () => {
    const crudApiService = TestBed.inject(CrudApiService);
    spyOn(crudApiService, 'getAll').and.returnValue(throwError('Error al cargar las tareas'));
    spyOn(component, 'loadTasks').and.callThrough();
    spyOn(component.SnackBarService, 'show');

    component.loadTasks();
    expect(component.SnackBarService.show).toHaveBeenCalledWith('Error al cargar las tareas');
  });
});

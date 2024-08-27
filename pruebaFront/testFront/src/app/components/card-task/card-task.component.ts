import { SnackBarService } from './../../services/snack-bar.service';
import { CrudApiService } from './../../services/crud-api.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModel } from 'src/app/interfaces/card-model';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.css']
})
export class CardTaskComponent {

  @Output() actualizar = new EventEmitter<any>()
  @Input() task: CardModel = {
    id: 0,
    descripcion: '',
    titulo: '',
    estado: false
  }


  constructor(
    private MatDialog: MatDialog,
    private CrudApiService: CrudApiService,
    public SnackBarService: SnackBarService
  ) { }

  changeState(task: CardModel, estado: boolean) {
    this.CrudApiService.putState(task.id, { estado: estado }).subscribe((resp: any) => {
      estado ? this.SnackBarService.show("Tarea: '" + task.titulo + "' completada con exito") : this.SnackBarService.show("Se activó nuevamente la tarea: '" + task.titulo + "'");
      this.actualizar.emit();
    })
  }

  editModal(id: number) {
    const dialogRef = this.MatDialog.open(EditTaskComponent, {
      panelClass: ['col-12', 'col-md-6', 'mx-auto'],
      data: id,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.actualizar.emit()
    });
  }

  deleteModal(id: any) {
    const dialogRef = this.MatDialog.open(DeleteTaskComponent, {
      panelClass: ['col-12', 'col-md-6', 'mx-auto'],
      data: id,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.actualizar.emit()
    });
  }

}

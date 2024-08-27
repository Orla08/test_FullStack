import { SnackBarService } from './../../services/snack-bar.service';
import { CrudApiService } from './../../services/crud-api.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { stateConstants } from 'src/app/commons/state.constants';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { CardModel } from 'src/app/interfaces/card-model';

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent {

  optionState: any = '1';
  Tasks: CardModel[] = []
  TasksForFilters: CardModel[] = []
  view: string = 'card'

  constructor(
    private MatDialog: MatDialog,
    private CrudApiService: CrudApiService,
    public SnackBarService: SnackBarService
  ) { }

  ngOnInit() { this.loadTasks(); }

  loadTasks() {
    this.CrudApiService.getAll().subscribe((resp: any) => {
      this.Tasks = resp;
      this.filterState("1");
    }, error => this.SnackBarService.show(error))
  }

  createModal() {
    const dialogRef = this.MatDialog.open(CreateTaskComponent, {
      panelClass: ['col-12', 'col-md-6', 'mx-auto'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      this.loadTasks();
    });
  }

  filterState(state: string) {
    switch (state) {
      case stateConstants.Todas:
        this.TasksForFilters = this.Tasks;
        break
      case stateConstants.Completadas:
        this.TasksForFilters = this.Tasks.filter((task: CardModel) => task.estado === true);
        break
      case stateConstants.Incompletas:
        this.TasksForFilters = this.Tasks.filter((task: CardModel) => task.estado === false);
        break
      default:
        this.TasksForFilters = this.Tasks;
        break;
    }
  }

}

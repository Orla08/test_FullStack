import { CrudApiService } from './../../services/crud-api.service';
import { SnackBarService } from './../../services/snack-bar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardModel } from 'src/app/interfaces/card-model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(0),
    titulo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    estado: new FormControl(''),
  })

  constructor(
    public dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private SnackBarService: SnackBarService,
    private CrudApiService: CrudApiService
  ) {
  }

  ngOnInit() {
    if (this.data) this.loadTask()
    else this.SnackBarService.show('Error al cargar la tarea')
  }


  loadTask() {
    this.CrudApiService.getOne(this.data).subscribe((resp: any) => {
      this.form.patchValue(resp);
    }, error => this.SnackBarService.show(error))
  }


  submit() {
    if (this.form.valid) {
      this.CrudApiService.put(this.data, this.form.value).subscribe((resp: any) => {
        this.SnackBarService.show('Se edito la tarea con exito');
      }, error => this.SnackBarService.show(error))
      this.dialog.close()
    }
  }

  cancel() {
    this.dialog.close()
  }



}

import { SnackBarService } from './../../services/snack-bar.service';
import { CrudApiService } from './../../services/crud-api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(0),
    titulo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(80)]),
  })

  constructor(
    public dialog: MatDialogRef<CreateTaskComponent>,
    private CrudApiService: CrudApiService,
    private SnackBarService: SnackBarService
  ) { }

  ngOnInit() { }

  submit() {
    if (this.form.valid) {
      this.CrudApiService.post(this.form.value).subscribe((resp: any) => {
        this.SnackBarService.show('Tarea creada Exitosamente');
        this.dialog.close()
      }, error => this.SnackBarService.show(error))
    }
  }

  cancel() {
    this.dialog.close()
  }



}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudApiService } from 'src/app/services/crud-api.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(0),
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    estado: new FormControl(false),
  })

  constructor(
    public dialog: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private SnackBarService: SnackBarService,
    public CrudApiService: CrudApiService,

  ) { }

  ngOnInit() { }

  submit() {
    this.CrudApiService.delete(this.data).subscribe((resp: any) => {
      this.SnackBarService.show('Se elimino la tarea');
      this.dialog.close();
    }, error => this.SnackBarService.show(error))
  }

  cancel() {
    this.dialog.close()
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListToDoComponent } from './pages/list-to-do/list-to-do.component';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableTaskComponent } from './components/table-task/table-task.component';




@NgModule({
  declarations: [
    AppComponent,
    ListToDoComponent,
    CardTaskComponent,
    EditTaskComponent,
    CreateTaskComponent,
    DeleteTaskComponent,
    TableTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

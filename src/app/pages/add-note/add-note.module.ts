import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNotePageRoutingModule } from './add-note-routing.module';

import { AddNotePage } from './add-note.page';
import { RichTextComponent } from 'src/app/componenets/rich-text/rich-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FontAwesomeModule,
    AddNotePageRoutingModule
  ],
  declarations: [AddNotePage, RichTextComponent]
})
export class AddNotePageModule {}

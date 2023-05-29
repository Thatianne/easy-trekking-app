import { Component, NgModule } from '@angular/core';
import { AddTrekkingComponent } from './add-trekking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoModule } from '@components/logo/logo.module';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [AddTrekkingComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, DatePipe],
  providers: [DatePipe],
  exports: [AddTrekkingComponent]
})
export class AddTrekkingModule {}

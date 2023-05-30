import { NgModule } from '@angular/core';
import { AddTrekkingComponent } from './add-trekking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoModule } from '@components/logo/logo.module';
import { CommonModule, DatePipe } from '@angular/common';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { LoadingModule } from '@components/loading/loading.module';

@NgModule({
  declarations: [AddTrekkingComponent, ImagePreviewComponent],
  imports: [CommonModule, LogoModule, ReactiveFormsModule, DatePipe, LoadingModule],
  providers: [DatePipe],
  exports: [AddTrekkingComponent]
})
export class AddTrekkingModule {}

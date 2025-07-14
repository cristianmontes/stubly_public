import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilderComponent } from './mock-builder.component';

@NgModule({
  declarations: [MockBuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [MockBuilderComponent]
})
export class MockBuilderModule {}

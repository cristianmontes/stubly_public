
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockListComponent } from './mock-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MockListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MockListComponent }
    ])
  ]
})
export class MockListModule {}

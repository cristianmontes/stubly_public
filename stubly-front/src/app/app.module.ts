import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
//import { MockListComponent } from './components/mock-list/mock-list.component';
import { MockFormComponent } from './components/mock-form/mock-form.component';
import { MockPreviewComponent } from './components/mock-preview/mock-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { MockBuilderModule } from './pages/mock-builder/mock-builder.module';
import { MockListComponent } from './pages/mock-list/mock-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MockListComponent,
    MockFormComponent,
    MockPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MockBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

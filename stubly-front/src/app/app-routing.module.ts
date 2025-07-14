import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MockBuilderComponent } from './pages/mock-builder/mock-builder.component';
//import { MockListComponent } from './components/mock-list/mock-list.component';
import { MockListComponent } from './pages/mock-list/mock-list.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'app', component: MockBuilderComponent },
  //{ path: 'app-list', component: MockListComponent },
  { path: 'mis-mocks', component: MockListComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

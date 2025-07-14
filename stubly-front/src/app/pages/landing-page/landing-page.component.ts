import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  goToApp() {
    this.router.navigate(['/app']);
  }
}

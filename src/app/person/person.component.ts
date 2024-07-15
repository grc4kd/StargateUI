import { Component, inject, Input } from '@angular/core';
import { PersonAstronaut } from './person';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  @Input() person!: PersonAstronaut;
}

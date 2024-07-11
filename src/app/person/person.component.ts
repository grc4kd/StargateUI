import { Component, inject, Input } from '@angular/core';
import { Person } from './person';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StargateService } from '../../stargate.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  stargateService = inject(StargateService);
  @Input() person!: Person;
}

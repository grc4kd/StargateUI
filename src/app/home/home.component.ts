import { Component, inject } from '@angular/core';
import { Person } from '../person/person';
import { PersonComponent } from "../person/person.component";
import { CommonModule } from '@angular/common';
import { StargateService } from '../../stargate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  personList: Person[] = [];
  stargateService: StargateService = inject(StargateService);

  constructor() {
    this.stargateService.getAllPeople().then((personList: Person[]) => {
        this.personList = personList;
    });
  }
}

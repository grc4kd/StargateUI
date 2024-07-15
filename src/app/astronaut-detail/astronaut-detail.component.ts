import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StargateService } from '../../stargate.service';
import { PersonAstronaut } from '../person/person';
import { AstronautDetail } from './astronaut-detail';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AstronautDutiesTableComponent } from "../astronaut-duties-table/astronaut-duties-table.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-astronaut-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, AstronautDutiesTableComponent],
  templateUrl: './astronaut-detail.component.html',
  styleUrl: './astronaut-detail.component.css'
})
export class AstronautDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  stargateService = inject(StargateService);
  personAstronaut: PersonAstronaut | undefined;
  astronautDetail: AstronautDetail | undefined;

  dutyForm = new FormGroup({
    duty: new FormControl(''),
    startDate: new FormControl(new Date()),
  });

  constructor() {
    const personName = this.route.snapshot.params['name'];
    this.stargateService.getPersonByName(personName).then((personAstronaut) => {
      this.personAstronaut = personAstronaut;
    });
  }

  submitDuty() {
    this.stargateService.submitDuty(
      this.dutyForm.value.duty ?? '',
      this.dutyForm.value.startDate ?? new Date(),
    );
  }
}

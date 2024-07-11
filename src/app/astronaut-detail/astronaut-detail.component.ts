import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StargateService } from '../../stargate.service';
import { Person } from '../person/person';
import { AstronautDetail } from './astronaut-detail';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-astronaut-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './astronaut-detail.component.html',
  styleUrl: './astronaut-detail.component.css'
})
export class AstronautDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  stargateService = inject(StargateService);
  person: Person | undefined;
  astronautDetail: AstronautDetail | undefined;

  dutyForm = new FormGroup({
    duty: new FormControl(''),
    startDate: new FormControl(new Date()),
  });

  constructor() {
    const personName = this.route.snapshot.params['name'];
    this.stargateService.getPersonByName(personName).then((person) => {
        this.person = person;
    });
    this.astronautDetail = this.person?.astronautDetail;
  }

  submitDuty() {
    this.stargateService.submitDuty(
      this.dutyForm.value.duty ?? '',
      this.dutyForm.value.startDate ?? new Date(),
    );
  }
}

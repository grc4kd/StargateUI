import { Injectable } from '@angular/core';
import { PersonAstronaut } from './app/person/person';
import { AstronautDuty } from './app/astronaut-duties-table/astronaut-duty';

@Injectable({
  providedIn: 'root'
})
export class StargateService {
  url = 'https://localhost:7204';

  async getAllPeople(): Promise<PersonAstronaut[]> {
    const data = await fetch(`${this.url}/Person`);
    const response = await data.json();
    const people = response.personAstronauts as PersonAstronaut[];
    return people ?? [];
  }

  async getPersonByName(name: string): Promise<PersonAstronaut | undefined> {
    const data = await fetch(`${this.url}/Person/${name}`);
    const response = await data.json();
    const person = response.personAstronaut as PersonAstronaut;
    return person ?? {};
  }

  async getPersonDutiesByName(name: string): Promise<AstronautDuty[] | undefined> {
    const data = await fetch(`${this.url}/AstronautDuty/${name}`);
    const response = await data.json();
    const duties = response.astronautDuties as AstronautDuty[];
    return duties ?? [];
  }

  submitDuty(duty: string, startDate: Date)
  {
    console.log(
      `Stargate application received: duty: ${duty}, startDate: ${startDate}`
    );
  }
}

import { Injectable } from '@angular/core';
import { Person } from './app/person/person';

@Injectable({
  providedIn: 'root'
})
export class StargateService {
  url = 'http://localhost:5204/Person';

  async getAllPeople(): Promise<Person[]> {
    const data = await fetch(this.url);
    const response = (await data.json());
    return response.people ?? [];
  }

  async getPersonByName(name: string): Promise<Person | undefined> {
    const data = await fetch(`${this.url}/${name}`);
    const response = (await data.json());
    return response.person ?? {};
  }

  submitDuty(duty: string, startDate: Date)
  {
    console.log(
      `Stargate application received: duty: ${duty}, startDate: ${startDate}`
    );
  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { AstronautDetailComponent } from './astronaut-detail/astronaut-detail.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'astronaut-detail/:name',
        component: AstronautDetailComponent,
        title: 'Astronaut Details',
    },
];

export default routeConfig;
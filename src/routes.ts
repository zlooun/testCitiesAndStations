import { Routes } from 'nest-router';
import { CityModule } from './city/city.module';

export const routes: Routes = [
  {
    path: '/city',
    module: CityModule,
  },
];

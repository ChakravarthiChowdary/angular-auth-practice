import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  activeNavRoute: string = '';

  constructor() {}
}


import { Injectable } from '@angular/core';
import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/switchMap';

import { WordsService } from '../services';


@Injectable()
export class ViewGameGuard implements CanActivate {

  constructor(
    private game: WordsService
    ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      let p = route.params;
      return this.game.gameExists(p['uid'], p['id']);
  }


}

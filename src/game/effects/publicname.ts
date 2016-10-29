

import { DashboardActions } from '../dashboard.actions';
import { AuthService } from  '../../auth/services/auth-service';

import { Observable } from 'rxjs/Observable';
import { keyExists } from '../../shared/utils';

export function getPublicName(auth: AuthService, db: any ) {

  return $state =>
    $state.switchMap(ac => {
        let add = '';
        let name = `names/${auth.username()}`;
        // console.log('finding name', name);
        let check$ = Observable.defer(() =>
          db.object(name + add)
            .let(keyExists()));

        return check$.map(v => {
          if (v === true) {
            add = String(Math.round(Math.random() * 100));
            throw Error();
          }
          return `${auth.username()}${add}`;
        }).retry();
      }).switchMap((name) => {
        return Observable.of(
          DashboardActions.setPublicNameOk(name)
        );
      });

}

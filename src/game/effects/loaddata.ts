



import { DashboardActions } from '../dashboard.actions';
import { AuthService } from  '../../auth/services/auth-service';

// import { Observable } from 'rxjs/Observable';
// import { keyExists } from '../../shared/utils';

export function loadData(auth: AuthService, db: any ) {
  const combine = (x, y, z) => ({j: x, m: y, n: z});
  return $state =>
    $state.switchMap(() => {
      const msg$ = db.list(`users/${auth.id}/messages/`).take(1);
      const jocs$ = db.list(`users/${auth.id}/jocs/`).take(1);
      const public$ = db
        .object(`users/${auth.id}/publicName`)
        .take(1).map(v => v.$value);
      return jocs$
        .combineLatest(msg$, public$, combine)
        .map(g => DashboardActions.loadDataOk(g.j, g.m, g.n));
    });
}

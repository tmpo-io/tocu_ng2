



import { DashboardActions } from '../dashboard.actions';
import { AuthService } from  '../../auth/services/auth-service';

// import { Observable } from 'rxjs/Observable';
// import { keyExists } from '../../shared/utils';

export function loadData(auth: AuthService, db: any ) {
  const combine = (x, y) => ({j: x, m: y});
  return $state =>
    $state.switchMap(() => {
      const msg$ = db.list(`users/${auth.id}/messages/`).take(1);
      const jocs$ = db.list(`users/${auth.id}/jocs/`).take(1);
      return jocs$
        .combineLatest(msg$, combine)
        .map(g => DashboardActions.loadDataOk(g.j, g.m));
    });
}

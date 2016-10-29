

import { DashboardActions } from '../dashboard.actions';
import { AuthService } from  '../../auth/services/auth-service';




export function checkSetupStatus(auth: AuthService, db: any ) {
  return $state =>
    $state.switchMap(a => {
      return db
        .object(`users/${auth.id}/setup`)
        .take(1)
        .map(v => {
          if (v.$exists()) {
            return DashboardActions.loadData();
          }
          return DashboardActions.needsUpdate();
        });
    });
}

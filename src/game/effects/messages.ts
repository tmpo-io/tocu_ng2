
// import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/services/auth-service';
// import { cleanObject } from '../../shared/utils';



export function removeMessage(auth: AuthService, db: any) {
  return state$ => state$.map(
    action => db
      .object(`users/${auth.id}/messages/${action.payload.$key}`)
      .remove()
  );
}

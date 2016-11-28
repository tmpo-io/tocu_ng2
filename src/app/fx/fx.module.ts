import { NgModule } from '@angular/core';
import { FxComponent } from './fx.component';

import { EffectsModule } from '@ngrx/effects';
import { FxEffects } from './fx.effects';
import { FxService } from './fx.service';

@NgModule({
  imports: [
    EffectsModule.run(FxEffects)
  ],
  declarations: [
    FxComponent
  ],
  providers: [
    FxService
  ]
})
export class FxModule { }

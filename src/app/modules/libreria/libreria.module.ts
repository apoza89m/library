import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibreriaRoutingModule } from './libreria-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LibreriaRoutingModule, SharedModule],
})
export class LibreriaModule {}

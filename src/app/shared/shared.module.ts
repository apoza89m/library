import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { ConversionInputDirective } from './directives/convierte-input.directive';
import { DecoraEtiquetaDirective } from './directives/decora-etiqueta.directive';
import { AddPuntoPipe } from './pipes/add-punto.pipe';
import { TablaGenericaComponent } from './tabla-generica/tabla-generica.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DecoraEtiquetaDirective,
    ConversionInputDirective,
    MaterialModule,
    AddPuntoPipe,
    TablaGenericaComponent,
  ],
  exports: [
    CommonModule,
    DecoraEtiquetaDirective,
    ConversionInputDirective,
    MaterialModule,
    AddPuntoPipe,
    TablaGenericaComponent,
  ],
})
export class SharedModule {}

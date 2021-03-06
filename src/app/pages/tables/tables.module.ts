import { NgModule } from '@angular/core';
import {   NbListModule,
NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,  NbSpinnerModule, NbButtonModule, NbPopoverModule, NbCheckboxModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { UserViewDialogComponent } from './smart-table/user-view-dialog/user-view-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCheckboxModule,
    FormsModule,
    NbPopoverModule,
    NbButtonModule,
    NbSpinnerModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    UserViewDialogComponent,
  ],
})
export class TablesModule { }

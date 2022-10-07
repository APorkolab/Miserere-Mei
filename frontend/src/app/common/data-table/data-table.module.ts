import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { SorterPipe } from 'src/app/pipe/sorter.pipe';

@NgModule({
  declarations: [NgxDataTableComponent, FilterPipe, SorterPipe],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [NgxDataTableComponent, FilterPipe, SorterPipe],
})
export class DataTableModule {}

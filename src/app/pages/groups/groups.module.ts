import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { GroupsComponent } from "./groups.component";
import { GroupsTableComponent } from "./components/groups-table/groups-table.component";
import { LoadingModule } from "@components/loading/loading.module";

@NgModule({
  declarations: [GroupsComponent, GroupsTableComponent],
  imports: [CommonModule, LoadingModule, DatePipe],
  exports: [GroupsComponent]
})
export class GroupsModule {}

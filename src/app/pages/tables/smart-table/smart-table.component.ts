import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { NbDialogService } from "@nebular/theme";
import { UserViewDialogComponent } from './user-view-dialog/user-view-dialog.component';

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
  settings = {
    actions: { position: "right", edit: false, add: false },
     delete: {
      deleteButtonContent: '<i class="fa fa-eye"></i>',
      confirmDelete: true,
    },
    columns: {
      store_client_id: {
        title: "ID",
        type: "number",
      },
      domain: {
        title: "Domain",
        type: "string",
      },
      shop_owner: {
        title: "Owner",
        type: "string",
      },
      email: {
        title: "Email",
        type: "string",
      },
      app_status: {
        title: "Status",
        type: "number",
        sortDirection: "desc",
      },
    },
  };

  loading: boolean = true;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private httpClient: HttpClient,
    private dialogService: NbDialogService
  ) {
    let url =
      "https://app.osswebapps.com/oss/web_api/api.php?method_name=get_all_user";

    let body = {};

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      username: "ossadmin",
      password: "ossadmin@2020",
    });

    let options = {
      headers: httpHeaders,
    };

    this.httpClient.post(url, body, options).subscribe((data) => {
      this.source.load(data["data"]);
      this.loading = false;
    });
  }

  onDeleteConfirm(event): void {
    this.dialogService.open(UserViewDialogComponent, {
      context: {
        userData: event.data,
      },
    });
  }
}

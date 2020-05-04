import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
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
    },
  };

  loading: boolean = true;
  source: LocalDataSource = new LocalDataSource();

  constructor(private httpClient: HttpClient) {

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
      this.source.load(data['data']);
      this.loading = false;
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

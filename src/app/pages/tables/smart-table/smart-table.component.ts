import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { NbDialogService } from "@nebular/theme";
import { UserViewDialogComponent } from "./user-view-dialog/user-view-dialog.component";

@Component({
  selector: "view-domain",
  template: `
    <a target="_blank" href="http://www.{{ value }}">
      {{ value }}
    </a>
  `,
  styles: [],
})
export class DomainViewComponent implements OnInit {
  public value;
  constructor() {}
  ngOnInit() {}
}

@Component({
  selector: "view-base",
  template: ` <div (click)="onCellClick()">{{ value.cell }}</div> `,
  styles: [],
})
export class BaseViewComponent implements OnInit {
  public value;
  constructor(private dialogService: NbDialogService) {}
  ngOnInit() {}
  onCellClick() {
    this.dialogService.open(UserViewDialogComponent, {
      context: {
        userData: this.value.row,
      },
    });
  }
}

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
  settings = {
    actions: { edit: false, add: false, delete: false },
    selectMode: "multi",
    columns: {
      store_client_id: {
        title: "ID",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      domain: {
        title: "Domain",
        type: "custom",
        valuePrepareFunction: (cell, row) => cell,
        renderComponent: DomainViewComponent,
      },
      shop_owner: {
        title: "Owner",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      email: {
        title: "Email",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
      },
      app_status: {
        title: "Status",
        type: "custom",
        valuePrepareFunction: (cell, row) => {
          return { cell, row };
        },
        renderComponent: BaseViewComponent,
        sortDirection: "desc",
      },
    },
  };

  loading: boolean = true;
  showActionButon: boolean = false;
  source: LocalDataSource = new LocalDataSource();
  selectedRows;

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
      this.source.load(data["data"]);
      this.loading = false;
    });
  }

  onRowSelect(event) {
    this.selectedRows = event.selected;
    if (event.selected.length > 0) {
      this.showActionButon = true;
    } else {
      this.showActionButon = false;
    }
  }
}

import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ResponsiveModule } from "ng2-responsive";
import { ToastrModule } from 'ngx-toastr';



import { AppComponent } from "./app.component";
import { AppState, InternalStateType } from "./app.service";
import { GlobalState } from "./app.state";
import { ServicesModule } from "./shared/services/services.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app.routing";

import { SecurityService } from "./security/security.service";
import { AuthGuard } from "./security/auth.guard";
import { HttpInterceptorModule } from "./security/http-interceptor.module";
import { HasClaimDirective } from "./security/has-claim.directive";
import { ExpensesModule } from "./pages/expenses/expenses.module";
import { IncomeModule } from "./pages/income/income.module";
// Application wide providers
const APP_PROVIDERS = [AppState, GlobalState, Title];


export interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

@NgModule({
  declarations: [
    AppComponent, 
    HasClaimDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServicesModule,
    ResponsiveModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ExpensesModule,
    IncomeModule,
  ],
  providers: [
    APP_PROVIDERS,
    SecurityService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appState: AppState) {}
}

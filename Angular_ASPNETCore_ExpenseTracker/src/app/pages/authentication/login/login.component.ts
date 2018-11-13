import {
  Component,
  OnInit,
} from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { SecurityService } from "../../../security/security.service";
import { AppUser, RegisterUser } from "../../../security/app-user";
import { AppUserAuth } from "../../../security/app-user-auth";
import { AlertService } from "../../../shared/services/alert/alert.service";

@Component({
  selector: ".content_inner_wrapper",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  registerUser: RegisterUser = new RegisterUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;
  checked: boolean = false;
  toggleRegister: boolean = false;

  /**
   *
   */
  constructor(
    private alertService: AlertService,
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  }

  login() {
    this.securityService.login(this.user).subscribe(
      resp => {
        this.securityObject = resp;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      () => {
        // Initialize security object to display error message
        this.securityObject = new AppUserAuth();
      }
    );
  }

    register() {
        this.securityService.create(this.registerUser)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.toggleRegister = !this.toggleRegister
                },
                error => {
                    this.alertService.error(error);
                });
    }
    
}

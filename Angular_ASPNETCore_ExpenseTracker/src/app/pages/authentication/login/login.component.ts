import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  ElementRef,
  HostListener,
  HostBinding
} from "@angular/core";
import { GlobalState } from "../../../app.state";
import { ConfigService } from "../../../shared/services/config/config.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SecurityService } from "../../../security/security.service";
import { AppUser } from "../../../security/app-user";
import { AppUserAuth } from "../../../security/app-user-auth";

@Component({
  selector: ".content_inner_wrapper",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;
  checked: boolean = false;
  toggleRegister: boolean = false;

  /**
   *
   */
  constructor(
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
}

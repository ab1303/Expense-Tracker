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
import { Router } from "@angular/router";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
	checked: boolean = false;
	toggleRegister: boolean = false;
}

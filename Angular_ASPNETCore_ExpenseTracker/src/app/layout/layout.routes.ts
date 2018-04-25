import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { AuthGuard } from "../security/auth.guard";
import { AdminComponent } from "../pages/administration/administration.component";

const LAYOUT_ROUTES: Routes = [
  //---------------------------------------------------------->
  //Authentication
  //---------------------------------------------------------->
  {
    path: "authentication/lock",
    loadChildren: "../pages/authentication/lock/lock.module#LockModule"
  },
  {
    path: "authentication/login",
    loadChildren: "../pages/authentication/login/login.module#LoginModule"
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboards", pathMatch: "full" },

      //---------------------------------------------------------->
      //Dashboards
      //---------------------------------------------------------->
      {
        path: "dashboards",
        canActivate: [AuthGuard],
        loadChildren: "../pages/dashboards/dashboards.module#DashboardsModule",
        data: { claimType: "canAccessDashboard" }
      },
      //---------------------------------------------------------->
      //Page Layouts
      //---------------------------------------------------------->
      {
        path: "page-layouts/full-width-v1",
        loadChildren:
          "../pages/page-layouts/full-width-v1/full-width-v1.module#FullWidthV1Module"
      },
      {
        path: "page-layouts/full-width-v2",
        loadChildren:
          "../pages/page-layouts/full-width-v2/full-width-v2.module#FullWidthV2Module"
      },
      {
        path: "page-layouts/full-width-v3",
        loadChildren:
          "../pages/page-layouts/full-width-v3/full-width-v3.module#FullWidthV3Module"
      },
      {
        path: "page-layouts/boxed-layout-v1",
        loadChildren:
          "../pages/page-layouts/boxed-layout-v1/boxed-layout-v1.module#BoxedV1Module"
      },
      {
        path: "page-layouts/boxed-layout-v2",
        loadChildren:
          "../pages/page-layouts/boxed-layout-v2/boxed-layout-v2.module#BoxedV2Module"
      },
      {
        path: "page-layouts/boxed-layout-v3",
        loadChildren:
          "../pages/page-layouts/boxed-layout-v3/boxed-layout-v3.module#BoxedV3Module"
      },
      {
        path: "page-layouts/detached-toolbar-left",
        loadChildren:
          "../pages/page-layouts/detached-toolbar-left/detached-toolbar-left.module#DetachedToolbarLeftModule"
      },
      {
        path: "page-layouts/detached-toolbar-right",
        loadChildren:
          "../pages/page-layouts/detached-toolbar-right/detached-toolbar-right.module#DetachedToolbarRightModule"
      },
      {
        path: "page-layouts/left-side-nav-v1",
        loadChildren:
          "../pages/page-layouts/left-side-nav-v1/left-side-nav-v1.module#LeftSideNavV1Module"
      },
      {
        path: "page-layouts/left-side-nav-v2",
        loadChildren:
          "../pages/page-layouts/left-side-nav-v2/left-side-nav-v2.module#LeftSideNavV2Module"
      },
      {
        path: "page-layouts/right-side-nav-v1",
        loadChildren:
          "../pages/page-layouts/right-side-nav-v1/right-side-nav-v1.module#RightSideNavV1Module"
      },
      {
        path: "page-layouts/right-side-nav-v2",
        loadChildren:
          "../pages/page-layouts/right-side-nav-v2/right-side-nav-v2.module#RightSideNavV2Module"
      },

      //---------------------------------------------------------->
      // Assets
      //---------------------------------------------------------->

      //---------------------------------------------------------->
      // Income
      //---------------------------------------------------------->

      //---------------------------------------------------------->
      // Expenses
      //---------------------------------------------------------->
      {
        path: "expenses",
        loadChildren:
          "../pages/expenses/expenses.module#ExpensesModule"
      },
      //---------------------------------------------------------->
      // Administration
      //---------------------------------------------------------->
      {
        path: "administration",
        // component: AdminComponent,
        loadChildren:
          "../pages/administration/administration.module#AdminModule"
      }
    ]
  },

  // 404 Page Not Found
  { path: "**", redirectTo: "dashboards" }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);

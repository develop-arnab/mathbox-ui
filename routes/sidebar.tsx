/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route);
  }

  return route?.exact
    ? pathname == route?.path
    : route?.path
    ? pathname.indexOf(route.path) === 0
    : false;
}

const routes: IRoute[] = [
  {
    path: "/maths", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
    exact: true
  },
  {
    path: "/maths/matrices/cross-product",
    icon: "FormsIcon",
    name: "Matrices"
  },
  {
    path: "/maths/vectors",
    icon: "CardsIcon",
    name: "Vectors"
  },
  {
    path: "/maths/linear-equations",
    icon: "ChartsIcon",
    name: "LinearEquations"
  },
  {
    path: "/maths/statistics",
    icon: "ChartsIcon",
    name: "Statistics"
  }
  // {
  //   path: "/maths/charts",
  //   icon: "ChartsIcon",
  //   name: "Charts"
  // },
  // {
  //   path: "/maths/buttons",
  //   icon: "ButtonsIcon",
  //   name: "Buttons"
  // },
  // {
  //   path: "/maths/modals",
  //   icon: "ModalsIcon",
  //   name: "Modals"
  // },
  // {
  //   path: "/maths/tables",
  //   icon: "TablesIcon",
  //   name: "Tables"
  // },
  // {
  //   icon: "PagesIcon",
  //   name: "Pages",
  //   routes: [
  //     // submenu
  //     {
  //       path: "/maths/login",
  //       name: "Login"
  //     },
  //     {
  //       path: "/maths/create-account",
  //       name: "Create account"
  //     },
  //     {
  //       path: "/maths/forgot-password",
  //       name: "Forgot password"
  //     },
  //     {
  //       path: "/maths/404",
  //       name: "404"
  //     },
  //     {
  //       path: "/maths/blank",
  //       name: "Blank"
  //     }
  //   ]
  // }
];

export type { IRoute };
export default routes;

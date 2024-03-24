import {
  FaAffiliatetheme,
  FaBoxes,
  FaBullhorn,
  FaChalkboard,
  FaCity,
  FaCog,
  FaEvernote,
  FaFilter,
  FaFlag,
  FaGift,
  FaHome,
  FaLink,
  FaListAlt,
  FaLocationArrow,
  FaMedal,
  FaNotesMedical,
  FaRegStickyNote,
  FaTasks,
  FaToolbox,
  FaTools,
  FaUser,
  FaUserLock,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { FiGrid, FiMap, FiMapPin, FiShoppingCart } from "react-icons/fi";
import Home from "../pages/home";
import RegionsPage from "../pages/regions";
import RegionForm from "../components/region/region-form";
import CitiesPage from "../pages/cities";
import CityForm from "../components/city/city-form";
import CityDetailsPage from "../components/city/city-details";
import EmployeesPage from "../pages/employees";
import EmployeeForm from "../components/employees/employees-form";
import EmployeeDetailsPage from "../components/employees/employees-details";
import ClientsPage from "../pages/clients";
import ClientForm from "../components/clients/clients-form";
import ClientDetailsPage from "../components/clients/clients-details";
import OrdersPage from "../pages/orders";
import OrderForm from "../components/orders/orders-form";

// import { GiPayMoney, GiSplitArrows, GiTable } from 'react-icons/gi'

// import { FiLogIn, FiLogOut, FiSettings, FiTrash } from 'react-icons/fi'

export interface ICrudRoutes {
  path: string;
  component: React.ReactNode;
}

export interface ISubRoute {
  labelKey: string;
  icon?: JSX.Element;
  path: string;
  // permissions: string[]
  component: any;
  crudRoutes?: ICrudRoutes[];
  exact?: boolean;
}

export interface IRoute {
  labelKey: string;
  icon: JSX.Element;
  path: string;
  crudRoutes?: ICrudRoutes[];
  roles?: string[];
  hasSubMenus: boolean;
  subMenus?: ISubRoute[];
  component?: any;
  exact?: boolean;
}

export const routes: IRoute[] = [
  {
    labelKey: "الصفحة الرئيسية",
    icon: <FaHome />,
    path: "/",
    hasSubMenus: false,
    component: <Home />,
  },
  {
    labelKey: "المناطق",
    icon: <FaLocationArrow />,
    path: "/regions",
    hasSubMenus: false,
    component: <RegionsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <RegionForm />,
      },
      {
        path: "create",
        component: <RegionForm />,
      },
      {
        component: <></>,
        path: "details/:id",
      },
    ],
  },
  {
    labelKey: "المدن",
    icon: <FaCity />,
    path: "/cities",
    hasSubMenus: false,
    component: <CitiesPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <CityForm />,
      },
      {
        path: "create",
        component: <CityForm />,
      },
      {
        path: "details/:id",
        component: <CityDetailsPage />,
      },
    ],
  },
  {
    labelKey: "الموظفون",
    icon: <FaUsers />,
    path: "/employees",
    hasSubMenus: false,
    component: <EmployeesPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <EmployeeForm />,
      },
      {
        path: "create",
        component: <EmployeeForm />,
      },
      {
        path: "details/:id",
        component: <EmployeeDetailsPage />,
      },
    ],
  },
  {
    labelKey: "العملاء",
    icon: <FaUserTie />,
    path: "/clients",
    hasSubMenus: false,
    component: <ClientsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ClientForm />,
      },
      {
        path: "create",
        component: <ClientForm />,
      },
      {
        path: "details/:id",
        component: <ClientDetailsPage />,
      },
    ],
  },

  {
    labelKey: "الطلبات",
    icon: <FaChalkboard />,
    path: "/manage-orders",
    hasSubMenus: true,
    subMenus: [
      {
        path: "/orders",
        labelKey: "سجل الطلبيات",
        component: <OrdersPage />,
        crudRoutes: [
          {
            path: "update/:id",
            component: <OrderForm />,
          },
          {
            path: "create",
            component: <OrderForm />,
          },
          {
            path: "details/:id",
            component: <ClientDetailsPage />,
          },
        ],
      },
    ],
  },
  // {
  //   labelKey: "الطلاب",
  //   icon: <FaUser />,
  //   path: "/student",
  //   hasSubMenus: false,
  //   component: <StudentsPage />,
  //   crudRoutes: [
  //     // {
  //     //   path: "update/:id",
  //     //   component: <UserForm />,
  //     // },
  //     // {
  //     //   path: "create",
  //     //   component: <UserForm />,
  //     // },
  //     {
  //       component: <StudentDetailsPage />,
  //       path: "details/:id",
  //     },
  //   ],
  // },
  // {
  //   labelKey: "الكورسات",
  //   icon: <FaRegStickyNote />,
  //   path: "/courses",
  //   hasSubMenus: false,
  //   component: <CoursesPage />,
  //   crudRoutes: [
  //     {
  //       path: "update/:id",
  //       component: <CourseForm />,
  //     },
  //     {
  //       path: "create",
  //       component: <CourseForm />,
  //     },
  //     {
  //       component: <CourseDetailsPage />,
  //       path: "details/:id",
  //     },
  //   ],
  // },
  // {
  //   labelKey: "الفصول",
  //   icon: <FaEvernote />,
  //   path: "/seasons",
  //   hasSubMenus: false,
  //   component: <SeasonsPage />,
  //   crudRoutes: [
  //     {
  //       path: "update/:id",
  //       component: <SeasonForm />,
  //     },
  //     {
  //       path: "create",
  //       component: <SeasonForm />,
  //     },
  //     {
  //       component: <SeasonDetailsPage />,
  //       path: "details/:id",
  //     },
  //   ],
  // },
  // {
  //   labelKey: "الدروس",
  //   icon: <FaChalkboard />,
  //   path: "/lessons",
  //   hasSubMenus: false,
  //   component: <LessonsPage />,
  //   crudRoutes: [
  //     {
  //       path: "update/:id",
  //       component: <LessonForm />,
  //     },
  //     {
  //       path: "create",
  //       component: <LessonForm />,
  //     },
  //     {
  //       component: <LessonDetailsPage />,
  //       path: "details/:id",
  //     },
  //   ],
  // },
  // {
  //   labelKey: "الاعلانات",
  //   icon: <FaBullhorn />,
  //   path: "/annoucements",
  //   hasSubMenus: false,
  //   component: <AnnoucementsPage />,
  //   crudRoutes: [
  //     {
  //       path: "update/:id",
  //       component: <AnnoucementForm />,
  //     },
  //     {
  //       path: "create",
  //       component: <AnnoucementForm />,
  //     },
  //     {
  //       component: <AnnoucementDetailsPage />,
  //       path: "details/:id",
  //     },
  //   ],
  // },
  // {
  //   labelKey: "الملخصات",
  //   icon: <FaListAlt />,
  //   path: "/summaries",
  //   hasSubMenus: false,
  //   component: <SummariesPage />,
  //   crudRoutes: [
  //     {
  //       path: "update/:id",
  //       component: <SummaryForm />,
  //     },
  //     {
  //       path: "create",
  //       component: <SummaryForm />,
  //     },
  //     {
  //       component: <SummaryDetailsPage />,
  //       path: "details/:id",
  //     },
  //   ],
  // },
  // {
  //   labelKey: "الاعدادات",
  //   icon: <FaCog />,
  //   path: "/settings",
  //   hasSubMenus: false,
  //   component: <SocialForm />,
  // },
];

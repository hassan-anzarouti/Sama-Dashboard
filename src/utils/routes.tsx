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
} from "react-icons/fa";
import { FiGrid, FiMap, FiMapPin, FiShoppingCart } from "react-icons/fi";
import Home from "../pages/home";
import RegionsPage from "../pages/regions";
import RegionForm from "../components/region/region-form";
import CitiesPage from "../pages/cities";
import CityForm from "../components/city/city-form";
import CityDetailsPage from "../components/city/city-details";

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
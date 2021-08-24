import ActivitiesListBack from '../Activities/BackOffice/ActivitiesListBack';
import Backoffice from '../Backoffice';
import CategoriesForm from '../Categories/CategoriesForm';
import CategoriesListScreen from '../Backoffice/Categories';
import Edit from '../Backoffice/Organization/Edit';
import MemberForm from '../Backoffice/MemberForm';
import MemberList from '../Backoffice/MemberList';
import NewsForm from '../News/NewsForm';
import NewsList from '../News/NewsList';
import Organization from '../Backoffice/Organization';
import SlidesForm from '../Slides/SlidesForm';
import SlidesListScreen from '../Backoffice/Slides';
import UsersForm from '../Users/UsersForm';
import UsersListScreen from '../Backoffice/Users';
import PageNotFound from '../PageNotFound/PageNotFound';

export const routes = [
  {
    path: '/backoffice',
    component: Backoffice,
    exact: true,
  },
  {
    path: '/backoffice/activities',
    component: ActivitiesListBack,
    exact: true,
  },
  {
    path: '/backoffice/categories',
    component: CategoriesListScreen,
    exact: true,
  },
  {
    path: '/backoffice/categories/create',
    component: CategoriesForm,
    exact: true,
  },
  {
    path: '/backoffice/members',
    component: MemberList,
    exact: true,
  },
  {
    path: '/backoffice/news',
    component: NewsList,
    exact: true,
  },
  {
    path: '/backoffice/news/create',
    component: NewsForm,
    exact: true,
  },
  {
    path: '/backoffice/organization',
    component: Organization,
    exact: true,
  },
  {
    path: '/backoffice/organization/edit',
    component: Edit,
    exact: true,
  },
  {
    path: '/backoffice/organization/edit/:id',
    component: MemberForm,
    exact: true,
  },
  {
    path: '/backoffice/slides',
    component: SlidesListScreen,
    exact: true,
  },
  {
    path: '/backoffice/slides/create',
    component: SlidesForm,
    exact: true,
  },
  {
    path: '/backoffice/users',
    component: UsersListScreen,
    exact: true,
  },
  {
    path: '/backoffice/users/create',
    component: UsersForm,
    exact: true,
  },
  {
    path: '*',
    component: PageNotFound,
    exact: false,
  },
];

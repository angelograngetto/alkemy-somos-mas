import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
import UsersListScreen from '../Backoffice/Users/Index';
import PageNotFound from '../PageNotFound/PageNotFound';

const BackofficeRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact component={Backoffice} path="/backoffice" />
        <Route exact component={ActivitiesListBack} path="/backoffice/activities" />
        <Route exact component={CategoriesListScreen} path="/backoffice/categories" />
        <Route exact component={CategoriesForm} path="/backoffice/categories/create" />
        <Route exact component={MemberList} path="/backoffice/members" />
        <Route exact component={NewsList} path="/backoffice/news" />
        <Route exact component={NewsForm} path="/backoffice/news/create" />
        <Route exact component={NewsForm} path="/backoffice/news/create/:id" />
        <Route exact component={Organization} path="/backoffice/organization" />
        <Route exact component={Edit} path="/backoffice/organization/edit" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit/:id" />
        <Route exact component={SlidesListScreen} path="/backoffice/slides" />
        <Route exact component={SlidesForm} path="/backoffice/slides/create" />
        <Route exact component={UsersListScreen} path="/backoffice/users" />
        <Route exact component={UsersForm} path="/backoffice/users/create" />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </>
  );
};

export default BackofficeRoutes;

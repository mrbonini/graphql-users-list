import EditUser from '../pages/EditUser';
import ListUsers from '../pages/ListUsers';

export const routes = [
  {
    path: '/',
    exact: true,
    component: ListUsers
  },
  {
    path: '/edit/:id',
    exact: true,
    component: EditUser
  }
];

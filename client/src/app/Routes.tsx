import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
import AuthCallback from 'src/pages/AuthCallback'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import Logout from 'src/pages/Logout'
import MobileBlock from 'src/pages/MobileBlock'
import { RootState } from 'src/types/redux'
import FormTest from 'src/pages/FormTest'

interface IRoute {
  path: string
  component: React.FC
  label?: string
  isPublicNav: boolean
  isPrivateNav: boolean
  isPrivateRoute: boolean
  isDesktopOnly: boolean
}

export const routes: IRoute[] = [
  // auth
  {
    path: '/logout',
    component: Logout,
    label: 'Sign out',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Sign in',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },

  // display
  {
    path: '/mobile-block',
    component: MobileBlock,
    label: 'MobileBlock',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/form-test',
    component: FormTest,
    label: 'FormTest',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/',
    component: Home,
    label: 'Home',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
]

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  const { accessToken } = useSelector((state: RootState) => state.authState)

  if (!accessToken || accessToken.length === 0) {
    return <Redirect to='/login' />
  }

  return (
    <Route
      {...rest}
      render={() => (
        <Component />
      )}
    />
  )
}

const DesktopRoute = ({ component: Component, ...rest }: IRoute) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Redirect to='/mobile-block' />
  }

  return (
    <Route
      {...rest}
      render={() => (
        <Component />
      )}
    />
  )
}

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ path, component, isPrivateRoute, isDesktopOnly, ...rest }) => isPrivateRoute
        ? <PrivateRoute
            key={path}
            path={path}
            component={component}
            isPrivateRoute={isPrivateRoute}
            isDesktopOnly={isDesktopOnly}
            {...rest}
        />
        : isDesktopOnly
          ? <DesktopRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
          />
          : <Route
              key={path}
              path={path}
              component={component}
          />
      )}
    </Switch>
  )
}

export default Routes

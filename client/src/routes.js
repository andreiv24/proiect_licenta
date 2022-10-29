import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import MainLayout from './hoc/mainLayout';
import Loader from 'utils/loader';
import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';
import RegisterLogin from './components/auth';
import Librarie from './components/librarie';
import DetaliiProdus from './components/produs';

import Dashboard from 'components/dashboard';
import AuthGuard from 'hoc/authGuard';
import InformatiiUser from 'components/dashboard/user/info';
import AdminProduse from './components/dashboard/admin/produse';
import AdminCategorii from 'components/dashboard/admin/categorii';
import AdaugareProdus from './components/dashboard/admin/produse/modificare_produse/adaugat';
import EditareProdus from './components/dashboard/admin/produse/modificare_produse/editat';
import CosCumparaturi from './components/dashboard/user/cos';
import DateDespreSite from './components/dashboard/admin/site';

import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth, userSignOut } from 'store/actions/user.actions';
import AdaugareCategorie from 'components/dashboard/admin/categorii/modificare_categorii/adaugata';
import EditareCategorie from 'components/dashboard/admin/categorii/modificare_categorii/editata';

const Routes = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])

  return (
    <BrowserRouter>
      {loading ?
        <Loader full={true} />
        :
        <>
          <Header
            users={users}
            signOutUser={signOutUser}
          />
          <MainLayout>
            <Switch>
              <Route path="/contul_meu/admin/editare_produs/:id" component={AuthGuard(EditareProdus)} />
              <Route path="/contul_meu/admin/editare_categorie/:id" component={AuthGuard(EditareCategorie)} />
              <Route path="/contul_meu/admin/adaugare_produs" component={AuthGuard(AdaugareProdus)} />
              <Route path="/contul_meu/admin/adaugare_categorie" component={AuthGuard(AdaugareCategorie)} />
              <Route path="/contul_meu/admin/contact" component={AuthGuard(DateDespreSite)} />
              <Route path="/contul_meu/admin/produse" component={AuthGuard(AdminProduse)} />
              <Route path="/contul_meu/admin/categorii" component={AuthGuard(AdminCategorii)} />
              <Route path="/contul_meu/user/cos_cumparaturi" component={AuthGuard(CosCumparaturi)} />
              <Route path="/contul_meu/user/schimbare_date" component={AuthGuard(InformatiiUser)} />
              <Route path="/contul_meu" component={AuthGuard(Dashboard)} />
              <Route path="/detalii_produs/:id" component={DetaliiProdus} />
              <Route path="/librarie" component={Librarie} />
              <Route path="/autentificare" component={RegisterLogin} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      }
    </BrowserRouter>
  );
}

export default Routes;
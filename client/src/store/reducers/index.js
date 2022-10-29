import { combineReducers } from 'redux';
import users from './users.reducer';
import produse from './produse.reducer';
import notificari from './notificare.reducer';
import categorii from './categorii.reducer';
import site from './site.reducer';


const appReducers = combineReducers({
    users,
    produse,
    notificari,
    categorii,
    site
});

export default appReducers;
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Levels from './pages/Levels';
import Level1Page from './pages/Level1Page';
import Level2Page from './pages/Level2Page';
import Level3Page from './pages/Level3Page';
import Level4Page from './pages/Level4Page';
import Level5Page from './pages/Level5Page';
import Level6Page from './pages/Level6Page';
import Level7Page from './pages/Level7Page';
import Level8Page from './pages/Level8Page';
import Level9Page from './pages/Level9Page';
import Level10Page from './pages/Level10Page';
import Level11Page from './pages/Level11Page';
import Level12Page from './pages/Level12Page';
import Level13Page from './pages/Level13Page';
import Level14Page from './pages/Level14Page';
import Level15Page from './pages/Level15Page';
import Level16Page from './pages/Level16Page';
import Level17Page from './pages/Level17Page';
import Level18Page from './pages/Level18Page';
import Level19Page from './pages/Level19Page';
import Level20Page from './pages/Level20Page';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route exact path="/category/:categoryId">
          <Levels />
        </Route>
        <Route exact path="/category/:categoryId/level/1">
          <Level1Page />
        </Route>
        <Route exact path="/category/:categoryId/level/2">
          <Level2Page />
        </Route>
        <Route exact path="/category/:categoryId/level/3">
          <Level3Page />
        </Route>
        <Route exact path="/category/:categoryId/level/4">
          <Level4Page />
        </Route>
        <Route exact path="/category/:categoryId/level/5">
          <Level5Page />
        </Route>
         <Route exact path="/category/:categoryId/level/6">
          <Level6Page />
        </Route>
        <Route exact path="/category/:categoryId/level/7">
          <Level7Page />
        </Route>
        <Route exact path="/category/:categoryId/level/8">
          <Level8Page />
        </Route>
        <Route exact path="/category/:categoryId/level/9">
          <Level9Page />
        </Route>
        <Route exact path="/category/:categoryId/level/10">
          <Level10Page />
        </Route>
        <Route exact path="/category/:categoryId/level/11">
          <Level11Page />
        </Route>
        <Route exact path="/category/:categoryId/level/12">
          <Level12Page />
        </Route>
        <Route exact path="/category/:categoryId/level/13">
          <Level13Page />
        </Route>
        <Route exact path="/category/:categoryId/level/14">
          <Level14Page />
        </Route>
        <Route exact path="/category/:categoryId/level/15">
          <Level15Page />
        </Route>
        <Route exact path="/category/:categoryId/level/16">
          <Level16Page />
        </Route>
        <Route exact path="/category/:categoryId/level/17">
          <Level17Page />
        </Route>
        <Route exact path="/category/:categoryId/level/18">
          <Level18Page />
        </Route>
        <Route exact path="/category/:categoryId/level/19">
          <Level19Page />
        </Route>
        <Route exact path="/category/:categoryId/level/20">
          <Level20Page />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

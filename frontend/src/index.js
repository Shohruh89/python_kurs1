import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {ErrorBoundary} from "./Feedback";
import {initTheme} from "./theme";
import {LoginGate} from "./auth/LoginGate";


import * as serviceWorkerRegistration from './serviceWorkerRegistration';

initTheme();

ReactDOM.render(
  <LoginGate>
    <Provider store={store}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </Provider>
  </LoginGate>,
  document.getElementById("root")
);

// Always run the service worker (even in dev) (but it only enables PWA-style precaching depending on an env variable)
serviceWorkerRegistration.register();

import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import Popup from '@pages/popup/components/Popup/Popup';
import {MemoryRouter as Router} from 'react-router-dom';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(
      <Router>
        <Popup />
      </Router>
  );
}

init();

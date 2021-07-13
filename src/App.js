import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import Navigation from './components/Navigation/Navigation';
import SavePanel from './components/SavePanel/SavePanel';
import { StoreProvider, useStore } from './store/store';
import Routes from './Routes';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as Pages from './pages';
import { CookiesProvider } from 'react-cookie';
import { observer } from 'mobx-react-lite';
function App() {
  return (
    <CookiesProvider>
      <StoreProvider>
        <BrowserRouter basename="/admin">
          <DndProvider backend={HTML5Backend}>
              <SiteContent />
          </DndProvider>
        </BrowserRouter>
      </StoreProvider>
    </CookiesProvider>
  );
}
const SiteContent = observer(() => {
  const { user } = useStore();
  if(user.load) return <Pages.Load />
  if(!user.data) return <Pages.Login />
  console.log(user.data);
  return(
    <>
      <Navigation />
      <ContentWrapper>
        <Routes />
      </ContentWrapper>
      <SavePanel />
    </>
  );
});
export default App;

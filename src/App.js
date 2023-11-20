import { RecoilRoot } from 'recoil';
import Main from './pages/Main';

import './styles/reset.css';

function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
}

export default App;

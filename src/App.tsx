import { Route, Routes, redirect } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import Layout from './components/Layout';
import SimpleFormPage from './pages/SimpleFormPage';
import ComplexFormPage from './pages/ComplexFormPage';

const App = () => (
  <StyledEngineProvider injectFirst>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SimpleFormPage />} />
        <Route path="anotherForm" element={<ComplexFormPage />} />
        <Route
          path="*"
          action={() => redirect("/")}
        />
      </Route>
    </Routes>
  </StyledEngineProvider>
)

export default App;

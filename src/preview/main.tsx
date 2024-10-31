import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CoveragePreview from './CoveragePreview';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoveragePreview />
  </StrictMode>
);
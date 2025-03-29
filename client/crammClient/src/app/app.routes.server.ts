import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  //SSR
  {
    path: '', 
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'privacy', 
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'terms', 
    renderMode: RenderMode.Prerender,
  },

  //CSR
  {
    path: '**',
    renderMode: RenderMode.Client,
  },

];

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  //SSR
  {
    path: '', 
    renderMode: RenderMode.Prerender,
  },

  //CSR
  {
    path: '**',
    renderMode: RenderMode.Client,
  },

];

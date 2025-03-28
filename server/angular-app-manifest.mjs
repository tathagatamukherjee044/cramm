
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MBIDHJD7.js",
      "chunk-LFYHW5QU.js",
      "chunk-F6RIQC3X.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/learn"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MBIDHJD7.js",
      "chunk-LFYHW5QU.js",
      "chunk-F6RIQC3X.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/learn/lm"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-CVR7OP23.js",
      "chunk-XL5K25CF.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PX637SBC.js",
      "chunk-F6RIQC3X.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/quiz"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PX637SBC.js",
      "chunk-F6RIQC3X.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/quiz/add"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJMQNAOS.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/auth"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJMQNAOS.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/auth/signup"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJMQNAOS.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-SJMQNAOS.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/auth/oauth"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-XMGDUGTE.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/main-layout"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-64LXT42H.js",
      "chunk-LFYHW5QU.js",
      "chunk-36QDKB2P.js"
    ],
    "route": "/learn-more"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 30983, hash: '8e0230b0c558dcbc19d4b10faebf42b36b108ca60e5d4cb3644494879cabad5d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 19207, hash: '43ba0f78a109c7f3eaf7fbcf84425ee5474fcfaf270b0262e3b3ab451bde2216', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 32644, hash: '562dafa8896bb63eb708d5ef237b182641b9817a9a3308192f0c78cbbe3c2896', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-4M55PNUE.css': {size: 93157, hash: 'nePCg+lzWEw', text: () => import('./assets-chunks/styles-4M55PNUE_css.mjs').then(m => m.default)}
  },
};

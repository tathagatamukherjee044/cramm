import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chipwreck.straightace',
  appName: 'straight-ace-client',
  webDir: 'dist/straight-ace-client',
  server: {
    androidScheme: 'https'
  }
};

export default config;

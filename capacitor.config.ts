import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.call.recording.app',
  appName: 'call-recording',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

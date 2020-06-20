/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { AppRegistry } from 'react-native';

import { getStorybookUI, configure } from '@storybook/react-native';

// import './rn-addons';

import './decorators';

configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  port: 7007,
  host: 'localhost',
  asyncStorage: require('@react-native-community/async-storage').default,
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;

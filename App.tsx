import React from 'react';
import {config as defaultConfig} from '@gluestack-ui/config';
import {GluestackUIProvider, createConfig} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MainNavigator from './src/navigation/MainNavigator';
import MathsCounting from './src/screens/StudentModule/MathsCounting';
import StudentHome from './src/screens/StudentModule/StudentHome';

const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    fonts: [
      'Poppins-Regular',
      'Poppins-Bold',
      'Poppins-SemiBold',
      'Poppins-Light',
      'Poppins-Medium',
      'Poppins-ExtraBold',
      'Poppins-Black',
    ],
  },
});

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          {/* <MainNavigator /> */}
          {/* <MathsCounting /> */}
          <StudentHome />
        </GluestackUIProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;

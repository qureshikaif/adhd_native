import {config as defaultConfig} from '@gluestack-ui/config';
import {GluestackUIProvider, createConfig} from '@gluestack-ui/themed';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import GrandAssessment from './src/screens/GrandAssessment';
import StudentHome from './src/screens/StudentModule/StudentHome';
import StudentActivity from './src/screens/StudentModule/StudentActivity';
import StudentCourses from './src/screens/StudentModule/StudentCourses';
// import StudentCourses from './src/screens/StudentModule/StudentCourses';
// import StudentActivity from './src/screens/StudentModule/StudentActivity';

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
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        {/* <RootTabs /> */}
        <StudentActivity />
        {/* <GrandAssessment /> */}
        {/* <AccountManagementDoctor/> */}
        {/* <DoctorMain/> */}
        {/*<PatientProfileHistory/>*/}
        {/*<RootTabs/>*/}
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;

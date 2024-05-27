import {config as defaultConfig} from '@gluestack-ui/config';
import {GluestackUIProvider, createConfig} from '@gluestack-ui/themed';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import DoctorProfile from './src/screens/Doctor/ProfileSetting';
import AdminProfile from './src/screens/Admin/AdminProfile';
import TeacherEditPersonalInfo from './src/screens/Teacher/TeacherEditPersonalInfo';

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
        {/* <PatientProfileHistory /> */}
        {/* <MainNavigator /> */}
<TeacherEditPersonalInfo/>
        {/*<RootTabs />*/}
        {/* <AdminProfile/> */}
        {/* <AccountManagementDoctor /> */}
        {/* <AccountManagementMain /> */}
        {/* <TeacherProfileSetting /> */}
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;

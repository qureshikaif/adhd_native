import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentMain from '../../../screens/StudentModule/StudentMain';
import GrandAssessment from '../../../screens/GrandAssessment';

const Stack = createNativeStackNavigator();

const StudentHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="StudentMain"
      screenOptions={{
        headerShown: false,
        statusBarColor: '#FFA360',
        statusBarStyle: 'light',
      }}>
      <Stack.Screen name="StudentMain" component={StudentMain} />
      <Stack.Screen name="GrandAssessment" component={GrandAssessment} />
    </Stack.Navigator>
  );
};

export default StudentHome;

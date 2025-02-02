import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientProfileHistory from '../../../screens/Doctor/PatientProfileHistory';
import PatientMedicalHistory from '../../../screens/Doctor/PatientMedicalHistory';

const Stack = createNativeStackNavigator();

const DoctorPatientProfile = () => {
  return (
    <Stack.Navigator
      initialRouteName="PatientProfile"
      screenOptions={{
        headerShown: false,
        statusBarColor: '#DEB5B5',
        statusBarStyle: 'light',
      }}>
      <Stack.Screen name="PatientProfile" component={PatientProfileHistory} />
      <Stack.Screen
        name="PatientMedicalHistory"
        component={PatientMedicalHistory}
      />
    </Stack.Navigator>
  );
};

export default DoctorPatientProfile;

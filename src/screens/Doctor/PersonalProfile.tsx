import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  Box,
  Center,
  Image,
  Button,
} from '@gluestack-ui/themed';
import React from 'react';
import TextBold from '../../components/atoms/Text/TextBold';
import SideScreenButton from '../../components/atoms/Buttons/SideScreenButton';
import StatusBarDoctor from '../../components/molecules/StatusBarDoctor';
import {NavigationProp, useNavigation} from '@react-navigation/native';
const TeacherPic = require('../../assets/images/icons/TeacherPic.png');
const BackgroundImage = require('../../assets/images/TeacherProfileSetting.png');
const Avatar = require('../../assets/images/avatars/login.png');
const BoxImage = require('../../assets/images/TeacherProfileSettings.png');

type NavigationType = {
  DoctorPersonalInfo: undefined;
  DoctorProfileSettings: undefined;
};

const PersonalProfile = () => {
  const navigation = useNavigation<NavigationProp<NavigationType>>();
  return (
    <View height={'$full'}>
      <ImageBackground source={BackgroundImage} minHeight={'$full'}>
        <StatusBarDoctor text="Personal Info" />
        <Box height={'$20'} />
        <ScrollView paddingHorizontal={'$4'}>
          <Center>
            <Box
              rounded={'$full'}
              overflow="hidden"
              width={100}
              height={100}
              borderWidth={2}
              borderColor="gray.200">
              <Image
                source={TeacherPic}
                alt="Teacher pic"
                style={{width: '100%', height: '100%'}}
              />
            </Box>
            <Text mt={4} fontFamily="Poppins-Regular">
              Mr ABUBAKAR
            </Text>
          </Center>
          <Box height={'$20'} />

          <Box flex={1}>
            <Box
              height={450}
              bgColor="#CDAAAA"
              justifyContent="flex-start"
              padding={20}>
              <SideScreenButton
                text="Profile info"
                onPress={() => navigation.navigate('DoctorPersonalInfo')}
              />
              <Box height={'$5'} />
              <SideScreenButton
                text="Profile Setting"
                onPress={() => navigation.navigate('DoctorProfileSettings')}
              />
              <Box height={'$16'} />

              <Box flex={1} justifyContent="center" alignItems="center">
                <Button
                  android_ripple={{color: '#DEB5B5'}}
                  hardShadow="3"
                  width={120}
                  borderColor="black"
                  bg={'#EDECD7'}
                  borderWidth={1}
                  borderRadius={20}>
                  <TextBold text="Sign Out" />
                </Button>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default PersonalProfile;

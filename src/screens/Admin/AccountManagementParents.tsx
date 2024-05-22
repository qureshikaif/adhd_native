import {ImageBackground, ScrollView, Box, VStack} from '@gluestack-ui/themed';
import React from 'react';
import ViewOrRemove from '../../components/atoms/Buttons/ViewOrRemove';
import TextSemibold from '../../components/atoms/Text/TextSemibold';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const BackgroundImage = require('../../assets/images/admin-bg-main.png');

const AccountManagementParents = () => {
  const height = useBottomTabBarHeight();
  return (
    <ImageBackground source={BackgroundImage} minHeight={'$full'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="sm">
          <TextSemibold text="View/Remove" fontSize={'$xl'} />
          {Array.from({length: 10}).map((_, index) => (
            <ViewOrRemove key={index} />
          ))}
        </VStack>
        <Box height={height * 2.5} />
      </ScrollView>
    </ImageBackground>
  );
};

export default AccountManagementParents;

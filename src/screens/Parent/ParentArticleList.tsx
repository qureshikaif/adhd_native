import {
  View,
  ImageBackground,
  ScrollView,
  Box,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import SideButton from '../../components/atoms/Buttons/SideButton';
import StatusBarParent from '../../components/molecules/StatusBarParent';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';
import {Article} from '../../types/Article';

const BackgroundImage = require('../../assets/images/parent-main-bg.png');

const ParentArticleList = () => {
  const {data: articles, isLoading} = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const {data} = await axios.get(
        'http://192.168.0.107:8080/admin/get-articles',
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading bgImage={BackgroundImage} />;
  }
  return (
    <View height={'$full'}>
      <ImageBackground source={BackgroundImage} minHeight={'$full'}>
        <StatusBarParent text="Articles" />

        <ScrollView paddingHorizontal={'$5'}>
          <Box height={'$12'} />
          <VStack space={'2xl'}>
            {articles.map((article: Article, index: number) => (
              <SideButton key={index} content={article} />
            ))}
          </VStack>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ParentArticleList;

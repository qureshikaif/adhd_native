import {
  View,
  ImageBackground,
  ScrollView,
  Box,
  Image,
  Center,
  Pressable,
  RefreshControl,
} from '@gluestack-ui/themed';
import React from 'react';
import TextBold from '../../components/atoms/Text/TextBold';
import TextRegular from '../../components/atoms/Text/TextRegular';
import MoodBoard from '../../components/molecules/MoodBoard';
import StatusBarStudent from '../../components/molecules/StatusBarStudent';
import TextSemibold from '../../components/atoms/Text/TextSemibold';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useStore} from '../../store';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';

const TipOfTheDay = require('../../assets/images/happy-kid.png');
const BackgroundImage = require('../../assets/images/stud-main-bg.png');

type NavigationType = {
  GrandAssessment: undefined;
};

const StudentMain = () => {
  const store = useStore();
  const height = useBottomTabBarHeight();
  const [currentTip, setCurrentTip] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<NavigationProp<NavigationType>>();

  const tips = [
    'Eating Bananas is a natural cure to reduce the effects of stress and anxiety.',
    'Drinking water first thing in the morning helps kick start your metabolism.',
    'Taking short breaks while studying improves focus and retention.',
    'Regular exercise can have a profoundly positive impact on depression and anxiety.',
    "Getting a good night's sleep is incredibly important for your health.",
  ];

  React.useEffect(() => {
    const getRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    };
    getRandomTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: isCompulsory,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['isCompulsory'],
    queryFn: async () => {
      const {data} = await axios.post(
        'https://adhd-coach-backend.vercel.app/student/check-compulsory',
        {
          studentId: store.user?.user.id_assigned,
        },
      );
      return data;
    },
  });

  const handleScroll = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y <= 0) {
      refetch();
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading) {
    return <Loading bgImage={BackgroundImage} />;
  }

  if (isError) {
    return (
      <ImageBackground
        source={BackgroundImage}
        h="$full"
        alignItems="center"
        justifyContent="center">
        <TextSemibold text="An error occurred while fetching data" />
      </ImageBackground>
    );
  }

  console.log(isCompulsory);

  return (
    <View height={'$full'}>
      <ImageBackground source={BackgroundImage} h={'$full'}>
        <StatusBarStudent
          text="Home"
          bgColor="#FFA360"
          textColor="black"
          isLogoutVisible
        />

        <ScrollView
          paddingHorizontal={'$5'}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Box height={'$16'} />

          <Box
            bgColor="#FFA360"
            padding={'$2.5'}
            borderRadius={'$3xl'}
            borderWidth={'$2'}>
            <TextBold
              text="TIP OF THE DAY"
              fontSize={'$2xl'}
              padding={'$1.5'}
            />
            <TextRegular text={currentTip} fontSize={'$md'} padding={'$1'} />
            <Center>
              <Image source={TipOfTheDay} alt="tip of the day" />
            </Center>
          </Box>
          <Box height={'$10'} />
          <MoodBoard />
          <Box height={'$10'} />
          <TextSemibold text={isCompulsory.message} textAlign="center" />
          <Box height={'$3'} />
          {isCompulsory.state === true && (
            <Pressable
              onPress={() => navigation.navigate('GrandAssessment')}
              bgColor="#D9981A"
              borderWidth={'$2'}
              paddingVertical={'$3'}
              rounded={'$2xl'}
              alignItems="center">
              <TextSemibold text="Grand Assessment" fontSize={'$lg'} />
            </Pressable>
          )}
          <Box height={height} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default StudentMain;

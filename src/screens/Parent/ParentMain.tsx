import {
  View,
  ImageBackground,
  ScrollView,
  Box,
  VStack,
  Button,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import TextBold from '../../components/atoms/Text/TextBold';
import TextSemibold from '../../components/atoms/Text/TextSemibold';
import {TextInput} from 'react-native';
import StatusBarParent from '../../components/molecules/StatusBarParent';
import TextRegular from '../../components/atoms/Text/TextRegular';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useQuery} from '@tanstack/react-query';
import Loading from '../Loading';
import axios from 'axios';
import {Course} from '../../types/Course';
import {capitalizeFirstLetter} from '../../helpers/capitalizeLetter';
import {useStore} from '../../store';
import Error from '../../components/molecules/popup/Error';
import Success from '../../components/molecules/popup/Success';

const BackgroundImage = require('../../assets/images/parent-main-bg.png');

const ParentMain = () => {
  const store = useStore();
  const [feedbackRating, setFeedbackRating] = useState<string>('');
  const height = useBottomTabBarHeight();
  const [error, setError] = React.useState(false);
  const refError = React.useRef(null);
  const refSuccess = React.useRef(null);
  const [success, setSuccess] = React.useState(false);

  const {data: courses, isLoading: isLoadingCourses} = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const {data} = await axios.get(
        'http://13.127.65.203:8080/admin/get-courses',
      );
      return data;
    },
  });

  const {
    data: prescriptions,
    isLoading: isLoadingPrescription,
    isError,
  } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: async () => {
      const {data} = await axios.get(
        `http://13.127.65.203:8080/parent/get-prescriptions/${store.user?.user.child_id}`,
      );
      return data;
    },
  });

  if (isLoadingCourses || isLoadingPrescription) {
    return <Loading bgImage={BackgroundImage} />;
  }

  if (isError) {
    return (
      <ImageBackground
        source={BackgroundImage}
        h="$full"
        alignItems="center"
        justifyContent="center">
        <TextSemibold text="An error occured while fetching data" />
      </ImageBackground>
    );
  }

  const handleFeedbackChange = (text: string) => {
    const rating = parseInt(text, 10);
    if (!isNaN(rating) && rating >= 0 && rating <= 5) {
      setFeedbackRating(text);
    }
  };

  const handleSubmitFeedback = async () => {
    await axios
      .post('http://13.127.65.203:8080/teacher/add-feedback', {
        feedback: feedbackRating,
        userId: store.user?.user.id,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View height={'$full'}>
      <ImageBackground source={BackgroundImage} h="$full">
        <StatusBarParent text="Home" />
        <ScrollView paddingHorizontal={'$4'}>
          <Box height={'$10'} />
          <TextSemibold text="Good Morning," fontSize={'$3xl'} />
          <TextSemibold
            fontSize={'$2xl'}
            text={capitalizeFirstLetter(
              store.user ? store.user.user.full_name : 'John Doe',
            )}
          />
          <Box height={'$8'} />
          <TextSemibold
            textAlign="center"
            text="“EDUCATION, LIKE NEUROSIS, BEGINS AT HOME”"
            fontSize={'$3xl'}
          />
          <Box height={'$8'} />

          <TextSemibold text="Courses" fontSize={'$2xl'} />
          <Box height={'$2'} />

          <VStack space={'md'}>
            {courses.map((course: Course, index: number) => (
              <Box
                key={index}
                padding={'$3'}
                backgroundColor={'#f0f0f0'}
                borderRadius={15}
                borderWidth={1}
                borderColor={'#ccc'}>
                <TextSemibold text={course.title} fontSize={'$md'} />
              </Box>
            ))}
          </VStack>

          <Box height={'$8'} />
          <TextSemibold text="Child's Prescription: " fontSize={'$2xl'} />

          <ScrollView>
            {prescriptions.map((prescription: any, index: number) => (
              <Box
                key={index}
                backgroundColor={'#f0f0f0'}
                padding={'$3'}
                mb={'$4'}
                borderRadius={15}
                borderWidth={1}
                borderColor={'#ccc'}>
                <VStack space={'md'}>
                  <TextSemibold
                    text={`Given by Dr. ${capitalizeFirstLetter(
                      prescription.doctor_name,
                    )}`}
                  />
                  <TextRegular
                    fontSize={'$md'}
                    text={prescription.prescription}
                  />
                </VStack>
              </Box>
            ))}
            {/* <Box
              height={'$40'}
              backgroundColor={'#f0f0f0'}
              padding={'$3'}
              borderRadius={15}
              borderWidth={1}
              borderColor={'#ccc'}>
              <VStack space={'md'}>
                <TextRegular
                  key={index}
                  fontSize={'$md'}
                  text={prescription.prescription}
                />
              </VStack>
            </Box> */}

            <Box height={'$8'} />
            <TextSemibold text="Feedback" fontSize={'$2xl'} />

            <TextInput
              style={{
                height: 40,
                backgroundColor: 'grey',
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
              placeholder="Enter feedback rating out of 5"
              keyboardType="numeric"
              onChangeText={handleFeedbackChange}
              value={feedbackRating}
            />
            <Box height={'$6'} />
            <Box flex={1} justifyContent="center" alignItems="center">
              <Button
                onPress={handleSubmitFeedback}
                android_ripple={{color: 'grey'}}
                hardShadow="3"
                width={120}
                borderColor="black"
                bg={'#EAC5C5'}
                borderWidth={1}
                borderRadius={10}>
                <TextBold text="Submit" />
              </Button>
            </Box>
            <Box height={height} />
          </ScrollView>
        </ScrollView>
      </ImageBackground>
      <Error
        showModal={error}
        setShowModal={setError}
        ref={refError}
        text="Error occured while submitting feedback"
      />
      <Success
        showModal={success}
        setShowModal={setSuccess}
        ref={refSuccess}
        text="Feedback added successfully"
      />
    </View>
  );
};

export default ParentMain;

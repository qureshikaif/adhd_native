import {
  View,
  ImageBackground,
  ScrollView,
  Box,
  HStack,
  ButtonSpinner,
} from '@gluestack-ui/themed';
import React from 'react';
import {TextInput} from 'react-native';
import {useState} from 'react';
import TextBold from '../../components/atoms/Text/TextBold';
import TextSemibold from '../../components/atoms/Text/TextSemibold';
import {Button} from '@gluestack-ui/themed';
import StatusBarDoctor from '../../components/molecules/StatusBarDoctor';
import TotalPatientsEnrolled from '../../components/molecules/TotalPatientsEnrolled';
import {useQuery} from '@tanstack/react-query';
import Loading from '../Loading';
import axios from 'axios';
import {useStore} from '../../store';
import Error from '../../components/molecules/popup/Error';
import Success from '../../components/molecules/popup/Success';
import {capitalizeFirstLetter} from '../../helpers/capitalizeLetter';

const BackgroundImage = require('../../assets/images/DoctorMain.png');

const DoctorMain = () => {
  const [feedbackRating, setFeedbackRating] = useState<string>('');
  const store = useStore();
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleFeedbackChange = (text: string) => {
    const rating = parseInt(text, 10);
    if (!isNaN(rating) && rating >= 0 && rating <= 5) {
      setFeedbackRating(text);
    }
  };

  const {data: count, isLoading} = useQuery({
    queryKey: ['totalStudentsEnrolled'],
    queryFn: async () => {
      const {data} = await axios.get(
        'https://adhd-coach-backend.vercel.app/student/get-number',
      );
      return data;
    },
  });

  const handleSubmitFeedback = async () => {
    if (feedbackRating === '') {
      setError(true);
      return;
    }
    setLoading(true);
    await axios
      .post('https://adhd-coach-backend.vercel.app/doctor/add-feedback', {
        feedback: feedbackRating,
        userId: store.user?.user.id,
      })
      .then(res => {
        console.log(res.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  if (isLoading) {
    return <Loading bgImage={BackgroundImage} />;
  }

  return (
    <View height={'$full'}>
      <ImageBackground source={BackgroundImage} h="$full">
        <StatusBarDoctor text="Home" />
        <Box height={'$6'} />
        <ScrollView paddingHorizontal={'$5'}>
          <TextBold text="Good Morning," fontSize={'$2xl'} />
          <TextSemibold
            text={capitalizeFirstLetter(
              store.user ? store.user.user.full_name : 'John Doe',
            )}
            fontSize={'$xl'}
          />

          <Box height={'$12'} />
          <TextBold text="Total Patients Enrolled" fontSize={'$xl'} />
          <Box height={'$2'} />
          <TotalPatientsEnrolled count={count} />
          {/* <VStack space={'md'}>
            {enrolledStudents.map((student, index) => (
              <Box
                key={index}
                padding={'$3'}
                backgroundColor={'#f0f0f0'}
                borderRadius={15} // Adjust border radius
                borderWidth={1}
                borderColor={'#ccc'}>
                <TextSemibold text={student} fontSize={'$md'} />
              </Box>
            ))}
          </VStack> */}

          <Box height={'$8'} />
          <TextBold text="Feedback" fontSize={'$xl'} />
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
          <Box height={'$4'} />
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
              <HStack>
                {loading && <ButtonSpinner color="black" />}
                <TextBold text="Submit" ml={loading ? '$2' : '$0'} />
              </HStack>
            </Button>
          </Box>
        </ScrollView>
      </ImageBackground>
      <Error
        bgColor="#EAC5C5"
        showModal={error}
        setShowModal={setError}
        text="Error occured while submitting feedback"
      />
      <Success
        bgColor="#EAC5C5"
        showModal={success}
        setShowModal={setSuccess}
        text="Feedback added successfully"
      />
    </View>
  );
};

export default DoctorMain;

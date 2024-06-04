import {
  ImageBackground,
  ScrollView,
  Box,
  HStack,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import TextSemibold from '../../components/atoms/Text/TextSemibold';
import StatusBarStudent from '../../components/molecules/StatusBarStudent';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';
import {useStore} from '../../store';
import {ButtonSpinner} from '@gluestack-ui/themed';

const BackgroundImage = require('../../assets/images/Stud-course-bg.png');

type NavigationType = {
  StudentCoursesLectures: {course: any};
};

const StudentCourses = () => {
  const navigation = useNavigation<NavigationProp<NavigationType>>();
  const [loading, setLoading] = React.useState(false);
  const store = useStore();

  const {
    data: enrolledCourses,
    isLoading: isLoadingEnrolled,
    isError: isErrorEnrolled,
  } = useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: async () => {
      const {data} = await axios.get(
        `http://192.168.0.107:8080/student/get-courses/${store.user?.user.id_assigned}`,
      );
      return data;
    },
  });

  const {
    data: courses,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const {data} = await axios.get(
        `http://192.168.0.107:8080/student/get-all-optional-courses/${store.user?.user.id_assigned}`,
      );
      return data;
    },
  });

  const {
    data: compulsoryCourses,
    isLoading: isLoadingCompulsory,
    isError: isErrorCompulsory,
  } = useQuery({
    queryKey: ['compulsoryCourses'],
    queryFn: async () => {
      const {data} = await axios.get(
        'http://192.168.0.107:8080/student/get-compulsory-courses',
      );
      return data;
    },
  });

  if (isLoadingCourses || isLoadingEnrolled || isLoadingCompulsory) {
    return <Loading bgImage={BackgroundImage} />;
  }

  if (isErrorCourses || isErrorEnrolled || isErrorCompulsory) {
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

  const handleEnroll = async (courseId: string, teacherId: string) => {
    setLoading(true);
    axios
      .post('http://192.168.0.107:8080/student/enroll', {
        studentId: store.user?.user.id_assigned,
        courseId,
        teacherId,
      })
      .then(res => {
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  console.log(JSON.stringify(compulsoryCourses, null, 2));
  console.log(JSON.stringify(enrolledCourses, null, 2));

  return (
    <ImageBackground source={BackgroundImage} h="$full">
      <Box />
      <StatusBarStudent text="Course" bgColor="#FFA360" textColor="black" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box height={'$10'} />
        <TextSemibold
          text="Compulsory Courses"
          textAlign="center"
          w="$full"
          fontSize={'$2xl'}
        />
        <Box height={'$5'} />
        {compulsoryCourses?.map((compulsoryCourse: any, index: number) => (
          <HStack px={'$4'} key={index}>
            <Pressable
              flex={1}
              onPress={() =>
                navigation.navigate('StudentCoursesLectures', {
                  course: compulsoryCourse,
                })
              }>
              <HStack
                bgColor="#FFA360"
                height={60}
                alignItems="center"
                padding={'$1'}
                justifyContent="center"
                borderRadius={'$3xl'}
                borderWidth={'$2'}>
                <TextSemibold text={compulsoryCourse.title} fontSize={'$xl'} />
              </HStack>
              <Box height={'$2'} />
            </Pressable>
          </HStack>
        ))}
        <Box height={'$10'} />

        <TextSemibold
          text="Enrolled Courses"
          textAlign="center"
          w="$full"
          fontSize={'$2xl'}
        />
        <Box height={'$5'} />
        {enrolledCourses?.map((enrolledCourse: any, index: number) => (
          <HStack px={'$4'} key={index}>
            <Pressable
              flex={1}
              onPress={() =>
                navigation.navigate('StudentCoursesLectures', {
                  course: enrolledCourse,
                })
              }>
              <HStack
                bgColor="#FFA360"
                height={60}
                alignItems="center"
                padding={'$1'}
                justifyContent="center"
                borderRadius={'$3xl'}
                borderWidth={'$2'}>
                <TextSemibold text={enrolledCourse.title} fontSize={'$xl'} />
              </HStack>
              <Box height={'$2'} />
            </Pressable>
          </HStack>
        ))}
        <Box height={'$10'} />
        <TextSemibold
          text="All Courses"
          textAlign="center"
          w="$full"
          fontSize={'$2xl'}
        />
        <Box height={'$5'} />
        {courses?.map((course: any, index: number) => (
          <VStack key={index} px={'$4'}>
            <Pressable
              flex={1}
              onPress={() =>
                navigation.navigate('StudentCoursesLectures', {course: course})
              }>
              <HStack
                bgColor="#FFA360"
                height={60}
                alignItems="center"
                padding={'$1'}
                justifyContent="center"
                borderRadius={'$3xl'}
                borderWidth={'$2'}>
                <TextSemibold text={course.title} fontSize={'$xl'} />
              </HStack>
              <Box height={'$2'} />
            </Pressable>
            <Pressable
              flex={1}
              disabled={course.is_enrolled}
              onPress={() => handleEnroll(course.id, course.teacher_id)}>
              <HStack
                bgColor="#FF9990"
                height={60}
                alignItems="center"
                padding={'$1'}
                justifyContent="center"
                borderRadius={'$3xl'}
                borderWidth={'$1'}>
                <HStack>{loading && <ButtonSpinner color="black" />}</HStack>
                <TextSemibold
                  ml={loading ? '$2' : '$0'}
                  text={course.is_enrolled ? 'Already Enrolled' : 'Enroll Now'}
                  fontSize={'$md'}
                />
              </HStack>
              <Box height={'$8'} />
            </Pressable>
          </VStack>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default StudentCourses;

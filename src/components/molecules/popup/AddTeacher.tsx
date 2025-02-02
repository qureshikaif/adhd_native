import {
  ModalFooter,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  Center,
  Image,
  VStack,
  HStack,
  Input,
  ButtonSpinner,
  Box,
} from '@gluestack-ui/themed';
import React from 'react';
import {ModalProps} from '../../../types/ModalProps';
import TextSemibold from '../../atoms/Text/TextSemibold';
import TextBold from '../../atoms/Text/TextBold';
import TextRegular from '../../atoms/Text/TextRegular';
import {InputField} from '@gluestack-ui/themed';
import axios from 'axios';
import Error from './Error';
import Success from './Success';

const AddTeacherIcon = require('../../../assets/images/add-teacher.png');

const AddTeacher = ({showModal, setShowModal, ref}: ModalProps) => {
  const [teacherId, setTeacherId] = React.useState('' as string);
  const [email, setEmail] = React.useState('' as string);
  const [loading, setLoading] = React.useState(false);

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleTeacherId = (text: string) => setTeacherId(text);
  const handleEmail = (text: string) => setEmail(text);

  const onSubmit = () => {
    setLoading(true);
    axios
      .post('https://adhd-coach-backend.vercel.app/admin/teacher', {
        teacherId,
        email,
      })
      .then(res => {
        console.log(res.data.message);
        setLoading(false);
        setShowModal(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent bgColor="#A3BACD" rounded="$2xl">
          <ModalHeader borderBottomWidth={1} borderBottomColor="#DDDDDD">
            <TextSemibold
              text="Add Teacher"
              color="white"
              fontSize="$2xl"
              w="$full"
              textAlign="center"
            />
          </ModalHeader>
          <ModalBody>
            <Center>
              <Image
                source={AddTeacherIcon}
                alt="Add Teacher Illustration"
                w={'$3/5'}
                h={'$40'}
                marginVertical={'$4'}
                resizeMode="cover"
              />
              <VStack width={'$full'}>
                <TextBold text="Teacher ID" fontSize={'$xl'} color="white" />
                <Input width={'$full'} bgColor="#D7E6ED">
                  <InputField
                    onChange={e => handleTeacherId(e.nativeEvent.text)}
                    display="flex"
                    alignContent="center"
                    type="text"
                    fontFamily="Poppins-Regular"
                    placeholder={'29019254'}
                    fontSize={'$xs'}
                    placeholderTextColor={'black'}
                  />
                </Input>
                <Box height={'$4'} />
                <TextBold text="Teacher Email" fontSize={'$xl'} color="white" />
                <Input width={'$full'} bgColor="#D7E6ED">
                  <InputField
                    onChange={e => handleEmail(e.nativeEvent.text)}
                    display="flex"
                    alignContent="center"
                    type="text"
                    fontFamily="Poppins-Regular"
                    placeholder={'teacher@adhd.com'}
                    fontSize={'$xs'}
                    placeholderTextColor={'black'}
                  />
                </Input>
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <HStack space="sm">
              <Button
                flex={1}
                bgColor="#666666"
                rounded={'$lg'}
                onPress={() => {
                  setShowModal(false);
                }}>
                <TextRegular text="Cancel" color="white" />
              </Button>
              <Button
                onPress={onSubmit}
                flex={1}
                bgColor="#648DA0"
                rounded={'$lg'}>
                <HStack>
                  {loading && <ButtonSpinner color="white" />}
                  <TextRegular
                    text="Confirm"
                    color="white"
                    ml={loading ? '$2' : '$0'}
                  />
                </HStack>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Error
        showModal={showError}
        setShowModal={setShowError}
        text="An error occured while adding teacher"
      />
      <Success
        showModal={showSuccess}
        setShowModal={setShowSuccess}
        text="Teacher added successfully"
      />
    </Center>
  );
};

export default AddTeacher;

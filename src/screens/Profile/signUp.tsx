import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {register} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import {logged} from '../../redux/actions';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import myModal from '../../component/modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SignUp = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [passErr, setPassErr] = useState('');
  const [passConErr, setPassConErr] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [contactno, setContactno] = useState('');
  const [contactErr, setContactErr] = useState('');
  const [addressErr, setAddressErr] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const USER = useSelector(({USER}) => USER);
  const {fcmtoken: fcm_token} = USER;
  const validateEmail = (emailC: String) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  // console.log(fcm_token)
  console.log('fcme', fcm_token);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 0 : top,
      }}>
      <View
        style={{
          height: 56,
          backgroundColor: 'white',
          //   elevation: 3,
          // borderBottomColor: '#ccc',
          // borderBottomWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View></View>
        <View>
          <Text
            style={{
              // marginLeft: 20,
              fontFamily: 'Boiling-BlackDemo',
              fontSize: 20,
              //   fontWeight: 'bold',
            }}>
            Baboosh
          </Text>
        </View>
        <View></View>
      </View>
      <View
        style={{
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ccc',
          // marginTop: 10,
          // marginHorizontal: 15,
          //   flexDirection: 'row',
          borderRadius: 1,
        }}></View>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'android' ? 0 : bottom,
          }}>
          <View
            style={{
              marginHorizontal: 15,
              paddingVertical: 30,
              // borderBottomWidth: 1,
              // borderBottomColor: '#ccc',
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              Your profile:
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Don't have an account yet, don't worry! Enter your details below
              to gain access to a world of luxury items
            </Text>
          </View>
          <View
            style={{
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#ccc',
              // marginTop: 10,
              marginHorizontal: 15,
              //   flexDirection: 'row',
              borderRadius: 1,
            }}></View>
          <View
            style={{
              width: wp(100),
              marginTop: hp(5),
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              Create Account:
            </Text>
            <View
              style={{
                borderRadius: 10,
                width: '100%',
                borderWidth: 1,
                borderColor: nameErr ? 'red' : '#ccc',
                marginTop: hp(10),
              }}>
              <TextInput
                placeholder="NAME:"
                placeholderTextColor={nameErr ? 'red' : '#ccc'}
                value={name}
                onChangeText={name => {
                  nameErr && setNameErr('');
                  setName(name);
                }}
                style={{
                  textAlignVertical: 'center',

                  height: 50,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
            </View>

            <View
              style={{
                borderRadius: 10,
                width: '100%',
                borderWidth: 1,
                borderColor: emailErr ? 'red' : '#ccc',
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <TextInput
                placeholder="EMAIL ADDRESS:"
                placeholderTextColor={emailErr ? 'red' : '#ccc'}
                value={email}
                onChangeText={mail => {
                  emailErr && setEmailErr('');
                  setEmail(mail);
                }}
                style={{
                  textAlignVertical: 'center',
                  fontSize: 12,
                  height: 50,
                  flex: 1,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
              {email !== '' && validateEmail(email) === true && (
                <Icon name="checkcircle" style={{color: 'black'}} size={20} />
              )}
            </View>
            <View
              style={{
                borderRadius: 10,
                width: '100%',
                borderWidth: 1,
                borderColor: passErr ? 'red' : '#ccc',
                marginTop: 20,
              }}>
              <TextInput
                placeholder="CREATE PASSWORD:"
                placeholderTextColor={emailErr ? 'red' : '#ccc'}
                value={password}
                onChangeText={pass => {
                  passErr && setPassErr('');
                  setPassword(pass);
                }}
                secureTextEntry
                style={{
                  textAlignVertical: 'center',
                  fontSize: 12,
                  height: 50,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
            </View>
            <View
              style={{
                borderRadius: 10,
                width: '100%',
                borderWidth: 1,
                borderColor: passConErr ? 'red' : '#ccc',
                marginTop: 20,
              }}>
              <TextInput
                placeholder="CONFIRM PASSWORD:"
                placeholderTextColor="#BBB"
                value={password_confirmation}
                placeholderTextColor={passConErr ? 'red' : '#ccc'}
                onChangeText={pass => {
                  passConErr && setPassConErr('');
                  setPassword_confirmation(pass);
                }}
                secureTextEntry
                style={{
                  textAlignVertical: 'center',

                  height: 50,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (
                  name &&
                  // contactno.length >= 8 &&
                  validateEmail(email) &&
                  password.length >= 6 &&
                  password_confirmation.length >= 6
                  // address
                ) {
                  if (password != password_confirmation) {
                    setPassErr('sdf');
                    setPassConErr('ds');
                  } else {
                    setShowModal(true);
                    register({
                      name,
                      email,
                      password,
                      password_confirmation,
                      // contactno,
                      // address,
                      fcm_token,
                    }).then(res => {
                      console.log(res);
                      if (res.validaterror == 0) {
                        logged(res)(dispatch);
                        setShowModal(false);
                      } else if (res.validaterror == 1) {
                        Alert.alert('Email not Avalible');
                        setShowModal(false);
                      } else {
                        Alert.alert('Something went Wrong');
                        setShowModal(false);
                      }
                    });
                  }
                } else {
                  if (
                    !name &&
                    !validateEmail(email) &&
                    // !contactno &&
                    !password.length &&
                    !password_confirmation
                    // !address
                  ) {
                    setNameErr('dasd');
                    setEmailErr('ds');
                    // setContactErr('dss');
                    setPassErr('dsd');
                    setPassConErr('dss');
                    // setAddressErr('Dds');
                  } else if (!name) {
                    setNameErr('sd');
                  } else if (password.length < 6) {
                    setPassErr('sd');
                  } else if (!validateEmail(email)) {
                    setEmailErr('ds');
                  } else if (!password) {
                    setPassErr('dsf');
                  } else if (!password_confirmation) {
                    setPassConErr('dss');
                  }
                }
              }}
              style={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black',
                marginTop: 20,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PROFILE')}>
              <Text
                style={{
                  marginTop: 10,
                  color: 'grey',
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                Already have an account?
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                  }}>
                  {' '}
                  Login
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={{height: 30}}></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {myModal(showModal)}
    </View>
  );
};
export default SignUp;

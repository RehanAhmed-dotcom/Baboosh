import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {logged} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import myModal from '../../component/modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {login} from '../../lib/api';
const PROFILE = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const validateEmail = (emailC: String) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
              // fontWeight: 'bold',
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
              Enter your login details below to access your account
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Your account will allow you to see what stage your item is at,
              contact a Baboosh advisor with any questions you may have and make
              payments for items
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
              Login:
            </Text>
            <View
              style={{
                borderRadius: 10,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'blue',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: emailErr ? 'red' : '#ccc',
                marginTop: hp(10),
                paddingHorizontal: 10,
              }}>
              <TextInput
                placeholder="EMAIL:"
                placeholderTextColor={emailErr ? 'red' : '#ccc'}
                value={email}
                onChangeText={mail => {
                  emailErr && setEmailErr('');
                  setEmail(mail);
                }}
                style={{
                  flex: 1,
                  // backgroundColor: 'red',
                  height: 50,
                  fontSize: 12,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
              {email !== '' && validateEmail(email) === true && (
                <Icon1 name="checkcircle" style={{color: 'black'}} size={20} />
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
                placeholder="PASSWORD:"
                placeholderTextColor={emailErr ? 'red' : '#ccc'}
                secureTextEntry
                value={password}
                onChangeText={pass => {
                  passErr && setPassErr('');
                  setPassword(pass);
                }}
                style={{
                  paddingHorizontal: 10,
                  fontSize: 12,
                  height: 50,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SubmitEmail')}
              style={{width: '100%', marginTop: 10}}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                FORGOTTEN YOUR PASSWORD?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (validateEmail(email) && password) {
                  setShowModal(true);
                  login({email, password}).then(res => {
                    if (res) {
                      logged(res)(dispatch);
                      setShowModal(false);
                    } else {
                      setShowModal(false);
                      Alert.alert('Wrong Email or Password');
                    }
                  });
                } else {
                  if (!validateEmail(email) && !password) {
                    setEmailErr('asd');
                    setPassErr('sdd');
                  } else if (!validateEmail(email)) {
                    setEmailErr('dsa');
                  } else if (!password) {
                    setPassErr('dfs');
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
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{width: '100%', marginTop: 10}}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                DON'T HAVE AN ACCOUNT? CREATE ONE HERE
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

export default PROFILE;

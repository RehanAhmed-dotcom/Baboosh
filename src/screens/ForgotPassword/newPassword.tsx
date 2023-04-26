import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resetPassword} from '../../lib/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const NewPassword = ({navigation, route}) => {
  const {bottom, top} = useSafeAreaInsets();
  const {email, token} = route.params;
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState('');
  const [conPassErr, setConPassErr] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
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
        <Icon
          name="arrowleft"
          size={20}
          color="black"
          onPress={() => navigation.goBack()}
        />
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
        <View style={{width: 20}}></View>
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
      <View
        style={{
          marginHorizontal: 15,
          paddingVertical: 30,
          // borderBottomWidth: 1,
          // borderBottomColor: '#ccc',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Boiling-BlackDemo',
            paddingBottom: 50,
          }}>
          New Password:
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
      <View style={{width: wp(100), alignItems: 'center'}}>
        <View
          style={{
            height: 50,
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 20,
            borderColor: passErr ? 'red' : '#ccc',
          }}>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={pass => {
              passErr && setPassErr('');
              setPassword(pass);
            }}
            placeholder="Enter New Password:"
            placeholderTextColor="#ccc"
            style={{
              fontSize: 14,
              fontFamily: 'HelveticaNeue-Medium',
              height: 50,
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 20,
            borderColor: conPassErr ? 'red' : '#ccc',
          }}>
          <TextInput
            secureTextEntry
            value={password_confirmation}
            onChangeText={pass => {
              conPassErr && setConPassErr('');
              setPassword_confirmation(pass);
            }}
            placeholder="ReEnter New Password:"
            placeholderTextColor="#ccc"
            style={{
              fontSize: 14,
              fontFamily: 'HelveticaNeue-Medium',
              height: 50,
            }}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (password.length >= 6 && password_confirmation.length >= 6) {
              if (password != password_confirmation) {
                setPassErr('sad');
                setConPassErr('sad');
              } else if (password.length < 6) {
                Alert.alert('Password must be greater then 5 characters');
              } else {
                resetPassword({
                  email,
                  token,
                  password,
                  password_confirmation,
                }).then(res => {
                  if (res.status == 'success') {
                    navigation.navigate('PROFILE');
                  } else {
                    Alert.alert('Something went wrong');
                  }
                });
              }
            } else {
              if (!password && !password_confirmation) {
                setPassErr('sdf');
                setConPassErr('sd');
              } else if (!password) {
                setPassErr('ds');
              } else if (!password_confirmation) {
                setConPassErr('sdf');
              }
            }
            // navigation.navigate('PROFILE');
            // if (validateEmail(email)) {
            //   forgotMail({email}).then(responce => {
            //     console.log('rss', responce);
            //     if (responce) {
            //       navigation.navigate('EnterCode', {email});
            //     }
            //   });
            //   //
            // } else {
            //   setEmailErr('ask');
            // }
          }}
          style={{
            height: 50,
            borderRadius: 30,
            paddingHorizontal: 30,
            marginTop: hp(10),
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            elevation: 4,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: 'HelveticaNeue-Regular',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NewPassword;

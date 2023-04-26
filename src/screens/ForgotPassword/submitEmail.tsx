import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {forgotMail} from '../../lib/api';
const SubmitEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const {bottom, top} = useSafeAreaInsets();
  const validateEmail = (emailC: String) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
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
          name={'arrowleft'}
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
          Forgot Password:
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
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <Text
          style={{
            fontSize: 12,
            fontFamily:
              Platform.OS === 'ios'
                ? 'helveticaneue-thin'
                : 'HelveticaNeue-Regular',
          }}>
          Enter your email to reset your Password
        </Text>
      </View>
      <View style={{width: wp(100), alignItems: 'center'}}>
        <View
          style={{
            height: 50,
            width: '90%',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: emailErr ? 'red' : '#ccc',
          }}>
          <TextInput
            placeholder="Enter Your Email"
            value={email}
            onChangeText={mail => {
              emailErr && setEmailErr('');
              setEmail(mail);
            }}
            style={{
              fontSize: 14,
              flex: 1,
              fontFamily: 'HelveticaNeue-Medium',
              height: 50,
            }}
          />
          {email !== '' && validateEmail(email) === true && (
            <Icon name="checkcircle" style={{color: 'black'}} size={20} />
          )}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (validateEmail(email)) {
              forgotMail({email}).then(res => {
                if (res) {
                  navigation.navigate('EnterCode', {email});
                } else {
                  Alert.alert('Something went Wrong');
                }
              });
            } else {
              setEmailErr('ask');
            }
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
              fontFamily:
                Platform.OS === 'ios'
                  ? 'helveticaneue-thin'
                  : 'HelveticaNeue-Regular',
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SubmitEmail;

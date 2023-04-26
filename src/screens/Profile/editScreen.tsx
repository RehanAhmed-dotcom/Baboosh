import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logged, update} from '../../redux/actions';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {edit} from '../../lib/api';
import ImagePicker from 'react-native-image-crop-picker';
import {notificationAlert} from '../../redux/actions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const editScreen = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [shipping_address, setShipping_address] = useState('');
  const [telephone_no, setTelephone_no] = useState('');
  const [pic, setPic] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  // console.log('pic', pic);
  const dispatch = useDispatch();
  const USER = useSelector(({USER}) => USER);
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const {fcmtoken: fcm_token} = USER;
  const validateEmail = (emailC: String) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  // console.log('fcm', fcm_token);
  const choosePic = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
    }).then(setPic);
  };
  useEffect(() => {
    setPic(user?.userdata ? {path: user.userdata.image} : null);
    setName(user?.userdata?.name);
    setEmail(user?.userdata.email);
    setPhoneno(user?.userdata.phoneno);
    setShipping_address(user?.userdata.shipping_address);
    setTelephone_no(user?.userdata?.telephone_no);
  }, []);
  // console.log('img', pic);
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        setKeyboardStatus(true);
        // setKeyHeight(e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      // setKeyHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? top : 0,
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
        <View style={{width: 40}}>
          <Icon
            name="arrowleft"
            size={20}
            onPress={() => navigation.goBack()}
          />
        </View>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Icon1
              name={'bell'}
              style={{marginRight: 10}}
              size={20}
              color="black"
              onPress={() => {
                notificationAlert(false)(dispatch);
                navigation.navigate('Notification');
              }}
            />
            {notificationSymbol ? (
              <Text
                style={{
                  bottom: 12,
                  right: 16,
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                .
              </Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <Image
              resizeMode="contain"
              source={require('../../images/Question.png')}
              style={{height: 15, width: 15}}
            />
          </TouchableOpacity>
        </View>
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
      <ScrollView>
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
              paddingBottom: 30,
            }}>
            Edit profile:
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
            // marginTop: hp(5),
            // backgroundColor: 'red',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          {!keyboardStatus && (
            <>
              <View style={{height: hp(5)}} />
              <TouchableOpacity onPress={choosePic}>
                {pic.path == null ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name={'user'} color="white" size={40} />
                  </View>
                ) : (
                  <Image
                    source={{uri: pic.path}}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                    }}
                  />
                )}
              </TouchableOpacity>

              <View style={{height: hp(5)}} />
            </>
          )}

          <View style={{height: hp(5)}} />
          <View
            style={{
              borderRadius: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: nameErr ? 'red' : '#ccc',
              // marginTop: hp(10),
            }}>
            <TextInput
              placeholder="Name:"
              placeholderTextColor={nameErr ? 'red' : '#ccc'}
              value={name}
              onChangeText={name => {
                nameErr && setNameErr('');
                setName(name);
              }}
              style={{
                height: 50,
                paddingHorizontal: 10,
                fontSize: 12,
                fontFamily: 'helveticaneue-medium',
              }}
            />
          </View>
          {/* <View
            style={{
              borderRadius: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: nameErr ? 'red' : '#ccc',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Phone no:"
              value={phoneno}
              placeholderTextColor="#C7C7CD"
              onChangeText={phone => {
                // nameErr && setNameErr('');
                setPhoneno(phone);
              }}
              style={{
                height: 50,
                paddingHorizontal: 10,
                fontSize: 12,
                flex: 1,
                color: 'black',
                fontFamily: 'helveticaneue-medium',
              }}
            />
          </View> */}
          <View
            style={{
              borderRadius: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: nameErr ? 'red' : '#ccc',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Shipping Address:"
              value={shipping_address}
              placeholderTextColor="#C7C7CD"
              onChangeText={address => {
                // nameErr && setNameErr('');
                setShipping_address(address);
              }}
              style={{
                paddingHorizontal: 10,
                height: 50,
                fontSize: 12,
                flex: 1,
                color: 'black',
                fontFamily: 'helveticaneue-medium',
              }}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: nameErr ? 'red' : '#ccc',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Telephone No (please include country dialing code):"
              value={telephone_no}
              placeholderTextColor="#C7C7CD"
              onChangeText={address => {
                // nameErr && setNameErr('');
                setTelephone_no(address);
              }}
              style={{
                paddingHorizontal: 10,
                height: 50,
                fontSize: 12,
                flex: 1,
                color: 'black',
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
              placeholder="Email Address:"
              // keyboardType="numeric"
              editable={false}
              value={email}
              onChangeText={mail => {
                emailErr && setEmailErr('');
                setEmail(mail);
              }}
              style={{
                height: 50,
                fontSize: 12,
                flex: 1,
                fontFamily: 'helveticaneue-medium',
              }}
            />
            {email !== '' && validateEmail(email) === true && (
              <Icon name="checkcircle" style={{color: 'black'}} size={20} />
            )}
          </View>
          {/* <View
            style={{
              borderRadius: 10,
              width: '100%',
              borderWidth: 1,
              borderColor: passErr ? 'red' : '#ccc',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="CREATE PASSWORD:"
              // keyboardType="numeric"
              value={password}
              onChangeText={pass => {
                passErr && setPassErr('');
                setPassword(pass);
              }}
              secureTextEntry
              style={{
                paddingHorizontal: 10,
                fontSize: 12,
                fontFamily: 'HelveticaNeue Medium',
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
              // keyboardType="numeric"
              value={password_confirmation}
              onChangeText={pass => {
                passConErr && setPassConErr('');
                setPassword_confirmation(pass);
              }}
              secureTextEntry
              style={{
                paddingHorizontal: 10,
                fontSize: 12,
                fontFamily: 'HelveticaNeue Medium',
              }}
            />
          </View> */}

          <TouchableOpacity
            onPress={() => {
              if (
                name &&
                // contactno.length >= 8 &&
                validateEmail(email)
                // password.length >= 6 &&
                // password_confirmation.length >= 6
                // address
              ) {
                const data1 = new FormData();
                data1.append('name', name);
                // phoneno && data1.append('phoneno', phoneno);
                shipping_address &&
                  data1.append('shipping_address', shipping_address);
                telephone_no && data1.append('telephone_no', telephone_no);
                pic.path != null &&
                  data1.append('image', {
                    uri: pic.path,
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                  });

                edit(
                  {
                    Auth: user?.userdata.api_token,
                  },
                  data1,
                ).then(res => {
                  console.log('res for checking null data', res);
                  if (res) {
                    navigation.navigate('TabNavigator', {screen: 'HOME'});
                    update(res)(dispatch);
                  } else {
                    Alert.alert('Something went wrong');
                  }
                  // if (res.validaterror == 0) {
                  //   logged(res)(dispatch);
                  // } else if (res.validaterror == 1) {
                  //   Alert.alert('Email not Avalible');
                  // } else {
                  //   Alert.alert('Something went Wrong');
                  // }
                });
              } else {
                // if (
                //   !name &&
                //   !validateEmail(email)
                //   // !contactno &&
                //   // !password.length &&
                //   // !password_confirmation
                //   // !address
                // ) {
                //   setNameErr('dasd');
                //   setEmailErr('ds');
                //   // setContactErr('dss');
                //   // setPassErr('dsd');
                //   // setPassConErr('dss');
                //   // setAddressErr('Dds');
                // } else if (!name) {
                //   setNameErr('sd');
                // } else if (!validateEmail(email)) {
                //   setEmailErr('ds');
                // }
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
              UPDATE ACCOUNT
            </Text>
          </TouchableOpacity>

          <View style={{height: 30}}></View>
        </View>
      </ScrollView>
    </View>
  );
};
export default editScreen;

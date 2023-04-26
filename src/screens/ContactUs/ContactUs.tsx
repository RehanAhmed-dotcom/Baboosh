import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Modal,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {messageApi} from '../../lib/api';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const ContactUs = ({navigation}) => {
  const [message, setMessage] = useState('');
  const {top, bottom} = useSafeAreaInsets();
  const [vis, setVis] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const myModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              borderRadius: 10,
              padding: 20,
              height: hp(20),
              backgroundColor: 'white',
              width: wp(90),
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontFamily: 'helveticaneue-thin', fontSize: 16}}>
                Message Sent
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // flexDirection: 'row',
                height: '80%',
                // backgroundColor: 'blue',
              }}>
              <Text></Text>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                }}
                onPress={() => setVis(!vis)}>
                <Text style={{fontSize: 14, fontFamily: 'helveticaneue-thin'}}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const whatsapp = () => {
    let url = 'whatsapp://send?text=' + '' + '&phone=44' + 7921339852;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(err => {
        console.log('err', err),
          Alert.alert('Make sure WhatsApp installed on your device');
      });
  };
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  // console.log('keyboard', keyboardStatus);
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
        <View style={{width: 35}}>
          <Icon1
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
              fontSize: 18,
              //   fontWeight: 'bold',
            }}>
            Baboosh
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'bell'}
            style={{right: 10}}
            size={20}
            color="black"
            onPress={() => navigation.navigate('Notification')}
          />
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
      {/* {keyboardStatus ? ( */}
      {/* <ScrollView>
          <View style={{height: hp('100')}}>
            <View
              style={{
                marginHorizontal: 15,
                paddingVertical: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'Boiling-BlackDemo',
                  paddingBottom: 30,
                }}>
                Contact Us
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                Contact us and our team will be in touch shortly
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View
                style={{
                  height: hp(50),
                  width: wp(90),
                  backgroundColor: 'white',
                  elevation: 3,
                  marginTop: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 14,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                  }}>
                  {' '}
                  Message Us
                </Text>
                <View
                  style={{
                    width: '90%',
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#ccc',
                    height: hp(20),
                  }}>
                  <TextInput
                    placeholder="Message here..."
                    placeholderTextColor={'#ccc'}
                    multiline
                    numberOfLines={5}
                    value={message}
                    onChangeText={mess => setMessage(mess)}
                    style={{
                      textAlignVertical: 'top',
                      paddingLeft: 10,
                      fontSize: 14,
                      fontFamily: 'HelveticaNeue-Medium',
                      flex: 1,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    messageApi({Auth: user.userdata.api_token, message}).then(
                      res => {
                        console.log('clg', res);
                        if (res) {
                          setVis(!vis);
                          setMessage('');
                        } else {
                          Alert.alert('Something went Wrong');
                        }
                      },
                    );
                  }}
                  style={{
                    width: '90%',
                    backgroundColor: 'black',
                    borderRadius: 30,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp(5),
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
          </View>
        </ScrollView> */}
      {/* ) : ( */}
      <ScrollView>
        <View
          style={
            {
              // height: hp(keyboardStatus ? '100' : '80'),
              // backgroundColor: 'red',
            }
          }>
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
              Contact Us
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Contact us and our team will be in touch shortly
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
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{alignItems: 'center', paddingVertical: 50}}>
              <TouchableOpacity
                onPress={() => {
                  whatsapp();
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icons name="whatsapp" size={40} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={{width: '90%', marginHorizontal: 15}}>
              <Text
                style={{
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                Got Whatsapp?
              </Text>
            </View>
            <View style={{width: '90%', marginTop: 10, marginHorizontal: 15}}>
              <Text
                style={{
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                {/* <TouchableOpacity
                  style={{backgroundColor: 'red'}}
                  onPress={() => whatsapp()}> */}
                <Text
                  onPress={() => whatsapp()}
                  style={{
                    fontFamily: 'Boiling-BlackDemo',
                    fontSize: 14,
                  }}>
                  Click here
                </Text>
                {/* </TouchableOpacity> */} to start a chat with one of our
                advisors
              </Text>
            </View>
            <View style={{alignItems: 'center', paddingVertical: 50}}>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:chat@sourcebaboosh.com')}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon1 name="mail" size={40} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={{width: '90%', marginHorizontal: 15}}>
              <Text
                style={{
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                If email is more your thing...
              </Text>
            </View>
            <View style={{width: '90%', marginTop: 10, marginHorizontal: 15}}>
              <Text
                style={{
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                Send an email to
                <Text
                  style={{
                    fontFamily: 'Boiling-BlackDemo',
                    fontSize: 14,
                  }}>
                  {' '}
                  chat@sourcebaboosh.com
                </Text>{' '}
                with your questions and a member of our team will reply within
                24 hours.
              </Text>
            </View>
            {/* <View style={{height: 300}} /> */}
            {/* <View
              style={{
                height: hp(50),
                width: wp(90),
                backgroundColor: 'white',
                elevation: 3,
                marginTop: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                }}>
                {' '}
                Message Us
              </Text>
              <View
                style={{
                  width: '90%',
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#ccc',
                  height: hp(20),
                }}>
                <TextInput
                  placeholder="Message here..."
                  placeholderTextColor={'#ccc'}
                  multiline
                  numberOfLines={5}
                  value={message}
                  onChangeText={mess => setMessage(mess)}
                  style={{
                    textAlignVertical: 'top',
                    paddingLeft: 10,
                    fontSize: 14,
                    fontFamily: 'HelveticaNeue-Medium',
                    flex: 1,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  messageApi({Auth: user.userdata.api_token, message}).then(
                    res => {
                      console.log('clg', res);
                      if (res) {
                        setVis(!vis);
                        setMessage('');
                      } else {
                        Alert.alert('Something went Wrong');
                      }
                    },
                  );
                }}
                style={{
                  width: '90%',
                  backgroundColor: 'black',
                  borderRadius: 30,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp(5),
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
            </View> */}
          </View>
        </View>
      </ScrollView>
      {/* )} */}

      {myModal()}
    </View>
  );
};
export default ContactUs;

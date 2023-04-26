import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {sourceApi} from '../../lib/api';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import myModal from '../../component/modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
const SOURCE = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [pic, setPic] = useState('');
  const [vis, setVis] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [brandErr, setBrandErr] = useState('');
  const [itemErr, setItemErr] = useState('');
  const [sizeErr, setSizeErr] = useState('');
  const [brand, setBrand] = useState('');
  const [item, setItem] = useState('');
  const [size, setSize] = useState('');
  const [info, setInfo] = useState('');
  const choosePic = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
    }).then(setPic);
  };
  const dispatch = useDispatch();
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);

  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const myModal1 = () => {
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
            <View style={{}}>
              <Text
                style={{
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  fontSize: 16,
                }}>
                Your request has been sent, we will be in touch soon!
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // justifyContent: 'space-between',
                // flexDirection: 'row',

                // backgroundColor: 'blue',
              }}>
              <Text></Text>
              <TouchableOpacity onPress={() => setVis(!vis)}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  console.log('auth', user.userdata.api_token);
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
        <View style={{width: 35}}></View>
        <View>
          <Text
            style={{
              fontFamily: 'Boiling-BlackDemo',
              fontSize: 20,
              // fontWeight: 'bold',
            }}>
            Baboosh
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Icon
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
          //   flexDirection: 'row',
          borderRadius: 1,
        }}></View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'padding'}
        enabled={Platform.OS === 'ios'}>
        <ScrollView style={{backgroundColor: '#fff', zIndex: 5}}>
          <View
            style={{
              marginHorizontal: 15,
              paddingVertical: 30,
              // backgroundColor: 'red',
              // borderBottomWidth: 1,
              // borderBottomColor: '#ccc',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
                Let's get sourcing
              </Text>
            </View>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              Seen something you want but don't know where to find it? Upload a
              pic below and one of our sourcing team will be in touch
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              Don't have a picture? No problem...just fill out the description
              form below with as much information as possible and we'll be in
              touch
            </Text>
          </View>
          <View
            style={{
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#ccc',
              marginHorizontal: 15,
              //   flexDirection: 'row',
              borderRadius: 1,
            }}></View>
          <View style={{alignItems: 'center', marginTop: 30}}>
            {/* <View>
            <Text style={{fontSize: 12, fontFamily: 'HelveticaNeue-Regular'}}>
              Upload your image here
            </Text>
          </View> */}
            {/* <View style={{height: 100, width: 100, marginTop: 20}}>
            <TouchableOpacity onPress={choosePic}>
              {pic ? (
                <Image
                  style={{
                    height: 100,
                    //   borderWidth: 1,
                    // borderColor: 'black',
                    borderRadius: 50,
                    width: 100,
                    // marginBottom: hp('5%'),
                  }}
                  source={{uri: pic.path}}
                />
              ) : (
                <Image
                  source={require('../../images/placeholder.png')}
                  style={{height: 100, width: 100}}
                />
              )}
            </TouchableOpacity>
          </View> */}
            <View
              style={{
                borderRadius: 10,
                width: '90%',
                paddingRight: 10,
                borderWidth: 1,
                flexDirection: 'row',
                // backgroundColor: 'red',
                alignItems: 'center',
                height: 50,
                borderColor: '#ccc',
                // marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={choosePic}
                style={{
                  // width: wp(30),
                  // width: 80,
                  //borderRadius: 8,
                  height: 25,
                  backgroundColor: '#F5F5F5',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  marginHorizontal: 10,
                  overflow: 'hidden',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Choose Files</Text>
              </TouchableOpacity>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  // overflow: 'hidden',
                  color: pic ? '#111' : '#ccc',
                  width: wp(50),
                  fontFamily: 'helveticaneue-medium',
                }}>
                {pic ? pic.path : 'No File Chosen'}
              </Text>
            </View>
            <View
              style={{
                borderRadius: 10,
                width: '90%',
                borderWidth: 1,
                borderColor: brandErr ? 'red' : '#ccc',
                marginTop: 10,
              }}>
              <TextInput
                placeholderTextColor={brandErr ? 'red' : '#ccc'}
                placeholder="Brand:"
                value={brand}
                onChangeText={text => {
                  brandErr && setBrandErr('');
                  setBrand(text);
                }}
                style={{
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
                width: '90%',
                borderWidth: 1,
                borderColor: itemErr ? 'red' : '#ccc',
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Item: (e.g. Bag, Shoes, Hat)"
                value={item}
                placeholderTextColor={itemErr ? 'red' : '#ccc'}
                onChangeText={text => {
                  itemErr && setItemErr('');
                  setItem(text);
                }}
                style={{
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
                width: '90%',
                borderWidth: 1,
                borderColor: sizeErr ? 'red' : '#ccc',
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Size: (Please State Country)"
                placeholderTextColor={sizeErr ? 'red' : '#ccc'}
                value={size}
                onChangeText={text => {
                  sizeErr && setSizeErr('');
                  setSize(text);
                }}
                style={{
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
                width: '90%',
                borderWidth: 1,
                borderColor: '#ccc',
                marginTop: 10,
              }}>
              <TextInput
                multiline
                value={info}
                onChangeText={setInfo}
                numberOfLines={4}
                placeholderTextColor={'#ccc'}
                placeholder="Any Other Information:"
                style={{
                  height: 150,
                  paddingHorizontal: 10,
                  textAlignVertical: 'top',
                  fontSize: 12,
                  fontFamily: 'helveticaneue-medium',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                // setVis(!vis)
                if (brand && item && size) {
                  setShowModal(true);
                  const data1 = new FormData();
                  {
                    pic
                      ? data1.append('image', {
                          uri: pic.path,
                          type: 'image/jpeg',
                          name: 'image' + new Date() + '.jpg',
                        })
                      : data1.append('image', {
                          uri: 'https://reactjs.org/logo-og.png',
                          type: 'image/jpeg',
                          name: 'image' + new Date() + '.jpg',
                        });
                  }
                  data1.append('brand', brand);
                  data1.append('item', item);
                  data1.append('size', size);
                  data1.append('info', info);
                  sourceApi({Auth: user?.userdata?.api_token}, data1).then(
                    res => {
                      console.log('red', res);
                      if (res) {
                        setShowModal(false);
                        setVis(!vis);
                        setPic('');
                        setBrand('');
                        setItem('');
                        setSize('');
                        setInfo('');
                      } else {
                        setShowModal(false);
                        Alert.alert('Something went Wrong');
                      }
                    },
                  );
                } else {
                  if (!brand && !item && !size) {
                    setBrandErr('ss');
                    setItemErr('dsf');
                    setSizeErr('dfs');
                  } else if (!brand) {
                    setBrandErr('ds');
                  } else if (!item) {
                    setItemErr('dfs');
                  } else if (!size) {
                    setSizeErr('dfs');
                  }
                }
              }}
              style={{
                width: '90%',
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
                SUBMIT
              </Text>
            </TouchableOpacity>
            <View style={{height: 30}}></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {myModal1()}
      {myModal(showModal)}
    </View>
  );
};

export default SOURCE;

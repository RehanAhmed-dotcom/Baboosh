import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logoutuser} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import {picsApi} from '../../lib/api';
import Video from 'react-native-video';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Splash = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [vis, setVis] = useState(false);
  const [paused, setPaused] = useState(true);
  const [pics, setPics] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
    picsApi().then(res => {
      console.log('res', res);
      setPics(res.projectdata);
    });
  }, []);
  console.log('pics', pics);
  const myModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
          setPaused(!paused);
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
              width: wp(90),
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Icon2
              onPress={() => {
                setVis(!vis);
                setPaused(!paused);
              }}
              name={'circle-with-cross'}
              // style={{top: 30, zIndex: 1}}
              size={20}
              color="white"
            />
          </View>
          <View
            style={{height: hp(50), width: wp(90), backgroundColor: 'black'}}>
            <Video
              resizeMode="contain"
              paused={paused}
              style={{
                position: 'absolute',

                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              source={require('../../images/NewVideo.mp4')}
            />
          </View>
        </View>
      </Modal>
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
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'bell'}
            style={{right: 10}}
            size={20}
            color="black"
            onPress={() => navigation.navigate('Notification')}
          />
          <Image
            resizeMode="contain"
            source={require('../../images/Question.png')}
            style={{height: 15, width: 15}}
          />
        </View> */}
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'android' ? 0 : bottom,
        }}>
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <TouchableOpacity
            onPress={() => {
              setVis(!vis);
              setPaused(!paused);
            }}
            style={{
              // borderBottomWidth: 1,
              // borderBottomColor: '#ccc',
              paddingVertical: 20,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              How it works...
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Click here to find out how to use the Baboosh app
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              // borderBottomWidth: 1,
              // borderBottomColor: '#ccc',
              paddingVertical: 10,
              // marginTop: 10,
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              Lets go!
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Click here to login or create your account now
            </Text>
          </TouchableOpacity>
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
          <View style={{marginTop: hp(7)}}>
            <Text
              style={{
                fontSize: 12,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              OUR PICKS
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 22,
                fontFamily: 'Boiling-BlackDemo',
              }}>
              What's Hot
            </Text>
          </View>
          <View>
            {pics.map((item, index) => (
              <View style={{marginTop: 15}} key={index + 'a'}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.instagram.com/sourcebaboosh/')
                  }>
                  <Image
                    source={{uri: item.image}}
                    style={{height: hp(40), width: '100%'}}
                  />
                </TouchableOpacity>
              </View>
            ))}
            {/* <Image
              source={require('../../images/first.jpg')}
              style={{height: hp(40), width: '100%'}}
            />
            <Image
              source={require('../../images/second.jpg')}
              style={{height: hp(40), width: '100%', marginTop: 15}}
            /> */}
          </View>
          <View style={{height: 15}}></View>
        </View>
      </ScrollView>
      {myModal()}
    </View>
  );
};

export default Splash;

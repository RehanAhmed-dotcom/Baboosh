import React from 'react';
import {
  View,
  Image,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ReqDetails = ({navigation, route}) => {
  const {image, brand, item, info, size} = route.params;
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? top : 0,
        backgroundColor: 'white',
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
              fontSize: 20,
              // fontWeight: 'bold',
            }}>
            Request Details
          </Text>
        </View>
        <View style={{width: 20}}></View>
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
            width: '100%',
            marginTop: 10,
            paddingHorizontal: 20,
            //   height: 30,
            alignItems: 'center',
          }}>
          <View style={{width: '100%', marginTop: hp(1), height: hp(30)}}>
            <Image
              resizeMode="contain"
              source={{uri: image}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
        <View
          style={{
            // borderBottomColor: 'red',
            // borderBottomWidth: 1,
            marginHorizontal: 10,
            // borderStyle: 'dotted',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              // paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Brand :
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              {brand}
            </Text>
          </View>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              // paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Item :
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              {item}
            </Text>
          </View>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              // paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Size :
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              {size}
            </Text>
          </View>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              // paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              {info}
            </Text>
          </View>
        </View>

        <View style={{height: 30}}></View>
      </ScrollView>
    </View>
  );
};
export default ReqDetails;

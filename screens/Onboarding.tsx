import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  image: any; // require('../assets/...') returns 'any'
  image2: any; // require('../assets/...') returns 'any'
  image3: any; // require('../assets/...') returns 'any'
  logo: any;
  title: string;
  subtitle: string;
  layoutType: 'type1' | 'type2' | 'type3';
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    image: require('../assets/onboardinIMG1.jpg'),
    image2: require('../assets/onboardinIMG1.jpg'),
    image3: require('../assets/onboardinIMG1.jpg'),
    logo: require('../assets/AfamiliaLogdddoDesign1.png'),
    title: 'A home for your family, in your pocket',
    subtitle:
      'Keep schedules, memories, and connections all in one safe place.',
    layoutType: 'type1',
  },
  {
    id: '2',
    image: require('../assets/onboardinIMG2.png'),
    image2: require('../assets/notifyimage1.jpg'),
    image3: require('../assets/notifyimage2.jpg'),
    logo: require('../assets/AfamiliaLogdddoDesign1.png'),
    title: 'No more missed moments.',
    subtitle:
      'Shared calendars, reminders, and chores so everyone stays on track',
    layoutType: 'type2',
  },
  {
    id: '3',
    image: require('../assets/onboardinIMG1.jpg'),
    image2: require('../assets/onboardinIMG1.jpg'),
    image3: require('../assets/onboardinIMG1.jpg'),
    logo: require('../assets/AfamiliaLogdddoDesign1.png'),
    title: 'Stay close, even when apart',
    subtitle:
      'Share photos, stories, and milestones privately with the people who matter most.',
    layoutType: 'type3',
  },
];

const Onboarding: React.FC = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get('window').width,
    );
    setCurrentIndex(slide);
  };

  const goNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const renderItem: ListRenderItem<OnboardingItem> = ({ item }) => {
    switch (item.layoutType) {
      case 'type1':
        return (
          <View style={styles.container1}>
            <View style={styles.skipbox}>
              <View style={styles.scrollenght} />
              <TouchableOpacity
                style={styles.skipbutton}
                onPress={() => navigation.navigate('Signin')}
              >
                <Text style={styles.skiptext}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Imagabox}>
              <Image
                source={item.image}
                style={styles.imageType1}
                resizeMode="cover"
              />
              <Image
                source={item.logo}
                style={styles.logoType1}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textbox}>
              <View style={styles.textbox2}>
                <Text style={styles.titleType1}>{item.title}</Text>
                <Text style={styles.subtitleType1}>{item.subtitle}</Text>
              </View>
            </View>
          </View>
        );
      case 'type2':
        return (
          <View style={styles.container2}>
            <View style={styles.skipbox}>
              <View style={styles.scrollenght} />
              <TouchableOpacity
                style={styles.skipbutton}
                onPress={() => navigation.navigate('Signin')}
              >
                <Text style={styles.skiptext}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Imagabox2}>
              <Image
                source={item.image}
                style={styles.imageType2}
                resizeMode="cover"
              />
            </View>
            <View style={styles.textbox2a}>
              <View style={styles.textbox2}>
                <Text style={styles.titleType1}>{item.title}</Text>
                <Text style={styles.subtitleType1}>{item.subtitle}</Text>
              </View>
            </View>
            <View style={styles.notifybox}>
              <View style={styles.notifybox2}>
                <Image
                  source={item.image2}
                  style={styles.notifyimage}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.notifytexttitle}>Lisa John</Text>
                  <Text style={styles.notifytextsubtitle}>
                    Completed her chores
                  </Text>
                </View>
              </View>
              <Text style={styles.notificationtextalart}>now</Text>
            </View>
            <View style={styles.notifybox2a}>
              <View style={styles.notifybox2aa}>
                <Image
                  source={item.image3}
                  style={styles.notifyimage}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.notifytexttitle}>Health Appointment</Text>
                  <Text style={styles.notifytextsubtitle}>
                    Reminder you have a health appointment
                  </Text>
                </View>
              </View>
              <Text style={styles.notificationtextalart}>now</Text>
            </View>
          </View>
        );
      case 'type3':
        return (
          <View style={styles.container2}>
            <View style={styles.skipbox}>
              <View style={styles.scrollenght} />
              <TouchableOpacity
                style={styles.skipbutton}
                onPress={() => navigation.navigate('Signin')}
              >
                <Text style={styles.skiptext}>Skip</Text>
              </TouchableOpacity>
            </View>

            {/**IMAGE BOX */}

            <View style={styles.imagebox1}>
              <View style={styles.toprowimage}>
                <View style={styles.imagebox2}>
                  <Image
                    source={require('../assets/imagegrid1.jpg')}
                    style={styles.imagegrid}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.imagebox3}>
                  <Image
                    source={require('../assets/imagegrid2.jpg')}
                    style={styles.imagegrid}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.bottomrowimage}>
                <View style={styles.imagebox2}>
                  <Image
                    source={require('../assets/imagegrid3.jpg')}
                    style={styles.imagegrid}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.imagebox3}>
                  <Image
                    source={require('../assets/imagegrid4.jpg')}
                    style={styles.imagegrid}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>

            {/**TEXT SECTION */}

            <View style={styles.titlebox}>
              {/* Top fading white shadow */}
              <LinearGradient
                colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,0)']}
                style={styles.topShadow}
              />
              <Text style={styles.titleType3}>{item.title}</Text>
              <Text style={styles.subtitleType3}>{item.subtitle}</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
      <View style={styles.pagination}>
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={goBack}
          style={[
            styles.pageinationbutton,
            { backgroundColor: currentIndex === 0 ? '#fff' : '#2C247A' },
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={currentIndex === 0 ? '#2C247A' : '#fff'}
          />
        </TouchableOpacity>

        {/* NEXT BUTTON OR LINK */}
        {currentIndex === onboardingData.length - 1 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Signin')}
            style={[
              styles.pageinationbutton,
              { backgroundColor: '#2C247A' }, // keep purple background
            ]}
          >
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={goNext}
            style={[styles.pageinationbutton, { backgroundColor: '#2C247A' }]}
          >
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  // ONBOARDING SCREEN 1
  container1: {
    backgroundColor: '#fff',
    paddingVertical: 48,
    paddingHorizontal: 24,
    position: 'relative',

    width: width,
  },

  skipbox: {
    width: '100%',
    height: 32,
    marginBottom: 40,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scrollenght: {
    height: 4,
    width: 80,
    backgroundColor: '#2C247A',
    borderRadius: 20,
  },

  skipbutton: {
    height: 32,
    width: 69,
    borderRadius: 8,
    borderWidth: 1,
  },

  skiptext: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 4,
  },

  Imagabox: {
    height: 450,
    width: 357,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transform: [{ rotate: '-5deg' }],
  },

  textbox: {
    height: 293,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '65%',
    left: '10%',
  },

  textbox2: {
    marginTop: 50,
  },

  // Type1
  imageType1: {
    width: 327,
    height: height * 0.45,
    borderRadius: 50,
  },
  logoType1: {
    width: 65,
    height: 64,
    position: 'absolute',
    top: 180,
    left: 120,
  },
  titleType1: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    color: '#1B1C1E',
  },
  subtitleType1: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '400',

    marginTop: 10,
  },

  // ONBOARDING SCREEN 2

  container2: {
    backgroundColor: '#fff',
    paddingVertical: 48,
    paddingHorizontal: 24,
    position: 'relative',
    flex: 0,
    alignItems: 'center',

    width: width,
  },
  Imagabox2: {
    height: 450,
    width: 338,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // Type2
  imageType2: {
    width: 327,
    height: height * 0.69,
    borderRadius: 50,
    resizeMode: 'center',
    marginTop: 200,
  },

  notifybox: {
    width: 346,
    height: 61,
    flex: 0,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '45%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.05,
    borderBlockColor: '#999999',
  },

  notifybox2: {
    width: 138,
    height: 40,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notifybox2a: {
    width: 346,
    height: 61,
    flex: 0,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '55%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.05,
    borderBlockColor: '#999999',
  },
  notifybox2aa: {
    width: 205,
    height: 40,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  notifyimage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: 8,
  },
  notificationtextalart: {
    fontSize: 8,
    color: '#999999',
    paddingRight: 8,
    height: 40,
  },
  notifytexttitle: {
    fontSize: 14,
    color: '#1B1C1E',
    marginBottom: 5,
  },
  notifytextsubtitle: {
    fontSize: 8,
    color: '#999999',
  },

  textbox2a: {
    height: 253,
    width: 335,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '75%',
    left: '10%',
  },

  titleType2: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1B1C1E',
  },
  subtitleType2: {
    fontSize: 16,
    color: '#999999',
    marginTop: 10,
    textAlign: 'center',
  },

  //ONBOARDING SCREEN 3

  imagebox1: {
    height: 500,
    width: 400,
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'column',
  },
  toprowimage: {
    height: '50%',
    width: '100%',
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
  },
  bottomrowimage: {
    height: '50%',
    width: '100%',
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
    marginTop: 10,
  },

  imagebox2: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    transform: [{ rotate: '-5deg' }],
    borderRadius: 29,

    elevation: 10,

    padding: 10,
  },
  imagebox3: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    transform: [{ rotate: '-5deg' }],
    borderRadius: 29,
    marginLeft: 10,
    elevation: 10,
    padding: 10,
  },

  imagegrid: {
    width: 185,
    height: '100%',
    borderRadius: 29,
  },

  // Type3
  imageType3: {
    width: width * 0.85,
    height: height * 0.4,
    borderRadius: 30,
    marginBottom: 20,
  },
  logoType3: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  titleType3: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1B1C1E',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  subtitleType3: {
    fontSize: 14,
    color: '#999999',
    marginHorizontal: 20,
  },

  titlebox: {
    position: 'absolute',
    top: '68%',
    left: 0,
    width: 410,
    height: 250,
    backgroundColor: '#fff',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 35, // adjust thickness
  },

  //PAGINATION

  pagination: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  pageinationbutton: {
    height: 40,
    width: 40,
    backgroundColor: '#2C247A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

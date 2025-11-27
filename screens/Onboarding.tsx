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

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  image: any; // require('../assets/...') returns 'any'
  logo: any;
  title: string;
  subtitle: string;
  layoutType: 'type1' | 'type2' | 'type3';
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    image: require('../assets/onboardinIMG1.jpg'),
    logo: require('../assets/AfamiliaLogdddoDesign1.png'),
    title: 'A home for your family, in your pocket',
    subtitle:
      'Keep schedules, memories, and connections all in one safe place.',
    layoutType: 'type1',
  },
  {
    id: '2',
    image: require('../assets/onboardinIMG2.png'),
    logo: require('../assets/AfamiliaLogdddoDesign1.png'),
    title: 'Stay connected with loved ones',
    subtitle: 'Share updates, photos, and reminders easily.',
    layoutType: 'type2',
  },
  {
    id: '3',
    image: require('../assets/onboardinIMG1.jpg'),
    logo: require('../assets/AfamiliaLogdddoDesign1.png'),
    title: 'Organize your family life',
    subtitle: 'Manage events, tasks, and memories efficiently.',
    layoutType: 'type3',
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
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
              <View style={styles.scrollenght}></View>
              <View style={styles.skipbutton}>
                <Text style={styles.skiptext}>Skip</Text>
              </View>
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
              />{' '}
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
              <View style={styles.skipbutton}>
                <Text style={styles.skiptext}>Skip</Text>
              </View>
            </View>
            <View style={styles.Imagabox2}>
              <Image
                source={item.image}
                style={styles.imageType2}
                resizeMode="cover"
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
      case 'type3':
        return (
          <View style={styles.container3}>
            <Image
              source={item.image}
              style={styles.imageType3}
              resizeMode="cover"
            />
            <Text style={styles.titleType3}>{item.title}</Text>
            <Text style={styles.subtitleType3}>{item.subtitle}</Text>
            <Image
              source={item.logo}
              style={styles.logoType3}
              resizeMode="contain"
            />
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
        <TouchableOpacity onPress={goBack} style={styles.pageinationbutton}>
          <Ionicons name="chevron-back" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goNext} style={styles.pageinationbutton}>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>
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
    backgroundColor: 'red',
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
    borderRadius: 50,
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

  titleType2: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C247A',
  },
  subtitleType2: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },

  container3: {
    backgroundColor: '#fff',
    width: width,
  },

  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  pagination: {
    position: 'absolute',
    bottom: 50,
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
    color: '#333',
    marginBottom: 10,
  },
  subtitleType3: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

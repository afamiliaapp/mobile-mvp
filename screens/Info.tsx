import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import AppContainer from '../components/AppContainer';
import AboutinfoBar from '../components/AboutInfoBar';
import BackButton from '../components/BackButton';
import ThemedText from '../components/ThemedText';

export default function Info() {
  return (
    <AppContainer>
      <View style={styles.container}>
        <AboutinfoBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container2}
        >
          <View>
            <ThemedText style={styles.abouttext}>
              About Afamilia Afamilia is the heart of home. We help families
              stay connected, organized, and thriving together no matter how
              busy, how far apart, or how diverse.
            </ThemedText>
          </View>

          <View>
            <ThemedText style={styles.abouttexttitle}>
              With Afamilia, you can
            </ThemedText>

            <ThemedText style={styles.abouttexttitle2}>
              • Keep your family calendar in sync.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • Assign chores and earn rewards.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • Share memories, stories, and recipes.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • Stay in touch with private chats and groups.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • Manage finances, budgets, and allowances.
            </ThemedText>

            <ThemedText style={styles.abouttexttitle}>
              Our mission is simple: to make family life easier, safer, and more
              joyful.
            </ThemedText>
          </View>

          <View>
            <ThemedText style={styles.abouttexttitle}>
              Version & Updates
            </ThemedText>

            <ThemedText style={styles.abouttexttitle2}>
              Current Version: v1.0.0
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              Last Updated: [Insert date]
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              Tap Check for Updates to get the latest version from the App Store
              or Google Play.
            </ThemedText>
          </View>

          <View>
            <ThemedText style={styles.abouttexttitle}>
              Licenses & Acknowledgments
            </ThemedText>

            <ThemedText style={styles.abouttext}>
              Afamilia uses trusted third-party services and open-source
              libraries to bring you a secure and reliable experience. We thank
              the developer community for their contributions. Detailed licenses
              and acknowledgments can be found here:
            </ThemedText>
          </View>
          <View>
            <ThemedText style={styles.abouttexttitle}>
              Transparency Promise
            </ThemedText>

            <ThemedText style={styles.abouttexttitle2}>
              • We never sell your data.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • Children’s accounts are always protected.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • Parents stay in full control of who sees what in their family
              space.
            </ThemedText>
            <ThemedText style={styles.abouttexttitle2}>
              • You can export or delete your data at any time.
            </ThemedText>
          </View>
          <View>
            <ThemedText style={styles.abouttexttitle}>Contact Us</ThemedText>

            <ThemedText>
              Have questions or ideas? We’d love to hear from you
            </ThemedText>

            <View style={styles.aboutcontactsbox}>
              <Image
                source={require('../assets/email.png')}
                style={styles.worldwideimg}
              />
              <ThemedText>Website: www.afamilia.app</ThemedText>
            </View>

            <View style={styles.aboutcontactsbox}>
              <Image
                source={require('../assets/worldwide.png')}
                style={styles.worldwideimg}
              />
              <ThemedText>Website: www.afamilia.app</ThemedText>
            </View>
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    height: '100%',
  },

  container2: {},

  abouttext: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
  },

  abouttexttitle: {
    marginVertical: 20,
    fontSize: 14,
  },

  abouttexttitle2: {
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 10,
  },

  aboutcontactsbox: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  worldwideimg: {
    height: 24,
    width: 24,
    marginRight: 9,
    marginVertical: 6,
  },
});

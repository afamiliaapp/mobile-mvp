import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import FamilyManagementBar from '../components/FamilyManagementBar';

import MemberList from '../components/MemberList';
import AppContainer from '../components/AppContainer';
import ThemedText from '../components/ThemedText';
import ThemedTextInput from '../components/ThemedTextInput';
import BackButton from '../components/BackButton';

export default function Family() {
  return (
    <AppContainer>
      <View style={styles.container}>
        <FamilyManagementBar />

        <BackButton />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 100 }}
        >
          <View style={styles.famname}>
            <ThemedText style={styles.famnametxt}>
              Family Circle name
            </ThemedText>
            <ThemedTextInput style={styles.input} placeholder="Enter text" />
          </View>

          <MemberList />
        </ScrollView>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,

    height: '100%',
  },

  famname: {},
  famnametxt: {
    fontSize: 12,
    fontWeight: 500,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,

    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
});

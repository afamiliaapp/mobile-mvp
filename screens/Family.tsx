import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import FamilyManagementBar from '../components/FamilyManagementBar';
import BackButton from '../components/BackButton';
import MemberList from '../components/MemberList';
import AppContainer from '../components/AppContainer';
import ThemedText from '../components/ThemedText';
import ThemedTextInput from '../components/ThemedTextInput';

export default function Family() {
  return (
    <AppContainer>
      <View style={styles.container}>
        <FamilyManagementBar />
        <BackButton />

        <View style={styles.famname}>
          <ThemedText style={styles.famnametxt}>Family Circle name</ThemedText>
          <ThemedTextInput style={styles.input} placeholder="Enter text" />
        </View>

        <MemberList />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },

  famname: {
    marginTop: 40,
  },
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

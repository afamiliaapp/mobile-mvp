import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import FamilyManagementBar from '../components/FamilyManagementBar';
import BackButton from '../components/BackButton';
import MemberList from '../components/MemberList';

export default function Family() {
  return (
    <View style={styles.container}>
      <FamilyManagementBar />
      <BackButton />

      <View style={styles.famname}>
        <Text style={styles.famnametxt}>Family Circle name</Text>
        <TextInput style={styles.input} placeholder="Enter text" />
      </View>

      <MemberList />
    </View>
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
    color: '#6C7278',
    fontSize: 12,
    fontWeight: 500,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
});

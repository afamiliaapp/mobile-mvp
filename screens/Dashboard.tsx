import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'blue', height: '100%' },
});

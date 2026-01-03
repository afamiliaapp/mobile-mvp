import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function FamilyManagementBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.continer}>
      <View>
        <Text style={styles.title}>Family Management</Text>
      </View>

      <View style={styles.belliconbox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notificationpage')}
        >
          <Image
            source={require('../assets/notificationbell.png')}
            style={styles.bellicon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    height: 42,

    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1B1C1E',
  },

  belliconbox: {
    height: 32,
    width: 32,
    borderColor: '#E2E8F9',
    borderRadius: 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  bellicon: {
    height: 18,
    width: 18,
  },
});

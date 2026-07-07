import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordInput = ({ label = 'Password', onChange }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const checkStrength = text => {
    setPassword(text);
    onChange && onChange(text);

    let score = 0;

    if (text.length > 0) score = 20; // Weak
    if (text.length >= 6) score = 40;
    if (/[A-Z]/.test(text)) score = 60; // Strong
    if (/[0-9]/.test(text)) score = 80; // Very strong
    if (/[^A-Za-z0-9]/.test(text)) score = 100; // Very strong+

    setStrength(score);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ marginBottom: 6, fontSize: 14, fontWeight: '500' }}>
        {label}
      </Text>

      <View
        style={{
          height: 46,
          borderWidth: 1,
          borderColor: '#E2E8F9',
          borderRadius: 10,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          style={{ flex: 1 }}
          value={password}
          onChangeText={text => checkStrength(text)}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Strength Bar */}
      <View
        style={{
          height: 6,
          backgroundColor: '#E5E7EB',
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View
          style={{
            height: 6,
            width: `${strength}%`,
            borderRadius: 10,
            backgroundColor:
              strength <= 20 ? 'red' : strength <= 60 ? 'yellow' : 'green',
          }}
        />
      </View>

      {/* Strength Label */}
      <Text
        style={{
          marginTop: 4,
          fontSize: 12,
          fontWeight: '600',
          textAlign: 'right',
          color: strength <= 20 ? 'red' : strength <= 60 ? 'gold' : 'green',
        }}
      >
        {strength <= 20 ? 'Weak' : strength <= 60 ? 'Strong' : 'Very Strong'}
      </Text>
    </View>
  );
};

export default PasswordInput;

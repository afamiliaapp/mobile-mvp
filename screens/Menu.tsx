import React, { useRef, useEffect } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../context/Menucontex';

const { width, height } = Dimensions.get('window');

const CIRCLE_SIZE = 64;
const CX = width / 2;
const CY = height / 2;

const ITEMS = [
  { id: 'photos', label: 'Photos', icon: 'image', route: 'Photos' },
  {
    id: 'child-control',
    label: 'Child Control',
    icon: 'shield',
    route: 'ChildControl',
  },
  { id: 'expenses', label: 'Expenses', icon: 'credit-card', route: 'Expenses' },
  {
    id: 'meal-planner',
    label: 'Meal Planner',
    icon: 'coffee',
    route: 'MealPlanner',
  },
  { id: 'chores', label: 'Chores', icon: 'check-square', route: 'Chores' },
];

const OFFSETS = [
  { x: -30, y: -160 }, // Photos
  { x: 130, y: -110 }, // Child Control
  { x: -160, y: -50 }, // Expenses
  { x: 130, y: 20 }, // Meal Planner
  { x: -160, y: 80 }, // Chores
];

export default function Menu() {
  const { menuOpen, closeMenu } = useMenu();
  const navigation = useNavigation();

  const backdropAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef(ITEMS.map(() => new Animated.Value(0))).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (menuOpen) {
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.parallel(
        itemAnims.map((anim, i) =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
            delay: i * 70,
          }),
        ),
      ).start();
      Animated.spring(rotateAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }).start();
    } else {
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      itemAnims.forEach(a => a.setValue(0));
      rotateAnim.setValue(0);
    }
  }, [menuOpen]);

  const handleItemPress = (route: string) => {
    closeMenu();
    setTimeout(() => navigation.navigate(route as never), 100);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  if (!menuOpen) return null;

  return (
    <View style={styles.root} pointerEvents="box-none">
      {/* BACKDROP */}
      <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
      </Animated.View>

      {/* MENU ITEMS */}
      {ITEMS.map((item, i) => {
        const off = OFFSETS[i];
        const anim = itemAnims[i];
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.itemWrapper,
              {
                left: CX + off.x - CIRCLE_SIZE / 2,
                top: CY + off.y - CIRCLE_SIZE / 2 - 30,
              },
              {
                opacity: anim,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [15, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Pressable
              style={({ pressed }) => [
                styles.itemCircle,
                pressed && styles.itemCirclePressed,
              ]}
              onPress={() => handleItemPress(item.route)}
            >
              <Icon name={item.icon} size={22} color="#2C247A" />
            </Pressable>
          </Animated.View>
        );
      })}

      {/* CLOSE BUTTON */}
      <Animated.View
        style={[
          styles.closeWrapper,
          { left: CX - CIRCLE_SIZE / 2, top: CY - CIRCLE_SIZE / 2 },
          { transform: [{ rotate }, { scale: backdropAnim }] },
        ]}
      >
        <Pressable style={styles.closeBtn} onPress={closeMenu}>
          <Icon name="x" size={20} color="#555" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  itemWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: CIRCLE_SIZE,
  },
  itemLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1B1C1E',
    textAlign: 'center',
    marginBottom: 6,
  },
  itemCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E2E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemCirclePressed: {
    backgroundColor: '#F0EEFF',
    borderColor: '#2C247A',
  },
  closeWrapper: {
    position: 'absolute',
  },
  closeBtn: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E2E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

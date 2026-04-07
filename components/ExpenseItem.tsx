'use client';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ExpenseItemProps {
  title: string;
  amount: number;
  paidBy: string;
  time: string;
  date: string;
  category: string;
  onViewDetails?: () => void;
}

const ExpenseItem = ({
  title = 'Groceries at market',
  amount = 5000,
  paidBy = 'Mom',
  time = '04:00 PM',
  date = '29 Feb 2025',
  category = 'Grocies',
  onViewDetails,
}: ExpenseItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subTitle}>
          ₦{amount.toLocaleString()} by {paidBy}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{time}</Text>
          <View style={styles.divider} />
          <Text style={styles.metaText}>{date}</Text>
          <View style={styles.divider} />
          <Text style={[styles.metaText, styles.categoryText]}>{category}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={onViewDetails}
        activeOpacity={0.7}
      >
        <Text style={styles.viewButtonText}>View</Text>
        <Icon name="chevron-right" size={20} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  leftContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 8,
  },
  categoryText: {
    color: '#FFB800', // Matches the orange/yellow in your screenshot
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#1C1C1E',
    marginRight: 4,
  },
});

export default ExpenseItem;

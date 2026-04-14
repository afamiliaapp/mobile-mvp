'use client';
import React, { useState, useMemo } from 'react'; // Added useMemo
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput, // Added TextInput
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import AddBudgetModal from '../components/AddBudgetModal';
import { useBudgets } from '../context/BudgetContext';

const { width } = Dimensions.get('window');

// ── Types ─────────────────────────────────────────────────────────────────────
type BudgetItem = {
  id: string;
  name: string;
  spend: number;
  remaining: number;
  total: number;
  usedPercent: number;
};

type Props = {
  budgets?: BudgetItem[];
  onNewBudget?: () => void;
  onEditBudget?: (item: BudgetItem) => void; // ← parent opens modal pre-filled
  onUpdateBudget?: (updatedItem: BudgetItem) => void;
  onViewBudget?: (id: string) => void;
};

// ── Multi-Slice Donut Chart ──────────────────────────────────────────────────
const DonutChart = ({
  budgets,
  total,
}: {
  budgets: BudgetItem[];
  total: number;
}) => {
  const size = 180;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const colors = ['#2C247A', '#4F46E5', '#94A3B8', '#C5CAE9', '#6366F1'];

  let currentOffset = 0;

  return (
    <View style={donutStyles.wrapper}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F2F2F7"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {budgets.map((item, index) => {
          const slicePercentage = total > 0 ? item.total / total : 0;
          const strokeDash = circumference * slicePercentage;
          const offset = circumference * currentOffset;
          currentOffset += slicePercentage;

          return (
            <Circle
              key={item.id}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors[index % colors.length]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          );
        })}
      </Svg>
      <View style={donutStyles.center as any}>
        <Text style={donutStyles.label}>Total budget</Text>
        <Text style={donutStyles.amount}>₦{total.toLocaleString()}</Text>
      </View>
    </View>
  );
};

// ── Stat Item ─────────────────────────────────────────────────────────────────
const StatItem = ({ label, percent, borderLeft }: any) => (
  <View style={[statStyles.item, borderLeft && statStyles.borderLeft]}>
    <Text style={statStyles.label} numberOfLines={1}>
      {label}
    </Text>
    <View style={statStyles.row}>
      <Text style={statStyles.value}>{percent}</Text>
      <Text style={statStyles.unit}> %</Text>
    </View>
  </View>
);

// ── Budget Card ───────────────────────────────────────────────────────────────
const BudgetCard = ({ item, onView }: any) => (
  <View style={cardStyles.card}>
    <View style={cardStyles.headerRow}>
      <Text style={cardStyles.name}>{item.name}</Text>
    </View>
    <View style={cardStyles.row}>
      <Text style={cardStyles.metaText}>
        Spend: ₦{item.spend.toLocaleString()}
      </Text>
      <View style={cardStyles.rightRow}>
        <Text style={cardStyles.metaText}>
          Rem: ₦{item.remaining.toLocaleString()}
        </Text>
        <TouchableOpacity style={cardStyles.viewBtn} onPress={onView}>
          <Text style={cardStyles.viewBtnText}>View</Text>
          <Icon name="chevron-right" size={13} color="#2C247A" />
        </TouchableOpacity>
      </View>
    </View>
    <View style={cardStyles.progressTrack}>
      <View
        style={[cardStyles.progressFill, { width: `${item.usedPercent}%` }]}
      />
    </View>
    <View style={cardStyles.row}>
      <Text style={cardStyles.footerText}>{item.usedPercent}% used</Text>
      <Text style={cardStyles.footerText}>
        of ₦{item.total.toLocaleString()}
      </Text>
    </View>
  </View>
);

// ── Main Dashboard Component ──────────────────────────────────────────────────
const BudgetDashboard = ({
  onViewBudget,
}: {
  onViewBudget: (id: string) => void;
}) => {
  // Pull from the global source
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);

  const { budgets, addBudget, updateBudget } = useBudgets();

  const totalBudget = budgets.reduce((sum, item) => sum + item.total, 0);
  const sortedBudgets = [...budgets].sort((a, b) => b.total - a.total);
  const topBudget = sortedBudgets[0];
  const secondBudget = sortedBudgets[1];

  const filteredBudgets = useMemo(() => {
    return budgets.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [budgets, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const getShare = (amount: number) =>
    totalBudget > 0 ? Math.round((amount / totalBudget) * 100) : 0;

  const handleNewPress = () => {
    setEditingItem(null);
    setModalVisible(true);
  };
  const handleEditPress = (item: BudgetItem) => {
    setEditingItem(item);
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <DonutChart budgets={budgets} total={totalBudget} />
        <View style={styles.statsRow}>
          <StatItem
            label={topBudget ? topBudget.name : 'Primary Budget'}
            percent={getShare(topBudget?.total || 0)}
          />
          <StatItem
            label={secondBudget ? secondBudget.name : 'Other Budgets'}
            percent={getShare(secondBudget?.total || 0)}
            borderLeft
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.sectionHeader}>
          {isSearching ? (
            <View style={styles.searchContainer}>
              <Icon name="search" size={16} color="#8E8E93" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search budgets..."
                placeholderTextColor="#8E8E93" // Match your icon color
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                returnKeyType="search"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={clearSearch}>
                <Icon name="x-circle" size={18} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Budgets</Text>
              <TouchableOpacity
                onPress={() => setIsSearching(true)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Easier to tap
              >
                <Icon name="search" size={18} color="#8E8E93" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.cardList}>
          {filteredBudgets.length > 0 ? (
            filteredBudgets.map(item => (
              <BudgetCard
                key={item.id}
                item={item}
                onView={() => onViewBudget?.(item.id)}
                onEdit={() => handleEditPress(item)}
              />
            ))
          ) : (
            <Text style={styles.emptySearchText}>
              No budgets found matching "{searchQuery}"
            </Text>
          )}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewPress}
        activeOpacity={0.85}
      >
        <Icon name="plus" size={16} color="#000" style={{ marginRight: 6 }} />
        <Text style={styles.fabText}>New budget</Text>
      </TouchableOpacity>

      <AddBudgetModal
        isVisible={modalVisible}
        initialData={
          editingItem
            ? { name: editingItem.name, total: editingItem.total }
            : null
        }
        onClose={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
        onSave={(name, amount) => {
          if (!name) return;
          if (editingItem) {
            const remaining = amount - editingItem.spend;
            const usedPercent =
              amount > 0 ? Math.round((editingItem.spend / amount) * 100) : 0;
            updateBudget({
              ...editingItem,
              name,
              total: amount,
              remaining,
              usedPercent,
            });
          } else {
            addBudget({
              name,
              total: amount,
              spend: 0,
              remaining: amount,
              usedPercent: 0,
            });
          }
          setModalVisible(false);
          setEditingItem(null);
        }}
      />
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const donutStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    position: 'relative',
  },
  center: { position: 'absolute', alignItems: 'center' },
  label: { fontSize: 11, color: '#8E8E93', marginBottom: 2 },
  amount: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
});

const statStyles = StyleSheet.create({
  item: { flex: 1, paddingHorizontal: 16, paddingVertical: 8 },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#E5E5EA' },
  label: { fontSize: 12, color: '#8E8E93', marginBottom: 4, fontWeight: '500' },
  row: { flexDirection: 'row', alignItems: 'baseline' },
  value: { fontSize: 26, fontWeight: '700', color: '#1C1C1E' },
  unit: { fontSize: 14, color: '#1C1C1E', fontWeight: '500' },
});

const cardStyles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: '700', color: '#1C1C1E' },
  editBtn: { padding: 4 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { fontSize: 12, color: '#8E8E93' },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 2,
  },
  viewBtnText: { fontSize: 12, color: '#2C247A', fontWeight: '600' },
  progressTrack: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#2C247A', borderRadius: 2 },
  footerText: { fontSize: 11, color: '#8E8E93' },
});

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: '10%' },
  scrollContent: { paddingBottom: 20 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  divider: { height: 8, backgroundColor: '#F2F2F7', marginBottom: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    minHeight: 40, // Ensure height doesn't jump when switching to search
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1C1C1E' },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1C1C1E',
    paddingVertical: 0, // Fix for Android vertical centering
  },
  emptySearchText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 20,
    fontSize: 14,
  },
  cardList: { paddingHorizontal: 16 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  fabText: { color: '#000', fontSize: 15, fontWeight: '600' },
});

export default BudgetDashboard;

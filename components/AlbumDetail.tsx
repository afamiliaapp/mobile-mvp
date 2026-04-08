import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PhotosBar from './PhotosBar';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 3;

type PhotoItem = {
  id: string;
  uri: string;
};

type Props = {
  albumName?: string;
  photos?: PhotoItem[];
  onBack?: () => void;
  onEdit?: () => void;
  onDeleteAlbum?: () => void;
  onDownloadSelected?: (ids: string[]) => void;
  onDeleteSelected?: (ids: string[]) => void;
};

const AlbumDetail = ({
  albumName = 'Album',
  photos = [],
  onBack,

  onEdit,
  onDeleteAlbum,
  onDownloadSelected,
  onDeleteSelected,
}: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected = selectedIds.length === photos.length && photos.length > 0;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(photos.map(p => p.id));
    }
  };

  const renderPhoto = ({ item }: { item: PhotoItem }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => toggleSelect(item.id)}
        style={styles.photoWrapper}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.photo}
          resizeMode="cover"
        />
        {/* Checkbox overlay */}
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Icon name="check" size={10} color="#fff" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PhotosBar />
      <View>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Icon name="chevron-left" size={24} style={{ color: '#1C1C1E' }} />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.albumTitle}>{albumName}</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
            <Icon name="edit-2" size={18} color="#1C1C1E" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteAlbum} style={styles.iconBtn}>
            <Icon name="trash-2" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Selection Bar */}
      <View style={styles.selectionBar}>
        <TouchableOpacity onPress={toggleSelectAll}>
          <Text style={styles.selectionText}>
            {allSelected
              ? `All selected(${photos.length})`
              : selectedIds.length > 0
              ? `${selectedIds.length} selected`
              : 'Select all'}
          </Text>
        </TouchableOpacity>
        <View style={styles.selectionActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => onDownloadSelected?.(selectedIds)}
            disabled={selectedIds.length === 0}
          >
            <Icon
              name="download"
              size={18}
              color={selectedIds.length > 0 ? '#1C1C1E' : '#C7C7CC'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => onDeleteSelected?.(selectedIds)}
            disabled={selectedIds.length === 0}
          >
            <Icon
              name="trash-2"
              size={18}
              color={selectedIds.length > 0 ? '#FF3B30' : '#C7C7CC'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Photo Grid */}
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        renderItem={renderPhoto}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="image" size={40} color="#C7C7CC" />
            <Text style={styles.emptyText}>No photos in this album</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // Soft shadow for depth
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    marginVertical: '5%',
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  selectionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  selectionActions: {
    flexDirection: 'row',
    gap: 12,
  },
  grid: {
    padding: 12,
    gap: 6,
  },
  row: {
    gap: 6,
    marginBottom: 6,
  },
  photoWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  checkbox: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#2C247A',
    borderColor: '#2C247A',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

export default AlbumDetail;

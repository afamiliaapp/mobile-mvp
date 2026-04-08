import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (album: string, fileUri: string, fileName: string) => void;
};

const AddPhotoModal = ({ isVisible, onClose, onSave }: Props) => {
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [fileName, setFileName] = useState('receipt.png');
  const [fileUri, setFileUri] = useState('');

  const albums = ['Family', 'Work', 'Receipts', 'Other'];

  const handleUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel || response.errorCode) return;
      const asset = response.assets?.[0];
      if (asset) {
        setFileUri(asset.uri ?? '');
        setFileName(
          asset.fileName ?? asset.uri?.split('/').pop() ?? 'photo.png',
        );
      }
    });
  };

  const handleSave = () => {
    if (!selectedAlbum) {
      alert('Please select an album.');
      return;
    }
    if (!fileUri) {
      alert('Please upload a photo.');
      return;
    }
    onSave(selectedAlbum, fileUri, fileName);
    handleClose();
  };

  const handleClose = () => {
    setSelectedAlbum('');
    setFileName('receipt.png');
    setFileUri('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>
          <View style={styles.handle} />

          <Text style={styles.title}>Add upload</Text>

          {/* Album Picker */}
          <Text style={styles.label}>Album</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedAlbum}
              onValueChange={val => setSelectedAlbum(val)}
              style={styles.picker}
              dropdownIconColor="#8E8E93"
            >
              <Picker.Item label="Select album" value="" color="#8E8E93" />
              {albums.map(album => (
                <Picker.Item key={album} label={album} value={album} />
              ))}
            </Picker>
          </View>

          {/* Photo Upload */}
          <Text style={[styles.label, { marginTop: 20 }]}>Photo</Text>
          <View style={styles.fileRow}>
            <Icon
              name="image"
              size={16}
              color="#8E8E93"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.fileName} numberOfLines={1}>
              {fileName}
            </Text>
            <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 28,
  },
  label: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E8E8FF',
    borderRadius: 12,
    backgroundColor: '#F9FAFF',
    overflow: 'hidden',
  },
  picker: {
    height: 52,
    color: '#1C1C1E',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8FF',
    borderRadius: 12,
    backgroundColor: '#F9FAFF',
    paddingHorizontal: 14,
    height: 52,
  },
  fileName: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#fff',
  },
  uploadBtnText: {
    fontSize: 13,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#2C247A',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddPhotoModal;

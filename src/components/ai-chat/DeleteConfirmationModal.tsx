import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from "@/src/components/ui/Button";
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, View } from 'react-native';

type DeleteConfirmationModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionTitle: string;
};

export function DeleteConfirmationModal({ 
  visible, 
  onClose, 
  onConfirm, 
  sessionTitle 
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/55 justify-center items-center" onPress={onClose}>
        <View className="bg-surface-screen rounded-card px-4 py-4 w-5/6 border border-border shadow-card">
          <View className="flex-row justify-between items-center mb-6">
            <AppText variant="subtitle" className="font-semibold">
              Delete Conversation
            </AppText>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={20} hitSlop={10} color={AppTheme.colors.text.muted} />
            </Pressable>
          </View>
          
          <AppText>
            Are you sure you want to delete "{sessionTitle}"?
          </AppText>
          <AppText variant="small" className="mt-2 opacity-70">
            This action cannot be undone.
          </AppText>

          <View className="flex-row gap-3 mt-8">
            <Button onPress={onClose} variant="ghost" className="flex-1">
              Cancel
            </Button>
            <Button onPress={handleConfirm} variant="primary" className="flex-1">
              Delete
            </Button>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

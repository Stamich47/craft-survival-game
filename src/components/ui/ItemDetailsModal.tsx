import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Item } from "../../types/game";
import { SPRITE_MAPPING, WEAPON_SPRITE_MAPPING } from "../../assets";

interface ItemDetailsModalProps {
  visible: boolean;
  item: Item | null;
  quantity: number;
  onClose: () => void;
  onDrop: (itemId: string) => void;
  onConsume?: (itemId: string) => void;
}

const { width } = Dimensions.get("window");

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  visible,
  item,
  quantity,
  onClose,
  onDrop,
  onConsume,
}) => {
  if (!item) return null;

  const getSpriteSource = () => {
    // Check for weapon sprites first
    if (WEAPON_SPRITE_MAPPING[item.id as keyof typeof WEAPON_SPRITE_MAPPING]) {
      return WEAPON_SPRITE_MAPPING[
        item.id as keyof typeof WEAPON_SPRITE_MAPPING
      ];
    }
    // Return the item's icon directly (it's already an ImageSourcePropType)
    if (item.icon) {
      return item.icon;
    }
    // Fallback to wood sprite if no icon
    return SPRITE_MAPPING.wood;
  };

  const handleDrop = () => {
    Alert.alert(
      "Drop Item",
      `Are you sure you want to drop ${quantity > 1 ? `${quantity}x ` : ""}${
        item.name
      }?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Drop",
          style: "destructive",
          onPress: () => {
            onDrop(item.id);
            onClose();
          },
        },
      ]
    );
  };

  const handleConsume = () => {
    if (onConsume) {
      onConsume(item.id);
      onClose();
    }
  };

  const isConsumable =
    item.type === "FOOD" || item.type === "DRINK" || item.type === "CONSUMABLE";
  const isWeapon = item.type === "WEAPON" || item.type === "TOOL";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Item Sprite */}
          <View style={styles.spriteContainer}>
            <Image source={getSpriteSource()} style={styles.itemSprite} />
            {quantity > 1 && (
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
            )}
          </View>

          {/* Item Description */}
          <Text style={styles.description}>{item.description}</Text>

          {/* Item Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Type:</Text>
              <Text style={styles.statValue}>{item.type}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Rarity:</Text>
              <Text
                style={[
                  styles.statValue,
                  { color: getRarityColor(item.rarity) },
                ]}
              >
                {item.rarity}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Value:</Text>
              <Text style={styles.statValue}>{item.value} coins</Text>
            </View>
            {item.stackable && (
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Max Stack:</Text>
                <Text style={styles.statValue}>{item.maxStack}</Text>
              </View>
            )}

            {/* Weapon Stats */}
            {isWeapon && item.stats && (
              <>
                {item.stats.damage && (
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Damage:</Text>
                    <Text style={styles.statValue}>{item.stats.damage}</Text>
                  </View>
                )}
                {item.stats.durability && (
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Durability:</Text>
                    <Text style={styles.statValue}>
                      {item.stats.durability}
                    </Text>
                  </View>
                )}
              </>
            )}

            {/* Consumable Effects */}
            {isConsumable && item.effects && (
              <>
                {item.effects.hunger && (
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Hunger:</Text>
                    <Text style={[styles.statValue, styles.positiveEffect]}>
                      +{item.effects.hunger}
                    </Text>
                  </View>
                )}
                {item.effects.thirst && (
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Thirst:</Text>
                    <Text style={[styles.statValue, styles.positiveEffect]}>
                      +{item.effects.thirst}
                    </Text>
                  </View>
                )}
                {item.effects.health && (
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Health:</Text>
                    <Text style={[styles.statValue, styles.positiveEffect]}>
                      +{item.effects.health}
                    </Text>
                  </View>
                )}
                {item.effects.energy && (
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Energy:</Text>
                    <Text style={[styles.statValue, styles.positiveEffect]}>
                      +{item.effects.energy}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {isConsumable && (
              <TouchableOpacity
                style={styles.consumeButton}
                onPress={handleConsume}
              >
                <Text style={styles.buttonText}>
                  {item.type === "FOOD"
                    ? "Eat"
                    : item.type === "DRINK"
                    ? "Drink"
                    : "Use"}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.dropButton} onPress={handleDrop}>
              <Text style={styles.buttonText}>Drop</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "COMMON":
      return "#ccc";
    case "UNCOMMON":
      return "#4CAF50";
    case "RARE":
      return "#2196F3";
    case "EPIC":
      return "#9C27B0";
    case "LEGENDARY":
      return "#FF9800";
    default:
      return "#ccc";
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    width: width * 0.85,
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#333",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  spriteContainer: {
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  itemSprite: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  quantityBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF5722",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  statLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  statValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  positiveEffect: {
    color: "#4CAF50",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  consumeButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  dropButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

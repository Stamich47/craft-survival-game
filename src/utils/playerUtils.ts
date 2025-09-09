import { Player } from "../types";

export const createDefaultPlayer = (name: string): Omit<Player, "id"> => ({
  name,
  level: 1,
  experience: 0,
  health: 100,
  maxHealth: 100,
  hunger: 100,
  maxHunger: 100,
  thirst: 100,
  maxThirst: 100,
  energy: 100,
  maxEnergy: 100,
  position: { x: 0, y: 0 },
});

export const calculateHealthPercentage = (
  health: number,
  maxHealth: number
): number => {
  return (health / maxHealth) * 100;
};

export const calculateHungerPercentage = (
  hunger: number,
  maxHunger: number
): number => {
  return (hunger / maxHunger) * 100;
};

export const calculateThirstPercentage = (
  thirst: number,
  maxThirst: number
): number => {
  return (thirst / maxThirst) * 100;
};

export const calculateEnergyPercentage = (
  energy: number,
  maxEnergy: number
): number => {
  return (energy / maxEnergy) * 100;
};

export const isPlayerCriticalHealth = (player: Player): boolean => {
  return calculateHealthPercentage(player.health, player.maxHealth) <= 20;
};

export const isPlayerHungry = (player: Player): boolean => {
  return calculateHungerPercentage(player.hunger, player.maxHunger) <= 30;
};

export const isPlayerThirsty = (player: Player): boolean => {
  return calculateThirstPercentage(player.thirst, player.maxThirst) <= 30;
};

export const isPlayerTired = (player: Player): boolean => {
  return calculateEnergyPercentage(player.energy, player.maxEnergy) <= 25;
};

export const getExperienceToNextLevel = (player: Player): number => {
  const nextLevelExperience = player.level * 100;
  return nextLevelExperience - player.experience;
};

export const getLevelProgress = (player: Player): number => {
  const currentLevelBase = (player.level - 1) * 100;
  const nextLevelExperience = player.level * 100;
  const currentProgress = player.experience - currentLevelBase;
  const levelRange = nextLevelExperience - currentLevelBase;

  return (currentProgress / levelRange) * 100;
};

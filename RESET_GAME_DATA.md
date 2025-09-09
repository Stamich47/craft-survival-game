# 🔄 Game Data Reset Instructions

## What I Fixed:

### 1. **Redux Persist Version Bump**

- Changed version from 1 to 2 in `src/store/index.ts`
- This forces Redux Persist to clear all cached data and start fresh
- Old items with broken sprites will be completely removed

### 2. **Removed Duplicate Item Addition**

- Removed the debug resource section that kept adding items every reload
- Now items are only given once when a new player is created
- No more accumulating inventory on each app restart

### 3. **Fixed useEffect Dependencies**

- Added proper dependency array `[dispatch]` to prevent unnecessary re-runs
- Removed the `hasGivenDebugResources` state that wasn't working properly

## Expected Behavior Now:

✅ **On First Load**: New player gets starting inventory with fixed sprites  
✅ **On Reload**: Existing player keeps their inventory (no new items added)  
✅ **Fresh Start**: Incrementing persist version clears all old data

## Testing the Fix:

1. **Restart the app** - The persist version bump should clear old data
2. **Check inventory** - Should show proper sprites instead of placeholder squares
3. **Reload the app** - Inventory should stay the same (no duplicate items)
4. Wood, Wooden Plank, Stick, Bone should now show proper graphics

## If You Still See Issues:

If sprites still don't load properly, you can force a complete reset by running:

```bash
# Clear Expo cache completely
npx expo start -c
```

The key fix is that Metro bundler should now properly resolve the sprite imports with the new constant-based approach!

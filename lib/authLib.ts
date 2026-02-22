// authUtils.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

let fakeAccessToken: string | null = "fake-access-token";
let fakeRefreshToken: string | null = "fake-refresh-token";

export const getTokens = async () => {
  return {
    access: fakeAccessToken,
    refresh: fakeRefreshToken,
  };
};

export const refreshToken = async (): Promise<string> => {
  console.log("🔄 Refreshing fake token...");

  return new Promise((resolve) => {
    setTimeout(() => {
      fakeAccessToken = "fake-access-token-" + Date.now();
      resolve(fakeAccessToken!);
    }, 1000);
  });
};

export const clearTokens = async () => {
  fakeAccessToken = null;
  fakeRefreshToken = null;
};

export const getUserId = async (): Promise<string | null> => {
  const userId = await AsyncStorage.getItem("userId");
  return userId;
};

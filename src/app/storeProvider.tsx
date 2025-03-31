'use client'

import { AppStore, makeStore } from "@/lib/redux/rootStore";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  //Load the inital state
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>
    <PersistGate loading={null} persistor={storeRef.current.__persistor}>
      {children}
    </PersistGate>
  </Provider>
}
import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Player, BUDGET } from '../data';

type SquadState = Player[];

type Action =
  | { type: 'ADD'; payload: Player }
  | { type: 'REMOVE'; payload: number };

const squadReducer = (state: SquadState, action: Action): SquadState => {
  switch (action.type) {
    case 'ADD':
      if (state.some(p => p.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
};

interface SquadContextType {
  squad: SquadState;
  addToSquad: (player: Player) => void;
  removeFromSquad: (id: number) => void;
  totalItems: number;
  totalPrice: number;
  remainingBudget: number;
}

const SquadContext = createContext<SquadContextType | undefined>(undefined);

export const SquadProvider = ({ children }: { children: ReactNode }) => {
  const [squad, dispatch] = useReducer(squadReducer, []);

  // Calculate totals FIRST (moved up to fix the reference error)
  const totalPrice = squad.reduce((sum, p) => sum + p.price, 0);
  const remainingBudget = BUDGET - totalPrice;
  const totalItems = squad.length;

  const addToSquad = (player: Player) => {
    if (squad.some(p => p.id === player.id)) return;
    const projectedTotal = totalPrice + player.price;
    if (projectedTotal > BUDGET) return;
    dispatch({ type: 'ADD', payload: player });
  };

  const removeFromSquad = (id: number) => dispatch({ type: 'REMOVE', payload: id });

  return (
    <SquadContext.Provider value={{ squad, addToSquad, removeFromSquad, totalItems, totalPrice, remainingBudget }}>
      {children}
    </SquadContext.Provider>
  );
};

export const useSquad = () => {
  const context = useContext(SquadContext);
  if (!context) throw new Error('useSquad must be used within SquadProvider');
  return context;
};
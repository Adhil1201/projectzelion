import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, WishlistItem, WishlistState } from '../types/Product';

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' };

interface WishlistContextType {
  state: WishlistState;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        return state; // Item already in wishlist
      }
      
      const newItems = [...state.items, { product: action.payload, addedAt: new Date() }];
      
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length
      };
    }
    
    case 'REMOVE_FROM_WISHLIST': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length
      };
    }
    
    case 'CLEAR_WISHLIST':
      return {
        items: [],
        itemCount: 0
      };
    
    default:
      return state;
  }
};

const initialState: WishlistState = {
  items: [],
  itemCount: 0
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      state,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
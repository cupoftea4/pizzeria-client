import { CanvasCook } from '@/types/canvasCook';
import type { Cook, CookingStage } from '@/types/types';
import React, { createContext, useState, useContext, useCallback } from 'react';

type KitchenContextType = {
  cooks: CanvasCook[]
  completedOrdersNumber: number
  notifyCookUpdate: (cookId: number, cookData: Cook, newStage?: CookingStage) => void
  setInitialCooks: (cooks: Record<CookingStage, Cook[]>) => void
  notifyCompletedOrder: () => void
  setInitialCompletedOrders: (numberOfCompletedOrders: number) => void
};

const KitchenContext = createContext<KitchenContextType | undefined>(undefined);

export const CooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [cooks, setCooks] = useState<CanvasCook[]>([]);
  const [numberOfCompletedOrders, setNumberOfCompletedOrders] = useState(0);

  const updateCook = useCallback((cookId: number, cookData: Cook, newStage?: CookingStage) => {
    setCooks(prevCooks => {
      const updatedCooks = [...prevCooks];
      const cook = updatedCooks.find(cook => cook.cookData.id === cookId);
      if (cook) {
        if (newStage) {
          cook.moveTo(newStage, prevCooks); // Update the target position based on the new stage
        }
        cook.updateData(cookData);
      }
      return updatedCooks.sort(sortByStageAndCoordinates);
    });
  }, []);

  const sortCooks = () => {
    setCooks(prevCooks => [...prevCooks].sort(sortByStageAndCoordinates));
  };

  const setInitialCooks = useCallback((cooksPerStage: Record<CookingStage, Cook[]>) => {
    setCooks(Object.entries(cooksPerStage).map(([stage, stageCooks]) =>
      stageCooks.map((cook, index) => new CanvasCook(cook, stage as CookingStage, index, sortCooks))
    ).flat().sort(sortByStageAndCoordinates));
  }, []);

  const addCompletedOrder = useCallback(() => {
    setNumberOfCompletedOrders(prev => prev + 1);
  }, []);

  const setInitialCompletedOrders = useCallback((numberOfCompletedOrders: number) => {
    setNumberOfCompletedOrders(numberOfCompletedOrders);
  }, []);

  return (
    <KitchenContext.Provider value={{
      cooks,
      notifyCookUpdate: updateCook,
      setInitialCooks,
      completedOrdersNumber: numberOfCompletedOrders,
      notifyCompletedOrder: addCompletedOrder,
      setInitialCompletedOrders
    }}>
      {children}
    </KitchenContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useKitchenVisualization = () => {
  const context = useContext(KitchenContext);
  if (context === undefined) {
    throw new Error('useCooks must be used within a CooksProvider');
  }
  return context;
};

function sortByStageAndCoordinates(a: CanvasCook, b: CanvasCook) {
  const stagePriority = ['Topping', 'Baking', 'Packaging', 'Waiting', 'Completed', 'Dough'];

  const stageComparison = stagePriority.indexOf(a.currentStage) - stagePriority.indexOf(b.currentStage);
  if (stageComparison !== 0) {
    return stageComparison;
  }

  return a.y - b.y;
}

/* eslint-disable max-statements */
import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import { useCallback, useEffect, useState } from 'react';
import type { Cook, Order, PizzaRecipe, TimedCookingStageToValue } from '@/types/types';
import OrderModal from '../OrderModal';
import CooksTable from '../CooksTable';
import { useConfig } from '@/hooks/useConfig';
import { useKitchenState } from '@/hooks/useKitchenState';
import {
  useCookingOrderUpdateSubscription,
  useNewOrderSubscription,
  usePausedCookUpdateSubscription,
  type CookingOrderUpdateMessage,
  type PausedCookUpdateMessage
} from '@/hooks/useEventSubscription';
import { mergeUpdateIntoCook, mergeUpdateIntoOrder } from '@/utils/orders';
import { arrayToObject } from '@/utils/object';
import { toast } from 'react-toastify';
import { useKitchenVisualization } from '@/context/CooksContext';
import { FunctionQueue } from '@/utils/FunctionQueue';
import type { HttpError } from '@/utils/httpClient';
import EndingModal from '../EndingModal';

const functionQueue = new FunctionQueue(0);

const Simulator = () => {
  const { config, error: configError } = useConfig();
  const { kitchenState, error: kitchenStateError } = useKitchenState();
  const [orders, setOrders] = useState<Record<number, Order>>({});
  const [cooks, setCooks] = useState<Record<number, Cook>>({});
  const [minimumPizzaTime, setMinimumPizzaTime] = useState(123);
  const [menu, setMenu] = useState<PizzaRecipe[]>([]);
  const [diners, setDiners] = useState<Record<number, Set<number>>>({}); // cashRegisterId -> dinersNumber
  const [showTerminateSimulationModal, setShowTerminateSimulationModal] = useState(false);

  const {
    notifyCookUpdate, setInitialCooks, notifyCompletedOrder, setInitialCompletedOrders
  } = useKitchenVisualization();

  const handleNewOrderUpdate = useCallback((order: Order) => {
    console.warn('NEW ORDER', order);
    // BUTT PLUG
    order.orderPizzas.forEach(pizza => { pizza.currentStage = 'Waiting'; });
    setOrders(orders => ({ ...orders, [order.id]: order }));

    const registerId = order.cashRegisterId;
    console.log(`Adding diner to the cash register ${registerId}}`);
    setDiners(prevDiners => {
      return {
        ...prevDiners,
        [registerId]: prevDiners[registerId]?.add(order.id) ?? (new Set<number>()).add(order.id)
      };
    });
  }, []);

  const handleCookingOrderUpdate = useCallback((update: CookingOrderUpdateMessage) => {
    console.warn('ORDER UPDATE', update);
    setOrders(orders => {
      const orderToUpdate = orders[update.orderId];
      if (!orderToUpdate) {
        console.error('UPDATE: Can`t find order', update.orderId, orders);
        return orders;
      }
      const registerId = orderToUpdate.cashRegisterId;
      if (update.currentStage === 'Completed') {
        console.log(`Removing diner from ${registerId}`);
        notifyCompletedOrder();
        setDiners(prevDiners => {
          prevDiners[registerId]?.delete(update.orderId);
          return { ...prevDiners, [registerId]: prevDiners[registerId] ?? new Set<number>() };
        });
      }
      return { ...orders, [update.orderId]: mergeUpdateIntoOrder(orderToUpdate, update) };
    });

    setCooks(cooks => {
      const cookToUpdate = cooks[update.cookId];
      if (!cookToUpdate) {
        console.error('UPDATE: Can`t find cook', update.cookId, cooks);
        return cooks;
      }
      const mergedData = mergeUpdateIntoCook(cookToUpdate, update);
      functionQueue.enqueue(() => notifyCookUpdate(update.cookId, mergedData, update.currentStage));
      return {
        ...cooks,
        [update.cookId]: mergedData
      };
    });
  }, [notifyCompletedOrder, notifyCookUpdate]);

  const handlePausedCookUpdate = useCallback((update: PausedCookUpdateMessage) => {
    setCooks(cooks => {
      console.warn('PAUSED COOK UPDATE', update);
      const updatedCook = cooks[update.cookId];
      if (!updatedCook) {
        console.error('COOK: Can`t find cook', update.cookId);
        return cooks;
      }
      const mergedData = { ...updatedCook, status: update.cookStatus };
      notifyCookUpdate(update.cookId, mergedData);
      return {
        ...cooks,
        [update.cookId]: mergedData
      };
    });
  }, [notifyCookUpdate]);

  useNewOrderSubscription(handleNewOrderUpdate);
  useCookingOrderUpdateSubscription(handleCookingOrderUpdate);
  usePausedCookUpdateSubscription(handlePausedCookUpdate);

  const [currentOrder, setCurrentOrder] = useState<Order>();
  const [currentOrderPizzaId, setCurrentOrderPizzaId] = useState<number>();
  const [pizzaStagesTimeCoeffs, setPizzaStagesTimeCoeffs] = useState<TimedCookingStageToValue>();

  const handleModalClose = () => {
    setCurrentOrder(undefined);
  };

  useEffect(() => {
    if (!config) return;
    setMinimumPizzaTime(config.minimumPizzaTime);
    setMenu(config.menu);
    setPizzaStagesTimeCoeffs(config.pizzaStagesTimeCoeffs);
  }, [config]);

  useEffect(() => {
    if (!kitchenState) return;
    const orders = arrayToObject(kitchenState.orders, 'id');
    setCooks(arrayToObject(kitchenState.cooks, 'id'));
    setInitialCooks(
      kitchenState.cooks.reduce<Record<string, Cook[]>>((acc, cook) => {
        const addToStage = (stage: string) => {
          if (!acc[stage]) acc[stage] = [];
          acc[stage]?.push(cook);
        };

        if (cook.status === 'BUSY') {
          const stage = orders[cook.orderId!]?.orderPizzas.find(pizza => pizza.id === cook.orderPizzaId)?.currentStage;
          if (!stage) {
            console.error('Can`t find stage for cook', cook);
            return acc;
          }
          addToStage(stage);
          return acc;
        }
        addToStage('Waiting');
        return acc;
      }, {})
    );
    setInitialCompletedOrders(kitchenState.orders.reduce((acc, order) => {
      return order.orderPizzas.reduce((acc, pizza) => {
        if (pizza.currentStage === 'Completed') acc++;
        return acc;
      }, acc);
    }, 0));
    setOrders(orders);
    setDiners(kitchenState.orders.reduce<Record<number, Set<number>>>((acc, order) => {
      if (order.orderPizzas.some(pizza => pizza.currentStage !== 'Completed')) {
        const registerId = order.cashRegisterId;
        if (!acc[registerId]) acc[registerId] = new Set<number>();
        acc[registerId]?.add(order.id);
      }
      return acc;
    }, {}));
  }, [kitchenState, setInitialCompletedOrders, setInitialCooks]);

  useEffect(() => {
    if (!kitchenStateError) return;
    toast.error(kitchenStateError);
  }, [kitchenStateError]);

  useEffect(() => {
    if (!configError) return;
    toast.error(configError);
  }, [configError]);

  const showOrderModal = useCallback((orderId: number, orderPizzaId: number | null) => {
    setCurrentOrderPizzaId(orderPizzaId ?? 0);
    setCurrentOrder(orders[orderId]);
  }, [orders]);

  const handleTerminate = () => {
    try {
      fetch('http://localhost:8080/simulation/terminate', {
        method: 'POST'
      });
      setShowTerminateSimulationModal(true);
    } catch (err) {
      toast.error((err as HttpError).message);
    }
  };

  return (
    <div className={style.root}>
      <PizzeriaBackground diners={diners} showModal={showOrderModal} />
      <OrdersTable
        orders={orders}
        menu={menu}
        onOrderClick={(order) => setCurrentOrder(order)}
      />
      <button className={style.terminate} onClick={handleTerminate} >
        Terminate simulation
      </button>
      <CooksTable
        cooks={cooks}
        orders={orders}
        menu={menu}
      />
      {currentOrder &&
        <OrderModal
          cooks={cooks}
          order={currentOrder}
          pizzaStagesTimeCoeffs={pizzaStagesTimeCoeffs}
          minimumPizzaTime={minimumPizzaTime}
          menu={menu}
          orderPizzaId={currentOrderPizzaId}
          onClose={handleModalClose}
        />
      }
      {showTerminateSimulationModal &&
        <EndingModal
          orders={Object.values(orders)}
          menu={menu}
        />
      }
    </div>
  );
};

export default Simulator;

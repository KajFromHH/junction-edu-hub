import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ShoppingItem {
  id: string;
  text: string;
  price: number;
}

interface DragDropShoppingProps {
  items: ShoppingItem[];
  onComplete: (totalCost: number, selectedItems: ShoppingItem[]) => void;
}

const ItemType = 'SHOPPING_ITEM';

const DraggableItem: React.FC<{ item: ShoppingItem; isInCart: boolean }> = ({ item, isInCart }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 bg-white border-2 border-gray-300 rounded-lg cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isInCart ? 'bg-green-100 border-green-400' : ''}`}
    >
      <div className="flex flex-col items-center gap-2">
        <span>{item.text}</span>
        <span className="text-green-600">{item.price} €</span>
      </div>
    </div>
  );
};

const Cashier: React.FC<{
  onDrop: (item: ShoppingItem) => void;
  items: ShoppingItem[];
}> = ({ onDrop, items }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (draggedItem: { item: ShoppingItem }) => {
      onDrop(draggedItem.item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[200px] p-6 border-4 border-dashed rounded-lg transition-all ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-400 bg-gray-50'
      }`}
    >
      <h3 className="text-center mb-4">🛒 Cashier</h3>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Drag items here to purchase</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex justify-between items-center p-2 bg-white rounded">
              <span>{item.text}</span>
              <span className="text-green-600">{item.price} €</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DragDropShoppingContent: React.FC<DragDropShoppingProps> = ({ items, onComplete }) => {
  const [cartItems, setCartItems] = useState<ShoppingItem[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleDrop = (item: ShoppingItem) => {
    setCartItems((prev) => [...prev, item]);
    setTotalCost((prev) => prev + item.price);
  };

  const handleComplete = () => {
    onComplete(totalCost, cartItems);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4">Available Items</h3>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <DraggableItem key={item.id} item={item} isInCart={cartItems.some(ci => ci.id === item.id)} />
          ))}
        </div>
      </div>

      <Cashier onDrop={handleDrop} items={cartItems} />

      <div className="p-4 bg-blue-100 rounded-lg">
        <div className="flex justify-between items-center">
          <span>Total Cost:</span>
          <span className="text-green-600">{totalCost} €</span>
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        disabled={cartItems.length === 0}
      >
        Complete Purchase
      </button>
    </div>
  );
};

export const DragDropShopping: React.FC<DragDropShoppingProps> = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropShoppingContent {...props} />
    </DndProvider>
  );
};

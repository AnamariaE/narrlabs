import React from 'react';
import { useDrop } from 'react-dnd';

type ColumnId = 'unseen' | 'seen' | 'loved';

interface DropColumnProps {
  columnId: ColumnId;
  children: React.ReactNode;
  onDrop: (slug: string, toColumn: ColumnId) => void;
  className?: string;
  style?: React.CSSProperties;
}

const DRAG_TYPE = 'PROJECT_CARD';

export function DropColumn({ columnId, children, onDrop, className, style }: DropColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DRAG_TYPE,
    drop: (item: { slug: string; currentColumn: ColumnId }) => {
      if (item.currentColumn !== columnId) {
        onDrop(item.slug, columnId);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={className}
      style={{
        ...style,
        backgroundColor: isActive
          ? columnId === 'loved'
            ? 'rgba(242, 174, 46, 0.12)'
            : 'rgba(242, 174, 46, 0.05)'
          : columnId === 'loved'
            ? 'rgba(242, 174, 46, 0.03)'
            : '#FFFFFF',
        borderColor: isActive ? 'rgba(242, 174, 46, 0.5)' : undefined,
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </div>
  );
}

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './DragDrag.module.css';
const DragDropItem = props => {
    const { moveCard, index } = props;
    const id = index;
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'compilation',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'compilation',
        item: () => ({ id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    const draggedClass = isDragging ? styles.dragged : '';
    return(
        <div ref={ref} data-handler-id={handlerId} className={`${styles.item} ${draggedClass}`}>
            {props.children}
        </div>
    );
}

export default DragDropItem;
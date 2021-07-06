import { useState, useCallback } from 'react';
import update from 'immutability-helper';
import DragDropItem from './DragDropItem';

const DragDropList = props => {
    const { children, onChange } = props;
    const [ items, setItems ] = useState(children);
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = items[dragIndex];
        onChange((arr) => {
            const dragEl = arr[dragIndex];
            return update(arr, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragEl],
                ],
            });
        });
        setItems(update(items, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }
    return items.map((component, index) => {
        return (
            <DragDropItem index={index} moveCard={moveCard} key={component.key}>
                {component}
            </DragDropItem>
        );
    });
}

export default DragDropList;
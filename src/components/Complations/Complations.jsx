import { useState } from 'react';
import CompilationCard from '../CompilationCard/CompilationCard';
import DragDropList from '../DragDropList/DragDropList';
const Complations = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            title: 'Write a cool JS library',
        },
        {
            id: 2,
            title: 'Make it generic enough',
        },
        {
            id: 3,
            title: 'Write README',
        },
        {
            id: 4,
            title: 'Create some examples',
        },
        {
            id: 5,
            title: 'Spam in Twitter and IRC',
        }
    ]);
    return(
        <DragDropList onChange={setCards}>
            {cards.map((card, index) => <CompilationCard {...card} key={index} />)}
        </DragDropList>
    );
}

export default Complations;
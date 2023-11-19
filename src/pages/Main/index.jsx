import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from '../../components';
import { Container } from './styled';

const Main = () => {
  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <Board></Board>
      </DndProvider>
    </Container>
  );
};

export default Main;

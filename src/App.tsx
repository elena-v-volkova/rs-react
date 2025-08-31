import { Suspense } from 'react';
import CardList from './components/cardList/CardList';
import Loader from './components/Loader/Loader';
import GlobalColumnPickerButton from './components/columnPicker/ColumnPickerButton';

export default function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <CardList />
      </Suspense>
      <GlobalColumnPickerButton />
    </div>
  );
}

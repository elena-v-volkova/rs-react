import { Suspense } from 'react';
import CardList from './components/cardList/CardList';
import Loader from './components/Loader/Loader';

export default function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <CardList />
      </Suspense>
    </div>
  );
}

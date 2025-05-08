import { Outlet } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { CardMarca } from '../../components/Cards/CardMarca/CardMarca';

export default function Marca() {
  return (
    <>
      <MainLayout title={'Marca de Suprimentos'}>
        <Outlet />
        <CardMarca />
      </MainLayout>
    </>
  );
}

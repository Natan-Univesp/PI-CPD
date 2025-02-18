import { useState } from 'react';
import { Outlet } from 'react-router-dom';

//Icones
import { BsBoxSeam as IconDisponivel } from 'react-icons/bs';
import { PiHandWithdraw as IconRetirada } from 'react-icons/pi';
import { LuPackageSearch as IconRequest } from 'react-icons/lu';
import { TbDatabaseSearch as IconMoreRequest } from 'react-icons/tb';

import SubNav from '../components/subNav/SubNav';
import MainLayout from '../components/layout/MainLayout';

export default function Alocacao() {
  const [title, setTitle] = useState('Alocação de Impressoras');

  const infoSubNav = [
    {
      link: '/alocacao',
      text: 'Alocação de Impressoras',
    },
    {
      link: 'report',
      text: 'Relatório de Alocação',
    },
  ];

  const infoBoxExtra = [
    {
      id: 1,
      IconBox: IconDisponivel,
      infoBox: '50',
      titleBox: 'Toners Disponíveis',
      classInfo: 'content__infoStatic',
    },
    {
      id: 2,
      IconBox: IconRetirada,
      infoBox: '10',
      titleBox: 'Toners retirados',
      classInfo: 'content__infoStatic',
    },
    {
      id: 3,
      IconBox: IconRequest,
      infoBox: '2',
      titleBox: 'Toners solicitados',
      classInfo: 'content__infoStatic',
    },
    {
      id: 4,
      IconBox: IconMoreRequest,
      infoBox: 'D111',
      titleBox: 'Toner mais solicitado no Mês',
      classInfo: 'content__infoStatic',
    },
  ];
  return (
    <>
      <SubNav navInfo={infoSubNav} />
      <MainLayout title={title} infoExtraData={infoBoxExtra}>
        <Outlet context={{ setTitle }} />
      </MainLayout>
    </>
  );
}

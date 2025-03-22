import { useState } from 'react';
import { Outlet } from 'react-router-dom';

//Icones do infoExtra;
import { BsBoxes as IconToners } from 'react-icons/bs';
import { TbCylinder as IconCilindro } from 'react-icons/tb';
import { BsPrinter as IconPrinter } from 'react-icons/bs';
import { MdOutlinePendingActions as IconRequest } from 'react-icons/md';

import { SubNav } from '../../components/SubNav/SubNav';
import MainLayout from '../../components/layout/MainLayout';

import styles from './Home.module.css';

export default function Home() {
  const [title, setTitle] = useState('Visão Geral');

  const infoSubNav = [
    { link: '/', text: 'Cadastrar Solicitações' },
    { link: 'viewRequest', text: 'Visualizar Solicitações' },
  ];

  const infoBoxExtra = [
    {
      id: 1,
      IconBox: IconToners,
      infoBox: '5',
      titleBox: 'Toners Disponíveis',
      classInfo: 'content__infoStatic',
    },
    {
      id: 2,
      IconBox: IconCilindro,
      infoBox: '8',
      titleBox: 'Cilindros Disponíveis',
      classInfo: 'content__infoStatic',
    },
    {
      id: 3,
      IconBox: IconPrinter,
      infoBox: '0',
      titleBox: 'Impressoras Alocadas',
      classInfo: 'content__infoStatic',
    },
    {
      id: 4,
      IconBox: IconRequest,
      infoBox: '0',
      titleBox: 'Solicitações Pendentes',
      classInfo: 'content__infoStatic',
    },
  ];
  return (
    <>
      <SubNav navInfo={infoSubNav} />
      <MainLayout
        title={title}
        infoExtraData={infoBoxExtra}
        customStyle={styles.home}
      >
        <Outlet context={{ styles, setTitle }} />
      </MainLayout>
    </>
  );
}

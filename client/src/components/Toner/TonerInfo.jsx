import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useModal } from '../../Context/ModalContext';
import styles from './TonerInfo.module.css';

import HpLogo from './../../assets/img/hp-logo.svg';
import BrotherLogo from './../../assets/img/brother-logo.svg';
import CanonLogo from './../../assets/img/canon-logo.svg';
import EpsonLogo from './../../assets/img/epson-logo.svg';
import LexMarkLogo from './../../assets/img/lexmark-logo.svg';
import SamsungLogo from './../../assets/img/samsung-logo.svg';
import Toner from './Toner';

export default function TonerInfo() {
  const { setTitle } = useOutletContext();
  const { showModal } = useModal();

  /*
        Aqui será possível trabalhar com todos os formulários
        Vou deixar uma pequena lista de "modalName" e para qual formulário ela leva
        =============================
        registerToner - Formulário de Cadastro de Toner
        registerCilindro - Formulário de Cadastro de Cilindro
        registerTinta - Formulário de Cadastro de Tinta
        registerUser - Formulário de Cadastro de Usuários
        registerMarca - Formulário de Cadastro de Marca
        =============================

        Para trocar a exibição de cada formulário 
        basta substituir o "registerToner" abaixo por um dos informados acima

    */

  //Definição de título
  useEffect(() => {
    setTitle('Toners');
    showModal({
      modalName: 'registerToner',
      customStyle: { overflow: 'initial' },
    });
  }, []);

  return (
    <>
      <h2 className={`${styles.subTitle}`}>SubTítulo de Toners</h2>

      <Toner
        buttonLabel={'Editar'}
        button={'Excluir'}
        img={HpLogo}
        alt={'Logo da HP'}
        title={'Toner'}
        text={'Compatível com impressoras HP dos seguintes modelos: '}
        list={['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4', 'Modelo 5']}
        availability={'Disponível: X'}
      />

      <Toner
        buttonLabel={'Editar'}
        button={'Excluir'}
        img={BrotherLogo}
        alt={'Logo da Brother'}
        title={'Toner'}
        text={'Compatível com impressoras BROTHER dos seguintes modelos: '}
        list={['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4', 'Modelo 5']}
        availability={'Disponível: X'}
      />

      <Toner
        buttonLabel={'Editar'}
        button={'Excluir'}
        img={CanonLogo}
        alt={'Logo da Canon'}
        title={'Toner'}
        text={'Compatível com impressoras CANON dos seguintes modelos: '}
        list={['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4', 'Modelo 5']}
        availability={'Disponível: X'}
      />

      <Toner
        buttonLabel={'Editar'}
        button={'Excluir'}
        img={EpsonLogo}
        alt={'Epson logo'}
        title={'Toner'}
        text={'Compatível com impressoras EPSON dos seguintes modelos: '}
        list={['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4', 'Modelo 5']}
        availability={'Disponível: X'}
      />

      <Toner
        buttonLabel={'Editar'}
        button={'Excluir'}
        img={LexMarkLogo}
        alt={'Logo da LexMark'}
        title={'Toner'}
        text={'Compatível com impressoras LEXMARK dos seguintes modelos: '}
        list={['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4', 'Modelo 5']}
        availability={'Disponível: X'}
      />

      <Toner
        buttonLabel={'Editar'}
        button={'Excluir'}
        img={SamsungLogo}
        alt={'Logo da Samsung'}
        title={'Toner'}
        text={'Compatível com impressoras SAMSUNG dos seguintes modelos: '}
        list={['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4', 'Modelo 5']}
        availability={'Disponível: X'}
      />
    </>
  );
}

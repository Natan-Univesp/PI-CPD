import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useModal } from '../../Context/ModalContext';
import { IoMdAddCircleOutline } from 'react-icons/io';
import styles from './TonerInfo.module.css';

import HpLogo from './../../assets/img/hp-logo.svg';
import BrotherLogo from './../../assets/img/brother-logo.svg';
import CanonLogo from './../../assets/img/canon-logo.svg';
import EpsonLogo from './../../assets/img/epson-logo.svg';
import LexMarkLogo from './../../assets/img/lexmark-logo.svg';
import SamsungLogo from './../../assets/img/samsung-logo.svg';

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

      <div className={`${styles.tonner}`}>
        <div className={`${styles.actions}`}>
          <button className={`${styles.btnEditar}`}>EDITAR</button>
          <button className={`${styles.btnExcluir}`}>EXCLUIR</button>
        </div>
        <img src={HpLogo} alt='Logo da HP' className={`${styles.logo}`} />
        <h2>Toner:</h2>
        <p>Compatível com impressoras HP dos seguintes modelos:</p>
        <ul className={`${styles.modelos}`}>
          <li>Modelo 1</li>
          <li>Modelo 2</li>
          <li>Modelo 3</li>
          <li>Modelo 4</li>
          <li>Modelo 5</li>
          <li>Modelo 6</li>
          <li>Modelo 7</li>
        </ul>
        <p className={`${styles.disponibilidade}`}>Disponível: X</p>
      </div>

      <div className={`${styles.tonner}`}>
        <div className={`${styles.actions}`}>
          <button className={`${styles.btnEditar}`}>EDITAR</button>
          <button className={`${styles.btnExcluir}`}>EXCLUIR</button>
        </div>
        <img
          src={BrotherLogo}
          alt='Logo da BROTHER'
          className={`${styles.logo}`}
        />
        <h2>Toner:</h2>
        <p>Compatível com impressoras BROTHER dos seguintes modelos:</p>
        <ul className={`${styles.modelos}`}>
          <li>Modelo 1</li>
          <li>Modelo 2</li>
          <li>Modelo 3</li>
          <li>Modelo 4</li>
          <li>Modelo 5</li>
          <li>Modelo 6</li>
          <li>Modelo 7</li>
        </ul>
        <p className={`${styles.disponibilidade}`}>Disponível: X</p>
      </div>

      <div className={`${styles.tonner}`}>
        <div className={`${styles.actions}`}>
          <button className={`${styles.btnEditar}`}>EDITAR</button>
          <button className={`${styles.btnExcluir}`}>EXCLUIR</button>
        </div>
        <img src={CanonLogo} alt='Logo da CANON' className={`${styles.logo}`} />
        <h2>Toner:</h2>
        <p>Compatível com impressoras CANON dos seguintes modelos:</p>
        <ul className={`${styles.modelos}`}>
          <li>Modelo 1</li>
          <li>Modelo 2</li>
          <li>Modelo 3</li>
          <li>Modelo 4</li>
          <li>Modelo 5</li>
          <li>Modelo 6</li>
          <li>Modelo 7</li>
        </ul>
        <p className={`${styles.disponibilidade}`}>Disponível: X</p>
      </div>

      <div className={`${styles.tonner}`}>
        <div className={`${styles.actions}`}>
          <button className={`${styles.btnEditar}`}>EDITAR</button>
          <button className={`${styles.btnExcluir}`}>EXCLUIR</button>
        </div>
        <img src={EpsonLogo} alt='Logo da EPSON' className={`${styles.logo}`} />
        <h2>Toner:</h2>
        <p>Compatível com impressoras EPSON dos seguintes modelos:</p>
        <ul className={`${styles.modelos}`}>
          <li>Modelo 1</li>
          <li>Modelo 2</li>
          <li>Modelo 3</li>
          <li>Modelo 4</li>
          <li>Modelo 5</li>
          <li>Modelo 6</li>
          <li>Modelo 7</li>
        </ul>
        <p className={`${styles.disponibilidade}`}>Disponível: X</p>
      </div>

      <div className={`${styles.tonner}`}>
        <div className={`${styles.actions}`}>
          <button className={`${styles.btnEditar}`}>EDITAR</button>
          <button className={`${styles.btnExcluir}`}>EXCLUIR</button>
        </div>
        <img
          src={LexMarkLogo}
          alt='Logo da LEXMARK'
          className={`${styles.logo}`}
        />
        <h2>Toner:</h2>
        <p>Compatível com impressoras LEXMARK dos seguintes modelos:</p>
        <ul className={`${styles.modelos}`}>
          <li>Modelo 1</li>
          <li>Modelo 2</li>
          <li>Modelo 3</li>
          <li>Modelo 4</li>
          <li>Modelo 5</li>
          <li>Modelo 6</li>
          <li>Modelo 7</li>
        </ul>
        <p className={`${styles.disponibilidade}`}>Disponível: X</p>
      </div>

      <div className={`${styles.tonner}`}>
        <div className={`${styles.actions}`}>
          <button className={`${styles.btnEditar}`}>EDITAR</button>
          <button className={`${styles.btnExcluir}`}>EXCLUIR</button>
        </div>
        <img
          src={SamsungLogo}
          alt='Logo da SAMSUNG'
          className={`${styles.logo}`}
        />
        <h2>Toner:</h2>
        <p>Compatível com impressoras SAMSUNG dos seguintes modelos:</p>
        <ul className={`${styles.modelos}`}>
          <li>Modelo 1</li>
          <li>Modelo 2</li>
          <li>Modelo 3</li>
          <li>Modelo 4</li>
          <li>Modelo 5</li>
          <li>Modelo 6</li>
          <li>Modelo 7</li>
        </ul>
        <p className={`${styles.disponibilidade}`}>Disponível: X</p>
      </div>

      {/* <div className={`${styles.cardContainer}`} data-text='adicionar toners'>
            <label className={`${styles.cardBackText}`} name='addToner'>
            Adicionar Toners
            </label>
            <div className={`${styles.cardIcon}`}>
            <button className={`${styles.cardFront}`} name='addToner'>
                <p className={`${styles.cardTitle}`}>ADICIONAR</p>
                <IoMdAddCircleOutline />
            </button>
            </div>
        </div> */}
    </>
  );
}

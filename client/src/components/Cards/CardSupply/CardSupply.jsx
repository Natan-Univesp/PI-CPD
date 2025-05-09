import { IoMdAddCircleOutline } from 'react-icons/io';
import { CardMarca } from '../CardMarca/CardMarca';

import styles from './CardSupply.module.css';
import TonerInfo from '../../Toner/TonerInfo';
//Assim eu faço a exportação do meu arquivo CSS
//OBS: todos os "componentes" devem ter o seu css único seguindo a estrutura de "nome.module.css"
// a aplicação da estilização com classes estão indicadas no exemplo abaixo (é um pouco diferente do HTML e CSS padrão)

export function CardSupply() {
  return (
    <>
      <CardMarca />
      <TonerInfo />
      <div className={`${styles.cardContainer}`} data-text='adicionar toners'>
        <label className={`${styles.cardBackText}`} name='addToner'>
          Adicionar Toners
        </label>
        <div className={`${styles.cardIcon}`}>
          <button className={`${styles.cardFront}`} name='addToner'>
            <p className={`${styles.cardTitle}`}>ADICIONAR</p>
            <IoMdAddCircleOutline />
          </button>
        </div>
      </div>
    </>
  );
}

import Card from '../Card/Card';

import HPLogo from './../../../assets/img/hp-logo.svg';
import BrotherLogo from './../../../assets/img/brother-logo.svg';
import CanonLogo from './../../../assets/img/canon-logo.svg';
import EpsonLogo from './../../../assets/img/epson-logo.svg';
import LexmarkLogo from './../../../assets/img/lexmark-logo.svg';
import SamsungLogo from './../../../assets/img/samsung-logo.svg';

export function CardMarca() {
  return (
    <>
      <Card image={HPLogo} alt='Logo da HP' buttonLabel='EDITAR' label='HP' />
      <Card
        image={BrotherLogo}
        alt='Logo da Brother'
        buttonLabel='EDITAR'
        label='Brother'
      />
      <Card
        image={CanonLogo}
        alt='Logo da Canon'
        buttonLabel='EDITAR'
        label='Canon'
      />
      <Card
        image={EpsonLogo}
        alt='Logo da Epson'
        buttonLabel='EDITAR'
        label='Epson'
      />
      <Card
        image={LexmarkLogo}
        alt='Logo da Lexmark'
        buttonLabel='EDITAR'
        label='Lexmark'
      />
      <Card
        image={SamsungLogo}
        alt='Logo da Samsung'
        buttonLabel='EDITAR'
        label='Samsung'
      />
    </>
  );
}

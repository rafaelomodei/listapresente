import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import type { GiftItem } from '../../types/gifts';

export type GiftReservationModalProps = {
  gift: GiftItem;
  guestName: string;
  guestPhone: string;
  formError: string;
  onClose: () => void;
  onConfirm: () => void;
  onGuestNameChange: (value: string) => void;
  onGuestPhoneChange: (value: string) => void;
};

const GiftReservationModal = ({
  gift,
  guestName,
  guestPhone,
  formError,
  onClose,
  onConfirm,
  onGuestNameChange,
  onGuestPhoneChange,
}: GiftReservationModalProps) => (
  <div className='modal-overlay' role='dialog' aria-modal='true'>
    <div className='modal'>
      <header>
        <div>
          <p className='modal-eyebrow'>Confirmar presente</p>
          <h2>{gift.name}</h2>
        </div>
        <Button type='button' className='modal-close' onClick={onClose}>
          Fechar
        </Button>
      </header>
      <div className='modal-body'>
        <FormField
          label='Nome completo'
          type='text'
          placeholder='Digite seu nome'
          value={guestName}
          onChange={(event) => onGuestNameChange(event.target.value)}
        />
        <FormField
          label='Telefone'
          type='tel'
          placeholder='(DDD) 00000-0000'
          value={guestPhone}
          onChange={(event) => onGuestPhoneChange(event.target.value)}
        />
        {formError ? <p className='form-error'>{formError}</p> : null}
      </div>
      <footer>
        <Button type='button' variant='secondary' onClick={onClose}>
          Voltar
        </Button>
        <Button type='button' variant='primary' onClick={onConfirm}>
          Confirmar presente
        </Button>
      </footer>
    </div>
  </div>
);

export default GiftReservationModal;

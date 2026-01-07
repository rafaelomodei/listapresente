import { RESERVED_GIFT_IMAGE, getGiftImageSrc } from '../../utils/giftImages';
import type { GiftItem } from '../../types/gifts';

export type GiftCardProps = {
  gift: GiftItem;
  onSelect: (giftId: string) => void;
};

const GiftCard = ({ gift, onSelect }: GiftCardProps) => {
  const isReserved = Boolean(gift.reservedBy);

  return (
    <article className={`gift-card ${isReserved ? 'gift-card--reserved' : ''}`}>
      <div className='gift-content'>
        <img
          className='gift-image'
          src={isReserved ? RESERVED_GIFT_IMAGE : getGiftImageSrc(gift.name)}
          alt={isReserved ? 'Presente reservado' : gift.name}
          loading='lazy'
        />
        <div className='gift-card-body '>
          <h3>{isReserved ? 'Presente reservado' : gift.name}</h3>
          <button
            type='button'
            disabled={isReserved}
            onClick={() => onSelect(gift.id)}
          >
            {isReserved
              ? 'Presente reservado'
              : 'Quero presentear com este item'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default GiftCard;

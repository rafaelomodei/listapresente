import GiftCard from '../molecules/GiftCard';
import type { GiftItem } from '../../types/gifts';

export type GiftCategorySectionProps = {
  name: string;
  gifts: GiftItem[];
  onSelectGift: (giftId: string) => void;
};

const GiftCategorySection = ({
  name,
  gifts,
  onSelectGift,
}: GiftCategorySectionProps) => (
  <section className='category'>
    <div className='category-header'>
      <h2>{name}</h2>
      <span>{gifts.length} itens</span>
    </div>

    <div className='gift-grid'>
      {gifts.map((gift) => (
        <GiftCard key={gift.id} gift={gift} onSelect={onSelectGift} />
      ))}
    </div>
  </section>
);

export default GiftCategorySection;

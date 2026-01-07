import { useMemo, useState } from 'react';
import './App.css';
import GiftCategorySection from './components/organisms/GiftCategorySection';
import GiftReservationModal from './components/organisms/GiftReservationModal';
import HeroSection from './components/organisms/HeroSection';
import InstructionsSection from './components/organisms/InstructionsSection';
import { CATEGORIES } from './data/gifts';
import type { GiftItem } from './types/gifts';
import { createGiftItems } from './utils/giftItems';

function App() {
  const [gifts, setGifts] = useState<GiftItem[]>(() =>
    createGiftItems(CATEGORIES)
  );
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [formError, setFormError] = useState('');

  const selectedGift = useMemo(
    () => gifts.find((gift) => gift.id === selectedGiftId) ?? null,
    [gifts, selectedGiftId]
  );

  const groupedGifts = useMemo(() => {
    return CATEGORIES.map((category) => ({
      name: category.name,
      gifts: gifts.filter((gift) => gift.category === category.name),
    }));
  }, [gifts]);

  const handleOpenModal = (giftId: string) => {
    setSelectedGiftId(giftId);
    setFormError('');
    setGuestName('');
    setGuestPhone('');
  };

  const handleCloseModal = () => {
    setSelectedGiftId(null);
    setFormError('');
  };

  const handleConfirmGift = () => {
    if (!selectedGift) {
      return;
    }

    if (!guestName.trim() || !guestPhone.trim()) {
      setFormError('Informe seu nome e telefone para confirmar o presente.');
      return;
    }

    setGifts((current) =>
      current.map((gift) =>
        gift.id === selectedGift.id
          ? {
              ...gift,
              reservedBy: {
                name: guestName.trim(),
                phone: guestPhone.trim(),
              },
            }
          : gift
      )
    );

    handleCloseModal();
  };

  return (
    <div className='app'>
      <HeroSection />
      <InstructionsSection />

      {groupedGifts.map((category) => (
        <GiftCategorySection
          key={category.name}
          name={category.name}
          gifts={category.gifts}
          onSelectGift={handleOpenModal}
        />
      ))}

      {selectedGift ? (
        <GiftReservationModal
          gift={selectedGift}
          guestName={guestName}
          guestPhone={guestPhone}
          formError={formError}
          onClose={handleCloseModal}
          onConfirm={handleConfirmGift}
          onGuestNameChange={setGuestName}
          onGuestPhoneChange={setGuestPhone}
        />
      ) : null}
    </div>
  );
}

export default App;

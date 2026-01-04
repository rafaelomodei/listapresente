import { useMemo, useState } from 'react'
import './App.css'

type GiftReservation = {
  name: string
  phone: string
}

type GiftItem = {
  id: string
  name: string
  category: string
  reservedBy?: GiftReservation
}

type Category = {
  name: string
  items: string[]
}

const CATEGORIES: Category[] = [
  {
    name: 'Diversos',
    items: [
      'Difusor de aromas (Vanilla)',
      'Tapete para sala (2,5m X 3m)',
      'Caixas organizadoras',
      'Aspirador vertical',
      'Umidificador de ar',
      'Cesto de roupa suja',
      'Lixeiro 50 litros',
      'Tábua de passar',
      'Ferro de passar',
      'Organizador multiuso',
      'Jogo de cama (Casal normal)',
      'Jogo de lençóis (Casal normal)',
      'Edredom (Casal)',
      'Travesseiros',
      'Protetor de colchão',
      'Organizadores de gaveta',
      'Peseira para cama',
      'Passadeira',
      'Jogo de ferramentas',
      'Balde',
    ],
  },
  {
    name: 'Banheiro',
    items: [
      'Jogo de toalhas banho',
      'Toalha de rosto',
      'Tapete de banheiro',
      'Kit lavabo',
      'Lixeira para banheiro',
      'Cesto para roupas',
    ],
  },
  {
    name: 'Cozinha',
    items: [
      'Panos de prato',
      'Soplast',
      'Caminho de mesa',
      'Toalhas de mesa (4 lugares)',
      'Descanso de panela',
      'Luvas térmicas',
      'Porta talheres',
      'Porta condimentos',
      'Porta temperos',
      'Potes plásticos (herméticos)',
      'Tábua de corte',
      'Abridor de garrafa/lata',
      'Jogo de espátulas de silicone',
      'Jogo de facas',
      'Jogo de talheres',
      'Jogo de copos',
      'Jogo de sobremesa',
      'Jogo de panelas',
      'Abridor de vinho',
      'Abridor de garrafa',
      'Frigideira antiaderente',
      'Assadeiras',
      'Forma de bolo',
      'Forma de pizza',
      'Jarra',
      'Marinex',
      'Espremedor de limão',
      'Espremedor elétrico de laranja',
      'Cortador de pizza',
      'Pegador de sorvete',
      'Funil',
      'Kit colher medidora',
      'Boleira',
      'Fruteira',
      'Descascador de legumes',
      'Petisqueira',
      'Queijeira',
      'Manteigueira',
      'Escorredor de arroz',
      'Jogo de xícaras',
      'Jogo de pratos',
      'Jogo de taças',
      'Garrafa térmica de café',
      'Balança de cozinha',
      'Porta-papel toalha',
      'Mixer',
      'Sanduicheira',
      'Cafeteira',
      'Chaleira elétrica',
      'Processador de alimentos',
      'Micro-ondas',
      'Kit churrasco',
      'Jogo de tapete',
    ],
  },
]

const HERO_TITLE = 'Lista de Presentes do Chá de Cozinha'
const HERO_SUBTITLE =
  'Escolha um presente para a Thaís e o João e confirme com seu nome e telefone para evitar presentes repetidos.'

const createGiftItems = (categories: Category[]): GiftItem[] =>
  categories.flatMap((category) =>
    category.items.map((item, index) => ({
      id: `${category.name.toLowerCase()}-${index + 1}`,
      name: item,
      category: category.name,
    })),
  )

function App() {
  const [gifts, setGifts] = useState<GiftItem[]>(() =>
    createGiftItems(CATEGORIES),
  )
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null)
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [formError, setFormError] = useState('')

  const selectedGift = useMemo(
    () => gifts.find((gift) => gift.id === selectedGiftId) ?? null,
    [gifts, selectedGiftId],
  )

  const groupedGifts = useMemo(() => {
    return CATEGORIES.map((category) => ({
      name: category.name,
      gifts: gifts.filter((gift) => gift.category === category.name),
    }))
  }, [gifts])

  const handleOpenModal = (giftId: string) => {
    setSelectedGiftId(giftId)
    setFormError('')
    setGuestName('')
    setGuestPhone('')
  }

  const handleCloseModal = () => {
    setSelectedGiftId(null)
    setFormError('')
  }

  const handleConfirmGift = () => {
    if (!selectedGift) {
      return
    }

    if (!guestName.trim() || !guestPhone.trim()) {
      setFormError('Informe seu nome e telefone para confirmar o presente.')
      return
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
          : gift,
      ),
    )

    handleCloseModal()
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="hero-eyebrow">Chá de cozinha • Thaís & João</p>
        <h1>{HERO_TITLE}</h1>
        <p className="hero-subtitle">{HERO_SUBTITLE}</p>
      </header>

      <section className="instructions">
        <div>
          <h2>Como funciona</h2>
          <p>
            Selecione um item disponível, confirme seu nome e telefone, e o
            presente ficará reservado para você. Assim evitamos presentes
            repetidos.
          </p>
        </div>
        <div className="info-box">
          <h3>Precisa falar com a gente?</h3>
          <p>
            Caso haja alguma dúvida, entraremos em contato com você pelo número
            informado.
          </p>
        </div>
      </section>

      {groupedGifts.map((category) => (
        <section key={category.name} className="category">
          <div className="category-header">
            <h2>{category.name}</h2>
            <span>{category.gifts.length} itens</span>
          </div>

          <div className="gift-grid">
            {category.gifts.map((gift) => (
              <article
                key={gift.id}
                className={`gift-card ${gift.reservedBy ? 'gift-card--reserved' : ''}`}
              >
                <div>
                  <h3>{gift.name}</h3>
                  <p>
                    {gift.reservedBy
                      ? `Reservado por ${gift.reservedBy.name}`
                      : 'Disponível para presentear'}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={Boolean(gift.reservedBy)}
                  onClick={() => handleOpenModal(gift.id)}
                >
                  {gift.reservedBy
                    ? 'Presente reservado'
                    : 'Quero presentear com este item'}
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}

      {selectedGift ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <header>
              <div>
                <p className="modal-eyebrow">Confirmar presente</p>
                <h2>{selectedGift.name}</h2>
              </div>
              <button type="button" className="modal-close" onClick={handleCloseModal}>
                Fechar
              </button>
            </header>
            <div className="modal-body">
              <label>
                Nome completo
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                />
              </label>
              <label>
                Telefone
                <input
                  type="tel"
                  placeholder="(DDD) 00000-0000"
                  value={guestPhone}
                  onChange={(event) => setGuestPhone(event.target.value)}
                />
              </label>
              {formError ? <p className="form-error">{formError}</p> : null}
            </div>
            <footer>
              <button type="button" className="secondary" onClick={handleCloseModal}>
                Voltar
              </button>
              <button type="button" className="primary" onClick={handleConfirmGift}>
                Confirmar presente
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App

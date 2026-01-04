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

const createSvgDataUri = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`

const createGiftImageSvg = (label: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2a231d" />
        <stop offset="100%" stop-color="#3b2c22" />
      </linearGradient>
    </defs>
    <rect width="480" height="320" rx="24" fill="url(#bg)" />
    <circle cx="376" cy="80" r="64" fill="rgba(217,121,64,0.2)" />
    <circle cx="96" cy="240" r="72" fill="rgba(255,255,255,0.08)" />
    <text x="50%" y="54%" text-anchor="middle" font-size="140" font-family="Inter, Arial, sans-serif" fill="#f5e9dc" opacity="0.9">${label}</text>
  </svg>
`

const createReservedGiftSvg = () => `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" rx="24" fill="#1f1b18" />
    <path d="M142 136h196v120a16 16 0 0 1-16 16H158a16 16 0 0 1-16-16V136Z" fill="#d97940" opacity="0.8" />
    <path d="M126 120a16 16 0 0 1 16-16h196a16 16 0 0 1 16 16v24H126v-24Z" fill="#c7997e" />
    <path d="M240 104c-22 0-40-18-40-40 0-14 9-26 22-26 9 0 18 6 26 18 8-12 17-18 26-18 13 0 22 12 22 26 0 22-18 40-40 40h-16Z" fill="#f5e9dc" />
    <rect x="230" y="136" width="20" height="136" fill="#f5e9dc" opacity="0.8" />
  </svg>
`

const RESERVED_GIFT_IMAGE = createSvgDataUri(createReservedGiftSvg())

const getGiftImageSrc = (name: string) => {
  const label = name.trim().charAt(0).toUpperCase() || 'P'
  return createSvgDataUri(createGiftImageSvg(label))
}

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
                  <img
                    className="gift-image"
                    src={gift.reservedBy ? RESERVED_GIFT_IMAGE : getGiftImageSrc(gift.name)}
                    alt={gift.reservedBy ? 'Presente reservado' : gift.name}
                    loading="lazy"
                  />
                  <h3>{gift.reservedBy ? 'Presente reservado' : gift.name}</h3>
                  {gift.reservedBy ? <p>Reservado</p> : null}
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

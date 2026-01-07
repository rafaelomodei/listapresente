import { HERO_SUBTITLE, HERO_TITLE } from '../../data/gifts';

const HeroSection = () => (
  <header className='hero'>
    <p className='hero-eyebrow'>Chá de cozinha • Thaís & João</p>
    <h1 className='hero-title'>{HERO_TITLE}</h1>
    <p className='hero-subtitle'>{HERO_SUBTITLE}</p>
  </header>
);

export default HeroSection;

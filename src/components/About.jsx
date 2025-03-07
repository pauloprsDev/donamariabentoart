import React from 'react'
import { FaHeart, FaPaintBrush, FaGem } from 'react-icons/fa'
import './About.css'

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Nossa História</h1>
        <p>Tradição e Arte em Cada Detalhe</p>
      </div>

      <div className="about-story">
        <div className="story-image">
          <img src="Confira-as-5-flores-para-plantar-no-inverno-em-qualquer-regiao-do-Brasil.jpg" alt="Dona Maria Bento Arts" />
        </div>
        <div className="story-content">
          <h2>Dona Maria Bento Arts</h2>
          <p>Com mais de 10 anos de experiência em pintura em tecidos, nossa história começou com um sonho de transformar tecidos simples em verdadeiras obras de arte.</p>
          <p>Cada peça é cuidadosamente pintada à mão, garantindo exclusividade e qualidade em todos os detalhes.</p>
        </div>
      </div>

      <div className="values-section">
        <h2>Nossos Valores</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Dedicação</h3>
            <p>Amor e cuidado em cada pincelada</p>
          </div>
          <div className="value-card">
            <FaPaintBrush className="value-icon" />
            <h3>Artesanal</h3>
            <p>Técnicas tradicionais e exclusivas</p>
          </div>
          <div className="value-card">
            <FaGem className="value-icon" />
            <h3>Qualidade</h3>
            <p>Materiais selecionados e duráveis</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
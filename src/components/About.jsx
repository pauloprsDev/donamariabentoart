/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaLeaf, FaPalette } from 'react-icons/fa';
import PageTransition from './PageTransition';
import '../styles/About.css';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function About() {
  // Removed timelineEvents array
  
  const values = [
    { icon: <FaHeart />, title: 'Amor', description: 'Cada peça é criada com amor e dedicação, transmitindo sentimentos positivos.' },
    { icon: <FaHandHoldingHeart />, title: 'Cuidado', description: 'Atenção aos detalhes e acabamento impecável em todos os produtos.' },
    { icon: <FaLeaf />, title: 'Sustentabilidade', description: 'Compromisso com práticas sustentáveis e materiais eco-friendly.' },
    { icon: <FaPalette />, title: 'Criatividade', description: 'Designs únicos e originais que transformam ambientes.' }
  ];

  return (
    <PageTransition>
      <div className="about-page">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Nossa História</h1>
          <p>Conheça a jornada da Dona Maria Bento, uma história de paixão pelo artesanato e dedicação à arte.</p>
        </motion.div>

        <motion.div 
          className="about-story"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-image">
            <img src={`${import.meta.env.BASE_URL}about-image.jpg`} alt="Dona Maria Bento trabalhando em seu ateliê" />
          </div>
          <div className="about-content">
            <h2>Como Tudo Começou</h2>
            <p>
              A história da Dona Maria Bento começou com um simples desejo de transformar tecidos e linhas em arte. 
              O que começou como um passatempo se transformou em uma paixão que hoje compartilhamos com você.
            </p>
            <p>
              Nossa missão é criar peças únicas que tragam beleza e funcionalidade para o seu lar, 
              sempre com o toque especial do trabalho feito à mão, com carinho e dedicação.
            </p>
            <p>
              Cada produto que criamos carrega uma história, um sentimento e muitas horas de trabalho 
              cuidadoso para garantir que você receba apenas o melhor.
            </p>
          </div>
        </motion.div>

        {/* Removed timeline section */}

        <motion.div 
          className="values-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Nossos Valores</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                className="value-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default About;
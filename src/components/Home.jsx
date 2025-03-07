import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import PageTransition from './PageTransition'
import '../styles/Home.css'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Using public folder paths instead of imports
function Home() {
  const featuredItems = [
    {
      title: "Coleção Floral",
      description: "Hortênsias em tons de azul e roxo, pintadas à mão com delicadeza e amor",
      image: "/donamariabentoart/18920318-flores-de-lavanda-na-vista-superior-de-fundo-rosa-copie-o-espaco-foto.jpg"
    },
    {
      title: "Série Abstrata",
      description: "Panos de prato com frases inspiradoras e designs exclusivos",
      image: "/donamariabentoart/cozinhareamar.jpg"
    },
    {
      title: "Inspiração Natural",
      description: "Designs inspirados na natureza",
      image: "/donamariabentoart/coisas_boas_acontecem.jpg"
    }
  ]
  
  return (
    <PageTransition>
      <main className="home">
        <section className="hero">
          <motion.div 
            className="hero-content"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              className="logo-wrapper"
            >
              <img 
                src="/donamariabentoart/logo.jpg"
                alt="Dona Maria Bento Art Logo" 
                className="home-logo"
                style={{
                  maxWidth: '200px',
                  margin: '0 auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </motion.div>
            
            {/* Rest of the component remains unchanged */}
            <motion.h1
              variants={fadeInUp}
              className="hero-title"
            >
              Dona Maria Bento
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="hero-subtitle"
            >
              <FaHeart style={{ color: '#B76E79', verticalAlign: 'middle', marginRight: '8px' }} />
              Produto Artesanal feito com muito amor
              <FaHeart style={{ color: '#B76E79', verticalAlign: 'middle', marginLeft: '8px' }} />
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="cta-wrapper"
            >
              
              <Link to="/products" className="cta-button">
                Explorar Coleção
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="featured">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              Destaques da Coleção
            </motion.h2>
            <div className="featured-grid">
              {featuredItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="featured-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="featured-item-image">
                    <motion.img 
                      src={item.image} 
                      alt={item.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="featured-item-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-preview">
          <div className="container">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Artesanato com Amor
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Cada peça é criada com dedicação e paixão pela arte.
              </motion.p>
              <motion.div
                className="button-wrapper"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/about" className="learn-more-button">
                  Conheça Nossa História
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}

export default Home
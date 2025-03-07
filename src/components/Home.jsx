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
      image: `./18920318-flores-de-lavanda-na-vista-superior-de-fundo-rosa-copie-o-espaco-foto.jpg`
    },
    {
      title: "Série Abstrata",
      description: "Panos de prato com frases inspiradoras e designs exclusivos",
      image: "./cozinhareamar.jpg"
    },
    {
      title: "Inspiração Natural",
      description: "Designs inspirados na natureza",
      image: "./coisas_boas_acontecem.jpg"
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
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="Dona Maria Bento Art Logo" 
                className="home-logo"
              />
            </motion.div>
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
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="featured-item-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
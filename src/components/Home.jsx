/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion'
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
      image: `${import.meta.env.BASE_URL}18920318-flores-de-lavanda-na-vista-superior-de-fundo-rosa-copie-o-espaco-foto.jpg`
    },
    {
      title: "Série Abstrata",
      description: "Panos de prato com frases inspiradoras e designs exclusivos",
      image: `${import.meta.env.BASE_URL}cozinhareamar.jpg`
    },
    {
      title: "Inspiração Natural",
      description: "Designs inspirados na natureza",
      image: `${import.meta.env.BASE_URL}coisas_boas_acontecem.jpg`
    }
  ]
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  
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
              className="logo-wrapper"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2
              }}
            >
              <div className="logo-background"></div>
              
              {/* Enhanced rose decorations */}
              <div className="flower-decoration flower-1">
                <div className="flower-center"></div>
                <div className="flower-petal petal-1"></div>
                <div className="flower-petal petal-2"></div>
                <div className="flower-petal petal-3"></div>
                <div className="flower-petal petal-4"></div>
                <div className="flower-petal petal-5"></div>
                <div className="flower-petal petal-6"></div>
                <div className="flower-petal petal-7"></div>
                <div className="flower-petal petal-8"></div>
                <div className="flower-petal petal-9"></div>
                <div className="flower-petal petal-10"></div>
              </div>
              
              <div className="flower-decoration flower-2">
                <div className="flower-center"></div>
                <div className="flower-petal petal-1"></div>
                <div className="flower-petal petal-2"></div>
                <div className="flower-petal petal-3"></div>
                <div className="flower-petal petal-4"></div>
                <div className="flower-petal petal-5"></div>
                <div className="flower-petal petal-6"></div>
                <div className="flower-petal petal-7"></div>
                <div className="flower-petal petal-8"></div>
                <div className="flower-petal petal-9"></div>
                <div className="flower-petal petal-10"></div>
              </div>
              
              <div className="flower-decoration flower-3">
                <div className="flower-center"></div>
                <div className="flower-petal petal-1"></div>
                <div className="flower-petal petal-2"></div>
                <div className="flower-petal petal-3"></div>
                <div className="flower-petal petal-4"></div>
                <div className="flower-petal petal-5"></div>
                <div className="flower-petal petal-6"></div>
                <div className="flower-petal petal-7"></div>
                <div className="flower-petal petal-8"></div>
                <div className="flower-petal petal-9"></div>
                <div className="flower-petal petal-10"></div>
              </div>
              
              <div className="flower-decoration flower-4">
                <div className="flower-center"></div>
                <div className="flower-petal petal-1"></div>
                <div className="flower-petal petal-2"></div>
                <div className="flower-petal petal-3"></div>
                <div className="flower-petal petal-4"></div>
                <div className="flower-petal petal-5"></div>
                <div className="flower-petal petal-6"></div>
                <div className="flower-petal petal-7"></div>
                <div className="flower-petal petal-8"></div>
                <div className="flower-petal petal-9"></div>
                <div className="flower-petal petal-10"></div>
              </div>
              
              <div className="flower-decoration flower-5">
                <div className="flower-center"></div>
                <div className="flower-petal petal-1"></div>
                <div className="flower-petal petal-2"></div>
                <div className="flower-petal petal-3"></div>
                <div className="flower-petal petal-4"></div>
                <div className="flower-petal petal-5"></div>
              </div>
              
              <div className="flower-decoration flower-6">
                <div className="flower-center"></div>
                <div className="flower-petal petal-1"></div>
                <div className="flower-petal petal-2"></div>
                <div className="flower-petal petal-3"></div>
                <div className="flower-petal petal-4"></div>
                <div className="flower-petal petal-5"></div>
              </div>
              
              <img 
                src={`${import.meta.env.BASE_URL}logo.jpeg`}
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
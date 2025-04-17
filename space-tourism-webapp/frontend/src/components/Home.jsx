import React, { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Home.css';

import starsBg      from '../assets/stars.png';
import moonSurface  from '../assets/moon1.png';
import astronautImg from '../assets/astronaut.png';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const heroRef  = useRef(null);
  const moonRef  = useRef(null);
  const astroRef = useRef(null);
  const textRef  = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const hero = heroRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start:    'top top',
        end:      () => `+=${hero.offsetHeight}`,
        scrub:    true,
        pin:      true,
      }
    });

    tl
      .fromTo(moonRef.current,  { y:  200 }, { y:   0, ease: 'none' }, 0)
      .fromTo(astroRef.current, { y: -70 },  { y: 100, ease: 'none' }, 0)
      .fromTo(textRef.current,  { autoAlpha: 0, y:20 }, { autoAlpha: 1, y:0, ease: 'none' }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);

  const handleLogout = () => {
    // clear any auth state you have
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="home-root">
      {/* ─── NAVBAR ───────────────────────────────────────────────────────────── */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand glow-effect" to="/home">Space Tourism</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#hero">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#mission">Mission</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#carousel-section">Gallery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Add top padding so content isn’t hidden under fixed navbar */}
      <div style={{ paddingTop: '70px' }}>
        {/* ─── HERO ───────────────────────────────────────────────────────────── */}
        <section
          id="hero"
          ref={heroRef}
          style={{
            backgroundImage: `url(${starsBg})`,
            backgroundRepeat:  'no-repeat',
            backgroundSize:    'cover',
            backgroundPosition:'center'
          }}
        >
          <img
            id="moon"
            ref={moonRef}
            className="object"
            src={moonSurface}
            alt="Moon"
          />
          <img
            id="astronaut"
            ref={astroRef}
            className="object"
            src={astronautImg}
            alt="Astronaut"
          />
          <h1 id="welcomeText" ref={textRef}>
            Welcome To Your Space Journey!
          </h1>
        </section>

        {/* ─── MISSION ────────────────────────────────────────────────────────── */}
        <section id="mission" data-aos="fade-up">
          <div className="video-background">
            <video autoPlay loop muted playsInline>
              <source src="/Video/Mission.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="mission-content">
            <h2 className="mission-heading">Our Mission</h2>
            <p>
              Our mission is to revolutionize space tourism by combining
              cutting‐edge technology, luxurious comfort, and unparalleled adventure.
            </p>
          </div>
        </section>

        {/* ─── GALLERY ────────────────────────────────────────────────────────── */}
        <section id="carousel-section" data-aos="fade-up">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" />
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" />
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/solar system.jpg" className="d-block w-100" alt="Explore Planets" />
                <div className="carousel-caption">
                  <h5>Explore Different Planets</h5>
                  <p>Choose from Mars, Titan, Europa, and more.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/images/spacecraft.jpeg" className="d-block w-100" alt="Crew Capsule Tour" />
                <div className="carousel-caption">
                  <h5>Crew Capsule Tour</h5>
                  <p>Experience luxury and safety in our spacecraft.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="/images/crew.jpg" className="d-block w-100" alt="Train with Astronauts" />
                <div className="carousel-caption">
                  <h5>Train with Astronauts</h5>
                  <p>Hands‑on training with experienced crew.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </section>

        {/* ─── CONTACT ────────────────────────────────────────────────────────── */}
        <section id="contact" data-aos="fade-up">
          <div className="contact-wrapper">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <input className="form-control" placeholder="Name" />
              <input className="form-control" placeholder="Email" />
              <textarea className="form-control" rows="4" placeholder="Your Message" />
              <button className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </section>

        {/* ─── FILLER ─────────────────────────────────────────────────────────── */}
        <section className="filler-section" data-aos="fade-up">
          <h2>Beyond Earth</h2>
          <p>Discover immersive experiences beyond Earth's orbit. Enroll in our space missions and start your cosmic adventure today.</p>
        </section>
        <section className="filler-section alt" data-aos="fade-up">
          <h2>Space Gear</h2>
          <p>Shop astronaut‑approved travel gear, zero‑gravity snacks, and intergalactic souvenirs from our onboard store.</p>
        </section>

        {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
        <footer data-aos="fade-up">
          <p>© 2025 Space Tourism. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

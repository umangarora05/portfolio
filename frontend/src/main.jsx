import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, User, GraduationCap, Briefcase, Code2, Award, Mail, Github, Linkedin, ExternalLink, FileText } from 'lucide-react';
import './styles.css';

const emailAddress = 'umangarora2003@gmail.com';
const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent('Portfolio enquiry')}`;
const leetcodeProfileUrl = 'https://leetcode.com/u/UmangArora05';

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Projects', href: '#projects', icon: Briefcase },
  { label: 'Skills', href: '#skills', icon: Code2 },
  { label: 'Contact', href: '#contact', icon: Mail },
];

function LeetCodeWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://leetcode-stats-api.herokuapp.com/UmangArora05')
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setStats(data);
        else setError(true);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (!loading && (error || !stats)) return null;

  return (
    <div className="leetcode-widget animate-fade-up delay-200">
      <h3>
        <a href={leetcodeProfileUrl} target="_blank" rel="noreferrer">LeetCode Activity</a>
      </h3>
      {loading ? (
        <p>Loading live stats...</p>
      ) : (
        <>
          <div className="leetcode-stats">
            <div className="stat-box">
              <div className="stat-value">{stats.totalSolved}</div>
              <div className="stat-label">Total Solved</div>
              <div style={{fontSize: '0.75rem', opacity: 0.8, marginTop: '8px'}}>
                <span style={{color: '#00b8a3'}}>E: {stats.easySolved}</span> | 
                <span style={{color: '#ffc01e'}}> M: {stats.mediumSolved}</span> | 
                <span style={{color: '#ff375f'}}> H: {stats.hardSolved}</span>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.acceptanceRate}%</div>
              <div className="stat-label">Acceptance</div>
            </div>
            {stats.ranking && (
              <div className="stat-box">
                <div className="stat-value">#{stats.ranking.toLocaleString()}</div>
                <div className="stat-label">Ranking</div>
              </div>
            )}
          </div>
          <a href={leetcodeProfileUrl} target="_blank" rel="noreferrer" style={{color: 'var(--primary)', marginTop: '24px', display: 'inline-block', fontWeight: '600'}}>
            View Full Profile →
          </a>
        </>
      )}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('#home');
  const [profilePinned, setProfilePinned] = useState(false);
  const profileTriggerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileTriggerRef.current && !profileTriggerRef.current.contains(event.target)) {
        setProfilePinned(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'projects', 'skills', 'achievements', 'contact'];
      let current = '#home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = `#${section}`;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="nav-wrap">
        <div className="nav-container">
          <div className="nav-brand">
            <div ref={profileTriggerRef} className={`profile-trigger ${profilePinned ? 'is-open' : ''}`}>
              <button
                type="button"
                className="profile-photo-button"
                onClick={() => setProfilePinned((isPinned) => !isPinned)}
                aria-label="View Umang Arora profile"
                aria-expanded={profilePinned}
              >
                <img className="logo-photo" src="/images/umang-navbar.png" alt="Umang Arora" />
              </button>
              <div className="profile-card" role="dialog" aria-label="About Umang Arora">
                <button
                  type="button"
                  className="profile-card-close"
                  onClick={() => setProfilePinned(false)}
                  aria-label="Close profile"
                >
                  ×
                </button>
                <img className="profile-card-photo" src="/images/suit.jpg" alt="Umang Arora in a suit" />
                <div className="profile-card-content">
                  <h2>Hi, I'm Umang Arora</h2>
                  <p className="profile-card-role">Full-Stack Developer · AI/ML Engineer</p>
                  <p>
                    I build full-stack and AI-powered applications end to end, from event-driven
                    backends to explainable ML systems.
                  </p>
                  <a href="#about" onClick={() => setProfilePinned(false)}>Read my About section →</a>
                </div>
              </div>
            </div>
            <a href="#home" className="nav-brand-text">
              <span className="nav-brand-name">Umang Arora</span>
              <span className="nav-brand-title">Full-Stack · AI/ML</span>
            </a>
          </div>
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
            <a href="/umang.pdf" target="_blank" rel="noreferrer" className="btn-primary" style={{padding: '8px 16px', fontSize: '0.9rem', borderRadius: '6px', marginLeft: '8px'}}>Resume</a>
          </div>
        </div>
      </nav>

      <main className="main-wrapper">
        
        {/* Landing Section */}
        <section id="home" className="hero-section">
          <div className="page-container">
            <div className="hero-content">
              <span className="hero-designation animate-fade-up">MCA Student · Full-Stack Developer · AI/ML Engineer</span>
              <h1 className="hero-heading animate-fade-up delay-100">
                Hi, I'm <span className="gradient-text">Umang Arora</span>.
              </h1>
              <p className="hero-description animate-fade-up delay-200">
                I build full-stack and AI-powered applications end to end — from event-driven backends handling thousands of concurrent requests to explainable ML systems patented for their approach to design-decision automation.
              </p>
              <div className="hero-actions animate-fade-up delay-300">
                <a href="#about" className="btn-primary">Learn More About Me</a>
                <a href="#contact" className="btn-secondary">Get In Touch</a>
              </div>
              <div className="social-links animate-fade-up delay-300">
                <a href="https://github.com/umangarora05" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub"><Github size={24} /></a>
                <a href="https://linkedin.com/in/umangarora05" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={24} /></a>
                <a href={emailHref} target="_blank" rel="noreferrer" className="social-icon" aria-label={`Email ${emailAddress}`}><Mail size={24} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about">
          <div className="page-container">
            <h2 className="section-title animate-fade-up">About <span>Me</span></h2>
            <div className="about-grid">
              <div className="about-text animate-fade-up delay-100">
                <p>
                  I'm currently pursuing my MCA at Vellore Institute of Technology (CGPA 8.48 in my first year), after completing a BCA at Panjab University. My technical core is Java, JavaScript, and SQL, working across Spring Boot, Node.js, and React on the backend and frontend.
                </p>
                <p>
                  I've architected event-driven systems with Apache Kafka processing 1,000+ concurrent events per second, built secure role-based platforms with JWT authentication serving thousands of daily users, and co-developed a patented explainable-AI system for brand-logo trust scoring — published as Indian Patent IN202641096863 A1 through VIT's IPR & TT Cell.
                </p>
                <p>
                  What sets me apart is a habit of shipping complete systems — validation, error handling, caching, and deployment included — not just prototypes.
                </p>
                <div style={{marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
                  <a href="#education" className="btn-secondary">Education</a>
                  <a href="#projects" className="btn-secondary">Projects</a>
                  <a href="#skills" className="btn-secondary">Skills</a>
                </div>
              </div>
              <div className="mission-vision animate-fade-up delay-200">
                <h3>Mission</h3>
                <p>To build software that solves real operational problems reliably, combining rigorous engineering with thoughtful, human-centered design.</p>
                <br/>
                <h3>Vision</h3>
                <p>To grow into an engineer who bridges applied AI research and production-grade software — turning patentable ideas into systems people actually use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <div className="page-container">
            <h2 className="section-title animate-fade-up">My <span>Education</span></h2>
            <div className="timeline">
              <div className="timeline-item animate-fade-up delay-100">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">07/2025 – Present</span>
                  <h3>Master of Computer Applications (MCA)</h3>
                  <h4>Vellore Institute of Technology (VIT)</h4>
                  <p style={{marginBottom: '12px', fontWeight: 'bold'}}>CGPA (First Year): 8.48</p>
                  <ul>
                    <li>Advanced coursework in distributed systems, AI/ML, and software engineering.</li>
                    <li>Applied research culminating in a filed Indian patent (IN202641096863 A1).</li>
                    <li>Full-time postgraduate program.</li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item animate-fade-up delay-200">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">08/2022 – 07/2025</span>
                  <h3>Bachelor of Computer Applications (BCA)</h3>
                  <h4>Goswami Ganesh Dutta Sanatan Dharma College, Panjab University</h4>
                  <p style={{marginBottom: '12px', fontWeight: 'bold'}}>Percentage: 73.87%</p>
                  <ul>
                    <li>Foundation in OOP, data structures & algorithms, and database systems.</li>
                    <li>Built first full-stack and applied-AI projects during this period.</li>
                    <li>Full-time undergraduate program.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className="page-container">
            <h2 className="section-title animate-fade-up">Featured <span>Projects</span></h2>
            <div className="projects-grid">
              
              <div className="project-card animate-fade-up delay-100">
                <div className="project-image-wrapper">
                  <a href="https://min.umangarora.in" target="_blank" rel="noreferrer" style={{display: 'block', height: '100%'}}>
                    <img src="/images/minit.png" alt="MINIT" className="project-image" />
                  </a>
                </div>
                <div className="project-header">
                  <h3 className="project-title">
                    <a href="https://min.umangarora.in" target="_blank" rel="noreferrer" className="project-link">MINIT <ExternalLink size={18} style={{display:'inline', marginLeft:'8px'}} /></a>
                  </h3>
                </div>
                <p className="project-type">Full-Stack / Event-Driven Microservices</p>
                <p className="project-desc">A role-based campus marketplace connecting students, vendors, delivery agents, and admins, built on independently deployable Node.js microservices behind an API Gateway.</p>
                <ul className="project-outcomes">
                  <li>Enabled 50+ merchants and 5,000+ student users</li>
                  <li>Integrated Kafka for order processing at 1,000+ events/sec</li>
                  <li>Redis caching cut API latency for 30% of critical requests</li>
                  <li>Atomic inventory updates and optimistic locking</li>
                </ul>
                <div className="project-tech">
                  <span className="tech-tag">React</span><span className="tech-tag">Node.js</span><span className="tech-tag">Kafka</span><span className="tech-tag">Redis</span><span className="tech-tag">Docker</span>
                </div>
              </div>

              <div className="project-card animate-fade-up delay-200">
                <div className="project-image-wrapper">
                  <a href="https://morrows.umangarora.in" target="_blank" rel="noreferrer" style={{display: 'block', height: '100%'}}>
                    <img src="/images/morrow.png" alt="Morrow" className="project-image" />
                  </a>
                </div>
                <div className="project-header">
                  <h3 className="project-title">
                    <a href="https://morrows.umangarora.in" target="_blank" rel="noreferrer" className="project-link">Morrow <ExternalLink size={18} style={{display:'inline', marginLeft:'8px'}} /></a>
                  </h3>
                </div>
                <p className="project-type">Full-Stack AI Application</p>
                <p className="project-desc">Converts meeting audio/video into structured briefs — transcripts, executive summaries, decisions, and prioritized action items.</p>
                <ul className="project-outcomes">
                  <li>Multilingual pipeline (English / Hindi-to-English translation)</li>
                  <li>Provider-agnostic architecture (OpenAI Whisper / Google Gemini)</li>
                  <li>FFmpeg-based audio extraction with failure retry logic</li>
                  <li>One-click export to PDF and Word</li>
                </ul>
                <div className="project-tech">
                  <span className="tech-tag">FastAPI</span><span className="tech-tag">React</span><span className="tech-tag">OpenAI</span><span className="tech-tag">Gemini</span><span className="tech-tag">FFmpeg</span>
                </div>
              </div>

              <div className="project-card animate-fade-up delay-100">
                <div className="project-image-wrapper">
                  <a href="http://trustengine.umangarora.in/" target="_blank" rel="noreferrer" style={{display: 'block', height: '100%'}}>
                    <img src="/images/trustengine.png" alt="Differential Trust Engine" className="project-image" />
                  </a>
                </div>
                <div className="project-header">
                  <h3 className="project-title">
                    <a href="http://trustengine.umangarora.in/" target="_blank" rel="noreferrer" className="project-link">Differential Trust Engine <ExternalLink size={18} style={{display:'inline', marginLeft:'8px'}} /></a>
                  </h3>
                </div>
                <p className="project-type">AI/ML Full-Stack · Patented</p>
                <p className="project-desc">A context-adaptive explainable-AI platform estimating a logo's trust propensity from color, geometry, and typography.</p>
                <ul className="project-outcomes">
                  <li>Validated on 167,140 real-world logos with R² = 0.73</li>
                  <li>Patented mechanisms for context-aware SHAP calibration (IN202641096863 A1)</li>
                  <li>Ensemble model combining differential and general-logo scoring</li>
                </ul>
                <div className="project-tech">
                  <span className="tech-tag">LightGBM</span><span className="tech-tag">SHAP</span><span className="tech-tag">OpenCV</span><span className="tech-tag">ResNet50</span><span className="tech-tag">FastAPI</span>
                </div>
              </div>

              <div className="project-card animate-fade-up delay-200">
                <div className="project-image-wrapper">
                  <a href="https://dataflow.umangarora.in" target="_blank" rel="noreferrer" style={{display: 'block', height: '100%'}}>
                    <img src="/images/dataflow.png" alt="HR Workflow Designer" className="project-image" />
                  </a>
                </div>
                <div className="project-header">
                  <h3 className="project-title">
                    <a href="https://dataflow.umangarora.in" target="_blank" rel="noreferrer" className="project-link">HR Workflow Designer <ExternalLink size={18} style={{display:'inline', marginLeft:'8px'}} /></a>
                  </h3>
                </div>
                <p className="project-type">Frontend Prototype / Product Design</p>
                <p className="project-desc">A visual, drag-and-drop workflow builder for modeling HR processes with a mock-API execution simulator and real-time validation.</p>
                <ul className="project-outcomes">
                  <li>Drag-and-drop canvas with dynamic node configuration</li>
                  <li>Built-in validation for disconnected flows and cycles</li>
                  <li>Mock API layer (MSW) simulates backend execution</li>
                </ul>
                <div className="project-tech">
                  <span className="tech-tag">React</span><span className="tech-tag">TypeScript</span><span className="tech-tag">React Flow</span><span className="tech-tag">Zustand</span><span className="tech-tag">MSW</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <div className="page-container">
            <h2 className="section-title animate-fade-up">Technical <span>Skills</span></h2>
            <div className="skills-container">
              <div className="skills-list animate-fade-up delay-100">
                
                <div className="skill-category">
                  <h3>Languages & Other Skills</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Java</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">SQL</span>
                    <span className="skill-tag">OOP</span>
                    <span className="skill-tag">DSA</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Frameworks & Libraries</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">Spring Boot</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">React.js</span>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Databases & Tools</h3>
                  <div className="skill-tags">
                    <span className="skill-tag">MongoDB</span>
                    <span className="skill-tag">Redis</span>
                    <span className="skill-tag">Apache Kafka</span>
                    <span className="skill-tag">REST APIs</span>
                    <span className="skill-tag">JWT</span>
                  </div>
                </div>

              </div>
              <LeetCodeWidget />
            </div>
          </div>
        </section>

        {/* Achievements / Highlights Section */}
        <section id="achievements">
          <div className="page-container">
            <h2 className="section-title animate-fade-up">Key <span>Highlights</span></h2>
            
            <div className="achievements-grid animate-fade-up delay-100">
              <a className="achievement-card achievement-link" href={leetcodeProfileUrl} target="_blank" rel="noreferrer">
                <div className="achievement-number">150+</div>
                <div className="achievement-label">LeetCode Questions Solved</div>
              </a>
              <div className="achievement-card">
                <div className="achievement-number">5</div>
                <div className="achievement-label">Major Projects</div>
              </div>
              <div className="achievement-card">
                <div className="achievement-number">1</div>
                <div className="achievement-label">Patent Filed</div>
              </div>
            </div>

            <ul className="highlights-list animate-fade-up delay-200">
              <li>Patented two core mechanisms (Achromatic Signal Gate, Dominant Signal Contextualiser) as part of Indian Patent IN202641096863 A1</li>
              <li>Solved 500+ quantitative aptitude problems integrating data structures for analytical reasoning</li>
              <li>Collaborated with 5 team members across 2 successfully completed projects</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="page-container">
            <h2 className="section-title animate-fade-up">Let's Build <span>Something</span></h2>
            
            <div className="contact-container animate-fade-up delay-100">
              <form className="contact-form" action={emailHref} method="GET" target="_blank">
                <div className="form-group">
                  <input type="text" name="name" id="name" className="form-input" placeholder=" " required />
                  <label htmlFor="name" className="form-label">Full Name</label>
                </div>
                <div className="form-group">
                  <input type="email" name="email" id="email" className="form-input" placeholder=" " required />
                  <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="form-group">
                  <input type="text" name="subject" id="subject" className="form-input" placeholder=" " required />
                  <label htmlFor="subject" className="form-label">Subject</label>
                </div>
                <div className="form-group">
                  <textarea name="message" id="message" className="form-input" rows="4" placeholder=" " required></textarea>
                  <label htmlFor="message" className="form-label">Message</label>
                </div>
                <button type="submit" className="btn-send">Send Message</button>
              </form>

              <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="info-item">
                  <Mail size={24} />
                  <a href={emailHref} target="_blank" rel="noreferrer">{emailAddress}</a>
                </div>
                <div className="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>+91 6395025531</span>
                </div>
                <div className="info-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>Haridwar, India</span>
                </div>
                <div style={{display:'flex', gap:'16px', marginTop:'16px'}}>
                  <a href="https://linkedin.com/in/umangarora05" target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><Linkedin size={28} /></a>
                  <a href="https://github.com/umangarora05" target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><Github size={28} /></a>
                  <a href="https://leetcode.com/u/UmangArora05" target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><Code2 size={28} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.href} href={link.href} className={`mobile-nav-item ${activeSection === link.href ? 'active' : ''}`}>
              <Icon size={20} />
              <span>{link.label}</span>
            </a>
          );
        })}
        <a href="/umang.pdf" target="_blank" rel="noreferrer" className="mobile-nav-item">
          <FileText size={20} />
          <span>Resume</span>
        </a>
      </div>

      <footer className="footer">
        <div className="footer-name">Umang Arora</div>
        <div className="footer-tagline">"Building reliable software, one system at a time."</div>
        <div className="footer-socials">
          <a href="https://github.com/umangarora05" target="_blank" rel="noreferrer"><Github size={20} /></a>
          <a href="https://linkedin.com/in/umangarora05" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
          <a href="https://leetcode.com/u/UmangArora05" target="_blank" rel="noreferrer"><Code2 size={20} /></a>
          <a href={emailHref} target="_blank" rel="noreferrer" aria-label={`Email ${emailAddress}`}><Mail size={20} /></a>
        </div>
        <div style={{fontSize:'0.875rem', opacity:0.6}}>© 2026 Umang Arora. All rights reserved.</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

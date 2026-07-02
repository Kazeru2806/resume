import { useEffect, useState, useRef, useCallback } from 'react';
import '../styles/resume.css';

export default function ResumePage() {
    const [darkMode, setDarkMode] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [caseStudyOpen, setCaseStudyOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
    const [countersStarted, setCountersStarted] = useState(false);
    const [counters, setCounters] = useState({ projects: 0, sessions: 0, students: 0, domains: 0 });
    const statsRef = useRef<HTMLDivElement>(null);

    // Typing animation
    const roles = ['Software Engineer', 'Full-stack Developer', 'Frontend Engineer'];
    const roleIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    useEffect(() => {
        const typeSpeed = isDeletingRef.current ? 40 : 80;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 400;

        const timer = setTimeout(() => {
            const currentRole = roles[roleIndexRef.current];

            if (!isDeletingRef.current) {
                charIndexRef.current++;
                setTypedText(currentRole.substring(0, charIndexRef.current));

                if (charIndexRef.current === currentRole.length) {
                    setTimeout(() => {
                        isDeletingRef.current = true;
                        // Trigger re-render
                        setShowCursor(c => !c);
                        setShowCursor(true);
                    }, pauseAfterType);
                }
            } else {
                charIndexRef.current--;
                setTypedText(currentRole.substring(0, charIndexRef.current));

                if (charIndexRef.current === 0) {
                    isDeletingRef.current = false;
                    roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
                    setTimeout(() => {
                        setShowCursor(c => !c);
                        setShowCursor(true);
                    }, pauseAfterDelete);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [typedText, showCursor]);

    // Dark mode toggle
    const toggleDarkMode = useCallback(() => {
        setDarkMode(prev => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            return next;
        });
    }, []);

    // Body scroll lock for modal (case study or lightbox)
    useEffect(() => {
        if (caseStudyOpen || lightboxImage) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [caseStudyOpen, lightboxImage]);

    // Animated counters with IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !countersStarted) {
                    setCountersStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [countersStarted]);

    useEffect(() => {
        if (!countersStarted) return;

        const targets = { projects: 6, sessions: 7000, students: 100, domains: 3 };
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

            setCounters({
                projects: Math.round(eased * targets.projects),
                sessions: Math.round(eased * targets.sessions),
                students: Math.round(eased * targets.students),
                domains: Math.round(eased * targets.domains),
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [countersStarted]);

    // Section reveal with IntersectionObserver
    useEffect(() => {
        const sections = document.querySelectorAll('.reveal-section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Close modals on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setCaseStudyOpen(false);
                setLightboxImage(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Portfolio images
    const portfolioImages = [
        { title: 'Dining Guide Web', img: '/dining.png' },
        { title: 'Robogen Winner', img: '/robogen.png' },
        { title: 'Panorama Stitcher', img: '/panorama.png' },
        { title: 'Designing', img: '/designing.png' },
        { title: 'IELTS Latest Result', img: '/ielts.png' },
        { title: 'Coding Class', img: '/coding.png' },
    ];

    return (
        <div className="resume-page">
            {/* Tiles Transition IN */}
            <div className="tiles-in">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} style={{ animationDelay: `${Math.min(i % 10, 10) * 0.05}s` }} />
                ))}
            </div>

            {/* Floating Decorative Diamonds */}
            <div className="floating-diamonds" aria-hidden="true">
                {[
                    { top: '10%', left: '5%', w: 14, delay: '0s', dur: '5s' },
                    { top: '25%', right: '8%', w: 10, delay: '1s', dur: '4s' },
                    { top: '45%', left: '3%', w: 8, delay: '2s', dur: '6s' },
                    { top: '65%', right: '5%', w: 12, delay: '0.5s', dur: '4.5s' },
                    { top: '80%', left: '10%', w: 10, delay: '1.5s', dur: '5.5s' },
                    { top: '15%', right: '15%', w: 6, delay: '3s', dur: '7s' },
                ].map((d, i) => (
                    <div
                        key={i}
                        className="diamond"
                        style={{
                            top: d.top,
                            left: d.left,
                            right: d.right,
                            width: d.w,
                            height: d.w,
                            animation: `floatDiamond ${d.dur} ease-in-out ${d.delay} infinite`,
                        }}
                    />
                ))}
            </div>

            {/* ===== NAVIGATION ===== */}
            <nav className="resume-nav">
                <div className="nav-logo">◆ THANH LE</div>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#timeline">Timeline</a></li>
                    <li><a href="#github">GitHub</a></li>
                </ul>
                <button
                    className="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>
            </nav>

            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero-diamond" style={{ top: '15%', left: '10%', animationDelay: '0s' }} />
                <div className="hero-diamond" style={{ top: '20%', right: '12%', width: 8, height: 8, animationDelay: '1s' }} />
                <div className="hero-diamond" style={{ bottom: '20%', left: '15%', width: 12, height: 12, animationDelay: '2s' }} />
                <div className="hero-diamond" style={{ bottom: '25%', right: '10%', animationDelay: '0.5s' }} />

                <h1 className="hero-name">LE QUAN PHAT THANH</h1>
                <div className="hero-typing">
                    {typedText}
                    <span className="typing-cursor" />
                </div>
                <div className="hero-ctas">
                    <a href="/resume.pdf" download="Thanh_Le_Resume.pdf" className="cta-btn primary">
                        📄 Download Resume (PDF)
                    </a>
                    <a href="https://github.com/Kazeru2806" target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/thanh-lqp/" target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        LinkedIn
                    </a>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== ABOUT ME ===== */}
            <section id="about" className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    ABOUT ME
                </h2>
                <div className="about-layout">
                    <div
                        className="about-photo-wrapper"
                        onClick={() => setLightboxImage({ src: '/profile.png', alt: 'Thanh Le' })}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') setLightboxImage({ src: '/profile.png', alt: 'Thanh Le' }); }}
                    >
                        <img src="/profile.jpg" alt="Thanh Le" className="about-photo" />
                        <div className="about-photo-overlay">
                            <span>🔍 View</span>
                        </div>
                    </div>
                    <p className="about-content">
                        I'm Thanh — a developer and lecturer majoring in Information Technology – Network Engineering at International University, VNU-HCMC.
                        Passionate about building real-time systems, creative web experiences, and teaching the next generation of coders and robotics enthusiasts.
                        With experience spanning full-stack development, UI/UX design, and classroom instruction at MindX Technology School,
                        I bring a unique blend of technical depth and communication skills to every project.
                        I thrive on challenging myself to learn, create, and grow.
                    </p>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== SKILLS ===== */}
            <section id="skills" className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    SKILLS
                </h2>
                <div className="skills-grid">
                    {[
                        { category: 'FRONTEND', skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Figma'] },
                        { category: 'BACKEND', skills: ['Elixir', 'Phoenix', 'Node.js', 'PostgreSQL', 'MySQL', 'REST APIs'] },
                        { category: 'LANGUAGES', skills: ['TypeScript', 'JavaScript', 'Elixir', 'Python', 'Java', 'C++'] },
                        { category: 'TOOLS', skills: ['Git', 'Docker', 'VS Code', 'Photoshop', 'Illustrator', 'Premiere'] },
                        { category: 'TESTING', skills: ['k6 Load Testing', 'Network Emulation', 'Unit Testing', 'CI/CD'] },
                        { category: 'AI TOOLS', skills: ['GitHub Copilot', 'ChatGPT', 'Claude', 'Gemini', 'Cursor'] },
                    ].map((group) => (
                        <div key={group.category} className="skill-category">
                            <h3>{group.category}</h3>
                            <div className="skill-pills">
                                {group.skills.map((skill) => (
                                    <span key={skill} className="skill-pill">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== PROJECTS ===== */}
            <section id="projects" className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    PROJECTS
                </h2>
                <div className="projects-grid">
                    {/* VN Party */}
                    <div className="project-card">
                        <img src="/vnparty.png" alt="VN Party" className="project-card-img clickable-img" onClick={() => setLightboxImage({ src: '/vnparty.png', alt: 'VN Party' })} />
                        <div className="project-card-body">
                            <h3 className="project-card-title">VN Party</h3>
                            <p className="project-card-desc">
                                Real-time multiplayer quiz platform supporting 500 concurrent rooms with p95 latency of 16ms. Features SHA-256 anti-cheat and optional blockchain audit trail.
                            </p>
                            <div className="project-tags">
                                {['Elixir', 'Phoenix', 'React', 'TypeScript', 'PostgreSQL', 'WebSocket'].map(t => (
                                    <span key={t} className="project-tag">{t}</span>
                                ))}
                            </div>
                            <div className="project-actions">
                                <a href="https://github.com/Kazeru2806/vn-party-thesis" target="_blank" rel="noopener noreferrer" className="project-btn">
                                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    GitHub
                                </a>
                                <button className="project-btn accent" onClick={() => setCaseStudyOpen(true)}>
                                    📖 Case Study
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Panorama Stitcher */}
                    <div className="project-card">
                        <img src="/panorama.png" alt="Panorama Stitcher" className="project-card-img clickable-img" onClick={() => setLightboxImage({ src: '/panorama.png', alt: 'Panorama Stitcher' })} />
                        <div className="project-card-body">
                            <h3 className="project-card-title">Panorama Stitcher</h3>
                            <p className="project-card-desc">
                                Desktop panorama stitching app using OpenCV Stitcher API for automatic image alignment and blending. Supports input from files and camera frames.
                            </p>
                            <div className="project-tags">
                                {['Python', 'OpenCV', 'Desktop App'].map(t => (
                                    <span key={t} className="project-tag">{t}</span>
                                ))}
                            </div>
                            <div className="project-actions">
                                <a href="https://github.com/Kazeru2806/panorama_stitcher" target="_blank" rel="noopener noreferrer" className="project-btn">
                                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Dining Guide */}
                    <div className="project-card">
                        <img src="/dining.png" alt="Dining Guide Web" className="project-card-img clickable-img" onClick={() => setLightboxImage({ src: '/dining.png', alt: 'Dining Guide Web' })} />
                        <div className="project-card-body">
                            <h3 className="project-card-title">Dining Guide Web</h3>
                            <p className="project-card-desc">
                                Full-stack dining guide website with UI/UX designed in Figma. Responsive layouts, interactive features, and seamless frontend-backend integration.
                            </p>
                            <div className="project-tags">
                                {['React', 'Tailwind CSS', 'JavaScript', 'Figma'].map(t => (
                                    <span key={t} className="project-tag">{t}</span>
                                ))}
                            </div>
                            <div className="project-actions">
                                <a href="https://github.com/PHUPhan1707/Dinner-Guide-Web" target="_blank" rel="noopener noreferrer" className="project-btn">
                                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== EXPERIENCE ===== */}
            <section id="experience" className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    EXPERIENCE
                </h2>
                <div className="experience-block">
                    <div className="experience-header">
                        <div>
                            <div className="experience-role">Part-time Coding & Robotics Lecturer</div>
                            <div className="experience-company">MindX — Technology School</div>
                        </div>
                        <span className="experience-date">2024 – Present</span>
                    </div>
                    <ul className="experience-bullets">
                        <li>Teaching coding (Scratch, Python, Web Dev) and robotics (VEX GO/IQ) to students ages 6–18 across 100+ students and 7,000+ sessions.</li>
                        <li>First teacher in the Southern region qualified to teach three subject areas: Coding, Robotics, and Art — and among the first to pioneer the Robotics 4+ curriculum.</li>
                        <li>Coached a student team to win the Robot Creativity Award at the Robogen Competition.</li>
                    </ul>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== ACHIEVEMENTS ===== */}
            <section className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    ACHIEVEMENTS
                </h2>
                <div className="achievements-grid">
                    <div className="achievement-card">
                        <div className="achievement-emoji"></div>
                        <div className="achievement-info">
                            <h3>Robogen Competition</h3>
                            <p>Mentored and guided a student robotics team to achieve the Robot Creativity Award at the Robogen Competition.</p>
                        </div>
                    </div>
                    <div className="achievement-card">
                        <div className="achievement-emoji"></div>
                        <div className="achievement-info">
                            <h3>IELTS 7.5</h3>
                            <p>Achieved an overall IELTS band score of 7.5, demonstrating strong English proficiency across all four skills.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== STATISTICS ===== */}
            <section className="resume-section reveal-section" ref={statsRef}>
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    BY THE NUMBERS
                </h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">{counters.projects}+</div>
                        <div className="stat-label">Projects Built</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{counters.sessions.toLocaleString()}+</div>
                        <div className="stat-label">Teaching Sessions</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{counters.students}+</div>
                        <div className="stat-label">Students Taught</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{counters.domains}</div>
                        <div className="stat-label">Domains</div>
                    </div>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== TIMELINE ===== */}
            <section id="timeline" className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    JOURNEY
                </h2>
                <div className="timeline">
                    {[
                        { year: '2021', title: 'Started University', desc: 'Began studying IT – Network Engineering at International University, VNU-HCMC.', side: 'left' },
                        { year: '2024', title: 'Joined MindX', desc: 'Started as a part-time Coding & Robotics Lecturer, teaching 100+ students.', side: 'right' },
                        { year: '2025', title: 'Thesis Project', desc: 'Built VN Party — a real-time multiplayer quiz platform with anti-cheat and blockchain audit.', side: 'left' },
                        { year: '2026', title: 'What\'s Next?', desc: 'Seeking software engineering opportunities to build impactful products at scale.', side: 'right' },
                    ].map((item, i) => (
                        <div key={i} className={`timeline-item ${item.side}`}>
                            <div className="timeline-dot" />
                            <div className="timeline-content">
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-title">{item.title}</div>
                                <div className="timeline-desc">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== GITHUB ACTIVITY ===== */}
            <section id="github" className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    GITHUB ACTIVITY
                </h2>
                <div className="github-graph">
                    <img
                        src="https://ghchart.rshah.org/c977ff/Kazeru2806"
                        alt="Kazeru2806's GitHub contribution graph"
                    />
                </div>
                <div className="github-repos">
                    <a href="https://github.com/Kazeru2806/vn-party-thesis" target="_blank" rel="noopener noreferrer" className="repo-card">
                        <div className="repo-name">◆ vn-party-thesis</div>
                        <div className="repo-desc">Real-time multiplayer party game platform with anti-cheat and blockchain audit trail.</div>
                        <div className="repo-lang">
                            <span className="repo-lang-dot" style={{ background: '#6e4a7e' }} />
                            Elixir
                        </div>
                    </a>
                    <a href="https://github.com/Kazeru2806/panorama_stitcher" target="_blank" rel="noopener noreferrer" className="repo-card">
                        <div className="repo-name">◆ panorama_stitcher</div>
                        <div className="repo-desc">Desktop panorama stitching app with OpenCV for automatic image alignment and blending.</div>
                        <div className="repo-lang">
                            <span className="repo-lang-dot" style={{ background: '#3572A5' }} />
                            Python
                        </div>
                    </a>
                </div>
            </section>

            <hr className="section-divider" />

            {/* ===== CREATIVE PROJECTS ===== */}
            <section className="resume-section reveal-section">
                <h2 className="section-title">
                    <span className="diamond-icon" />
                    CREATIVE PROJECTS
                </h2>
                <div className="creative-grid">
                    {portfolioImages.map((photo, i) => (
                        <div key={i} className="creative-card" onClick={() => setLightboxImage({ src: photo.img, alt: photo.title })} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setLightboxImage({ src: photo.img, alt: photo.title }); }}>
                            <img src={photo.img} alt={photo.title} />
                            <div className="creative-card-label">{photo.title}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="resume-footer">
                <div className="footer-links">
                    <a href="https://github.com/Kazeru2806" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/thanh-lqp/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:thanhle280603@gmail.com">Email</a>
                    <a href="https://kazeru2806.github.io/design_porfolio/" target="_blank" rel="noopener noreferrer">Design Portfolio</a>
                </div>
                <p>◆ Made with passion by Thanh Le &copy; {new Date().getFullYear()}</p>
            </footer>

            {/* ===== CASE STUDY MODAL ===== */}
            {caseStudyOpen && (
                <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setCaseStudyOpen(false); }}>
                    <div className="modal-content" role="dialog" aria-modal="true" aria-label="VN Party Case Study">
                        <button className="modal-close" onClick={() => setCaseStudyOpen(false)} aria-label="Close">✕</button>
                        <h3 className="modal-title">VN Party — Case Study</h3>

                        <div className="modal-section">
                            <h4>◆ PROBLEM</h4>
                            <p>Existing real-time quiz platforms lack robust anti-cheat mechanisms and verifiable game integrity. Players can manipulate timing, replay answers, and tamper with results without detection.</p>
                        </div>

                        <div className="modal-section">
                            <h4>◆ ARCHITECTURE</h4>
                            <p>Full-stack platform built with Elixir/Phoenix for the backend (leveraging BEAM VM's concurrency model for real-time WebSocket connections) and React/TypeScript for the frontend. PostgreSQL for persistent storage.</p>
                        </div>

                        <div className="modal-section">
                            <h4>◆ TECH STACK</h4>
                            <div className="modal-tech-tags">
                                {['Elixir', 'Phoenix', 'React', 'TypeScript', 'PostgreSQL', 'WebSocket', 'SHA-256', 'EVM', 'k6', 'Docker'].map(t => (
                                    <span key={t} className="project-tag">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-section">
                            <h4>◆ CHALLENGES</h4>
                            <ul>
                                <li>Maintaining sub-20ms latency across 500 concurrent game rooms</li>
                                <li>Preventing answer manipulation (hash tampering, replay attacks, timing exploitation)</li>
                                <li>Adding blockchain verification without significant performance overhead</li>
                                <li>Building comprehensive evaluation pipelines for load and network testing</li>
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4>◆ SOLUTION</h4>
                            <ul>
                                <li>Implemented SHA-256 commit-reveal protocol achieving 100% cheat detection across 400 adversarial attempts</li>
                                <li>Designed optional EVM blockchain anchoring adding only ~2.1ms overhead per event</li>
                                <li>Leveraged Phoenix Channels and BEAM's lightweight processes for massive concurrency</li>
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4>◆ PERFORMANCE</h4>
                            <ul>
                                <li>500 concurrent game rooms with p95 latency of 16ms</li>
                                <li>100% anti-cheat detection rate across all attack vectors</li>
                                <li>6,900+ measured sessions in end-to-end evaluation pipeline</li>
                                <li>~2.1ms blockchain anchoring overhead per event</li>
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4>◆ LESSONS LEARNED</h4>
                            <ul>
                                <li>BEAM VM's actor model is ideal for real-time multiplayer — lightweight processes scale naturally</li>
                                <li>Commit-reveal patterns from blockchain can secure traditional client-server architectures</li>
                                <li>Rigorous load testing with network emulation reveals issues that unit tests miss</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== IMAGE LIGHTBOX ===== */}
            {lightboxImage && (
                <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
                    <button className="lightbox-close" onClick={() => setLightboxImage(null)} aria-label="Close image">✕</button>
                    <img
                        src={lightboxImage.src}
                        alt={lightboxImage.alt}
                        className="lightbox-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>{lightboxImage.alt}</div>
                </div>
            )}
        </div>
    );
}
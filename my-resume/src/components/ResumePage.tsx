import { MapPin, Mail, Instagram, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResumePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#e8e8e3', padding: '2rem', position: 'relative', overflow: 'hidden' }}>

            {/* Tiles Transition IN Effect */}
            <style>{`
        @keyframes tileOut {
          from { transform: scaleY(1); }
          to { transform: scaleY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: rotate(0deg) scale(1.05) !important;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        .tiles-in {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: repeat(6, 1fr);
        }
        .tiles-in > div {
          background: #f4c84c;
          transform: scaleY(1);
          transform-origin: bottom;
          animation: tileOut 0.8s ease forwards;
        }
      `}</style>

            {/* Tiles Transition IN */}
            <div className="tiles-in">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        style={{ animationDelay: `${Math.min(i % 10, 10) * 0.05}s` }}
                    />
                ))}
            </div>

            {/* More Decorations Around Header Area */}
            <div style={{ position: 'absolute', top: '5%', left: '15%', color: '#a3e635', fontSize: '2rem', animation: 'twinkle 2.5s ease-in-out infinite', transform: `translateY(${scrollY * 0.1}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '8%', left: '20%', color: '#60a5fa', fontSize: '1.5rem', animation: 'twinkle 3s ease-in-out infinite 0.5s', transform: `translateY(${scrollY * 0.15}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '3%', left: '35%', color: '#f87171', fontSize: '1.8rem', animation: 'pulse 3.2s ease-in-out infinite', transform: `translateY(${scrollY * 0.12}px)` }}>✨</div>
            <div style={{ position: 'absolute', top: '10%', left: '40%', color: '#a3e635', fontSize: '1.3rem', animation: 'twinkle 2.8s ease-in-out infinite 0.8s', transform: `translateY(${scrollY * 0.2}px)` }}>✦</div>

            <div style={{ position: 'absolute', top: '5%', right: '15%', color: '#a3e635', fontSize: '2rem', animation: 'twinkle 3.2s ease-in-out infinite 0.3s', transform: `translateY(${scrollY * 0.1}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '7%', right: '25%', color: '#60a5fa', fontSize: '1.6rem', animation: 'twinkle 2.7s ease-in-out infinite 0.9s', transform: `translateY(${scrollY * 0.18}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '4%', right: '35%', color: '#f87171', fontSize: '1.7rem', animation: 'pulse 3s ease-in-out infinite 0.5s', transform: `translateY(${scrollY * 0.14}px)` }}>✨</div>
            <div style={{ position: 'absolute', top: '9%', right: '20%', color: '#a3e635', fontSize: '1.4rem', animation: 'twinkle 3.3s ease-in-out infinite 1.2s', transform: `translateY(${scrollY * 0.16}px)` }}>✦</div>

            {/* Floating shapes around header with parallax */}
            <div style={{ position: 'absolute', top: '6%', left: '25%', width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #60a5fa', opacity: 0.2, animation: 'rotate 15s linear infinite', transform: `translateY(${scrollY * 0.2}px)` }}></div>
            <div style={{ position: 'absolute', top: '4%', right: '28%', width: '100px', height: '100px', borderRadius: '50%', border: '3px dashed #a3e635', opacity: 0.25, animation: 'rotate 18s linear infinite reverse', transform: `translateY(${scrollY * 0.15}px)` }}></div>

            {/* Small sparkle cluster around header */}
            <div style={{ position: 'absolute', top: '11%', left: '30%', display: 'flex', gap: '0.5rem', animation: 'float 3s ease-in-out infinite', transform: `translateY(${scrollY * 0.25}px)` }}>
                <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>✦</span>
                <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>✦</span>
                <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>✦</span>
            </div>
            <div style={{ position: 'absolute', top: '12%', right: '32%', display: 'flex', gap: '0.5rem', animation: 'floatSlow 3.5s ease-in-out infinite', transform: `translateY(${scrollY * 0.22}px)` }}>
                <span style={{ color: '#a3e635', fontSize: '0.8rem' }}>✦</span>
                <span style={{ color: '#a3e635', fontSize: '0.8rem' }}>✦</span>
                <span style={{ color: '#a3e635', fontSize: '0.8rem' }}>✦</span>
            </div>

            {/* Original Decorative Elements with Parallax Scrolling */}
            {/* Top Left Cluster */}
            <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#a3e635', fontSize: '1.875rem', animation: 'twinkle 3s ease-in-out infinite', transform: `translateY(${scrollY * 0.3}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '4rem', left: '1rem', color: '#a3e635', fontSize: '1.2rem', animation: 'twinkle 2.5s ease-in-out infinite 0.5s', transform: `translateY(${scrollY * 0.4}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '6rem', left: '4rem', color: '#f87171', fontSize: '1.5rem', animation: 'pulse 3s ease-in-out infinite', transform: `translateY(${scrollY * 0.35}px)` }}>✨</div>
            <div style={{ position: 'absolute', top: '8rem', left: '2.5rem', color: '#60a5fa', fontSize: '1rem', animation: 'twinkle 3.5s ease-in-out infinite 1s', transform: `translateY(${scrollY * 0.45}px)` }}>✦</div>

            {/* Top Right Cluster */}
            <div style={{ position: 'absolute', top: '3rem', right: '4rem', color: '#a3e635', fontSize: '1.5rem', animation: 'twinkle 2.8s ease-in-out infinite 0.3s', transform: `translateY(${scrollY * 0.32}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '4rem', right: '8rem', color: '#a3e635', fontSize: '1.5rem', animation: 'twinkle 3.2s ease-in-out infinite 0.7s', transform: `translateY(${scrollY * 0.38}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '4rem', right: '12rem', color: '#a3e635', fontSize: '1.5rem', animation: 'twinkle 2.5s ease-in-out infinite 1.2s', transform: `translateY(${scrollY * 0.42}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '2rem', right: '10rem', color: '#60a5fa', fontSize: '1.2rem', animation: 'twinkle 3s ease-in-out infinite 0.9s', transform: `translateY(${scrollY * 0.36}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '6rem', right: '5rem', color: '#f87171', fontSize: '1.3rem', animation: 'pulse 2.8s ease-in-out infinite 0.5s', transform: `translateY(${scrollY * 0.4}px)` }}>✨</div>

            {/* Left Side Cluster */}
            <div style={{ position: 'absolute', top: '33%', left: '1rem', color: '#f87171', fontSize: '1.4rem', animation: 'pulse 3.2s ease-in-out infinite 0.8s', transform: `translateY(${scrollY * 0.25}px)` }}>✨</div>
            <div style={{ position: 'absolute', top: '40%', left: '3rem', color: '#60a5fa', fontSize: '1.1rem', animation: 'twinkle 2.7s ease-in-out infinite 1.5s', transform: `translateY(${scrollY * 0.2}px)` }}>✦</div>
            <div style={{ position: 'absolute', bottom: '33%', left: '3rem', color: '#2563eb', animation: 'floatSlow 4s ease-in-out infinite', transform: `translateY(${scrollY * -0.15}px)` }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#2563eb', transform: 'rotate(45deg)' }}></div>
                    <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#2563eb', transform: 'rotate(45deg)' }}></div>
                    <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#2563eb', transform: 'rotate(45deg)' }}></div>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: '40%', left: '1.5rem', color: '#a3e635', fontSize: '1.3rem', animation: 'twinkle 3.1s ease-in-out infinite 0.6s', transform: `translateY(${scrollY * -0.1}px)` }}>✦</div>

            {/* Right Side Cluster */}
            <div style={{ position: 'absolute', top: '33%', right: '5rem', color: '#f87171', fontSize: '1.25rem', animation: 'pulse 2.9s ease-in-out infinite 1.1s', transform: `translateY(${scrollY * 0.22}px)` }}>✨</div>
            <div style={{ position: 'absolute', top: '35%', right: '2rem', color: '#60a5fa', fontSize: '1rem', animation: 'twinkle 3.3s ease-in-out infinite 0.4s', transform: `translateY(${scrollY * 0.28}px)` }}>✦</div>
            <div style={{ position: 'absolute', top: '45%', right: '7rem', color: '#a3e635', fontSize: '1.4rem', animation: 'twinkle 2.6s ease-in-out infinite 1.3s', transform: `translateY(${scrollY * 0.18}px)` }}>✦</div>
            <div style={{ position: 'absolute', bottom: '25%', right: '4rem', color: '#f87171', fontSize: '1.25rem', animation: 'pulse 3.4s ease-in-out infinite 0.7s', transform: `translateY(${scrollY * -0.12}px)` }}>✨</div>
            <div style={{ position: 'absolute', bottom: '33%', right: '6rem', display: 'flex', gap: '0.5rem', animation: 'float 3.5s ease-in-out infinite', transform: `translateY(${scrollY * -0.18}px)` }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#ef4444', transform: 'rotate(45deg)' }}></div>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#ef4444', transform: 'rotate(45deg)' }}></div>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#ef4444', transform: 'rotate(45deg)' }}></div>
            </div>
            <div style={{ position: 'absolute', bottom: '35%', right: '2.5rem', color: '#60a5fa', fontSize: '1.2rem', animation: 'twinkle 2.8s ease-in-out infinite 1.6s', transform: `translateY(${scrollY * -0.14}px)` }}>✦</div>

            {/* Bottom Cluster */}
            <div style={{ position: 'absolute', bottom: '10%', left: '15%', color: '#a3e635', fontSize: '1.3rem', animation: 'twinkle 3s ease-in-out infinite 0.9s', transform: `translateY(${scrollY * -0.2}px)` }}>✦</div>
            <div style={{ position: 'absolute', bottom: '8%', left: '25%', color: '#60a5fa', fontSize: '1.1rem', animation: 'twinkle 2.7s ease-in-out infinite 1.2s', transform: `translateY(${scrollY * -0.15}px)` }}>✦</div>
            <div style={{ position: 'absolute', bottom: '12%', right: '20%', color: '#f87171', fontSize: '1.2rem', animation: 'pulse 3.1s ease-in-out infinite 1.4s', transform: `translateY(${scrollY * -0.18}px)` }}>✨</div>
            <div style={{ position: 'absolute', bottom: '6%', right: '35%', color: '#a3e635', fontSize: '1rem', animation: 'twinkle 3.3s ease-in-out infinite 0.5s', transform: `translateY(${scrollY * -0.12}px)` }}>✦</div>

            {/* Floating Circles - Large Decorative with parallax */}
            <div style={{ position: 'absolute', top: '15%', right: '10%', width: '150px', height: '150px', borderRadius: '50%', border: '2px dashed #60a5fa', opacity: 0.3, animation: 'rotate 20s linear infinite', transform: `translateY(${scrollY * 0.15}px)` }}></div>
            <div style={{ position: 'absolute', bottom: '20%', left: '8%', width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed #a3e635', opacity: 0.3, animation: 'rotate 25s linear infinite reverse', transform: `translateY(${scrollY * -0.1}px)` }}></div>

            {/* Parallax Effect Cursor Follow */}
            <div style={{
                position: 'absolute',
                top: `${mousePosition.y * 0.02}px`,
                left: `${mousePosition.x * 0.02}px`,
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
                transition: 'all 0.3s ease'
            }}></div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', transform: `translateY(${scrollY * -0.05}px)` }}>

                {/* Header with animation */}
                <div style={{ textAlign: 'right', marginBottom: '2rem', animation: 'fadeInUp 0.8s ease-out 0.8s backwards' }}>
                    <p style={{ color: '#1d4ed8', fontSize: '0.875rem' }}>Thanh Le</p>
                </div>

                {/* Portfolio Header Image with animation */}
                <div style={{ marginBottom: '3rem', textAlign: 'center', animation: 'fadeInUp 1s ease-out 1s backwards' }}>
                    <img
                        src="/header.png"
                        alt="Portfolio Header"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>

                {/* Hello Section - TWO COLUMNS with staggered animation */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '4rem' }}>

                    {/* Left Column - Hello & Bio */}
                    <div style={{ position: 'relative', animation: 'slideIn 1s ease-out 1.2s backwards' }}>
                        <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#1d4ed8', fontStyle: 'italic', marginBottom: '1rem' }}>Hello!</h2>

                        {/* Red squiggle */}
                        <svg style={{ width: '12rem', height: '1rem', marginBottom: '1.5rem' }} viewBox="0 0 200 10">
                            <path d="M 0 5 Q 10 0, 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5 T 140 5 T 160 5 T 180 5 T 200 5"
                                stroke="#ef4444" strokeWidth="2" fill="none" />
                        </svg>

                        <div style={{ fontSize: '0.95rem', color: '#1d4ed8', lineHeight: '1.75', marginBottom: '2rem' }}>
                            <p>
                                It's <span style={{ fontWeight: '700' }}>Thanh!</span> A <span style={{ fontWeight: '700' }}>developer and lecturer</span> majored in <span style={{ fontStyle: 'italic' }}>Information Technology - Network Engineering</span> based in Ho Chi Minh City. I'm interested in challenging myself to <span style={{ fontStyle: 'italic' }}>gain new knowledges</span> and <span style={{ fontStyle: 'italic' }}>developing my creativity</span> in coding and teaching. I consider myself a hard-working and easy to adapt. I hope my abilities able to contribute to the growth of your team.
                            </p>
                        </div>

                        {/* LinkedIn Button with hover effect */}
                        <div style={{ position: 'relative' }}>
                            <svg style={{ position: 'absolute', left: '-3rem', top: '0.5rem', width: '5rem', height: '3rem', color: '#2563eb' }} viewBox="0 0 80 40">
                                <path d="M 10 30 L 50 10 M 50 10 L 45 20 M 50 10 L 60 15" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            <div style={{ display: 'flex', gap: '0.25rem', color: '#60a5fa', fontSize: '0.75rem', marginBottom: '0.5rem', animation: 'twinkle 2s ease-in-out infinite' }}>
                                <span>✦</span>
                                <span>✦</span>
                            </div>
                            <a href="https://www.linkedin.com/in/thanh-lqp/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(to right, #bef264, #a3e635)', color: '#1f2937', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.875rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textDecoration: 'none', transition: 'all 0.3s ease' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                                }}>
                                <Linkedin style={{ width: '1rem', height: '1rem' }} />
                                linkedin.com/in/thanh-lqp/
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Photo & Contact */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', animation: 'fadeInUp 1s ease-out 1.4s backwards' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', color: '#60a5fa', fontSize: '0.75rem', position: 'absolute', top: '-1rem', right: '8rem', animation: 'twinkle 2.5s ease-in-out infinite 0.5s' }}>
                            <span>✦</span>
                            <span>✦</span>
                        </div>

                        {/* Photo Card with hover effect */}
                        <div className="card-hover" style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1.25rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', transform: 'rotate(2deg)', width: '420px' }}>
                            <img
                                src="/profile.png"
                                alt="Thanh Le"
                                style={{ width: '100%', height: '20rem', objectFit: 'cover', borderRadius: '0.75rem' }}
                            />

                            {/* Contact Info Overlay */}
                            <div style={{ marginTop: '1rem' }}>
                                <p style={{ fontWeight: '700', color: '#1f2937', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                                    Thành (Kazeru) Lê Quan Phát
                                </p>
                                <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.75rem' }}>he/him</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4b5563', marginTop: '0.5rem' }}>
                                    <MapPin style={{ width: '0.875rem', height: '0.875rem' }} />
                                    <span>Ho Chi Minh City, Vietnam</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4b5563', marginTop: '0.35rem' }}>
                                    <Instagram style={{ width: '0.875rem', height: '0.875rem' }} />
                                    <span>@kazeru_2806</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4b5563', marginTop: '0.35rem' }}>
                                    <Mail style={{ width: '0.875rem', height: '0.875rem' }} />
                                    <span>thanhle280603@gmail.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative sparkle */}
                        <div style={{ position: 'absolute', top: '-2rem', right: '3rem', color: '#f87171', fontSize: '1.25rem', animation: 'pulse 3s ease-in-out infinite 0.8s' }}>✨</div>
                        <div style={{ position: 'absolute', bottom: '2rem', right: '-1rem', display: 'flex', gap: '0.25rem', color: '#60a5fa', fontSize: '0.75rem', animation: 'twinkle 2.8s ease-in-out infinite 1.2s' }}>
                            <span>✦</span>
                            <span>✦</span>
                        </div>
                    </div>
                </div>

                {/* Experience, Education, Expertise Section - THREE COLUMNS with animation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', position: 'relative', marginTop: '4rem' }}>

                    {/* Experiences */}
                    <div style={{ animation: 'fadeInUp 1s ease-out 1.6s backwards' }}>
                        <h3 style={{ color: '#1d4ed8', fontWeight: '900', fontSize: '1.25rem', marginBottom: '1.5rem' }}>EXPERIENCES</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.8rem' }}>
                            <div>
                                <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>2024–Present</p>
                                <p style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>CODING & ROBOTICS LECTURER</p>
                                <p style={{ color: '#374151', marginBottom: '0.25rem' }}>Teacher at MindX Technology School</p>
                                <p style={{ color: '#4b5563' }}>First teacher in Southern region qualified to teach three subjects: Coding, Robotics, Art</p>
                            </div>
                            <div>
                                <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>2024–Present</p>
                                <p style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>DEVELOPER</p>
                                <p style={{ color: '#374151', marginBottom: '0.25rem' }}>Freelance Full-stack Developer</p>
                                <p style={{ color: '#4b5563' }}>Developed dining guide and fruit selling website using React, Tailwind CSS, and JavaScript</p>
                            </div>
                            <div>
                                <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>2021–2023</p>
                                <p style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>GRAPHIC DESIGNER</p>
                                <p style={{ color: '#374151', marginBottom: '0.25rem' }}>Designer at IU ArTeam</p>
                                <p style={{ color: '#4b5563' }}>Designed promotional materials for events</p>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '3rem', left: '-2rem', color: '#2563eb', fontSize: '1.25rem', animation: 'twinkle 3s ease-in-out infinite 1.5s' }}>✦</div>
                    </div>

                    {/* Education */}
                    <div style={{ animation: 'fadeInUp 1s ease-out 1.8s backwards' }}>
                        <h3 style={{ color: '#1d4ed8', fontWeight: '900', fontSize: '1.25rem', marginBottom: '1.5rem' }}>EDUCATION</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.8rem' }}>
                            <div>
                                <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>2021 – Present</p>
                                <p style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>International University, VNU-HCMC</p>
                                <p style={{ color: '#4b5563' }}>Information Technology - Network Engineering</p>
                            </div>
                            <div>
                                <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>2018 – 2021</p>
                                <p style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>Nguyen Chi Thanh High School</p>
                                <p style={{ color: '#4b5563' }}>A01</p>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '3rem', left: '33%', color: '#f87171', fontSize: '1.25rem', animation: 'pulse 3.2s ease-in-out infinite 1.8s' }}>✨</div>
                    </div>

                    {/* Expertise */}
                    <div style={{ animation: 'fadeInUp 1s ease-out 2s backwards' }}>
                        <h3 style={{ color: '#1d4ed8', fontWeight: '900', fontSize: '1.25rem', marginBottom: '1.5rem' }}>EXPERTISE</h3>

                        {/* Software Icons with hover effect */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {[
                                { bg: '#2563eb', label: 'Ps', name: 'Photoshop' },
                                { bg: '#ea580c', label: 'Ai', name: 'Illustrator' },
                                { bg: '#9333ea', label: 'Pr', name: 'Premiere' },
                                { bg: '#374151', label: 'Git', name: 'GitHub' }
                            ].map((item, i) => (
                                <div key={i} style={{ backgroundColor: item.bg, color: 'white', borderRadius: '0.5rem', padding: '0.75rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                                    }}>
                                    <div style={{ fontWeight: '900', fontSize: '1.125rem' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.name}</div>
                                </div>
                            ))}
                        </div>

                        {/* Sticker Badges */}
                        <div style={{ position: 'relative', height: '8rem' }}>
                            <div style={{ position: 'absolute', transform: 'rotate(-12deg)', animation: 'float 3s ease-in-out infinite' }}>
                                <div style={{ background: 'linear-gradient(to bottom right, #4ade80, #22c55e)', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '2px solid white' }}>
                                    React
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '2rem', left: '2rem', transform: 'rotate(6deg)', animation: 'floatSlow 3.5s ease-in-out infinite 0.5s' }}>
                                <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '2px solid white' }}>
                                    TYPESCRIPT
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '4rem', left: '0', animation: 'float 4s ease-in-out infinite 1s' }}>
                                <div style={{ backgroundColor: '#ec4899', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.625rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '2px solid white', transform: 'rotate(-6deg)' }}>
                                    UI/UX DESIGN
                                </div>
                            </div>

                            <div style={{ position: 'absolute', top: '5rem', left: '4rem', transform: 'rotate(12deg)', animation: 'floatSlow 3.8s ease-in-out infinite 1.5s' }}>
                                <div style={{ position: 'relative', backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: '700', fontSize: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '2px solid #fde047' }}>
                                    CODE!
                                    <div style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', backgroundColor: '#fde047', width: '1.5rem', height: '1.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: '900', color: '#ef4444', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', animation: 'rotate 4s linear infinite' }}>
                                        <span style={{ color: '#ef4444' }}>★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom decorative elements */}
                <div style={{ position: 'absolute', bottom: '-2rem', left: '3rem', color: '#60a5fa', fontSize: '0.75rem', display: 'flex', gap: '0.25rem', animation: 'twinkle 2.5s ease-in-out infinite 2s' }}>
                    <span>✦</span>
                    <span>✦</span>
                </div>
                <div style={{ position: 'absolute', bottom: '-2rem', right: '3rem', color: '#60a5fa', fontSize: '0.75rem', display: 'flex', gap: '0.25rem', animation: 'twinkle 3s ease-in-out infinite 2.5s' }}>
                    <span>✦</span>
                    <span>✦</span>
                </div>
            </div>
        </div>
    );
}
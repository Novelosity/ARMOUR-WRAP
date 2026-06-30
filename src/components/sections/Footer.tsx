'use client'

const LINKS = [
  { label: 'PPF Film',          id: 'services' },
  { label: 'Polishing',         id: 'services' },
  { label: 'Interior Cleaning', id: 'services' },
  { label: 'Glass Cleaning',    id: 'services' },
  { label: 'Book Now',          id: 'contact'  },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative w-full py-16 overflow-hidden"
      style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
                <path d="M12 1L2 5V14C2 21 12 29 12 29C12 29 22 21 22 14V5L12 1Z"
                  fill="rgba(212,175,55,0.1)" stroke="url(#footerShield)" strokeWidth="1.2" />
                <text x="12" y="18" textAnchor="middle" fill="#D4AF37" fontSize="7" fontWeight="700">A</text>
                <defs>
                  <linearGradient id="footerShield" x1="12" y1="1" x2="12" y2="29" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F0D060"/><stop offset="100%" stopColor="#9A7B20"/>
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-bold text-sm tracking-[0.25em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>ARMOR</span>
                  <span className="text-[#D4AF37] font-light text-sm tracking-[0.28em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>WRAP</span>
                </div>
                <span className="text-[#00A3FF] text-[0.45rem] tracking-[0.5em] font-medium uppercase">STUDIO</span>
              </div>
            </div>
            <p className="text-[0.7rem] leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Pakistan's premium Kevlar PPF and detailing studio. Protecting vehicles with invisible armor and expert care.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { name: 'Instagram', path: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zM12 15a3 3 0 110-6 3 3 0 010 6zm3.5-8.5a1 1 0 110 2 1 1 0 010-2z' },
                { name: 'Facebook',  path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
              ].map(s => (
                <a key={s.name} href="#" aria-label={s.name}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)'
                    ;(e.currentTarget as HTMLElement).style.color = '#D4AF37'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'
                  }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={s.path}/>
                  </svg>
                </a>
              ))}
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid rgba(37,211,102,0.3)', color: 'rgba(37,211,102,0.6)' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.6)'
                  ;(e.currentTarget as HTMLElement).style.color = '#25D366'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.3)'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(37,211,102,0.6)'
                }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label-gold mb-5">Services</p>
            <div className="flex flex-col gap-2.5">
              {LINKS.map(({ label, id }) => (
                <button key={label} onClick={() => scrollTo(id)}
                  className="text-left text-xs transition-colors duration-200 cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label-gold mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/923001234567"
                className="flex items-center gap-2 text-xs transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#25D366' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                +92 300 123 4567
              </a>
              <a href="mailto:info@armorwrap.pk"
                className="flex items-center gap-2 text-xs transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@armorwrap.pk
              </a>
              <div className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Pakistan — Serving vehicles nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-gold mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[0.6rem] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 ArmorWrap Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.2)' }}>Privacy Policy</span>
            <span className="text-[0.6rem]" style={{ color: 'rgba(255,255,255,0.2)' }}>Terms of Service</span>
          </div>
          <p className="text-[0.6rem]" style={{ color: 'rgba(212,175,55,0.35)' }}>
            Kevlar PPF · Premium Detailing · Pakistan
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)' }} />
      <div className="noise" />
    </footer>
  )
}

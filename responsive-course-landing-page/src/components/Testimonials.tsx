import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    image: 'SC',
    content: 'This bootcamp completely changed my career trajectory. I went from being a barista to landing my dream job at a top tech company. The curriculum is rigorous but the support system is incredible.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Full-Stack Developer at Shopify',
    image: 'MJ',
    content: 'The hands-on projects were game-changers. By the time I graduated, I had a portfolio that actually impressed hiring managers. Best investment I ever made in myself.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Frontend Developer at Stripe',
    image: 'ER',
    content: 'I tried learning to code on my own for years. This bootcamp gave me the structure, mentorship, and community I needed to finally break into tech. Highly recommend!',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Backend Engineer at Netflix',
    image: 'DK',
    content: 'The career support is unmatched. From resume reviews to mock interviews, they prepared me for every step of the job search. Landed multiple offers within a month of graduating.',
    rating: 5,
  },
  {
    name: 'Alexandra Peters',
    role: 'Software Developer at Microsoft',
    image: 'AP',
    content: 'Coming from a non-tech background, I was nervous. But the instructors made complex concepts accessible. The collaborative environment helped me grow faster than I ever imagined.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Tech Lead at Airbnb',
    image: 'JW',
    content: 'Three years after graduating, I\'m now leading a team. The fundamentals I learned here gave me a solid foundation to continue growing. Worth every penny.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-violet-300 text-sm font-semibold rounded-full mb-4 backdrop-blur-sm">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Hear From Our
            <span className="block text-violet-400">Graduates</span>
          </h2>
          <p className="text-lg text-white/70">
            Join thousands of successful developers who transformed their careers with our bootcamp.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos Section */}
        <div className="mt-20">
          <p className="text-center text-white/50 text-sm mb-8">Our graduates work at leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {['Google', 'Meta', 'Amazon', 'Netflix', 'Stripe', 'Shopify'].map((company) => (
              <span key={company} className="text-white/70 font-bold text-xl tracking-wider">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

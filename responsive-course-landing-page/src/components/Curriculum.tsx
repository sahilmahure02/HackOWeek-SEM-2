import { useState, useEffect, useRef } from 'react';

const modules = [
  {
    week: 'Weeks 1-2',
    title: 'Web Fundamentals',
    topics: ['HTML5 & Semantic Markup', 'CSS3 & Flexbox/Grid', 'JavaScript ES6+', 'Git & GitHub'],
    icon: '🌐',
    color: 'bg-blue-500',
  },
  {
    week: 'Weeks 3-4',
    title: 'React & Frontend',
    topics: ['React Components & Hooks', 'State Management', 'React Router', 'Tailwind CSS'],
    icon: '⚛️',
    color: 'bg-cyan-500',
  },
  {
    week: 'Weeks 5-6',
    title: 'Node.js & Backend',
    topics: ['Node.js & Express', 'RESTful API Design', 'Authentication & JWT', 'API Security'],
    icon: '🔧',
    color: 'bg-emerald-500',
  },
  {
    week: 'Weeks 7-8',
    title: 'Databases',
    topics: ['PostgreSQL & SQL', 'MongoDB & NoSQL', 'Database Design', 'Prisma ORM'],
    icon: '🗄️',
    color: 'bg-violet-500',
  },
  {
    week: 'Weeks 9-10',
    title: 'Advanced Topics',
    topics: ['TypeScript', 'Testing (Jest, Cypress)', 'CI/CD Pipelines', 'Docker Basics'],
    icon: '🚀',
    color: 'bg-orange-500',
  },
  {
    week: 'Weeks 11-12',
    title: 'Capstone & Career',
    topics: ['Full-Stack Project', 'Code Reviews', 'Interview Prep', 'Portfolio Building'],
    icon: '🎓',
    color: 'bg-pink-500',
  },
];

export default function Curriculum() {
  const [activeModule, setActiveModule] = useState(0);
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
    <section id="curriculum" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
            What You'll Learn
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive 12-Week
            <span className="block text-violet-600">Curriculum</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our carefully crafted curriculum takes you from fundamentals to advanced concepts,
            ensuring you're ready for real-world development challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Module List */}
          <div className="lg:col-span-1 space-y-3">
            {modules.map((module, index) => (
              <button
                key={index}
                onClick={() => setActiveModule(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeModule === index
                    ? 'bg-white shadow-lg border-2 border-violet-500'
                    : 'bg-white/50 hover:bg-white hover:shadow-md border-2 border-transparent'
                } ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center text-2xl`}
                  >
                    {module.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{module.week}</p>
                    <h3 className="font-bold text-gray-900">{module.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Module Detail */}
          <div
            className={`lg:col-span-2 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full -translate-y-32 translate-x-32"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-4 mb-8">
                  <div
                    className={`w-16 h-16 ${modules[activeModule].color} rounded-2xl flex items-center justify-center text-3xl`}
                  >
                    {modules[activeModule].icon}
                  </div>
                  <div>
                    <p className="text-violet-600 font-semibold">{modules[activeModule].week}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {modules[activeModule].title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-700">Topics Covered:</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {modules[activeModule].topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Course Progress</span>
                    <span className="text-sm font-semibold text-violet-600">
                      {Math.round(((activeModule + 1) / modules.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${((activeModule + 1) / modules.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';

const plans = [
  {
    name: 'Self-Paced',
    price: 2499,
    description: 'Learn at your own pace with full course access',
    features: [
      'Full curriculum access',
      'Video lessons & tutorials',
      'Project templates',
      'Community Discord access',
      'Certificate of completion',
      'Lifetime content updates',
    ],
    notIncluded: [
      'Live sessions',
      '1-on-1 mentorship',
      'Career services',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Full Bootcamp',
    price: 7999,
    description: 'The complete immersive experience with live instruction',
    features: [
      'Everything in Self-Paced',
      'Live instructor-led sessions',
      'Weekly 1-on-1 mentorship',
      'Code reviews & feedback',
      'Career coaching sessions',
      'Resume & LinkedIn review',
      'Mock interviews',
      'Job placement support',
      'Slack access to instructors',
    ],
    notIncluded: [],
    popular: true,
    cta: 'Enroll Now',
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'Custom training for teams and organizations',
    features: [
      'Everything in Full Bootcamp',
      'Customized curriculum',
      'Dedicated success manager',
      'Team progress dashboard',
      'On-site training option',
      'Bulk pricing discounts',
      'Priority support',
      'Custom project assignments',
    ],
    notIncluded: [],
    popular: false,
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
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
    <section id="pricing" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">
            Investment in Your Future
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="block text-violet-600">Learning Path</span>
          </h2>
          <p className="text-lg text-gray-600">
            Flexible options to fit your learning style and budget. 
            All plans include a 14-day money-back guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-500 ${
                plan.popular
                  ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-2xl shadow-violet-500/30 scale-105 z-10'
                  : 'bg-white border-2 border-gray-100 hover:border-violet-200 hover:shadow-xl'
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
                <div className="flex items-end justify-center space-x-1">
                  {plan.price ? (
                    <>
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        ${plan.price.toLocaleString()}
                      </span>
                      <span className={`text-sm pb-1 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                        USD
                      </span>
                    </>
                  ) : (
                    <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      Custom
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-white/20' : 'bg-green-100'
                    }`}>
                      <svg className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 opacity-50">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <svg className={`w-3 h-3 ${plan.popular ? 'text-white/50' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className={`text-sm line-through ${plan.popular ? 'text-white/50' : 'text-gray-400'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-violet-600 hover:bg-gray-100 hover:shadow-lg'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/30'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            💳 Flexible payment plans available • 🔒 Secure checkout • 💯 14-day money-back guarantee
          </p>
          <p className="text-sm text-gray-400">
            Have questions? <a href="#" className="text-violet-600 hover:underline">Schedule a free consultation</a>
          </p>
        </div>
      </div>
    </section>
  );
}

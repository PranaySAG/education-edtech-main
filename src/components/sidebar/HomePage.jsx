import { useClerk } from "@clerk/clerk-react";

export default function HomePage() {
  const { openSignIn } = useClerk();

  const handleGetStarted = () => {
    openSignIn();
  };

  return (
    <div
      className="h-screen overflow-y-auto w-full bg-gray-950 text-white font-sans"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>


      <section className="relative min-h-screen bg-[url('/images/green-bg.jpg')] bg-cover bg-center flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Master IT Skills with <br /> AI-Powered Learning
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            Personalized, interactive courses in web dev, AI, data science & more.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition"
          >
            Get Started
          </button>
        </div>
      </section>

    
      <section className="bg-gray-900 py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-4">Why Learn With Us?</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          We use smart, AI-driven platforms to personalize your learning experience.
        </p>
      </section>

      <section className="bg-gray-950 py-16 px-6 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            title: "AI Tutoring",
            desc: "Get instant, personalized feedback powered by smart AI tools.",
          },
          {
            title: "Real-World Projects",
            desc: "Build real applications while you learn — from day one.",
          },
          {
            title: "Track Your Progress",
            desc: "Smart dashboards help you stay on track and meet your goals.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

  
      <section className="bg-gray-900 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Full Stack Web Dev",
              level: "Beginner",
              image: "/images/course1.jpg",
              alt: "Full Stack Web Development Course",
            },
            {
              title: "AI & Machine Learning",
              level: "Intermediate",
              image: "/images/course2.jpg",
              alt: "AI and Machine Learning Course",
            },
            {
              title: "Data Structures & Algorithms",
              level: "Advanced",
              image: "/images/course3.jpg",
              alt: "Data Structures and Algorithms Course",
            },
          ].map((course) => (
            <div
              key={course.title}
              className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10"
            >
              <img
                src={course.image}
                alt={course.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                <p className="text-gray-400 text-sm">{course.level} Level</p>
              </div>
            </div>
          ))}
        </div>
      </section>

 
      <section className="bg-gray-950 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">What Students Say</h2>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <blockquote className="text-gray-300 italic">
            “This platform helped me land my first tech job. The AI feedback is a game-changer.”
            <br />
            <span className="text-white font-bold mt-2 block">— Aria Mehta, Frontend Developer</span>
          </blockquote>
          <blockquote className="text-gray-300 italic">
            “I've tried dozens of online platforms. This one actually adapts to how I learn.”
            <br />
            <span className="text-white font-bold mt-2 block">— David Kumar, Data Analyst</span>
          </blockquote>
          <blockquote className="text-gray-300 italic">
            “The real-world projects gave me confidence to apply for internships.”
            <br />
            <span className="text-white font-bold mt-2 block">— Sneha R., Computer Science Student</span>
          </blockquote>
        </div>
      </section>

    
      <section className="bg-blue-600 py-20 px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Start Learning Today</h2>
        <p className="text-lg mb-8">
          Join thousands of students building their future in tech.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-10 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition"
        >
          Sign Up Now
        </button>
      </section>


      <footer className="bg-gray-900 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SmartLearn — Built for Future Developers.
      </footer>
    </div>
  );
}

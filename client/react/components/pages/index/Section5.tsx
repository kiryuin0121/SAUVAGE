import { motion } from "motion/react";

const Section5 = () => {
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <motion.h3
          className="text-center text-sm tracking-[0.5em] uppercase mb-20 text-neutral-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Choose Your Intensity
        </motion.h3>
        <div className="grid grid-cols-4 gap-8">
          {[
            {
              name: "EDT",
              desc: "Fresh & Vibrant",
              time: "4-6 hours",
              delay: 0,
            },
            {
              name: "EDP",
              desc: "Rich & Profound",
              time: "6-8 hours",
              delay: 0.1,
            },
            {
              name: "Parfum",
              desc: "Intense & Lasting",
              time: "8-10 hours",
              delay: 0.2,
            },
            {
              name: "Elixir",
              desc: "Bold & Sensual",
              time: "12+ hours",
              delay: 0.3,
            },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              className="text-center space-y-4 relative group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 1,
                delay: item.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              <div className="h-px w-0 group-hover:w-full bg-neutral-700 mx-auto transition-all duration-700 ease-out mb-4" />
              <h4 className="text-xs tracking-[0.3em] uppercase font-semibold transition-colors duration-500 group-hover:text-neutral-300">
                {item.name}
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed transition-colors duration-500 group-hover:text-neutral-300">
                {item.desc}
              </p>
              <p className="text-[10px] text-neutral-600 transition-all duration-500 group-hover:text-neutral-500 group-hover:tracking-wider">
                {item.time}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section5;

"use client";
import { testimonialsData } from "@/utils/data/testimonials-data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import SectionReveal from "../../helper/section-reveal";

export default function Testimonials({ testimonials = testimonialsData }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[current] || testimonials[0];

  return (
    <SectionReveal>
      <div className="my-12 lg:my-24 mesh-gradient-3">
        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}></span>
            <span className="glass-card p-2 px-5 text-xl rounded-md" style={{ color: 'var(--text-primary)' }}>
              Testimonials
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <FaStar key={i} style={{ color: 'var(--accent-gold)' }} />
                ))}
              </div>
              <p className="italic mb-6" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--accent-blue)' }}>{testimonial.role}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '2rem' : '0.5rem',
                  backgroundColor: i === current ? 'var(--accent-blue)' : 'rgba(161,161,170,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

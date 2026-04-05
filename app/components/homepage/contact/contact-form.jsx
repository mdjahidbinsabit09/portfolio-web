"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#00d4ff", "#ff6b35", "#ffd700", "#ffffff", "#a855f7"];
  const particles = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.4,
    r: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * 4 + 2,
    alpha: 1,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.2,
  }));

  let frame;
  let start = null;
  const duration = 2800;

  function draw(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rotation += p.rotSpeed;
      p.alpha = Math.max(0, 1 - elapsed / duration);
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
      ctx.restore();
    });
    if (elapsed < duration) {
      frame = requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }
  frame = requestAnimationFrame(draw);
}

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      launchConfetti();
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    background: 'var(--glass-bg)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    width: '100%',
    borderRadius: '6px',
    padding: '8px 12px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  return (
    <div>
      <p className="font-medium mb-5 text-xl uppercase" style={{ color: 'var(--accent-blue)' }}>Contact with me</p>
      <div className="max-w-3xl rounded-lg p-3 lg:p-5" style={{ border: '1px solid var(--border-color)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)' }}>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base" style={{ color: 'var(--text-primary)' }}>Your Name: </label>
            <input
              style={inputStyle}
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base" style={{ color: 'var(--text-primary)' }}>Your Email: </label>
            <input
              style={inputStyle}
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
            />
            {error.email && <p className="text-sm text-red-400">Please provide a valid email!</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base" style={{ color: 'var(--text-primary)' }}>Your Message: </label>
            <textarea
              style={inputStyle}
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
              rows="4"
              value={userInput.message}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            {error.required && (
              <p className="text-sm text-red-400">All fields are required!</p>
            )}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider no-underline transition-all duration-200 ease-out hover:no-underline md:font-semibold"
              style={{
                background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
                color: '#0a0a0a',
              }}
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Sending Message...</span>
              ) : (
                <span className="flex items-center gap-1">
                  Send Message
                  <TbMailForward size={20} />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;

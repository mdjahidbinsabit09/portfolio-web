// @flow strict
"use client";
import { personalData as staticPersonal } from '@/utils/data/personal-data';
import Link from 'next/link';
import { useState } from 'react';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";
import ContactForm from './contact-form';
import VCardButton from '../../helper/vcard-button';
import SectionReveal from '../../helper/section-reveal';
import LiveClock from './live-clock';
import PrintButton from '../../helper/print-button';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-1 p-1 rounded transition-all duration-200 hover:scale-110"
      style={{ color: copied ? 'var(--accent-gold)' : 'var(--text-secondary)' }}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <IoCheckmarkOutline size={16} /> : <IoCopyOutline size={16} />}
    </button>
  );
}

function ContactSection({ personalData = staticPersonal }) {
  return (
    <SectionReveal>
      <div id="contact" className="my-12 lg:my-16 relative mt-24" style={{ color: 'var(--text-primary)' }}>
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}></span>
            <span className="glass-card w-fit p-2 px-5 text-xl rounded-md gradient-text-animate">
              Contact
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <ContactForm />
          <div className="lg:w-3/4">
            <div className="flex flex-col gap-5 lg:gap-9">
              <p className="text-sm md:text-xl flex items-center gap-3">
                <MdAlternateEmail
                  className="p-2 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={36}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
                <span>{personalData.email}</span>
                <CopyButton text={personalData.email} />
              </p>
              <p className="text-sm md:text-xl flex items-center gap-3">
                <IoMdCall
                  className="p-2 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={36}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
                <span>{personalData.phone}</span>
                <CopyButton text={personalData.phone} />
              </p>
              <p className="text-sm md:text-xl flex items-center gap-3">
                <CiLocationOn
                  className="p-2 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={36}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
                <span>{personalData.address}</span>
              </p>
            </div>

            <div className="mt-6">
              <LiveClock />
            </div>

            <div className="mt-8 lg:mt-10 flex items-center gap-5 lg:gap-8 flex-wrap">
              <Link target="_blank" href={personalData.github}>
                <IoLogoGithub
                  className="p-3 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={48}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
              </Link>
              <Link target="_blank" href={personalData.linkedIn}>
                <BiLogoLinkedin
                  className="p-3 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={48}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
              </Link>
              <Link target="_blank" href={personalData.twitter}>
                <FaXTwitter
                  className="p-3 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={48}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
              </Link>
              <Link target="_blank" href={personalData.stackOverflow}>
                <FaStackOverflow
                  className="p-3 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={48}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
              </Link>
              <Link target="_blank" href={personalData.facebook}>
                <FaFacebook
                  className="p-3 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ background: 'var(--glass-bg)', color: 'var(--text-secondary)' }}
                  size={48}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <VCardButton />
              <PrintButton />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default ContactSection;

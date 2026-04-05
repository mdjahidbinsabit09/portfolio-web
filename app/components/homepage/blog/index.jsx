// @flow strict
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogList from './blog-list';
import SectionReveal from '../../helper/section-reveal';
import Image from 'next/image';

function Blog({ blogs }) {
  return (
    <SectionReveal>
      <div id='blogs' className="relative z-50 border-t my-12 lg:my-24" style={{ borderColor: 'var(--border-color)' }}>
        <Image
          src="/section.svg"
          alt="Section background"
          width={1572}
          height={795}
          className="absolute top-0 -z-10 opacity-20"
        />

        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}></span>
            <span className="glass-card w-fit p-2 px-5 text-xl rounded-md gradient-text-animate">
              Blogs
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>

        <BlogList blogs={blogs} />

        <div className="flex justify-center mt-5 lg:mt-12">
          <Link
            className="flex items-center gap-1 hover:gap-3 rounded-full px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider no-underline transition-all duration-200 ease-out hover:no-underline md:font-semibold"
            style={{
              background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
              color: '#0a0a0a',
            }}
            role="button"
            href="/blog"
          >
            <span>View More</span>
            <FaArrowRight size={16} />
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}

export default Blog;

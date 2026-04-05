// @flow strict
"use client";
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  return (
    <div
      className="rounded-lg relative group transition-all duration-500"
      style={{
        border: '1px solid var(--border-color)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg">
        <Image
          src={blog?.cover_image}
          height={1080}
          width={1920}
          alt=""
          className='h-full w-full group-hover:scale-110 transition-all duration-300'
        />
      </div>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-sm" style={{ color: 'var(--accent-blue)' }}>
          <p>{timeConverter(blog.published_at)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <BsHeartFill />
              <span>{blog.public_reactions_count}</span>
            </p>
            {blog.comments_count > 0 &&
              <p className="flex items-center gap-1">
                <FaCommentAlt />
                <span>{blog.comments_count}</span>
              </p>
            }
          </div>
        </div>
        <Link target='_blank' href={blog.url}>
          <p
            className='my-2 lg:my-3 cursor-pointer text-lg sm:text-xl font-medium transition-colors duration-200'
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            {blog.title}
          </p>
        </Link>
        <p className='mb-2 text-sm' style={{ color: 'var(--accent-orange)' }}>
          {`${blog.reading_time_minutes} Min Read`}
        </p>
        <p className='text-sm lg:text-base pb-3 lg:pb-6 line-clamp-3' style={{ color: 'var(--text-secondary)' }}>
          {blog.description}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;

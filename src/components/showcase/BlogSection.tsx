import React, { useState, useMemo } from 'react';
import { blogPosts, BlogPost } from '@/data/blogs';
import BlogMarkdownRenderer from './BlogMarkdownRenderer';
import printerIcon from '@/assets/icons/printer.gif';

interface BlogSectionProps {
  selectedSlug: string | null;
  onSelectPost: (slug: string | null) => void;
  onNavigateToContact: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  selectedSlug,
  onSelectPost,
  onNavigateToContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['ALL', 'DevSecOps', 'Backend', 'Journey'];

  const currentPost = useMemo(() => {
    if (!selectedSlug) return null;
    return blogPosts.find((p) => p.slug === selectedSlug) || null;
  }, [selectedSlug]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCategory =
        selectedCategory === 'ALL' || post.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyLink = () => {
    if (!currentPost) return;
    const url = `${window.location.origin}/blog/${currentPost.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // Find next and previous posts
  const currentIndex = currentPost
    ? blogPosts.findIndex((p) => p.slug === currentPost.slug)
    : -1;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < blogPosts.length - 1
      ? blogPosts[currentIndex + 1]
      : null;

  // Render Single Post View
  if (currentPost) {
    return (
      <div className="max-w-[760px] text-black pb-12">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-[#a0a0a0]">
          <button
            type="button"
            onClick={() => onSelectPost(null)}
            className="site-button flex items-center gap-1.5 cursor-pointer !px-3 !py-1"
          >
            <span>←</span>
            <span>All Articles</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="site-button flex items-center gap-1.5 cursor-pointer !px-3 !py-1 text-xs"
            title="Copy shareable link to this article"
          >
            <span>{copiedLink ? '✓' : '🔗'}</span>
            <span>{copiedLink ? 'Link Copied!' : 'Share / Copy Link'}</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#0000a3] text-white px-2 py-0.5 text-xs font-['Terminal',monospace]">
              {currentPost.category}
            </span>
            <span className="text-xs text-[#555] font-['Terminal',monospace]">
              {currentPost.date} · {currentPost.readTime}
            </span>
          </div>

          <h1 className="!text-[28px] md:!text-[36px] font-bold text-black leading-tight mt-2 mb-3">
            {currentPost.title}
          </h1>

          <p className="text-[17px] text-[#444] italic border-l-2 border-[#808080] pl-3 my-3">
            {currentPost.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#e0e0e0]">
            {currentPost.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#e8e8e8] border border-[#bbb] px-2 py-0.5 text-[#333]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Body */}
        <div className="win-inset-panel bg-[#fdfdfd] p-5 md:p-7 select-text">
          <BlogMarkdownRenderer content={currentPost.content} />
        </div>

        {/* Author Bio Box */}
        <div className="bg-white p-4 border-2 border-black border-l-0 border-r-0 w-full flex items-center gap-4 my-8">
          <img
            src={printerIcon}
            alt="Author"
            className="w-12 h-10 object-contain shrink-0 [image-rendering:pixelated]"
          />
          <div className="flex flex-col text-sm">
            <h4 className="m-0 font-bold">Written by Azzaky Raihan</h4>
            <p className="text-xs text-[#444] mt-0.5">
              Specializing in DevSecOps, infrastructure automation, and resilient backend systems.{' '}
              <button
                type="button"
                onClick={onNavigateToContact}
                className="text-[#0000ee] underline hover:text-red-600 font-bold cursor-pointer inline"
              >
                Get in touch
              </button>{' '}
              for collaborations or questions.
            </p>
          </div>
        </div>

        {/* Next / Previous Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#808080]">
          {prevPost ? (
            <button
              type="button"
              onClick={() => onSelectPost(prevPost.slug)}
              className="win-border p-3 text-left bg-[#ece9d8] hover:bg-white flex flex-col cursor-pointer transition-colors"
            >
              <span className="text-[11px] text-[#666] font-['Terminal',monospace]">
                ← PREVIOUS POST
              </span>
              <span className="text-sm font-bold text-black mt-1 line-clamp-2">
                {prevPost.title}
              </span>
            </button>
          ) : <div />}

          {nextPost ? (
            <button
              type="button"
              onClick={() => onSelectPost(nextPost.slug)}
              className="win-border p-3 text-right bg-[#ece9d8] hover:bg-white flex flex-col items-end cursor-pointer transition-colors"
            >
              <span className="text-[11px] text-[#666] font-['Terminal',monospace]">
                NEXT POST →
              </span>
              <span className="text-sm font-bold text-black mt-1 line-clamp-2">
                {nextPost.title}
              </span>
            </button>
          ) : <div />}
        </div>
      </div>
    );
  }

  // Render Post List View
  return (
    <div className="max-w-[760px] text-black pb-12">
      <h1 className="!text-[36px] md:!text-[44px] leading-tight">Dev Log</h1>
      <h3 className="text-[#333]">Articles, Notes & Engineering Writeups</h3>
      <p className="mt-2 text-[17px] text-[#333]">
        A collection of deep dives on DevSecOps pipelines, backend reliability, and lessons learned along the way.
      </p>
      <br />

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`site-button !text-xs !py-1 !px-2.5 cursor-pointer ${
                selectedCategory === cat ? '!bg-[#0000a3] !text-white' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input with retro inset border */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles or #tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="win-inset-panel px-2.5 py-1 text-xs w-full sm:w-[220px] bg-white text-black outline-none focus:bg-[#ffffe0]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#888] hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Article Cards */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="win-inset-panel p-8 text-center bg-white">
            <p className="text-[#666]">No articles found matching your criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="site-button mt-3 !text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="win-border p-4 bg-[#fbfbfb] hover:bg-white transition-colors cursor-pointer group flex flex-col justify-between"
              onClick={() => onSelectPost(post.slug)}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0000a3] text-white text-[10px] px-1.5 py-0.2 font-['Terminal',monospace]">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#666] font-['Terminal',monospace]">
                      {post.date}
                    </span>
                  </div>
                  <span className="text-xs text-[#666] font-['Terminal',monospace]">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="!text-[20px] md:!text-[22px] font-bold text-[#0000ee] group-hover:text-red-600 underline underline-offset-2 transition-colors">
                  {post.title}
                </h2>

                <p className="text-[15px] text-[#333] leading-relaxed mt-2 line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-[#eef0f2] border border-[#d0d0d0] px-1.5 py-0.5 text-[#555]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-[#0000ee] group-hover:text-red-600">
                  Read Article →
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSection;

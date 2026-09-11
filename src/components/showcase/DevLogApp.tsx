import React, { useMemo, useRef, useEffect, useState } from 'react';
import { blogPosts } from '@/data/blogs';
import BlogMarkdownRenderer from './BlogMarkdownRenderer';
import creditsIcon from '@/assets/icons/credits.png';
import closeIcon from '@/assets/icons/close.png';
import maximizeIcon from '@/assets/icons/maximize.png';
import minimizeIcon from '@/assets/icons/minimize.png';
import windowResizeIcon from '@/assets/icons/windowResize.png';

export interface DevLogAppProps {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
  selectedSlug: string | null;
  pos?: { x: number; y: number };
  size?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
  onTitleMouseDown?: (e: React.MouseEvent) => void;
  onSelectSlug: (slug: string | null) => void;
  onNavigateToContact: () => void;
}

export const DevLogApp: React.FC<DevLogAppProps> = ({
  isOpen,
  isMinimized,
  isMaximized,
  isActive,
  zIndex,
  selectedSlug,
  pos,
  size,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onTitleMouseDown,
  onSelectSlug,
  onNavigateToContact,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever article changes or switching between list & article
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedSlug]);

  const currentPost = useMemo(() => {
    if (!selectedSlug) return null;
    return blogPosts.find((p) => p.slug === selectedSlug) || null;
  }, [selectedSlug]);

  // Next and Previous articles
  const currentIndex = currentPost
    ? blogPosts.findIndex((p) => p.slug === currentPost.slug)
    : -1;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < blogPosts.length - 1
      ? blogPosts[currentIndex + 1]
      : null;

  const handleCopyLink = () => {
    const url = currentPost
      ? `${window.location.origin}/blog/${currentPost.slug}`
      : `${window.location.origin}/blog`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen || isMinimized) {
    return null;
  }

  const windowTitle = currentPost
    ? `Dev Log - ${currentPost.title}`
    : 'Dev Log - Notes & Articles';

  return (
    <div
      onMouseDown={onFocus}
      style={{
        zIndex,
        ...(isMaximized
          ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 28px)' }
          : pos && size
          ? { top: pos.y, left: pos.x, width: size.width, height: size.height }
          : {}),
      }}
      className={`absolute win-border-outer bg-[#c3c6ca] flex flex-col shadow-2xl select-none ${
        !pos || !size
          ? isMaximized
            ? 'top-0 left-0 w-full h-[calc(100%-28px)]'
            : 'top-4 left-3 right-3 bottom-11 md:top-8 md:left-28 md:right-14 md:bottom-14 max-w-[920px] mx-auto'
          : ''
      }`}
    >
      <div className="win-border-inner flex flex-col flex-1 p-[2px] overflow-hidden">
        {/* Draggable Title Bar */}
        <div
          onMouseDown={onTitleMouseDown}
          className={`h-[20px] flex items-center justify-between px-1 shrink-0 ${
            isMaximized ? 'cursor-default' : 'cursor-move'
          } ${isActive ? 'bg-[#0000a3]' : 'bg-[#808080]'}`}
        >
          <div className="flex items-center gap-1.5 overflow-hidden">
            <img
              src={creditsIcon}
              alt=""
              className="w-3.5 h-3.5 [image-rendering:pixelated]"
            />
            <span className="showcase-header truncate text-white text-[12px] font-['MSSerif',sans-serif]">
              {windowTitle}
            </span>
          </div>

          {/* Control Buttons */}
          <div
            className="flex items-center gap-0.5 shrink-0 ml-2"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={onMinimize}
              className="w-[16px] h-[14px] bg-[#c3c6ca] border border-black border-t-white border-l-white flex items-center justify-center p-[1px] active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
              title="Minimize"
            >
              <div className="w-[12px] h-[12px] border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex items-center justify-center">
                <img src={minimizeIcon} alt="_" className="[image-rendering:pixelated]" />
              </div>
            </button>
            <button
              onClick={onToggleMaximize}
              className="w-[16px] h-[14px] bg-[#c3c6ca] border border-black border-t-white border-l-white flex items-center justify-center p-[1px] active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
              title="Maximize"
            >
              <div className="w-[12px] h-[12px] border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex items-center justify-center">
                <img src={maximizeIcon} alt="[]" className="[image-rendering:pixelated]" />
              </div>
            </button>
            <button
              onClick={onClose}
              className="w-[16px] h-[14px] bg-[#c3c6ca] border border-black border-t-white border-l-white flex items-center justify-center p-[1px] active:border-t-black active:border-l-black active:border-b-white active:border-r-white ml-0.5"
              title="Close"
            >
              <div className="w-[12px] h-[12px] border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex items-center justify-center">
                <img src={closeIcon} alt="X" className="[image-rendering:pixelated]" />
              </div>
            </button>
          </div>
        </div>

        {/* Retro Address Bar (Connects smoothly with IE retro feel & displays live URL) */}
        <div className="h-[26px] bg-[#c3c6ca] border-b border-[#808080] flex items-center px-2 text-xs font-['MSSerif',sans-serif] gap-2 shrink-0 select-none">
          <span className="text-[#333] font-bold">Address:</span>
          <div className="win-inset bg-white px-2 py-0.5 flex-1 flex items-center overflow-hidden">
            <span className="font-mono text-[11px] text-black truncate select-text">
              {currentPost
                ? `http://azzaky.dev/blog/${currentPost.slug}`
                : 'http://azzaky.dev/blog'}
            </span>
          </div>
        </div>

        {/* Clean Document Canvas */}
        <div
          ref={scrollRef}
          className="flex-1 my-[2px] win-inset-panel bg-white overflow-y-auto min-h-0 select-text"
        >
          {currentPost ? (
            /* Single Article View - Clean & Breathable */
            <article className="max-w-[680px] mx-auto py-6 px-6 md:px-10 text-black select-text">
              {/* Inline Breadcrumb & Share */}
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#d8d8d8] select-none">
                <button
                  onClick={() => onSelectSlug(null)}
                  className="text-[#0000ee] hover:text-red-600 underline font-bold text-[13px] cursor-pointer flex items-center gap-1 font-['MSSerif',sans-serif]"
                >
                  <span>←</span>
                  <span>Back to Dev Log</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="site-button !text-[11px] !py-0.5 !px-2 flex items-center gap-1 cursor-pointer"
                  title="Copy shareable link"
                >
                  <span>{copiedLink ? '✓' : '🔗'}</span>
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Clean Date & Meta Line */}
              <div className="flex items-center gap-2 text-xs font-['Terminal',monospace] text-[#555] mb-2 select-text">
                <span className="bg-[#0000a3] text-white px-1.5 py-0.2">
                  {currentPost.category}
                </span>
                <span>·</span>
                <span>{currentPost.date}</span>
                <span>·</span>
                <span>{currentPost.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="!text-[24px] md:!text-[28px] font-bold font-['MillenniumBold',serif] text-black leading-tight mt-1 mb-3 select-text">
                {currentPost.title}
              </h1>

              {/* Clean 3D Groove Divider */}
              <div className="h-[2px] border-t border-[#808080] border-b border-white my-4 select-none" />

              {/* Summary / Lead Paragraph */}
              <p className="text-[16px] italic text-[#444] font-['Millennium',serif] leading-relaxed mb-6 select-text">
                {currentPost.summary}
              </p>

              {/* Article Markdown Body */}
              <div className="select-text">
                <BlogMarkdownRenderer content={currentPost.content} />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-3 border-t border-[#c0c0c0] flex flex-wrap gap-1.5 select-text">
                {currentPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono bg-[#f0f0f0] border border-[#bbb] px-2 py-0.5 text-[#555]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Next / Prev Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-4 border-t border-[#808080] select-none">
                {prevPost ? (
                  <button
                    onClick={() => onSelectSlug(prevPost.slug)}
                    className="win-border p-2.5 text-left bg-[#f4f4f4] hover:bg-white cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] text-[#666] font-mono block">
                      ← PREVIOUS
                    </span>
                    <span className="text-[13px] font-bold font-['MillenniumBold',serif] text-[#0000ee] hover:text-red-600 line-clamp-1 mt-0.5">
                      {prevPost.title}
                    </span>
                  </button>
                ) : <div />}

                {nextPost ? (
                  <button
                    onClick={() => onSelectSlug(nextPost.slug)}
                    className="win-border p-2.5 text-right bg-[#f4f4f4] hover:bg-white cursor-pointer transition-colors sm:col-start-2"
                  >
                    <span className="text-[10px] text-[#666] font-mono block">
                      NEXT →
                    </span>
                    <span className="text-[13px] font-bold font-['MillenniumBold',serif] text-[#0000ee] hover:text-red-600 line-clamp-1 mt-0.5">
                      {nextPost.title}
                    </span>
                  </button>
                ) : <div />}
              </div>
            </article>
          ) : (
            /* Articles List View - Clean & Cozy */
            <div className="max-w-[700px] mx-auto py-8 px-6 md:px-10 text-black select-text">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h1 className="!text-[26px] md:!text-[30px] font-bold font-['MillenniumBold',serif] text-black m-0">
                  Dev Log
                </h1>
                <span className="font-mono text-[10px] text-[#555] bg-[#eef0f2] border border-[#bbb] px-2 py-0.5">
                  {blogPosts.length} ARTICLES ARCHIVED
                </span>
              </div>
              <p className="text-[14px] font-['Millennium',serif] text-[#555] m-0 mb-5">
                Notes, writeups, and reflections on infrastructure, security, and software architecture.
              </p>

              {/* 3D Divider */}
              <div className="h-[2px] border-t border-[#808080] border-b border-white mb-6 select-none" />

              {/* Clean Article Entries */}
              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onSelectSlug(post.slug)}
                    className="group cursor-pointer pb-6 border-b border-[#d0d0d0] last:border-b-0"
                  >
                    <div className="flex items-center gap-2 text-xs font-['Terminal',monospace] text-[#666] mb-1">
                      <span className="text-[#0000a3] font-bold">
                        [{post.category.toUpperCase()}]
                      </span>
                      <span>·</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-[18px] md:text-[20px] font-bold font-['MillenniumBold',serif] text-[#0000ee] group-hover:text-red-600 underline underline-offset-2 m-0 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-[14px] font-['Millennium',serif] text-[#333] leading-relaxed mt-1.5">
                      {post.summary}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((t) => (
                          <span key={t} className="font-mono text-[#777] text-[11px]">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#0000ee] font-bold group-hover:text-red-600 underline">
                        Read →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimal 2-Panel Retro Status Bar */}
        <div className="h-[20px] flex items-center font-['MSSerif',sans-serif] text-black px-0.5 pb-0.5 gap-[2px] shrink-0 select-none">
          <div className="win-inset h-full flex-1 flex items-center px-1.5 overflow-hidden">
            <span className="text-[11px] font-['MSSerif',sans-serif] text-black truncate">
              {currentPost ? currentPost.title : `${blogPosts.length} Article(s)`}
            </span>
          </div>
          <div className="win-inset h-full w-[24px] flex items-center justify-center">
            <img src={windowResizeIcon} alt="" className="w-3 h-3 [image-rendering:pixelated]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevLogApp;

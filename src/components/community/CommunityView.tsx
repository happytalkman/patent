import React, { useState } from 'react';
import { mockBooks, mockPapers, mockForumPosts } from '../../data/mockData';
import { BookOpen, FileText, MessageSquare, ThumbsUp, MessageCircle, ExternalLink, Search, PlusCircle } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'books' | 'papers' | 'forum'>('books');
  const [filterTag, setFilterTag] = useState<string>('ALL');
  const [forumList, setForumList] = useState(mockForumPosts);
  const [searchWord, setSearchWord] = useState('');

  const handleLike = (id: string) => {
    setForumList(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const filteredBooks = mockBooks.filter(b => 
    searchWord === '' || b.title.toLowerCase().includes(searchWord.toLowerCase()) || b.tags.some(t => t.toLowerCase().includes(searchWord.toLowerCase()))
  );

  const filteredPapers = mockPapers.filter(p => 
    searchWord === '' || p.title.toLowerCase().includes(searchWord.toLowerCase()) || p.associatedPatentClaim.toLowerCase().includes(searchWord.toLowerCase())
  );

  const filteredPosts = forumList.filter(f => 
    searchWord === '' || f.title.toLowerCase().includes(searchWord.toLowerCase()) || f.content.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Sub-navigation */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-nexus-purple mb-1">
            <BookOpen className="w-4 h-4" />
            <span>KNOWLEDGE HUB & EXPERT COMMUNITY</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-sora text-white">
            피지컬 AI 특허 도서 검색 & 전문가 커뮤니티
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            권위 있는 로보틱스 도서, arXiv/CoRL 최신 논문과 청구항 매핑, 변리사-엔지니어 실시간 Q&A
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1 bg-nexus-panel p-1.5 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveSubTab('books')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-all ${
              activeSubTab === 'books' ? 'bg-nexus-purple text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>전문 도서 검색</span>
          </button>
          <button
            onClick={() => setActiveSubTab('papers')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-all ${
              activeSubTab === 'papers' ? 'bg-nexus-purple text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>논문-특허 매핑</span>
          </button>
          <button
            onClick={() => setActiveSubTab('forum')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-all ${
              activeSubTab === 'forum' ? 'bg-nexus-purple text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Q&A 포럼</span>
          </button>
        </div>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="도서명, 저자, 논문 DOI, 포럼 질문 검색..."
            className="w-full bg-nexus-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexus-purple transition-colors"
          />
        </div>
      </div>

      {/* Tab 1: Books */}
      {activeSubTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-nexus-purple/40 transition-all group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-nexus-purple">
                  <span>{book.year} 출판</span>
                  <span className="px-2 py-0.5 rounded bg-nexus-purple/15 text-nexus-purple border border-nexus-purple/30">
                    연관특허 {book.relatedPatentsCount}건
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-nexus-cyan transition-colors leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-400">{book.author}</p>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{book.summary}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {book.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
                <button className="text-xs font-semibold text-nexus-cyan hover:underline flex items-center gap-1">
                  상세보기 <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Papers */}
      {activeSubTab === 'papers' && (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-nexus-cyan/40 transition-all">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono text-nexus-cyan">
                  <span className="px-2 py-0.5 rounded bg-nexus-cyan/10 border border-nexus-cyan/20">{paper.conferenceOrArxiv}</span>
                  <span className="text-slate-400">피인용수: {paper.citations}회</span>
                </div>
                <h3 className="text-sm font-bold text-white">{paper.title}</h3>
                <p className="text-xs text-slate-400">저자: {paper.authors.join(', ')}</p>
                <div className="mt-2 text-xs bg-nexus-panel p-2.5 rounded-lg border border-white/5 text-slate-300 font-mono flex items-center gap-2">
                  <span className="text-nexus-emerald font-semibold">매핑 특허 청구항:</span>
                  <span className="text-slate-200">{paper.associatedPatentClaim}</span>
                </div>
              </div>

              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-nexus-panel border border-nexus-cyan/40 text-nexus-cyan hover:bg-nexus-cyan hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                <span>논문 PDF 및 패밀리 분석</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Forum */}
      {activeSubTab === 'forum' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">총 {filteredPosts.length}개의 실시간 토론</span>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-nexus-purple text-white text-xs font-semibold hover:bg-nexus-purple/80 transition-all shadow-md">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>새 질문 작성</span>
            </button>
          </div>

          {filteredPosts.map((post) => (
            <div key={post.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 hover:border-nexus-purple/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-nexus-purple/30 text-nexus-purple flex items-center justify-center font-bold text-xs">
                    {post.authorName[0]}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white mr-2">{post.authorName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-nexus-cyan border border-white/5">
                      {post.authorRole}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{post.createdAt}</span>
              </div>

              <h3 className="text-sm font-bold text-white">{post.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

              <div className="pt-2 flex items-center justify-between border-t border-white/5">
                <div className="flex gap-1.5">
                  {post.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-nexus-surface text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-nexus-cyan transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-400 hover:text-nexus-purple transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.repliesCount}개의 답변</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
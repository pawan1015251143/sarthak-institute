import React from 'react';
import { ExternalLink, Play, Users, Eye, Video, Calendar, Sparkles } from 'lucide-react';

const YoutubeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const YouTubeSpotlight = () => {
  const channelUrl = "https://www.youtube.com/@sarthakinstitute6303";

  const sampleVideos = [
    {
      title: "10th Bihar Board (All Subjects) - VVI Objective Questions & Solved Model Paper",
      subject: "Class 10 All Subjects",
      views: "1.2 Lakh Views",
      duration: "45:10",
      thumbnail: "https://i.ytimg.com/vi/oHZ0CeUt7AY/hqdefault.jpg",
    },
    {
      title: "Class 12 Physics - Electrostatics Complete Revision in One Shot (Bihar Board)",
      subject: "12th Physics",
      views: "85K Views",
      duration: "1:12:30",
      thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Class 11 Chemistry - Atomic Structure & Periodic Table Numerical Special",
      subject: "11th Chemistry",
      views: "64K Views",
      duration: "52:18",
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg shadow-red-500/30 shrink-0">
              <YoutubeIcon className="w-9 h-9" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official YouTube Channel
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  • Joined 24 Feb 2017
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Sarthak Institute (@sarthakinstitute6303)
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Rakesh Yadav Sir dwara 10th Bihar Board (All Subjects) w 11th-12th (Physics &amp; Chemistry) ke Free Video Lectures
              </p>
            </div>
          </div>

          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
          >
            <YoutubeIcon className="w-5 h-5" />
            <span>Subscribe Channel (5.31K+)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Channel Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">
                5.31K+
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Subscribers
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">
                866
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Video Lectures
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">
                25,27,884
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Total Views (2.5M+)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">
                2017
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Trusted Since
              </div>
            </div>
          </div>
        </div>

        {/* Sample Video Lecture Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Popular Video Lectures by Rakesh Yadav Sir (10th All Subjects | 11th-12th Phy &amp; Che)
            </h3>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-red-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All 866 Videos →</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVideos.map((video, idx) => (
              <a
                key={idx}
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-800/80 hover:bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-red-500/50 transition-all duration-300 block shadow-md"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    {video.subject}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h4>
                  <div className="text-xs text-slate-400">
                    {video.views} • Rakesh Yadav Sir
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSpotlight;

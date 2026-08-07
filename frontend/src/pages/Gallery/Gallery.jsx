import React, { useState } from 'react';
import useSEO from '../../hooks/useSEO';
import { GALLERY_PREVIEW_DATA } from '../../utils/constants';
import Modal from '../../components/Modal/Modal';
import { Eye, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  useSEO({
    title: 'Photo Gallery',
    description: 'Explore the vibrant campus life, classrooms, and events at Sarthak Institute, Lalganj.',
    path: '/gallery'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Events', 'Classroom', 'Facilities', 'Achievements'];

  const filteredGallery =
    selectedCategory === 'All'
      ? GALLERY_PREVIEW_DATA
      : GALLERY_PREVIEW_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
          CAMPUS &amp; COMMUNITY
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
          Sarthak Institute Photo Gallery
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-base">
          Explore our smart classrooms, computerized testing labs, annual prize distribution ceremonies, and felicitation events.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="glass-card-hover overflow-hidden group relative aspect-[16/10] cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-400">
                {item.category}
              </span>
              <h4 className="text-sm font-bold mt-1">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Full Image Viewer Modal */}
      <Modal
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        title={activeImage ? activeImage.title : 'Photo View'}
        maxWidth="max-w-4xl"
      >
        {activeImage && (
          <div className="space-y-4">
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="w-full rounded-2xl object-cover max-h-[70vh]"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="badge-primary">{activeImage.category}</span>
              <span className="text-xs font-semibold text-slate-500">
                Sarthak Institute Campus Gallery
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Gallery;

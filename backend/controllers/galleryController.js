const { pool, getIsMock } = require('../config/db');

// In-memory gallery store
let mockGallery = [
  {
    id: 1,
    title: 'Sarthak Institute Classroom 1',
    category: 'Classrooms',
    url: '/images/gallery/class1.jpg',
  },
  {
    id: 2,
    title: 'Smart Digital Classrooms & Interactive Board Study',
    category: 'Campus',
    url: '/images/gallery/class2.jpg',
  },
  {
    id: 3,
    title: 'Students Studying in Classroom',
    category: 'Classrooms',
    url: '/images/gallery/class3.jpg',
  },
  {
    id: 4,
    title: 'Sarthak Institute Classroom Batch',
    category: 'Classrooms',
    url: '/images/gallery/class4.jpg',
  },
  {
    id: 5,
    title: 'Annual Prize Distribution 2025',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Teachers Day Celebration',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Modern Library for Self Study',
    category: 'Facilities',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: '100% Board Pass Rate Award',
    category: 'Achievements',
    url: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=800&q=80',
  }
];

// GET /api/gallery
const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    let list = [];

    if (getIsMock()) {
      list = mockGallery;
      if (category && category !== 'All') {
        list = list.filter((g) => g.category === category);
      }
    } else {
      if (category && category !== 'All') {
        const [rows] = await pool.query('SELECT * FROM gallery_images WHERE category = ?', [category]);
        list = rows;
      } else {
        const [rows] = await pool.query('SELECT * FROM gallery_images ORDER BY id DESC');
        list = rows;
      }
    }

    const formatted = list.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      url: g.image_url || g.url,
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/gallery (Admin only)
const uploadGalleryImage = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    const imageUrl = req.file
      ? `/uploads/gallery/${req.file.filename}`
      : 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';

    const newImg = {
      id: Date.now(),
      title: title || 'Sarthak Institute Event',
      category: category || 'Campus',
      url: imageUrl,
    };

    if (getIsMock()) {
      mockGallery.unshift(newImg);
    } else {
      await pool.query(
        'INSERT INTO gallery_images (title, category, image_url) VALUES (?, ?, ?)',
        [newImg.title, newImg.category, imageUrl]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Image uploaded to gallery successfully.',
      data: newImg,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGallery,
  uploadGalleryImage,
};

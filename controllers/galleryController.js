const GalleryItem = require('../models/GalleryItem');

const createGalleryItem = async (req, res) => {
  const { caption } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  const item = new GalleryItem({ imageUrl, caption, createdBy: req.user._id });
  await item.save();
  res.status(201).json(item);
};

const getGallery = async (req, res) => {
  const items = await GalleryItem.find().populate('createdBy', 'name');
  res.json(items);
};

const likeImage = async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item.likes.includes(req.user._id)) {
    item.likes.push(req.user._id);
    await item.save();
  }
  res.json(item);
};

module.exports = { createGalleryItem, getGallery, likeImage };

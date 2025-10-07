export const state = {
  draggedElement: null,
  dragOffset: { x: 0, y: 0 },

  activeImageId: null,
  observer: null,

  images: [],
  currentPage: 0,
  itemsPerPage: 12,
  isLoading: false,
  hasMoreImages: true,
  loadedImages: new Set(),

  placeholder: null,
  currentImageId: null,
  keydownHandler: null,

  isResizing: false,
  startX: 0,
  startImageListWidth: 0,
  startPreviewWidth: 0,
  minImageListPercent: 30,
  minPreviewPercent: 20,
  defaultImageListPercent: 60,
  defaultPreviewPercent: 40,
};

import { state } from "./state.js";
import { imageNames } from "./constants.js";

export function createImageManager() {
  function initDefaultImages() {
    state.images = imageNames.map((filename, index) => ({
      id: index + 1,
      name: filename.replace(".jpg", "").replace(/[_-]/g, " "),
      filename: filename,
      url: `img/${filename}`,
      dateAdded: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
    }));
  }

  function getImagesForCurrentPage() {
    const startIndex = state.currentPage * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;

    return state.images.slice(startIndex, endIndex);
  }

  async function loadNextPage() {
    if (state.isLoading || !state.hasMoreImages) {
      return [];
    }

    state.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newImages = getImagesForCurrentPage();
    const uniqueNewImages = newImages.filter(
      (image) => !state.loadedImages.has(image.id),
    );
    uniqueNewImages.forEach((image) => state.loadedImages.add(image.id));

    state.currentPage++;
    const totalLoaded = state.currentPage * state.itemsPerPage;

    state.hasMoreImages = totalLoaded < state.images.length;
    state.isLoading = false;

    return uniqueNewImages;
  }

  function addImage(imageData) {
    const newImage = {
      id: Date.now(),
      name: imageData.name,
      filename: imageData.filename,
      url: imageData.url,
      dateAdded: new Date(),
    };

    state.images.unshift(newImage);
    state.loadedImages.add(newImage.id);
    state.currentPage++;
    state.hasMoreImages = true;

    return newImage;
  }

  function getImageById(id) {
    return state.images.find((image) => image.id === id);
  }

  function getImageIndex(id) {
    return state.images.findIndex((image) => image.id === id);
  }

  function getNextImage(currentId) {
    const currentIndex = getImageIndex(currentId);

    if (currentIndex === -1 || currentIndex >= state.images.length - 1) {
      return null;
    }

    return state.images[currentIndex + 1];
  }

  function getPreviousImage(currentId) {
    const currentIndex = getImageIndex(currentId);

    if (currentIndex <= 0) {
      return null;
    }

    return state.images[currentIndex - 1];
  }

  function getTotalCount() {
    return state.images.length;
  }

  function isLoadingMore() {
    return state.isLoading;
  }

  function hasMore() {
    return state.hasMoreImages;
  }

  function resetPagination() {
    state.currentPage = 0;
    state.hasMoreImages = true;
    state.isLoading = false;
    state.loadedImages.clear();
  }

  initDefaultImages();

  return {
    get currentPage() {
      return state.currentPage;
    },
    get itemsPerPage() {
      return state.itemsPerPage;
    },
    getTotalCount,
    hasMore,
    isLoadingMore,
    loadNextPage,
    addImage,
    getImageById,
    getNextImage,
    getPreviousImage,
    resetPagination,
  };
}

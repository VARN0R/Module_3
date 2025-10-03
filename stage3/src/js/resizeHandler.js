import { state } from "./state.js";
import {
  resizeHandle,
  imageListContainer,
  previewContainer,
  galleryContainer,
  imageGrid,
} from "./constants.js";

export function createResizeHandler() {
  function setupEventListeners() {
    resizeHandle.addEventListener("mousedown", startResize);
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", endResize);
    resizeHandle.addEventListener("selectstart", (e) => e.preventDefault());
    imageGrid.addEventListener("scroll", () => {
      if (window.imageListInstance) {
        window.imageListInstance.handleScroll();
      }
    });
  }

  function setDefaultSizes() {
    const totalWidth = galleryContainer.offsetWidth;
    const imageListWidth = (totalWidth * state.defaultImageListPercent) / 100;
    const previewWidth = (totalWidth * state.defaultPreviewPercent) / 100;

    imageListContainer.style.width = `${imageListWidth}px`;
    previewContainer.style.width = `${previewWidth}px`;
  }

  function startResize(e) {
    state.isResizing = true;
    state.startX = e.clientX;
    state.startImageListWidth = imageListContainer.offsetWidth;
    state.startPreviewWidth = previewContainer.offsetWidth;

    document.body.classList.add("resizing");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    e.preventDefault();
  }

  function handleResize(e) {
    if (!state.isResizing) {
      return;
    }

    const deltaX = e.clientX - state.startX;
    const newImageListWidth = state.startImageListWidth + deltaX;
    const newPreviewWidth = state.startPreviewWidth - deltaX;
    const totalWidth = galleryContainer.offsetWidth;
    const minImageListWidth = (totalWidth * state.minImageListPercent) / 100;
    const minPreviewWidth = (totalWidth * state.minPreviewPercent) / 100;

    if (
      newImageListWidth >= minImageListWidth &&
      newPreviewWidth >= minPreviewWidth
    ) {
      imageListContainer.style.width = `${newImageListWidth}px`;
      previewContainer.style.width = `${newPreviewWidth}px`;
    }
  }

  function endResize() {
    state.isResizing = false;
    document.body.classList.remove("resizing");
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }

  function getCurrentSizes() {
    const totalWidth = galleryContainer.offsetWidth;
    const imageListWidth = imageListContainer.offsetWidth;
    const previewWidth = previewContainer.offsetWidth;

    return {
      totalWidth,
      imageListWidth,
      previewWidth,
      imageListPercent: (imageListWidth / totalWidth) * 100,
      previewPercent: (previewWidth / totalWidth) * 100,
    };
  }

  function setSizes(imageListPercent, previewPercent) {
    const totalWidth = galleryContainer.offsetWidth;
    const imageListWidth = (totalWidth * imageListPercent) / 100;
    const previewWidth = (totalWidth * previewPercent) / 100;

    imageListContainer.style.width = `${imageListWidth}px`;
    previewContainer.style.width = `${previewWidth}px`;
  }

  function resetToDefault() {
    setSizes(state.defaultImageListPercent, state.defaultPreviewPercent);
  }

  function handleWindowResize() {
    const sizes = getCurrentSizes();
    const totalWidth = galleryContainer.offsetWidth;
    const imageListPercent = (sizes.imageListWidth / totalWidth) * 100;
    const previewPercent = (sizes.previewWidth / totalWidth) * 100;

    if (imageListPercent < state.minImageListPercent) {
      setSizes(state.minImageListPercent, 100 - state.minImageListPercent);
    } else if (previewPercent < state.minPreviewPercent) {
      setSizes(100 - state.minPreviewPercent, state.minPreviewPercent);
    } else {
      setSizes(imageListPercent, previewPercent);
    }
  }

  function getMinSizes() {
    const totalWidth = galleryContainer.offsetWidth;

    return {
      minImageListWidth: (totalWidth * state.minImageListPercent) / 100,
      minPreviewWidth: (totalWidth * state.minPreviewPercent) / 100,
    };
  }

  function canResize(newImageListWidth, newPreviewWidth) {
    const minSizes = getMinSizes();

    return (
      newImageListWidth >= minSizes.minImageListWidth &&
      newPreviewWidth >= minSizes.minPreviewWidth
    );
  }

  setupEventListeners();
  setDefaultSizes();

  return {
    getCurrentSizes,
    setSizes,
    resetToDefault,
    handleWindowResize,
    getMinSizes,
    canResize,
  };
}

import { state } from "./state.js";
import { imageGrid, loadingIndicator, scrollToTopBtn } from "./constants.js";

export function createImageList(imageManager, onImageSelect) {
  function setupIntersectionObserver() {
    const options = { root: null, rootMargin: "200px", threshold: 0.1 };

    state.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          imageManager.hasMore() &&
          !imageManager.isLoadingMore()
        ) {
          loadMoreImages();
        }
      });
    }, options);
  }

  function setupScrollToTop() {
    scrollToTopBtn.addEventListener("click", () => {
      imageGrid.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  async function loadInitialImages() {
    let images = [];

    showLoading();
    images = await imageManager.loadNextPage();
    renderImages(images);
    hideLoading();
    updateScrollToTopButton();
  }

  async function loadMoreImages() {
    let images = [];

    if (!imageManager.hasMore() || imageManager.isLoadingMore()) {
      return;
    }

    showLoading();
    images = await imageManager.loadNextPage();
    renderImages(images);
    hideLoading();
    updateScrollToTopButton();
  }

  function renderImages(images) {
    images.forEach((image, idx) => {
      const existingCard = imageGrid.querySelector(
        `[data-image-id="${image.id}"]`
      );

      if (existingCard) {
        return;
      }

      const imageCard = createImageCard(image);
      imageGrid.appendChild(imageCard);

      if (idx === images.length - 1) {
        state.observer.observe(imageCard);
      }
    });
  }

  function createImageCard(image) {
    const card = document.createElement("div");
    card.className = "image-card";
    card.dataset.imageId = image.id;
    card.draggable = true;

    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.name;
    img.loading = "lazy";
    img.onerror = () => {
      console.warn(`Failed to load image: ${image.url}`);
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik04NSA2MEgxMTVWNjBIODVaIiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik03NSA5MEgxMjVWOTBINzVaIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEyIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=";
      img.alt = "Image not found";
    };

    const name = document.createElement("div");
    name.className = "image-name";
    name.textContent = image.name;

    card.addEventListener("click", () => {
      selectImage(image.id);
    });

    card.appendChild(img);
    card.appendChild(name);
    return card;
  }

  function selectImage(imageId) {
    if (state.activeImageId) {
      const previousCard = imageGrid.querySelector(
        `[data-image-id="${state.activeImageId}"]`
      );

      if (previousCard) {
        previousCard.classList.remove("active");
      }
    }

    const currentCard = imageGrid.querySelector(`[data-image-id="${imageId}"]`);

    if (currentCard) {
      currentCard.classList.add("active");
    }

    state.activeImageId = imageId;

    if (onImageSelect) {
      onImageSelect(imageId);
    }
  }

  function setActiveImage(imageId) {
    selectImage(imageId);
  }

  function addNewImage(image) {
    const existingCard = imageGrid.querySelector(
      `[data-image-id="${image.id}"]`
    );

    if (existingCard) {
      selectImage(image.id);
      return;
    }

    const imageCard = createImageCard(image);
    imageGrid.insertBefore(imageCard, imageGrid.firstChild);
    selectImage(image.id);
    updateScrollToTopButton();
  }

  function getActiveImageId() {
    return state.activeImageId;
  }

  function showLoading() {
    loadingIndicator.classList.remove("hidden");
  }

  function hideLoading() {
    loadingIndicator.classList.add("hidden");
  }

  function updateScrollToTopButton() {
    const scrollTop = imageGrid.scrollTop;
    scrollToTopBtn.style.display = scrollTop > 500 ? "block" : "none";
  }

  function handleScroll() {
    updateScrollToTopButton();
  }

  function getImageCard(imageId) {
    return imageGrid.querySelector(`[data-image-id="${imageId}"]`);
  }

  function clear() {
    imageGrid.innerHTML = "";
    state.activeImageId = null;
    imageManager.resetPagination();
  }

  async function reload() {
    clear();
    await loadInitialImages();
  }

  function destroy() {
    state.observer.disconnect();
  }

  setupIntersectionObserver();
  setupScrollToTop();
  loadInitialImages();

  return {
    setActiveImage,
    addNewImage,
    getActiveImageId,
    showLoading,
    hideLoading,
    updateScrollToTopButton,
    handleScroll,
    getImageCard,
    clear,
    reload,
    destroy,
  };
}

import { state } from "./state.js";
import { previewContent } from "./constants.js";

export function createPreviewArea(imageManager, onImageChange) {
  state.placeholder = previewContent.querySelector(".preview-placeholder");

  function setupKeyboardNavigation() {
    state.keydownHandler = (e) => {
      if (!state.currentImageId) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPreviousImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextImage();
      }
    };

    document.addEventListener("keydown", state.keydownHandler);
  }

  function showImage(imageId) {
    const image = imageManager.getImageById(imageId);

    if (!image) {
      return;
    }

    state.currentImageId = imageId;
    renderImage(image);
  }

  function renderImage(image) {
    const imageContainer = document.createElement("div");
    const controls = createControls();
    const imageElement = createImageElement(image);
    const navigation = createNavigation();

    state.placeholder.classList.add("hidden");
    clearPreviewContent();

    imageContainer.style.cssText = `
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      height: 100%;
    `;

    imageContainer.appendChild(imageElement);
    previewContent.appendChild(controls);
    previewContent.appendChild(imageContainer);
    previewContent.appendChild(navigation);
  }

  function createControls() {
    const controls = document.createElement("div");
    const closeBtn = document.createElement("button");

    controls.className = "preview-controls";
    closeBtn.innerHTML = "╳";
    closeBtn.title = "Close preview";
    closeBtn.addEventListener("click", () => {
      clearPreview();
    });
    controls.appendChild(closeBtn);

    return controls;
  }

  function createImageElement(image) {
    const img = document.createElement("img");

    img.className = "preview-image";
    img.src = image.url;
    img.alt = image.name;
    img.title = image.name;

    return img;
  }

  function createNavigation() {
    const navigation = document.createElement("div");
    navigation.className = "preview-navigation";

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "←";
    prevBtn.title = "Previous image";
    prevBtn.addEventListener("click", () => {
      showPreviousImage();
    });

    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "→";
    nextBtn.title = "Next image";
    nextBtn.addEventListener("click", () => {
      showNextImage();
    });

    navigation.appendChild(prevBtn);
    navigation.appendChild(nextBtn);
    updateNavigationButtons(prevBtn, nextBtn);
    return navigation;
  }

  function updateNavigationButtons(prevBtn, nextBtn) {
    const previousImage = imageManager.getPreviousImage(state.currentImageId);
    const nextImage = imageManager.getNextImage(state.currentImageId);

    if (!state.currentImageId) {
      return;
    }

    if (previousImage) {
      prevBtn.disabled = false;
      prevBtn.title = `Previous: ${previousImage.name}`;
    } else {
      prevBtn.disabled = true;
      prevBtn.title = "No previous image";
    }

    if (nextImage) {
      nextBtn.disabled = false;
      nextBtn.title = `Next: ${nextImage.name}`;
    } else {
      nextBtn.disabled = true;
      nextBtn.title = "No next image";
    }
  }

  function showPreviousImage() {
    const previousImage = imageManager.getPreviousImage(state.currentImageId);

    if (!state.currentImageId) {
      return;
    }

    if (previousImage) {
      showImage(previousImage.id);
      if (onImageChange) onImageChange(previousImage.id);
    }
  }

  function showNextImage() {
    const nextImage = imageManager.getNextImage(state.currentImageId);

    if (!state.currentImageId) {
      return;
    }

    if (nextImage) {
      showImage(nextImage.id);
      if (onImageChange) onImageChange(nextImage.id);
    }
  }

  function clearPreview() {
    state.currentImageId = null;
    clearPreviewContent();
    renderPlaceholder();

    if (onImageChange) {
      onImageChange(null);
    }
  }

  function clearPreviewContent() {
    const elementsToRemove = previewContent.querySelectorAll(
      ".preview-controls, .preview-image, .preview-navigation, div[style*='flex: 1']",
    );

    elementsToRemove.forEach((element) => element.remove());
  }

  function renderPlaceholder() {
    state.placeholder.classList.remove("hidden");
  }

  function getCurrentImageId() {
    return state.currentImageId;
  }

  function hasActiveImage() {
    return state.currentImageId !== null;
  }

  function updateImage(imageId) {
    if (imageId) {
      showImage(imageId);
    } else {
      clearPreview();
    }
  }

  function handleDrop(imageId) {
    showImage(imageId);

    if (onImageChange) {
      onImageChange(imageId);
    }
  }

  function isPointInPreviewArea(x, y) {
    const rect = previewContent.getBoundingClientRect();

    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  }

  function getPreviewAreaBounds() {
    return previewContent.getBoundingClientRect();
  }

  setupKeyboardNavigation();
  renderPlaceholder();

  return {
    showImage,
    clearPreview,
    getCurrentImageId,
    hasActiveImage,
    updateImage,
    handleDrop,
    isPointInPreviewArea,
    getPreviewAreaBounds,
  };
}

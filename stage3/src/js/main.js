import { createImageManager } from "./imageManager.js";
import { createImageList } from "./imageList.js";
import { createPreviewArea } from "./previewArea.js";
import { createDragDrop } from "./dragDrop.js";
import { createResizeHandler } from "./resizeHandler.js";
import { createFormHandler } from "./formHandler.js";
import { PLACEHOLDER_DATA_URL } from "./constants.js";

function handleImageLoadError(imgElement) {
  console.warn("Failed to load image:", imgElement.src);
  imgElement.src = PLACEHOLDER_DATA_URL;
  imgElement.alt = "Image not found";
}

export function main() {
  try {
    const imageManager = createImageManager();

    const previewArea = createPreviewArea(imageManager, (imageId) => {
      if (imageId) {
        imageList.setActiveImage(imageId);
      }
    });

    const imageList = createImageList(imageManager, (imageId) => {
      if (imageId) {
        previewArea.showImage(imageId);
      } else {
        previewArea.clearPreview();
      }
    });

    const dragDrop = createDragDrop(imageList, previewArea, (imageId) => {
      if (imageId) {
        previewArea.showImage(imageId);
        imageList.setActiveImage(imageId);
      } else {
        previewArea.clearPreview();
      }
    });

    const resizeHandler = createResizeHandler();

    const formHandler = createFormHandler(imageManager, null);

    formHandler.imageList = imageList;

    window.addEventListener("resize", () => {
      resizeHandler.handleWindowResize();
    });

    document.addEventListener(
      "error",
      (e) => {
        if (e.target && e.target.tagName === "IMG") {
          handleImageLoadError(e.target);
        }
      },
      true,
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        previewArea.clearPreview();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        formHandler.focusNameField();
      }
    });

    window.imageListInstance = imageList;

    console.log("aaaaaaa");

    return {
      imageManager,
      imageList,
      previewArea,
      dragDrop,
      resizeHandler,
      formHandler,
    };
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}

document.addEventListener("DOMContentLoaded", main);

import { dragCoordinates, previewContainer } from "./constants.js";
import { state } from "./state.js";

export function createDragDrop(imageList, previewArea, onImageSelect) {
  function setupEventListeners() {
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("drag", handleDrag);
    document.addEventListener("dragend", handleDragEnd);

    previewContainer.addEventListener("dragover", handleDragOver);
    previewContainer.addEventListener("drop", handleDrop);
    previewContainer.addEventListener("dragenter", handleDragEnter);
    previewContainer.addEventListener("dragleave", handleDragLeave);
  }

  function handleDragStart(e) {
    const imageCard = e.target.closest(".image-card");
    const imageId = parseInt(imageCard.dataset.imageId);
    const rect = imageCard.getBoundingClientRect();

    if (!imageCard) {
      return;
    }
    state.draggedElement = imageCard;
    state.draggedElement.classList.add("dragging");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", imageId.toString());

    state.dragOffset.x = e.clientX - rect.left;
    state.dragOffset.y = e.clientY - rect.top;

    showDragCoordinates();
  }

  function handleDrag(e) {
    const isOverPreview = previewArea.isPointInPreviewArea(
      e.clientX,
      e.clientY,
    );

    if (!state.draggedElement) {
      return;
    }

    updateDragCoordinates(e.clientX, e.clientY);

    e.dataTransfer.dropEffect = isOverPreview ? "move" : "none";
  }

  function handleDragEnd() {
    if (state.draggedElement) {
      state.draggedElement.classList.remove("dragging");
      state.draggedElement = null;
    }

    hideDragCoordinates();
    previewContainer.classList.remove("drag-over");
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e) {
    e.preventDefault();
    previewContainer.classList.add("drag-over");
  }

  function handleDragLeave(e) {
    const rect = previewContainer.getBoundingClientRect();

    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      previewContainer.classList.remove("drag-over");
    }
  }

  function handleDrop(e) {
    const imageId = parseInt(e.dataTransfer.getData("text/plain"));
    e.preventDefault();

    previewContainer.classList.remove("drag-over");

    if (imageId) {
      previewArea.handleDrop(imageId);
      imageList.setActiveImage(imageId);

      if (onImageSelect) {
        onImageSelect(imageId);
      }
    }
  }

  function showDragCoordinates() {
    dragCoordinates.classList.add("visible");
  }

  function hideDragCoordinates() {
    dragCoordinates.classList.remove("visible");
  }

  function updateDragCoordinates(x, y) {
    dragCoordinates.textContent = `X: ${x}, Y: ${y}`;
    dragCoordinates.style.left = `${x + 10}px`;
    dragCoordinates.style.top = `${y - 30}px`;
  }

  function isDragging() {
    return state.draggedElement !== null;
  }

  function getDraggedElement() {
    return state.draggedElement;
  }

  function disableDrag(element) {
    element.draggable = false;
  }

  function enableDrag(element) {
    element.draggable = true;
  }

  setupEventListeners();

  return {
    isDragging,
    getDraggedElement,
    disableDrag,
    enableDrag,
  };
}

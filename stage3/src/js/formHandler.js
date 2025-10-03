import {
  COLORS,
  form,
  nameInput,
  fileInput,
  openModalButton,
  modalOverlay,
  modalWindow,
} from "./constants.js";

export function createFormHandler(imageManager, imageList) {
  function setupEventListeners() {
    form.addEventListener("submit", handleSubmit);
    fileInput.addEventListener("change", handleFileChange);
    nameInput.addEventListener("input", validateName);
    fileInput.addEventListener("change", validateFile);
    openModalButton.addEventListener("click", handleClickAddYourImage);
    modalOverlay.addEventListener("click", handleOverlayClick);
  }

  function handleClickAddYourImage(e) {
    e.preventDefault();
    modalOverlay.style.display = "block";
    modalWindow.style.display = "block";
  }

  function handleOverlayClick(e) {
    e.preventDefault();

    if (e.target !== modalWindow) {
      modalOverlay.style.display = "none";
      modalWindow.style.display = "none";
    }
  }

  function handleSubmit(e) {
    const formData = new FormData(form);
    const name = formData.get("imageName").trim();
    const file = formData.get("imageFile");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    addImageToGallery(name, file);
  }

  function addImageToGallery(name, file) {
    try {
      const imageUrl = URL.createObjectURL(file);
      const filename = file.name;
      const imageData = { name, filename, url: imageUrl };
      const newImage = imageManager.addImage(imageData);

      if (imageList) {
        imageList.addNewImage(newImage);
      }
      clearForm();
      showNotification("Image added successfully!", "success");
    } catch (error) {
      console.error("Error adding image:", error);
      showNotification("Error adding image. Please try again.", "error");
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file && !nameInput.value.trim()) {
      const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      nameInput.value = nameWithoutExtension.replace(/[_-]/g, " ");
    }
  }

  function validateForm() {
    const isNameValid = validateName();
    const isFileValid = validateFile();

    return isNameValid && isFileValid;
  }

  function validateName() {
    const name = nameInput.value.trim();
    const isValid = name.length >= 2 && name.length <= 50;

    setFieldValidity(
      nameInput,
      isValid,
      isValid ? "" : "name must be between 2 and 50 characters",
    );
    return isValid;
  }

  function validateFile() {
    const file = fileInput.files[0];

    if (!file) {
      setFieldValidity(fileInput, false, "please select an image file");
      return false;
    }

    setFieldValidity(fileInput, true, "");
    return true;
  }

  function setFieldValidity(field, isValid, message) {
    const existingMessage = field.parentNode.querySelector(".error-message");

    if (isValid) {
      field.style.borderColor = COLORS.success;
      field.style.backgroundColor = "#f8fff9";
    } else {
      field.style.borderColor = COLORS.error;
      field.style.backgroundColor = "#fff8f8";
    }

    if (existingMessage) {
      existingMessage.remove();
    }

    if (!isValid && message) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.style.color = COLORS.error;
      errorMessage.style.fontSize = "12px";
      errorMessage.style.marginTop = "4px";
      errorMessage.textContent = message;
      field.parentNode.appendChild(errorMessage);
    }
  }

  function clearForm() {
    const errorMessages = form.querySelectorAll(".error-message");

    form.reset();
    errorMessages.forEach((message) => message.remove());
    nameInput.style.borderColor = "";
    nameInput.style.backgroundColor = "";
    fileInput.style.borderColor = "";
    fileInput.style.backgroundColor = "";
    modalOverlay.style.display = "none";
    modalWindow.style.display = "none";
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");

    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;

    switch (type) {
      case "success":
        notification.style.backgroundColor = "#28a745";
        break;
      case "error":
        notification.style.backgroundColor = "#dc3545";
        break;
      case "warning":
        notification.style.backgroundColor = "#ffc107";
        notification.style.color = "#212529";
        break;
      default:
        notification.style.backgroundColor = "#007bff";
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  function previewImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function getFormData() {
    return {
      name: nameInput.value.trim(),
      file: fileInput.files[0],
    };
  }

  function isFormValid() {
    return validateForm();
  }

  function focusNameField() {
    nameInput.focus();
  }

  setupEventListeners();

  return {
    addImageToGallery,
    previewImage,
    getFormData,
    isFormValid,
    focusNameField,
    clearForm,
    set imageList(instance) {
      imageList = instance;
    },
  };
}

export const galleryContainer = document.getElementById("galleryContainer");
export const imageListContainer = document.getElementById("imageListContainer");
export const previewContainer = document.getElementById("previewContainer");
export const imageGrid = document.getElementById("imageGrid");
export const loadingIndicator = document.getElementById("loadingIndicator");
export const scrollToTopBtn = document.getElementById("scrollToTop");
export const resizeHandle = document.getElementById("resizeHandle");
export const previewContent = document.getElementById("previewContent");
export const dragCoordinates = document.getElementById("dragCoordinates");
export const form = document.getElementById("addImageForm");
export const nameInput = document.getElementById("imageName");
export const fileInput = document.getElementById("imageFile");
export const modalWindow = document.getElementById("modalWindow");
export const modalOverlay = document.getElementById("modalOverlay");
export const openModalButton = document.getElementById("openModalButton");

export const imageNames = [
  "14d42f3ff014f326941f8398781eb435.jpg",
  "18aa3f17b1dc472ca78ffc565c31ee31.jpg",
  "18cc8b2e35eb9a8a66c6ab512735452e.jpg",
  "1c5e529a8ec081029ee90d1783cc4de4.jpg",
  "1d68ca2788f84ed438bfb1e53e9dfb2e.jpg",
  "223281282dbaea390fe664b9b150f3c1.jpg",
  "264339e73144b98db31ac40b9298cdfa.jpg",
  "28866609ecf0b0d8359dc0b8fd8f8a92.jpg",
  "28e4392dd47ef4b996c5b90f3a93b61f.jpg",
  "3185ed6fcc34a4888183883f70b9383b.jpg",
  "325c4f910989d1c0fab3a26cc6f84379.jpg",
  "4218e3b5c8ca8fd83e4841579d0cec7c.jpg",
  "427d6765ecb697a94882425e52798631.jpg",
  "45fc2566585855cc2e5a280a443f876f.jpg",
  "49d4be5c23243c845c540349e17130f1.jpg",
  "4a43800a9150f44a7f4aed2ec76e6bb9.jpg",
  "4f2fc415b3263c9926862ef39f52df88.jpg",
  "58fe167abcb6dec8bffbe9b696d39f76.jpg",
  "5a4203578cabfa77f3899a1a6b38a472.jpg",
  "5b778b4191ad927a00c3a428017e09d8.jpg",
  "5f37cd8cad44e44be8d7e49e03c89e82.jpg",
  "663776c400d9ed96dd7c3752b860286e.jpg",
  "8246823963f8732811cde62af9ab82a9.jpg",
  "83b8a49ad13e15f048906f37a18ecd34.jpg",
  "8507a4d136da17547d1e977fedcf5ebb.jpg",
  "8b87e9367ec23cd3c4d65e2be7c94bc7.jpg",
  "8fa4ab6c2cd7c452b0d07a0f4127b4ff.jpg",
  "96d2fec79357f81e9b7d38bad489df2b.jpg",
  "9d22d32c068b463dbcd55d186fc90109.jpg",
  "9fce31e3b4ce859e6eedfc49027dca24.jpg",
  "a0db492191cdfaae24f2149fe7fd8126.jpg",
  "a8c09573b65f7ce40ebff4ba67f17fcf.jpg",
  "ba8c35f21b6d3d1e677360a89cbd6f0c.jpg",
  "c0f8d2c17cf850984170896217def3a7.jpg",
  "c2412878bb30eaae0bbcbe8bc95426b0.jpg",
  "c2c6b04f4dd562c00c1861de9ebf3d5c.jpg",
  "c3fece2c849b9103f7b2f1bc814c1dbf.jpg",
  "c4a17caa466407fbae7c0b4bef6f5091.jpg",
  "d5d841fd1f6e168133eceb2371008ae9.jpg",
  "dafa63a65274a44efedcf0e32ec92897.jpg",
  "dbeb9931eaa7ccf9ee152621f2886d9b.jpg",
  "de49f749998edc7cac59d30ee8f61706.jpg",
  "e55af1a84be9763bcb3a2fdb49a8a929.jpg",
  "e7d2a9d960d3c2f1b30fd16195991b15.jpg",
  "ea97690909f5bad7d0ea32b1a6cd1d44.jpg",
  "f1e9464e7e7f427489c300ec749466d4.jpg",
];

export const COLORS = {
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  primary: "#007bff",
};

export const PLACEHOLDER_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik04NSA2MEgxMTVWNjBIODVaIiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik03NSA5MEgxMjVWOTBINzVaIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEyIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=";

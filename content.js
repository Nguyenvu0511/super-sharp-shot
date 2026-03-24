// Biến toàn cục để tránh tạo lại nhiều lần
let overlay = null;
let selection = null;
let startX, startY;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "init_crop") {
    createOverlay(request.imgSrc);
  }
});

function createOverlay(imgSrc) {
  // Xóa cũ nếu có
  if (document.getElementById('sss-final-overlay')) {
    document.getElementById('sss-final-overlay').remove();
  }

  // 1. Tạo màn hình tối
  overlay = document.createElement('div');
  overlay.id = 'sss-final-overlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.4); z-index: 2147483647;
    cursor: crosshair; user-select: none;
  `;

  // 2. Tạo khung chọn (nét đứt)
  selection = document.createElement('div');
  selection.style.cssText = `
    position: absolute; border: 2px dashed #fff;
    box-shadow: 0 0 0 100vmax rgba(0,0,0,0.5);
    display: none; pointer-events: none;
  `;
  overlay.appendChild(selection);
  document.body.appendChild(overlay);

  // Sự kiện chuột
  overlay.addEventListener('mousedown', onMouseDown);
  
  // Xử lý cắt ảnh khi thả chuột
  function onMouseUp(e) {
    overlay.removeEventListener('mousemove', onMouseMove);
    overlay.removeEventListener('mouseup', onMouseUp);

    const rect = selection.getBoundingClientRect();
    
    // Nếu vùng chọn quá nhỏ (click nhầm) thì hủy
    if (rect.width < 5 || rect.height < 5) {
      closeOverlay();
      return;
    }

    // XỬ LÝ ẢNH (QUAN TRỌNG NHẤT)
    processImage(imgSrc, rect);
  }

  function onMouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    
    selection.style.left = startX + 'px';
    selection.style.top = startY + 'px';
    selection.style.width = '0px';
    selection.style.height = '0px';
    selection.style.display = 'block';

    overlay.addEventListener('mousemove', onMouseMove);
    overlay.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(currentX, startX);
    const top = Math.min(currentY, startY);

    selection.style.left = left + 'px';
    selection.style.top = top + 'px';
    selection.style.width = width + 'px';
    selection.style.height = height + 'px';
  }
}

function processImage(sourceUrl, cropRect) {
  const img = new Image();
  img.onload = () => {
    // === CÔNG THỨC SIÊU NÉT ===
    // Tính tỷ lệ giữa ảnh chụp thực tế (img.naturalWidth) và màn hình trình duyệt (window.innerWidth)
    // Ví dụ: Màn hình rộng 1000px nhưng ảnh chụp được 2000px (do màn Retina) => Ratio = 2
    const ratio = img.naturalWidth / window.innerWidth;

    const canvas = document.createElement('canvas');
    // Canvas phải có kích thước thực tế (nhân với ratio)
    canvas.width = cropRect.width * ratio;
    canvas.height = cropRect.height * ratio;

    const ctx = canvas.getContext('2d');
    
    // Tắt làm mượt để giữ độ sắc cạnh
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      img,
      cropRect.left * ratio, cropRect.top * ratio, // Tọa độ cắt trên ảnh gốc
      cropRect.width * ratio, cropRect.height * ratio, // Kích thước cắt trên ảnh gốc
      0, 0, canvas.width, canvas.height // Vẽ full vào canvas
    );

    canvas.toBlob(blob => {
      navigator.clipboard.write([new ClipboardItem({'image/png': blob})])
        .then(() => alert("ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧ đã có trong bộ nhớ tạm của bạn ˖᯽ ݁˖͙֒"))
        .catch(err => alert("Lỗi copy😭: " + err));
      closeOverlay();
    }, 'image/png', 1); // Quality 1.0
  };
  img.src = sourceUrl;
}

function closeOverlay() {
  if (overlay) overlay.remove();
}

// Phím tắt ESC để thoát
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});
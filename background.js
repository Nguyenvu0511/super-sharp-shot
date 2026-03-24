// 1. Tạo menu chuột phải khi vừa cài đặt Extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "super-sharp-snap",
    title: "📸 Tick ✨", 
    contexts: ["all"] // Hiện menu ở mọi chỗ trên trang web
  });
});

// 2. Hàm xử lý chụp ảnh chung (Dùng cho cả Icon và Menu)
function captureAndCrop(tab) {
  // Bỏ qua trang hệ thống
  if (!tab.url.startsWith('http')) return;

  // Chụp màn hình
  chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
    if (!dataUrl) return;

    // Tiêm script và gửi ảnh
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, () => {
      chrome.tabs.sendMessage(tab.id, { 
        action: "init_crop", 
        imgSrc: dataUrl 
      }).catch(e => console.log("Lỗi kết nối (Cần F5 trang):", e));
    });
  });
}

// 3. Lắng nghe sự kiện click vào MENU CHUỘT PHẢI
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "super-sharp-snap") {
    captureAndCrop(tab);
  }
});

// 4. Lắng nghe sự kiện click vào ICON trên thanh công cụ (Giữ cả 2 cho tiện)
chrome.action.onClicked.addListener((tab) => {
  captureAndCrop(tab);
});
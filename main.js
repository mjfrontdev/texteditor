// Glassy Editor - main.js

document.addEventListener('DOMContentLoaded', function () {
  const editor = document.getElementById('editor');
  const colorPicker = document.getElementById('colorPicker');
  const fontSelect = document.getElementById('fontSelect');
  const increaseFont = document.getElementById('increaseFont');
  const decreaseFont = document.getElementById('decreaseFont');
  const addImage = document.getElementById('addImage');
  const boldText = document.getElementById('boldText');
  const italicText = document.getElementById('italicText');
  const saveBtn = document.getElementById('saveBtn');
  const alerts = document.getElementById('alerts');
  const themeToggle = document.getElementById('themeToggle');
  let darkMode = false;

  // تغییر رنگ متن
  colorPicker.addEventListener('input', function () {
    document.execCommand('foreColor', false, colorPicker.value);
    showAlert('رنگ متن تغییر کرد!', 'info');
  });

  // تغییر فونت
  fontSelect.addEventListener('change', function () {
    document.execCommand('fontName', false, fontSelect.value);
    showAlert('فونت تغییر کرد!', 'info');
  });

  // بزرگ‌تر کردن متن
  increaseFont.addEventListener('click', function () {
    document.execCommand('fontSize', false, '5');
    showAlert('سایز متن بزرگ شد!', 'success');
  });

  // کوچک‌تر کردن متن
  decreaseFont.addEventListener('click', function () {
    document.execCommand('fontSize', false, '2');
    showAlert('سایز متن کوچک شد!', 'warning');
  });

  // بولد
  boldText.addEventListener('click', function () {
    document.execCommand('bold');
    showAlert('متن بولد شد!', 'primary');
  });

  // ایتالیک
  italicText.addEventListener('click', function () {
    document.execCommand('italic');
    showAlert('متن ایتالیک شد!', 'primary');
  });

  // افزودن عکس
  addImage.addEventListener('click', function () {
    Swal.fire({
      title: 'آدرس عکس را وارد کنید:',
      input: 'url',
      inputPlaceholder: 'https://example.com/image.jpg',
      confirmButtonText: 'افزودن',
      cancelButtonText: 'انصراف',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'آدرس عکس را وارد کنید!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        document.execCommand('insertImage', false, result.value);
        showAlert('عکس اضافه شد!', 'success');
      }
    });
  });

  // تغییر تم
  themeToggle.addEventListener('click', function () {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-theme', darkMode);
    themeToggle.innerHTML = darkMode ? '<i class="bi bi-brightness-high"></i>' : '<i class="bi bi-moon-stars"></i>';
    showAlert(darkMode ? 'تم تاریک فعال شد!' : 'تم روشن فعال شد!', 'primary');
  });

  // ذخیره پست
  saveBtn.addEventListener('click', function () {
    const content = editor.innerHTML.trim();
    if (!content) {
      showAlert('متنی برای ذخیره وجود ندارد!', 'danger');
      anime({ targets: '#editor', scale: [1, 1.05, 1], duration: 400, easing: 'easeInOutQuad' });
      return;
    }
    Swal.fire({
      title: 'پست ذخیره شد!',
      icon: 'success',
      confirmButtonText: 'باشه'
    });
  });

  // انیمیشن دکمه‌ها
  [increaseFont, decreaseFont, addImage, boldText, italicText, saveBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      anime({ targets: btn, scale: 1.13, duration: 200, easing: 'easeOutBack' });
    });
    btn.addEventListener('mouseleave', () => {
      anime({ targets: btn, scale: 1, duration: 200, easing: 'easeOutBack' });
    });
  });

  // اعلان با Toast حرفه‌ای
  function showAlert(message, type = 'info') {
    // حذف توست‌های قبلی
    const oldToasts = document.querySelectorAll('.custom-toast');
    oldToasts.forEach(t => t.remove());
    // ساخت توست
    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${getToastIcon(type)}</span><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2200);
  }
  // آیکون مناسب برای هر نوع توست
  function getToastIcon(type) {
    switch(type) {
      case 'success': return '✅';
      case 'danger': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'primary': return '💡';
      default: return '🔔';
    }
  }

  // لیست بولت‌دار
  document.getElementById('ulList').addEventListener('click', function () {
    document.execCommand('insertUnorderedList');
    showAlert('لیست بولت‌دار اضافه شد!', 'info');
  });
  // لیست شماره‌دار
  document.getElementById('olList').addEventListener('click', function () {
    document.execCommand('insertOrderedList');
    showAlert('لیست شماره‌دار اضافه شد!', 'info');
  });
  // افزودن لینک
  document.getElementById('addLink').addEventListener('click', function () {
    Swal.fire({
      title: 'آدرس لینک را وارد کنید:',
      input: 'url',
      inputPlaceholder: 'https://example.com',
      confirmButtonText: 'افزودن',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'آدرس لینک را وارد کنید!';
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        document.execCommand('createLink', false, result.value);
        showAlert('لینک اضافه شد!', 'success');
      }
    });
  });
  // Undo/Redo
  document.getElementById('undoBtn').addEventListener('click', function () {
    document.execCommand('undo');
  });
  document.getElementById('redoBtn').addEventListener('click', function () {
    document.execCommand('redo');
  });
  // ترازبندی
  document.getElementById('alignRight').addEventListener('click', function () {
    document.execCommand('justifyRight');
  });
  document.getElementById('alignCenter').addEventListener('click', function () {
    document.execCommand('justifyCenter');
  });
  document.getElementById('alignLeft').addEventListener('click', function () {
    document.execCommand('justifyLeft');
  });
  // هایلایت
  document.getElementById('highlightText').addEventListener('click', function () {
    document.execCommand('backColor', false, '#fff59d');
    showAlert('متن هایلایت شد!', 'warning');
  });
  // افزودن جدول
  document.getElementById('addTable').addEventListener('click', function () {
    Swal.fire({
      title: 'تعداد سطر و ستون جدول را وارد کنید',
      html: '<input id="rows" type="number" min="1" max="10" placeholder="سطر" class="swal2-input">' +
            '<input id="cols" type="number" min="1" max="10" placeholder="ستون" class="swal2-input">',
      preConfirm: () => {
        const rows = parseInt(document.getElementById('rows').value);
        const cols = parseInt(document.getElementById('cols').value);
        if (!rows || !cols) return Swal.showValidationMessage('مقدار معتبر وارد کنید!');
        let table = '<table><tbody>';
        for (let i = 0; i < rows; i++) {
          table += '<tr>';
          for (let j = 0; j < cols; j++) {
            table += '<td>...</td>';
          }
          table += '</tr>';
        }
        table += '</tbody></table>';
        document.execCommand('insertHTML', false, table);
      }
    });
  });
  // افزودن ویدیو
  document.getElementById('addVideo').addEventListener('click', function () {
    Swal.fire({
      title: 'آدرس ویدیو را وارد کنید:',
      input: 'url',
      inputPlaceholder: 'https://example.com/video.mp4',
      confirmButtonText: 'افزودن',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'آدرس ویدیو را وارد کنید!';
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const videoTag = `<video controls src="${result.value}"></video>`;
        document.execCommand('insertHTML', false, videoTag);
        showAlert('ویدیو اضافه شد!', 'success');
      }
    });
  });
  // حالت تمام‌صفحه
  document.getElementById('fullscreenBtn').addEventListener('click', function () {
    const panel = document.querySelector('.glass-panel');
    panel.classList.toggle('fullscreen-editor');
    showAlert(panel.classList.contains('fullscreen-editor') ? 'حالت تمام‌صفحه فعال شد!' : 'حالت تمام‌صفحه غیرفعال شد!', 'primary');
  });
  // پیش‌نمایش Markdown/HTML
  document.getElementById('previewBtn').addEventListener('click', function () {
    const preview = document.getElementById('previewPanel');
    preview.innerHTML = editor.innerHTML;
    preview.classList.toggle('d-none');
    preview.scrollIntoView({behavior:'smooth'});
  });
  // شمارنده کلمات و کاراکترها
  function updateWordCount() {
    const text = editor.innerText.trim();
    const words = text.length ? text.split(/\s+/).length : 0;
    const chars = text.length;
    document.getElementById('wordCount').innerText = `کلمات: ${words} | کاراکتر: ${chars}`;
  }
  editor.addEventListener('input', updateWordCount);
  updateWordCount();
  // ذخیره به فایل
  document.getElementById('saveToFile').addEventListener('click', function () {
    const blob = new Blob([editor.innerHTML], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'post.html';
    a.click();
    showAlert('پست به صورت فایل ذخیره شد!', 'success');
  });
  // بارگذاری فایل
  document.getElementById('loadFromFile').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.txt';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        editor.innerHTML = evt.target.result;
        showAlert('پست بارگذاری شد!', 'info');
        updateWordCount();
      };
      reader.readAsText(file);
    };
    input.click();
  });
  // ذخیره محلی
  document.getElementById('saveToLocal').addEventListener('click', function () {
    localStorage.setItem('glassyEditorPost', editor.innerHTML);
    showAlert('پست در مرورگر ذخیره شد!', 'success');
  });
  // بارگذاری محلی
  document.getElementById('loadFromLocal').addEventListener('click', function () {
    const data = localStorage.getItem('glassyEditorPost');
    if (data) {
      editor.innerHTML = data;
      showAlert('پست از حافظه مرورگر بارگذاری شد!', 'info');
      updateWordCount();
    } else {
      showAlert('پستی در حافظه مرورگر نیست!', 'danger');
    }
  });
  // پیش‌نمایش Markdown (اختیاری)
  document.getElementById('toggleMarkdown').addEventListener('click', function () {
    const preview = document.getElementById('previewPanel');
    if (preview.classList.contains('d-none')) {
      preview.innerText = editor.innerText;
      preview.classList.remove('d-none');
    } else {
      preview.classList.add('d-none');
    }
  });
  // درگ و دراپ عکس
  editor.addEventListener('dragover', function(e) {
    e.preventDefault();
    editor.style.background = 'rgba(99,102,241,0.12)';
  });
  editor.addEventListener('dragleave', function(e) {
    editor.style.background = '';
  });
  editor.addEventListener('drop', function(e) {
    e.preventDefault();
    editor.style.background = '';
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = evt => {
          document.execCommand('insertImage', false, evt.target.result);
          showAlert('عکس اضافه شد!', 'success');
        };
        reader.readAsDataURL(file);
      }
    }
  });
  // کپی/برش/چسباندن پیشرفته
  editor.addEventListener('copy', function() { showAlert('متن کپی شد!', 'info'); });
  editor.addEventListener('cut', function() { showAlert('متن برش خورد!', 'warning'); });
  editor.addEventListener('paste', function() { showAlert('متن چسبانده شد!', 'success'); });
}); 
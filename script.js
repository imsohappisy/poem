document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const editorSection = document.getElementById('editorSection');
    const viewSection = document.getElementById('viewSection');
    
    // Inputs
    const titleInput = document.getElementById('poemTitle');
    const contentInput = document.getElementById('poemContent');
    const authorInput = document.getElementById('poemAuthor');
    const dateInput = document.getElementById('poemDate');
    
    // View Elements
    const viewTitle = document.getElementById('viewTitle');
    const viewContent = document.getElementById('viewContent');
    const viewAuthor = document.getElementById('viewAuthor');
    const viewDate = document.getElementById('viewDate');
    
    // Buttons & Elements
    const saveBtn = document.getElementById('saveBtn');
    const backBtn = document.getElementById('backBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const fontChangeBtn = document.getElementById('fontChangeBtn');
    const fontBtns = document.querySelectorAll('.font-btn');
    
    // Modals
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    const alertCloseBtn = document.getElementById('alertCloseBtn');
    
    const fontModal = document.getElementById('fontModal');
    const fontCloseBtn = document.getElementById('fontCloseBtn');
    
    // Settings Elements
    const titleSizeSlider = document.getElementById('titleSizeSlider');
    const titleSizeValue = document.getElementById('titleSizeValue');
    
    const bodySizeSlider = document.getElementById('bodySizeSlider');
    const bodySizeValue = document.getElementById('bodySizeValue');
    
    const fontWeightSlider = document.getElementById('fontWeightSlider');
    const fontWeightValue = document.getElementById('fontWeightValue');
    
    const colorPicker = document.getElementById('colorPicker');
    const bgColorPicker = document.getElementById('bgColorPicker');
    
    // Init Date
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // Custom Alert Function
    function showAlert(msg) {
        alertMessage.textContent = msg;
        alertModal.classList.add('active');
    }
    
    alertCloseBtn.addEventListener('click', () => {
        alertModal.classList.remove('active');
    });
    
    // Font Modal Logic
    if (fontChangeBtn) {
        fontChangeBtn.addEventListener('click', () => {
            fontModal.classList.add('active');
        });
    }
    
    if (fontCloseBtn) {
        fontCloseBtn.addEventListener('click', () => {
            fontModal.classList.remove('active');
        });
    }
    
    // Auto-resize textarea
    contentInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Settings Logic
    if (titleSizeSlider) {
        titleSizeSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            titleSizeValue.textContent = val + 'rem';
            document.documentElement.style.setProperty('--title-size', val + 'rem');
            
            // Re-adjust textarea height if editing
            contentInput.style.height = 'auto';
            contentInput.style.height = (contentInput.scrollHeight) + 'px';
        });
    }

    if (bodySizeSlider) {
        bodySizeSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            bodySizeValue.textContent = val + 'rem';
            document.documentElement.style.setProperty('--body-size', val + 'rem');
            
            // Re-adjust textarea height if editing
            contentInput.style.height = 'auto';
            contentInput.style.height = (contentInput.scrollHeight) + 'px';
        });
    }

    if (fontWeightSlider) {
        fontWeightSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            fontWeightValue.textContent = val;
            document.documentElement.style.setProperty('--custom-weight', val);
        });
    }

    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const val = e.target.value;
            document.documentElement.style.setProperty('--custom-color', val);
        });
    }

    if (bgColorPicker) {
        bgColorPicker.addEventListener('input', (e) => {
            const val = e.target.value;
            document.documentElement.style.setProperty('--custom-bg-color', val);
        });
    }
    
    // Font Change Logic
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            fontBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            
            const fontFamily = btn.getAttribute('data-font');
            document.documentElement.style.setProperty('--font-serif', fontFamily);
            
            // Re-adjust textarea height if editing
            contentInput.style.height = 'auto';
            contentInput.style.height = (contentInput.scrollHeight) + 'px';
        });
    });

    // Save Button Click
    saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const author = authorInput.value.trim();
        const date = dateInput ? dateInput.value : '';
        
        if (!content) {
            showAlert('시의 내용을 적어주세요.');
            contentInput.focus();
            return;
        }

        // Set View Data
        viewTitle.textContent = title || '무제';
        viewContent.textContent = content;
        viewAuthor.textContent = author ? `- ${author}` : '- 작자 미상';
        
        if (viewDate) {
            if (date) {
                const dateParts = date.split('-');
                if (dateParts.length === 3) {
                    viewDate.textContent = `${dateParts[0]}. ${dateParts[1]}. ${dateParts[2]}.`;
                } else {
                    viewDate.textContent = date;
                }
                viewDate.style.display = 'block';
            } else {
                viewDate.style.display = 'none';
            }
        }
        
        // Transition Sections
        editorSection.classList.remove('active');
        
        setTimeout(() => {
            viewSection.classList.add('active');
        }, 500); // Wait for fade out
    });

    // Back Button Click
    backBtn.addEventListener('click', () => {
        // Transition Sections
        viewSection.classList.remove('active');
        
        setTimeout(() => {
            editorSection.classList.add('active');
        }, 500); // Wait for fade out
    });

    // Download Button Click
    downloadBtn.addEventListener('click', () => {
        const viewGlass = document.querySelector('.view-glass');
        const viewFooter = document.querySelector('.view-footer');
        
        // 버튼이 이미지에 나오지 않도록 임시 숨김
        viewFooter.style.display = 'none';
        
        // html2canvas는 backdrop-filter를 완벽히 지원하지 않아 텍스트 가독성을 위해 임시 배경색 적용
        const originalBg = viewGlass.style.background;
        viewGlass.style.background = 'rgba(20, 22, 30, 0.8)'; 

        const customBg = document.documentElement.style.getPropertyValue('--custom-bg-color').trim() || '#0a0b10';

        html2canvas(viewGlass, {
            scale: 2, // 고해상도
            backgroundColor: customBg // 캔버스 기본 배경
        }).then(canvas => {
            // 스타일 복구
            viewFooter.style.display = 'block';
            viewGlass.style.background = originalBg;
            
            // 다운로드 트리거
            const title = viewTitle.textContent || 'poem';
            const link = document.createElement('a');
            link.download = `${title}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('이미지 저장 중 오류 발생:', err);
            showAlert('이미지를 저장하는 중 오류가 발생했습니다.');
            viewFooter.style.display = 'block';
            viewGlass.style.background = originalBg;
        });
    });
});

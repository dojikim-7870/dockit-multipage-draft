document.addEventListener('DOMContentLoaded', function() {

    // ===== 공통: 모바일 메뉴 =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ===== 페이지 감지 =====
    const pageTitle = document.title.toLowerCase();

    // ===== 공통 업로드 기능 =====
    function setupUpload(fileInputId, uploadAreaSelector, callback) {
        const fileInput = document.getElementById(fileInputId);
        const uploadArea = document.querySelector(uploadAreaSelector);
        if (!fileInput || !uploadArea) return;

        const uploadBtn = uploadArea.querySelector('.upload-btn');
        if (uploadBtn) uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) callback(fileInput.files[0]);
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#f0f8ff';
        });

        uploadArea.addEventListener('dragleave', () => uploadArea.style.backgroundColor = '');
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            if (e.dataTransfer.files.length) callback(e.dataTransfer.files[0]);
        });
    }

    // ===== Metadata Editor =====
    if (pageTitle.includes('metadata editor')) {
        const uploadArea = document.getElementById('uploadArea');
        const metadataEditor = document.getElementById('metadataEditor');

        function handleMetadataFile(file) {
            if (!file) return;
            if (file.type !== 'application/pdf') {
                alert('Please upload a PDF file.');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert('File size exceeds 10MB limit.');
                return;
            }

            uploadArea.innerHTML = `
                <div class="upload-icon">✓</div>
                <h3>File Uploaded Successfully</h3>
                <p>${file.name}</p>
                <p>Processing...</p>
            `;

            setTimeout(() => {
                uploadArea.innerHTML = `
                    <div class="upload-icon">✓</div>
                    <h3>Processing Complete</h3>
                    <p>${file.name}</p>
                `;
                uploadArea.style.display = 'none';
                if (metadataEditor) metadataEditor.style.display = 'block';
                const deepDiveCard = document.querySelector('.deep-dive-card');
                if (deepDiveCard) deepDiveCard.style.display = 'block';
            }, 1000);
        }

        setupUpload('fileInput', '#uploadArea', handleMetadataFile);

        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput) fileInput.value = '';
            if (uploadArea) uploadArea.style.display = 'block';
            if (metadataEditor) metadataEditor.style.display = 'none';
            const deepDiveCard = document.querySelector('.deep-dive-card');
            if (deepDiveCard) deepDiveCard.style.display = 'none';
        });

        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) downloadBtn.addEventListener('click', () => {
            alert('Your updated PDF would be downloaded in a real application.');
        });
    }

    // ===== PDF Viewer =====
    if (pageTitle.includes('viewer')) {
        function renderPDF(file) {
            alert(`${file.name} is ready to view (PDF rendering logic here)`);
            // PDF.js 등의 실제 렌더링 라이브러리 연결 가능
        }

        setupUpload('viewerFileInput', '.tool-interface .upload-area', renderPDF);
    }

    // ===== PDF Security =====
    if (pageTitle.includes('security')) {
        function securePDF(file) {
            alert(`${file.name} is ready to secure (Security processing logic here)`);
            // PDF 보안 처리 라이브러리 연결 가능
        }

        setupUpload('securityFileInput', '.tool-interface .upload-area', securePDF);
    }

});

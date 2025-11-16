document.addEventListener('DOMContentLoaded', function() {

    // ===== Mobile Menu Toggle =====
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

    // ===== File Upload & Metadata Editor =====
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const metadataEditor = document.getElementById('metadataEditor');

    function showMetadataEditor(file) {
        uploadArea.style.display = 'none';
        metadataEditor.style.display = 'block';

        // Display deep-dive card after upload
        const deepDiveCard = document.querySelector('.deep-dive-card');
        if (deepDiveCard) {
            deepDiveCard.style.display = 'block';
        }
    }

    function handleFileUpload(file) {
        if (!file) return;

        if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
            alert('Please upload a PDF or image file.');
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
            showMetadataEditor(file);
        }, 1000);
    }

    if (fileInput && uploadArea) {
        const uploadBtn = uploadArea.querySelector('.upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => fileInput.click());
        }

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFileUpload(fileInput.files[0]);
            }
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#f0f8ff';
        });

        uploadArea.addEventListener('dragleave', () => uploadArea.style.backgroundColor = '');

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });
    }

    // ===== Reset Metadata Editor =====
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            fileInput.value = '';
            uploadArea.style.display = 'block';
            metadataEditor.style.display = 'none';

            const deepDiveCard = document.querySelector('.deep-dive-card');
            if (deepDiveCard) deepDiveCard.style.display = 'none';
        });
    }

    // ===== Download Button =====
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('This would download your updated PDF in a real application.');
        });
    }

});

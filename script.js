// Mobile menu toggle - Class-based manipulation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // nav와 mobileMenuToggle에 'active' 클래스를 토글합니다.
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Show email address on contact page
    const showEmailBtn = document.getElementById('showEmailBtn');
    if (showEmailBtn) {
        showEmailBtn.addEventListener('click', function() {
            const emailAddress = document.getElementById('emailAddress');
            if (emailAddress) {
                emailAddress.style.display = 'block';
                showEmailBtn.style.display = 'none';
            } else {
                console.error('Email address element not found');
            }
        });
    }
    
    // File upload simulation for PDF tools
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        const uploadArea = input.closest('.upload-area');
        if (!uploadArea) return;
        
        const uploadBtn = uploadArea.querySelector('.upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                input.click();
            });
        }
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#f0f8ff';
        });
        
        uploadArea.addEventListener('dragleave', function() {
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0], uploadArea);
            }
        });
        
        input.addEventListener('change', function() {
            if (input.files.length) {
                handleFileUpload(input.files[0], uploadArea);
            }
        });
    });
    
    function handleFileUpload(file, uploadArea) {
        if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
            alert('Please upload a PDF or image file');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB limit');
            return;
        }
        
        // Simulate file processing
        uploadArea.innerHTML = `
            <div class="upload-icon">✓</div>
            <h3>File Uploaded Successfully</h3>
            <p>${file.name}</p>
            <p>Processing...</p>
        `;
        
        // Simulate processing delay
        setTimeout(() => {
            uploadArea.innerHTML = `
                <div class="upload-icon">✓</div>
                <h3>Processing Complete</h3>
                <p>${file.name}</p>
                <button class="upload-btn">Download Result</button>
            `;
            
            const downloadBtn = uploadArea.querySelector('.upload-btn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function() {
                    alert('In a real application, this would download your processed file');
                });
            }
        }, 2000);
    }
    
    // Reset button for metadata editor
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const uploadArea = document.getElementById('uploadArea');
            const metadataEditor = document.getElementById('metadataEditor');
            
            if (uploadArea && metadataEditor) {
                uploadArea.style.display = 'block';
                metadataEditor.style.display = 'none';
                const fileInput = document.getElementById('fileInput');
                if (fileInput) {
                    fileInput.value = '';
                }
            }
        });
    }
    
    // Download button for metadata editor
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('In a real application, this would download your updated PDF with the new metadata');
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would submit the form data
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
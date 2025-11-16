// ===================== 공통 유틸 =====================
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function showAlert(msg) {
    alert(msg);
}

// ===================== Metadata Editor =====================
const metadataInput = document.getElementById('metadataFileInput');
if(metadataInput){
    metadataInput.addEventListener('change', async (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const title = pdfDoc.getTitle();
        const author = pdfDoc.getAuthor();
        console.log("Title:", title, "Author:", author);
        // 메타데이터 UI 업데이트 등
    });
}

// ===================== Merge/Divide =====================
const mergeInput = document.getElementById('mergeFilesInput');
if(mergeInput){
    mergeInput.addEventListener('change', async (e)=>{
        const files = e.target.files;
        if(files.length < 2) return showAlert("Select at least 2 PDFs");
        const mergedPdf = await PDFLib.PDFDocument.create();
        for(const file of files){
            const arrayBuffer = await readFileAsArrayBuffer(file);
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(p=>mergedPdf.addPage(p));
        }
        const mergedBytes = await mergedPdf.save();
        downloadBlob(new Blob([mergedBytes], {type:'application/pdf'}), 'merged.pdf');
    });
}

// ===================== Compression =====================
const compressionInput = document.getElementById('compressionFileInput');
if(compressionInput){
    compressionInput.addEventListener('change', async (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        // 간단 압축: PDF-lib는 직접 이미지 재압축 지원이 제한적
        // 필요시 이미지를 canvas로 다시 렌더링 후 삽입 가능
        const compressedBytes = await pdfDoc.save({useObjectStreams:true});
        downloadBlob(new Blob([compressedBytes], {type:'application/pdf'}), 'compressed.pdf');
    });
}

// ===================== Image Conversion =====================
const imageInput = document.getElementById('imageConversionInput');
if(imageInput){
    imageInput.addEventListener('change', async (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const page = pdfDoc.getPage(0);
        const pngImage = await page.renderToPNG(); // PDF-lib 자체는 직접 변환 어려움, pdf.js + canvas 필요
        // canvas → Blob → download
    });
}

// ===================== Security =====================
const securityInput = document.getElementById('securityFileInput');
if(securityInput){
    securityInput.addEventListener('change', async (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const password = prompt("Enter password to secure PDF:");
        if(password){
            const securedBytes = await pdfDoc.save({password});
            downloadBlob(new Blob([securedBytes], {type:'application/pdf'}), 'secured.pdf');
        }
    });
}

// ===================== Viewer =====================
const viewerInput = document.getElementById('viewerFileInput');
if(viewerInput){
    viewerInput.addEventListener('change', async (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const arrayBuffer = await readFileAsArrayBuffer(file);

        const loadingTask = pdfjsLib.getDocument({data:arrayBuffer});
        const pdf = await loadingTask.promise;
        const canvas = document.getElementById('pdfViewerCanvas');
        if(!canvas) {
            showAlert("Canvas not found for PDF Viewer");
            return;
        }
        const ctx = canvas.getContext('2d');
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({scale:1.5});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({canvasContext: ctx, viewport}).promise;
    });
}

// ===================== 공통 드래그앤드롭 =====================
document.querySelectorAll('.upload-area').forEach(area=>{
    const input = area.querySelector('input[type=file]');
    const btn = area.querySelector('.upload-btn');

    btn.addEventListener('click', ()=>input.click());
    area.addEventListener('dragover', e=>{
        e.preventDefault();
        area.classList.add('dragover');
    });
    area.addEventListener('dragleave', e=>{
        e.preventDefault();
        area.classList.remove('dragover');
    });
    area.addEventListener('drop', e=>{
        e.preventDefault();
        area.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if(files.length) input.files = files;
        input.dispatchEvent(new Event('change'));
    });
});

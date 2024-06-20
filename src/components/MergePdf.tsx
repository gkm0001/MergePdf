import PDFMerger from 'pdf-merger-js'
import React, { useState } from 'react'
import './MergePdf.css'

function MergePdf() {

    
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string>();
    const merger = new PDFMerger();

    const uploadImages = async(event : React.ChangeEvent<HTMLInputElement>) => {

         
        const pdfs: any| FileList = event.target.files;

        //object like array -> set of array
        const pdfFiles : any | FileList = Array.from(pdfs);
      
        console.log(merger);
        
        
         for(const pdfFile of pdfFiles) {
            //create buffer object for each pdf 
            //.arrayBuffer() is a method available on File objects in browsers, which asynchronously reads the entire contents of the file and returns them as an ArrayBuffer.
            //After this line executes, arrayBuffer holds the raw binary data of the PDF file in the form of an ArrayBuffer.
            const arrayBuffer = await pdfFile.arrayBuffer();
            
            //add in merger each buffer 
            //This line adds the arrayBuffer to the merger object. Assuming merger is an instance of a class or object that manages PDF files (like PDFMerger), add(arrayBuffer) is a method that typically adds the contents of the ArrayBuffer to the merger instance.

            // The arrayBuffer contains the raw binary data of a PDF file that was previously read and stored in memory using pdfFile.arrayBuffer().

            //simple this line add the page in this 
            merger.add(arrayBuffer);

         }
         console.log("Merger : ",merger);
          
         //save as blob use saveasblob() method use for merge as create pdf
         //saveAsBlob() on merger combines all the added PDFs into a single Blob object. 
         const mergedPdf: any =await (merger as any).saveAsBlob();

         console.log("Mergerpdf ",mergedPdf);
         

         //this create url from which help we can access the pdf file in i frame 
         const mergedPdfUrl: any = URL.createObjectURL(mergedPdf);

         //set it 
         setMergedPdfUrl(mergedPdfUrl);
         console.log(mergedPdf);
         
      

         await merger.setMetadata({
            producer: "pdf-merger-js based script",
            author: "John Doe",
            creator: "John Doe",
            title: "My live as John Doe"
          });
          
    }


    const DownloadPdf = () => {
        merger.save('Download.pdf')
    }

  return (
    <div className='Parent'>
         <div className='Parent-images'>
            <input type="file" accept='pdf/*' multiple className='pdf-upload-parent' onChange={uploadImages}  />
         </div>
         {mergedPdfUrl && (

                <div className='show-all-pdf'>
                    <h2>Merged PDF</h2>
                    <iframe src={mergedPdfUrl} width="100%" height="500px" title="merged-pdf"></iframe>
                </div>
            )}
         <div className='Download-pdf'>
            <button className='Download-pdf-button' onClick={DownloadPdf}>Download Pdf</button>
         </div>
    </div>
  )
}

export default MergePdf

import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Button, Card } from "antd";
import PropTypes from "prop-types";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ title, file }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onLoadError = (error) => {
    setError(error.message);
    console.error("Error loading PDF: ", error);
  };

  return (
    <Card
      title={title}
      style={{
        marginTop: "20px",
        width: "100%",
        overflow: "auto",
      }}
    >
      {isMobile ? (
        <a href={file} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ) : error ? (
        <div>Error loading PDF...</div>
      ) : (
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading="Loading PDF..."
        >
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            {pageNumber + 1 <= numPages && (
              <Page
                pageNumber={pageNumber + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )}
          </div>
        </Document>
      )}

      {!isMobile && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Button
            type="primary"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 2))}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <span style={{ margin: "0 20px" }}>
            Pages {pageNumber}{" "}
            {pageNumber + 1 <= numPages ? `& ${pageNumber + 1}` : ""} of{" "}
            {numPages}
          </span>
          <Button
            type="primary"
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 2))}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  );
};

PDFViewer.propTypes = {
  title: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
};

export default PDFViewer;

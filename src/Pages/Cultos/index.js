import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Menu from "../../Components/Menu";
import "./styles.css"
import CardPosts from "../../Components/Card-posts";
import Footer from "../../Components/Footer";

const PDFReader = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const fileUrl = "../../../../../O-Deus-que-destroi-sonhos.pdf";

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    return (
        <div className="back-wall">
            <Menu />
            <h1>Clube do Livro</h1>
            <div className="content-books">
                <CardPosts />
            </div>
            <Footer/>
        </div>
    );
};

export default PDFReader;

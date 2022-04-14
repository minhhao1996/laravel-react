import React, {Component, Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {CPagination, CPaginationItem} from "@coreui/react";

const Pagination = (props) => {
    const {currentPage, totalRecords, pageNeighbours, pageLimit} = props;
    const [totalPages, setTotalPages] = useState(0)
    const LEFT_PAGE = "LEFT";
    const RIGHT_PAGE = "RIGHT";
    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / pageLimit))
    }, [])


    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    };
    const fetchPageNumbers = () => {
        let pages = [];

        return range(1, totalPages);


    };

    if (!totalRecords || totalRecords === 1) return null;
    const pages = fetchPageNumbers();
    console.log(pages)
    return (<CPagination align="end" aria-label="Page navigation example">
        <CPaginationItem disabled>Previous</CPaginationItem>
        {
            pages.length > 0 &&
            pages.map((item, index)=>   <CPaginationItem key={index}>{item}</CPaginationItem>)
        }
        <CPaginationItem>Next</CPaginationItem>
    </CPagination>)
}
export default Pagination;
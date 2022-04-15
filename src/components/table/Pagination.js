import React, {Component, Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {CPagination, CPaginationItem} from "@coreui/react";

const Pagination = (props) => {
    const {currentPage, totalRecords, pageNeighbours, pageLimit, onPageChange} = props;
    const [totalPages, setTotalPages] = useState(0)
    const DOTS = "...";

    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / pageLimit));
    }, [totalRecords, pageLimit])

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

        const totalNumbers = pageNeighbours * 2 + 5;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            const leftSiblingIndex = Math.max(currentPage - pageNeighbours, 1);
            const rightSiblingIndex = Math.min(
                currentPage + pageNeighbours,
                totalPages
            );
            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
            const firstPageIndex = 1;
            const lastPageIndex = totalPages;
            /* Case 2: No left dots to show, but rights dots to be shown*/
            if (!shouldShowLeftDots && shouldShowRightDots) {
                let leftItemCount = 3 + 2 * pageNeighbours;
                let leftRange = range(1, leftItemCount);

                return [...leftRange, DOTS, totalPages];
            }
            // Case 3: No right dots to show, but left dots to be shown
            if (shouldShowLeftDots && !shouldShowRightDots) {
                let rightItemCount = 3 + 2 * pageNeighbours;
                let rightRange = range(
                    totalPages - rightItemCount + 1,
                    totalPages
                );
                return [firstPageIndex, DOTS, ...rightRange];
            }
            /* Case 4: Both left and right dots to be shown */
            if (shouldShowLeftDots && shouldShowRightDots) {
                let middleRange = range(leftSiblingIndex, rightSiblingIndex);
                return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
            }
        }
        return range(1, totalPages);
    };

    const pages = fetchPageNumbers();


    if (!totalRecords || totalRecords === 1) return null;


    return (<CPagination align="end" aria-label="Page navigation example">
        <CPaginationItem disabled={currentPage === 1}
                         onClick={() => onPageChange(currentPage - 1)}>Previous</CPaginationItem>
        {
            pages.length > 0 &&
            pages.map((item, index) =>
                <CPaginationItem key={index} active={item === currentPage}
                                 onClick={item !== DOTS ? () => onPageChange(item) : undefined}>{item}</CPaginationItem>)
        }
        <CPaginationItem disabled={currentPage === totalPages}
                         onClick={() => onPageChange(currentPage + 1)}>Next</CPaginationItem>
    </CPagination>)
}
export default Pagination;
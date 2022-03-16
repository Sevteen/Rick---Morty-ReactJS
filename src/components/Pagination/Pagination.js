import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({info, pageNumber, setPageNumber}) => {

    return (
        <ReactPaginate className='pagination justify-content-center gap-2 m-5' pageRangeDisplayed="1" marginPagesDisplayed="1" activeClassName='active' nextLabel='Next' previousLabel='Prev' previousClassName='btn btn-success' nextClassName='btn btn-success' pageClassName='page-item' pageLinkClassName='page-link' onPageChange={(pageNumber) => {setPageNumber(pageNumber.selected+1);}} pageCount={info.pages}/>
        // <div className="container pagination justify-content-center">
        //     <button className="btn btn-success" onClick={prev}>Prev</button>
        //     <button className="btn btn-success" onClick={next}>Next</button>
        // </div>
    )
}

export default Pagination

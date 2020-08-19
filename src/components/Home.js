import React, {useState, useEffect, useContext} from 'react';
import {Link, withRouter} from "react-router-dom";
import ReactModal from "react-modal";
import ColorThief from 'colorthief';

import BookCard from './BookCard';
import {
    createBook as createBookRequest,
    getBooks as getBooksRequest,
} from "../utils/books-requests";
import {
    postSearchText as searchTextRequest,
} from '../utils/search-requests';
import {UserContext} from '../store/user-store';
import {
    useDebounce,
} from '../utils/index';
import Input from './inner/Input';
import SearchResult from './inner/SearchResult';

const MOUSEOVER_SHADOW_INTENSITY = '7px';
const MOUSELEAVE_SHADOW_INTENSITY = '5px';

const createBook = (username, title, coverUrl, history) => {
    createBookRequest(username, title, coverUrl)
        .then(({id}) => history.push(`/write/${id}`))
        .catch(error => console.error(error));
};

const addShadows = () => {
    const stands = document.getElementsByClassName('stand');
    const colorThief = new ColorThief();

    for (let i = 0; i < stands.length; i++) {
        const stand = stands[i];
        const img = stand.children[0];

        if (i === 0) {
            img.src = 'http://localhost:4001/image?url=https://img.icons8.com/cotton/2x/plus.png';
        } else {
            img.src = 'http://localhost:4001/image?url=https://www.sciencealert.com/images/2019-12/processed/CatsHaveFacialExpressionsButHardToRead_600.jpg';
        }

        img.addEventListener('load', () => {
            const [r, g, b] = colorThief.getColor(img);
            const shadowColor = `${r}, ${g}, ${b}`;

            stand.style.boxShadow = `0px 0px ${MOUSELEAVE_SHADOW_INTENSITY} rgb(${shadowColor})`;
            stand._shadowColor = shadowColor;
        });

        stand.addEventListener('mouseover', () => {
            stand.style.boxShadow = `0px 0px ${MOUSEOVER_SHADOW_INTENSITY} rgb(${stand._shadowColor})`;
        });

        stand.addEventListener('mouseleave', () => {
            stand.style.boxShadow = `0px 0px ${MOUSELEAVE_SHADOW_INTENSITY} rgb(${stand._shadowColor})`;
        });
    }
};

function Home(props) {
    const {history} = props;
    const {username} = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debouncedSearch = useDebounce(searchText, 500);

    const hideModal = () => {
        setIsSearching(false);
    };

    const showModal = () => {
        setIsSearching(true);
    };

    const keyUp = ({keyCode}) => {
        // escape
        if (keyCode === 27) {
            hideModal();
        }
    };

    document.addEventListener('keyup', keyUp);

    useEffect(() => {
        if (!searchText) {
            return;
        }

        searchTextRequest({
                searchText,
                username,
            })
            .then(async response => {
                console.log('response', response);
                const {result} = response;
                if (!result) {
                    return;
                }

                setSearchResult(result);
            })
            .catch(error => console.error(error));
    }, [debouncedSearch]);

    useEffect(() => {
        if (!username) {
            return;
        }

        getBooksRequest(username)
            .then(({books}) => {
                if (!books.length) {
                    return;
                }

                setBooks(books.sort(({createdDatetime: a}, {createdDatetime: b}) => +new Date(b) - +new Date(a)));

                addShadows();
            })
            .catch(error => console.error(error));

        return function cleanup() {
            hideModal();
            document.removeEventListener('keyup', keyUp);
        }
    }, [username]);


    return (
        <UserContext.Consumer>
            {({username}) => (
                <div className="row center-xs">
                    <div className="col-xs-8">
                        <div className='books'>
                            <div className="row center-xs">
                                <div onClick={() => createBook(username, '', '', history)}>
                                    <BookCard img='' title={"New book"} username={username}/>
                                </div>
                                {books.map((book, key) => (
                                    book.author === username ?
                                        <Link key={key} to={`/write/${book.id}`}>
                                            <BookCard img={book.coverUrl} title={book.title} username={username}/>
                                        </Link>
                                        :
                                        <Link key={key} to={`/read/${book.id}`}>
                                            <BookCard img={book.coverUrl} title={book.title} username={username}/>
                                        </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="search-icon" onClick={showModal}>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fillRule="evenodd"
                                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </div>

                    <ReactModal isOpen={isSearching}
                                onRequestClose={hideModal}
                                className="search"
                    >

                        <center>
                            {Input({
                                placeholder: '1984 Джордж Оруэлл...',
                                confirmHandler: e => setSearchText(e.target.value),
                                changeHandler: e => setSearchText(e.target.value),
                            })}
                            {
                                searchResult.map(({title, author, description, id}, key) => (
                                    author === username ?
                                        <Link className="search-item-link" key={key} to={`/write/${id}`}>
                                            <SearchResult
                                                title={title}
                                                author={author}
                                                description={description}
                                            />
                                        </Link>
                                        :
                                        <Link className="search-item-link" key={key} to={`/read/${id}`}>
                                            <SearchResult
                                                title={title}
                                                author={author}
                                                description={description}
                                            />
                                        </Link>
                                ))
                            }
                        </center>

                        <div className="close-search-icon" onClick={hideModal}>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-x-circle"
                                 fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path fillRule="evenodd"
                                      d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                <path fillRule="evenodd"
                                      d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                            </svg>
                        </div>
                    </ReactModal>
                </div>
            )}
        </UserContext.Consumer>
    );
}

export default withRouter(Home);

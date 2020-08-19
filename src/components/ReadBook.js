import React, { useEffect, useContext, useState } from 'react';
import {convertFromRaw} from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import {
    useParams,
    withRouter,
} from "react-router-dom";

import {
    getBookTitle,
    getBookContent,
    addToReadBooks,
} from '../utils/books-requests/index';
import {UserContext} from "../store/user-store";

let interval = null;

function ReadBook() {
    const [title, setTitle] = useState('');
    const [bookContent, setBookContent] = useState('');
    const [counter, setCounter] = useState(0);

    const {id: bookId} = useParams();
    const {username} = useContext(UserContext);

    useEffect(() => {
        if (!interval) {
            interval = setInterval(() => {
                setCounter(counter + 1);

                // change to 2 minutes or more...
                if (counter > 10) {
                    addToReadBooks(username, bookId)
                        .then(async response => {
                            console.log(response);
                        })
                        .catch(error => console.error(error));
                }
            });
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!username) {
            return;
        }

        Promise
            .all([
                getBookTitle(bookId),
                getBookContent(bookId),
            ])
            .then(async response => {
                const [{title}, {content = {}}] = response;

                // move to asynchronous func
                const contentState = convertFromRaw(JSON.parse(content));
                const html = stateToHTML(contentState);

                setTitle(title);
                setBookContent(html);
            })
            .catch(error => console.error(error));
    }, [username]);

    return (
        <div className="test">
            <center>
                <h1 className="write-book-title">
                    {title}
                </h1>
            </center>

            <hr/>

            <div className="editor" dangerouslySetInnerHTML={{__html: bookContent}}></div>
        </div>
    )
}

export default withRouter(ReadBook);

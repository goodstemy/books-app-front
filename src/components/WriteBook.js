import React, { useEffect, useState, useContext } from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import {
    useParams,
    withRouter,
} from "react-router-dom";
import {
    postTitle,
    getBookTitle,
    postContent,
    getOwnerBookContent,
} from '../utils/books-requests/index';
import {
    useDebounce,
} from '../utils/index';
import {
    UserContext,
} from "../store/user-store";

function WriteBook() {
    const [bookTitle, setBookTitle] = useState('');
    const [bookTitleLoaded, setBookTitleLoaded] = useState(false);
    const [bookTitleFromDB, setBookTitleFromDB] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorStateCounter, setEditorStateCounter] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const {username} = useContext(UserContext);
    const {id: bookId} = useParams();
    const debouncedBookTitle = useDebounce(bookTitle, 500);

    useEffect(() => {
        if (!bookTitleLoaded) {
            getBookTitle(bookId).then(({title}) => {
                setBookTitle(title);
                setBookTitleLoaded(true);
                setBookTitleFromDB(title);
            });
        }

        if (debouncedBookTitle !== bookTitleFromDB && debouncedBookTitle !== '') {
            postTitle(username, bookTitle, bookId);
        }
    }, [debouncedBookTitle]);

    useEffect(() => {
        setEditorStateCounter(editorStateCounter + 1);

        if (editorStateCounter > 10) {
            const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

            postContent(username, bookId, content)
                .then(() => setEditorStateCounter(0))
                .catch(() => setEditorStateCounter(0));
        }

    }, [editorState]);

    useEffect(() => {
        if (!username) {
            return;
        }

        getOwnerBookContent(username, bookId)
            .then(async ({content}) => {
                if (!content) {
                    return setIsLoaded(true);
                }

                const parsedContent = convertFromRaw(JSON.parse(content));

                setEditorState(EditorState.createWithContent(parsedContent));
                setIsLoaded(true);
            })
            .catch(error => console.error(error));
    }, [username]);

    return (
        <div className="test">
            <center>
                <textarea
                    className="write-book-title"
                    value={bookTitle}
                    onChange={e => setBookTitle(e.target.value)}
                />
            </center>

            <hr/>

            {
                isLoaded ?
                    <div className="editor">
                        <Editor
                            handleKeyCommand={(command, editorState) => {
                                const newState = RichUtils.handleKeyCommand(editorState, command);

                                if (newState) {
                                    setEditorState(newState);
                                    return 'handled';
                                }

                                return 'not-handled';
                            }}
                            editorState={editorState}
                            onChange={setEditorState}
                        />
                    </div>
                        :
                    <p>loading...</p>
            }
        </div>
    )
}

export default withRouter(WriteBook);

import React from 'react';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Loading = () => {
    return(
        <div className="col-12">
            <span><FontAwesomeIcon icon = {faSpinner} className ="fa-spin"/></span>
            <p>Loading . . .</p>
        </div>
    );
};
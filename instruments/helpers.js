// Core
import moment from 'moment';

export const formatDate = (date) => {

    return new Date(moment.unix(date).format('YYYY-MM-DD'));
};

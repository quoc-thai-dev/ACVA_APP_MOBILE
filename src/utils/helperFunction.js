import {showMessage} from 'react-native-flash-message';

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message
    });
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message
    });
}

export {
    showError,
    showSuccess,
}

export const formatDate = (date) => {
    const dateFormat = new Date(date);
    const newDate = `${String(dateFormat.getDate()).padStart(2, '0')}/${String(dateFormat.getMonth() + 1).padStart(2, '0')}/${dateFormat.getFullYear()}`;
    return newDate;
  }


import './errorPage.css';
import { ErrorType } from './types';
import arrow from './assets/left-arrow.png';

const ErrorPage = ({ error, handleBackButtonClick }:
  { error: ErrorType, handleBackButtonClick: () => void; }
) => {
  return (
    <div className="error-page">
      <button style={{ marginRight: 'auto' }} className='btn' onClick={handleBackButtonClick}>
        <img src={arrow} alt='go back' width='20px' height='20px'></img>
      </button>

      <div>
        <h1>Oops!</h1>

        <p>Sorry, an unexpected error has occurred.</p>

        <p>
          <i id="error">{(error as any).statusText || error.message}</i>
        </p>
      </div>

      <div></div>
    </div>
  );
};

export default ErrorPage;
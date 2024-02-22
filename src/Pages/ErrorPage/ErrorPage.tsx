import { useRouteError } from 'react-router-dom';


export default function ErrorPage() {
    const error:unknown = useRouteError();
    console.log("Error Page.",error);
    
  return (
    <div id="error-page">
        <h1>Oops !</h1>
        <p>Sorry , this page is not available.</p>
        <i>{error?.statusText || error?.message}</i>
    </div>
  )
}
    
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Headers from '../components/headers'
//import Header from './header';

export const  AppComponent = ({ Component, pageProps, currentUser }) => {
    return <dvi>
        <Headers currentUser={currentUser}/>
        <Component {...pageProps} />
</dvi>
};

AppComponent.getInitialProps = async(appContext) =>{

 const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps={};
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    
    //console.log('pageProps',pageProps);
    console.log(pageProps);
    return {
        pageProps,
        ...data
    }

}
export default AppComponent;

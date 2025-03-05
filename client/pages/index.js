import axios from 'axios';
import buildClient from '../api/build-client';
const LandingPage = ({ currentUser }) => {
  //  console.log(currentUser);

   
    return <h1>Landing Page { currentUser ? 'Signed IN' :  'You are Signed OUT'}</h1>;
  };

// LandingPage.getInitialProps = async ({ req }) => {

//   if(typeof window === "undefined")	{
//     const {data} = await axios.get(
//       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',{
//       // //http://SERVICENAME.NAMESPACE.svc.cluster.local
//       headers: req.headers
      
//       }
//     )
//     return data;
//   }else{
//     //we are on the browser
//     // request base on base url
//     const { data } = await  axios.get('/api/users/currentuser');
//     return data;
//   }
//  return {}
    
// };


LandingPage.getInitialProps = async(context) => {
  const client = buildClient(context);
  try {
      const { data } = await client.get('/api/users/currentuser');
      return { currentUser: data.currentUser };
  } catch (err) {
      console.error('Error fetching current user:', err.message);
      return { currentUser: null };
  }
  
  
}
export default LandingPage;

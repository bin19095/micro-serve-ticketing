import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';	
import useRequest from '../../hooks/use-request';
export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {email, password},
        onSuccess: () => Router.push('/')
    });


    
    const onSubmit = async (e) => {
        e.preventDefault();
      
        doRequest();
        setEmail('');
        setPassword('');
       
        // TODO: call the server to register the user
       
         
        
    };
     
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="mx-auto mt-5" onSubmit={onSubmit}>
                        <h1 className="text-center mb-4">Sign In</h1>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email"   value={email}  onChange={(e) =>setEmail(e.target.value)}className="form-control" name="email" placeholder="Email Address" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"  value={password} onChange={e => setPassword(e.target.value)} className="form-control" name="password" placeholder="Password" />
                        </div>
                        { errors}
                        
                        <button className="btn btn-primary btn-block mt-4" type="submit">Sign In</button>
                        <p className="text-center mt-3">
                            Register new account <Link href="/auth/signup">Sing Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);
    const doRequest = async () =>{
        try{
            setErrors(null);
            const response = await axios[method](url, body);
            if(onSuccess){
           onSuccess(response.data);

            }
            



        }
    catch (err){
        setErrors(
            <div className="mt-2 alert alert-danger">
            <h4> Ooops....</h4>
            <ul className="">
            {  err.response.data.errors.map( err => (
            <li key={err.message}>{err.message}</li>
        ))}
    </ul>
    </div>
        );
     }
    };
    return {doRequest, errors};
}

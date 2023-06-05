import axios from "axios";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Payment = ()=> {

    const navigate = useNavigate()
    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/payment/create-checkout-session', {
            // user: (JSON.parse(Cookies.get('user')))._id
            });

            if(res.data.url){
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.log('Error while making payment : ', error.message);
        }

    }

    return (
        <>
            <h2 style={{color: 'red', textAlign: 'center'}}>
            Please upgrade to premium plan for posting more than 5 blogs !!
            </h2>

            <form onSubmit={handleSubmit}>

                <h3 style={{textAlign: 'center'}}>Hello user, you just have to make one time payment for activating your lifetime subscription and you will be able to post unlimited blogs</h3> 
                <h4 style={{textAlign: 'center'}}>Click on below link for redirecting to payment page</h4>
                <br />
                <button type='submit'>
                    Pay INR 500
                </button>

            </form>
        </>
    )
}

export default Payment;
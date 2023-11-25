import React from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const PaymentConfirm = async() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    // Check if userId is present in the URL
    if (params.userId) {
        const userId = params.userId;
        console.log(userId)

        // Now you can make the API call to update the user's payment status
        // using the endpoint: `https://api.sovereigntechltd.com/api/v1/users/make-payment/${userId}`
        try {
            const apiUrl = `https://api.sovereigntechltd.com/api/v1/users/make-payment/${userId}`;
            const apiResponse = await axios.put(apiUrl);
  
            if (apiResponse.status === 200) {
              // Payment was successful, navigate to a success screen
              alert('Payment was successfully processed!');
              Navigate('login')
            } else {
              // Handle other cases or show an error message
              alert('Payment was not successfully processed.');
            }
          } catch (error) {
            alert('Error making payment API request:', error);
          }
    }
    return (
        <div>

        </div>
    )
}

export default PaymentConfirm

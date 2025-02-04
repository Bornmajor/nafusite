const fetch = require("node-fetch");
require("dotenv").config(); // Load environment variables

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { toEmail, message,subject } = JSON.parse(event.body);

    // Check for API key before sending the request
    if (!process.env.MAILERSEND_API_KEY) {
      console.error('MailerSend API key is missing!');
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'API key missing' }),
      };
    }

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: { email: "MS_rENXjy@trial-k68zxl2kovelj905.mlsender.net" },
        to: [{ email: toEmail }],
        subject: subject,
        text: subject,
        html:`<html lang="en">
        <style>
.container{
    display: flex;
    align-items: center ;
    justify-content: center;
    flex-direction: column;
}

.inner-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #f1f1f1;
    padding: 30px;
    border-radius: 10px;
    margin: 20px 10px;
    width: 100%;
    max-width: 400px;

}
.container-center{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.logo-img{
    width: 200px;
    height: 60px;
    object-fit: cover;
}
p{
    margin: 0;
}
.title{
    margin: 10px 0;
}

.text-center{
    text-align: center;
}
.margin-10{
    margin: 10px 0;
}

.bold{
    font-weight: 600;
}
.font-20{
    font-size: 20px;
}
.font-18{
    font-size: 18px;
}

.content-container{
    margin: 20px 0;
}
</style>
<body>

<div class="container">

    <div class="inner-container">
        
        <div class="logo container-center">
        <img class="logo-img"  src="https://res.cloudinary.com/dx8t5kvns/image/upload/v1738570219/samples/fq3jolk8flhyyprqgk1u.png" alt="Logo"/>
        <p class="title font-18 bold text-center">Nafusite jewellery store</p>
        </div>

        
        <div class="content-container ">
            <p class="margin-10 font-18 bold">Hey, valued customer</p>
            <br>

            <p class="font-18" >
              ${message}
            </p>

            <br>
            <p class="margin-10 font-18 bold">Thanks</p>

        </div>

        <div class="container-brand">
           
        </div>




    </div>

</div>

</body>
</html>
        `,
      }),
    });

    console.log('Response Status Code:', response.status); // Log the status code
    console.log('Response Headers:', response.headers); // Log response headers

    const contentType = response.headers.get('Content-Type');
    console.log('Response Content-Type:', contentType); // Check content type

    const rawResponse = await response.text(); // Get raw response text
    console.log('Raw API response:', rawResponse);

    let responseData = {};
    if (rawResponse) {
      try {
        responseData = JSON.parse(rawResponse); // Attempt to parse JSON
      } catch (error) {
        console.error('Error parsing response as JSON:', error);
        responseData = { message: rawResponse }; // Fallback to raw response
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MailerSend API Error:', errorText);
      throw new Error(`Failed to send email. Status Code: ${response.status}, Response: ${errorText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully!",
        response: responseData,
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};

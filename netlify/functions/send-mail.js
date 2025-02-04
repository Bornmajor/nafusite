const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { email, subject, message } = JSON.parse(event.body);

    const response = await axios.post("https://your-mail-service-api-endpoint.com", {
      from: { email: "MS_rENXjy@trial-k68zxl2kovelj905.mlsender.net" },
      to: [{ email }],
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: response.data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};

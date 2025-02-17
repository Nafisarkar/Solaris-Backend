const activationMail = (name, url, token) => {
  console.log(name, url, token);
  const mainTemplate = `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333;">Hello ${name}!</h1>
        <p style="text-align: center; color: #555; line-height: 1.6;">
          Welcome! Please verify your email address by clicking the button below.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a
            style="display: inline-block; padding: 12px 24px; font-size: 16px; font-weight: bold; text-align: center; text-decoration: none; cursor: pointer; border: none; border-radius: 5px; color: #fff; background-color: #343a40; /* Dark Gray */"
            href="${url}/api/user/register?token=${token}"
            target="_blank"
          >
            Verify Email
          </a>
        </div>
        <p style="text-align: center; color: #777; margin-top: 30px; font-size: 12px;">
          This link will expire in 5 minutes. If you did not request this verification, please ignore this email.
        </p>
      </div>

      <div style="max-width: 600px; margin: 20px auto 0; padding: 10px; background-color: #e9ecef; text-align: center; font-size: 12px; color: #868e96; border-radius: 0 0 10px 10px;">
        © ${new Date().getFullYear()} PosterSmith. All rights reserved.
      </div>
    </body>
  `;

  return mainTemplate;
};

module.exports = activationMail;

import Mailgen from 'mailgen';

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we're exicted to have you on board.",
      action: {
        instructions: 'To verify email please click on the following button',
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    },
  };
};

const forgotPasswordVerificationMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of you account",
      action: {
        instructions: 'To reset you password click on the following button',
        button: {
          color: "#25e883", // Optional action button color
          text: "Reset your email",
          link: passwordResetUrl,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    },
  };
};

export {emailVerificationMailgenContent, forgotPasswordVerificationMailgenContent}
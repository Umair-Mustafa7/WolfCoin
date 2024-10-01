import React, { useEffect } from 'react';

const TelegramLogin = () => {
  useEffect(() => {
    // Dynamically load the Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", "jkehfjsefbot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", " https://671f-2400-adc7-1921-5100-553e-b6bd-28ca-7931.ngrok-free.app/api/auth/telegram");
    script.setAttribute("data-request-access", "write"); // Optional: ask for write access
    document.getElementById("telegram-login").appendChild(script);
  }, []);

  return <div id="telegram-login"></div>;
};

export default TelegramLogin;

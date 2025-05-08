import { useState } from "react";

export function usePasswordValidation() {
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isPasswordValid = (password: string) => {
    const isValid = password.length >= 8 && /\d/.test(password);
    return isValid;
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError("As senhas não são iguais.");
      return false;
    }

    setError("");
    return true;
  };

  return {
    error,
    isTouched,
    isPasswordValid,
    setIsTouched,
    validatePasswords,
  };
}

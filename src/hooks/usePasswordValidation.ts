import { useState } from "react";

export const usePasswordValidation = () => {
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePasswords = (password: string, confirmPassword: string): boolean => {
    setIsTouched(true);

    if (!isPasswordValid(password)) {
      setError("A senha deve ter no mínimo 8 caracteres e conter ao menos um número.");
      return false;
    }

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
};

"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { useLanguage } from "../../context/LanguageContext";
import { authAPI, ErrorMessage } from "../../lib/api";
import { CheckCodeData, ResetPasswordData } from "../../lib/languages";
import { toast } from "sonner";
import Cookie from "js-cookie";

export default function ResetPasswordPage() {
  const { language } = useLanguage();
  const currentTranslation = CheckCodeData[language];
  const [errors, setErrors] = useState([]);

  const email = new URLSearchParams(window.location.search).get("email");
  const [isCodeSuccess, setIsCodeSuccess] = useState(false);
  const [loadingCheckCode, setLoadingCheckCode] = useState(false);
  const handleSubmitCode = async (e) => {
    e.preventDefault();

    try {
      setLoadingCheckCode(true);
      setErrors([]);
      const { data } = await authAPI.checkResetCode(email, resetCode);
      toast("Code Verified", {
        description: "Your code has been successfully verified.",
      });
      Cookie.set("token", data.token);
      localStorage.setItem("token", data.token);
      setIsCodeSuccess(true);
    } catch (error) {
      setErrors(ErrorMessage(error));
      Cookie.remove("token");
      localStorage.removeItem("token");
    } finally {
      setLoadingCheckCode(false);
    }
  };

  const [resetCode, setResetCode] = useState("");
  const [loadingResendCode, setLoadingResendCode] = useState(false);
  const handleResendCode = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
      try {
        setLoadingResendCode(true);
        setErrors([]);
        await authAPI.resendCode(email);
        toast("Code Resent", {
          description: "A new verification code has been sent to your email.",
        });
      } catch (error) {
        setErrors(ErrorMessage(error));
      } finally {
        setLoadingResendCode(false);
      }
    }
  };

  // Count Down 5 min = 300 sec
  const [timeLeft, setTimeLeft] = useState(300);
  useEffect(() => {
    // If timeLeft reaches 0, stop the timer
    if (timeLeft === 0) return;

    // Set an interval that decrements the time every second
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when the component is unmounted or when timeLeft reaches 0
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  // Convert timeLeft from seconds into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={"flex flex-col justify-center max-w-md m-auto h-screen p-4"}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Card className="overflow-auto">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8 space-y-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">{currentTranslation.title}</h1>
              <p className="text-balance text-muted-foreground">
                {isCodeSuccess
                  ? currentTranslation.subtitleCodeSuccess
                  : currentTranslation.subtitleEnterCode}
              </p>
            </div>

            {isCodeSuccess ? (
              <ResetPassword />
            ) : (
              <>
                <div className="grid justify-center">
                  <InputOTP
                    maxLength={6}
                    value={resetCode}
                    onChange={(code) => setResetCode(code)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-12" index={0} />
                      <InputOTPSlot className="h-12 w-12" index={1} />
                      <InputOTPSlot className="h-12 w-12" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="h-12 w-12" index={3} />
                      <InputOTPSlot className="h-12 w-12" index={4} />
                      <InputOTPSlot className="h-12 w-12" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="text-end">
                    <Button
                      variant={"link"}
                      className="p-0"
                      onClick={handleResendCode}
                      disabled={timeLeft !== 0 || loadingResendCode}
                    >
                      {currentTranslation.resendCode}
                      {timeLeft !== 0 && (
                        <span className="animate-pulse">
                          {minutes < 10 ? "0" + minutes : minutes}:
                          {seconds < 10 ? "0" + seconds : seconds}
                        </span>
                      )}
                    </Button>
                  </div>
                  {errors?.reset_code || errors ? (
                    <p className="text-red-500 font-semibold text-sm text-center">
                      {Array.isArray(errors?.reset_code)
                        ? errors?.reset_code[0]
                        : errors}
                    </p>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  className="w-full flex items-center"
                  onClick={handleSubmitCode}
                  disabled={loadingCheckCode}
                >
                  {loadingCheckCode && (
                    <div className="animate-spin mb-px">
                      <Loader2 />
                    </div>
                  )}
                  <span>{currentTranslation.submitCode}</span>
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const currentTranslation =
    ResetPasswordData[language] || ResetPasswordData["en"];
  const [errors, setErrors] = useState([]);

  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrors([]);
      await authAPI.resetPassword(form.password, form.password_confirmation);
      toast("Password Reset Success", {
        description:
          "Your password has been reset successfully. You can now log in with your new password. 👏",
      });
      navigate("/");
    } catch (error) {
      setErrors(ErrorMessage(error));
      Cookie.remove("token");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="grid gap-2">
        <label htmlFor="new-password">
          {currentTranslation.newPasswordLabel}
        </label>
        <Input
          id="new-password"
          name="new-password"
          type="password"
          placeholder={currentTranslation.newPasswordPlaceholder}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors?.password && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.password[0]}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="confirm-password">
          {currentTranslation.confirmPasswordLabel}
        </label>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder={currentTranslation.confirmPasswordPlaceholder}
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({
              ...form,
              password_confirmation: e.target.value,
            })
          }
        />
        {errors?.password_confirmation && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.password_confirmation[0]}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full flex items-center"
        onClick={handleResetPassword}
        disabled={loading}
      >
        {loading && (
          <div className="animate-spin mb-px">
            <Loader2 />
          </div>
        )}
        <span>{currentTranslation.resetPasswordButton}</span>
      </Button>
    </div>
  );
};

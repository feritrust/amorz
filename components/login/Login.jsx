"use client";

import { useState, useEffect } from "react";
import { useOtpGenerate, useOtpConfirm } from "@/hook/useOtp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToken } from "@/context/TokenContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { toEnglishDigits } from "@/utils/convertNumbers";

const LoginPage = () => {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const { mutate: generateOtpMutation, isLoading: isGeneratingOtp } =
    useOtpGenerate();
  const { mutate: confirmOtpMutation, isLoading: isConfirmingOtp } =
    useOtpConfirm();
  const { setAuthToken } = useToken(); // Use TokenContext to set the auth token

  // Handle OTP countdown timer
  useEffect(() => {
    if (remainingTime && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            setOtpSent(false);
            setStep(0);
            localStorage.removeItem("remainingTime");
            clearInterval(timer);
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  // Handle OTP generation
  const handleNext = () => {
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }

    generateOtpMutation(toEnglishDigits(phoneNumber), {
      onSuccess: (data) => {
        setStep(1); // Move to OTP input step only after success
        setOtpSent(true);
        setRemainingTime(data?.data?.remainingTime || 60); // Store remaining time
      },
      onError: (error) => {
        console.error(
          "Error generating OTP:",
          error?.response?.data || error?.message
        );
      },
    });
  };

  // Handle OTP confirmation
  const handleVerify = () => {
    if (!otpCode) {
      alert("Please enter the OTP.");
      return;
    }

    confirmOtpMutation(
      {
        phoneNumber: toEnglishDigits(phoneNumber),
        otpCode: toEnglishDigits(otpCode),
      },
      {
        onSuccess: (data) => {
          const token = data.message; // Extract JWT token from response
          setAuthToken(token); // Store in Context + Cookie
          toast.success("با موفقیت وارد شدید.", { duration: 3000 });
        },
        onError: (error) => {
          toast.error("خطایی رخ داد.", { duration: 3000 });
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">ورود</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={String(step)} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="0" disabled={otpSent}>
              شماره موبایل
            </TabsTrigger>
            <TabsTrigger value="1" disabled={!otpSent}>
              کد فعالسازی
            </TabsTrigger>
          </TabsList>

          <Progress value={step === 0 ? 50 : 100} className="my-4" />

          {/* Step 1: Enter Phone Number */}
          <TabsContent value="0">
            <Input
              className="tracking-widest"
              type="tel"
              placeholder="09*********"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(toEnglishDigits(e.target.value))}
              maxLength={11} // Limit to 10 digits
            />
            <Button
              className="mt-4 w-full"
              onClick={handleNext}
              disabled={!phoneNumber || isGeneratingOtp || otpSent}
            >
              {isGeneratingOtp
                ? "Generating OTP..."
                : otpSent
                ? `OTP sent, wait ${remainingTime}s`
                : "دریافت کد "}
            </Button>
          </TabsContent>

          {/* Step 2: Enter OTP */}
          <TabsContent value="1">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={(value) => setOtpCode(toEnglishDigits(value))}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {remainingTime && (
              <div className="text-sm text-gray-600 mt-2">
                <p>زمان باقی مانده: {remainingTime}s</p>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setStep(0)}
              >
                بازگشت
              </Button>
              <Button
                className="w-full"
                onClick={handleVerify}
                disabled={!otpCode || isConfirmingOtp}
              >
                {isConfirmingOtp ? "Verifying..." : "تایید"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoginPage;

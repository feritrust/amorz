"use client";

import { useState, useEffect } from "react";
import { useOtpGenerate, useOtpConfirm } from "@/hook/useOtp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const LoginPage = () => {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const { mutate: generateOtpMutation, isLoading: isGeneratingOtp } = useOtpGenerate();
  const { mutate: confirmOtpMutation, isLoading: isConfirmingOtp } = useOtpConfirm();

  // Load saved state from localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("step");
    const savedPhoneNumber = localStorage.getItem("phoneNumber");
    const savedRemainingTime = localStorage.getItem("remainingTime");

    if (savedStep) setStep(Number(savedStep));
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
    if (savedRemainingTime) setRemainingTime(Number(savedRemainingTime));
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("step", step);
    localStorage.setItem("phoneNumber", phoneNumber);
    if (remainingTime) {
      localStorage.setItem("remainingTime", remainingTime);
    } else {
      localStorage.removeItem("remainingTime");
    }
  }, [step, phoneNumber, remainingTime]);

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

    generateOtpMutation(phoneNumber, {
      onSuccess: (data) => {
        setStep(1); // Move to OTP input step only after success
        setOtpSent(true);
        setRemainingTime(data?.remainingTime || 60); // Store remaining time
      },
      onError: (error) => {
        console.error("Error generating OTP:", error?.response?.data || error?.message);
      },
    });
  };

  // Handle OTP confirmation
  const handleVerify = () => {
    if (!otpCode) {
      alert("Please enter the OTP.");
      return;
    }

    confirmOtpMutation({ phoneNumber, otpCode }, {
      onSuccess: (data) => {
        alert("OTP verified successfully!");
        console.log("Login success:", data);
      },
      onError: (error) => {
        console.error("OTP Confirmation Error:", error?.response?.data || error?.message);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={String(step)} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="0" disabled={otpSent}>Phone</TabsTrigger>
              <TabsTrigger value="1" disabled={!otpSent}>OTP</TabsTrigger>
            </TabsList>

            <Progress value={step === 0 ? 50 : 100} className="my-4" />

            {/* Step 1: Enter Phone Number */}
            <TabsContent value="0">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                className="mt-4 w-full"
                onClick={handleNext}
                disabled={!phoneNumber || isGeneratingOtp || otpSent}
              >
                {isGeneratingOtp ? "Generating OTP..." : otpSent ? `OTP sent, wait ${remainingTime}s` : "Next"}
              </Button>
            </TabsContent>

            {/* Step 2: Enter OTP */}
            <TabsContent value="1">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
              {remainingTime && (
                <div className="text-sm text-gray-600 mt-2">
                  <p>Time remaining: {remainingTime}s</p>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="w-full" onClick={() => setStep(0)} disabled={otpSent}>
                  Back
                </Button>
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={!otpCode || isConfirmingOtp}
                >
                  {isConfirmingOtp ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

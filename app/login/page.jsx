"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Login = () => {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={String(step)} className="w-full">
          {/* Stepper Navigation */}
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="0" disabled>Phone</TabsTrigger>
            <TabsTrigger value="1" disabled>OTP</TabsTrigger>
          </TabsList>

          {/* Step Progress */}
          <Progress value={step === 0 ? 50 : 100} className="my-4" />

          {/* Step 1: Enter Phone Number */}
          <TabsContent value="0">
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button className="mt-4 w-full" onClick={() => setStep(1)} disabled={!phone}>
              Next
            </Button>
          </TabsContent>

          {/* Step 2: Enter OTP */}
          <TabsContent value="1">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="w-full" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button className="w-full" disabled={!otp}>
                Verify
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
  )
}

export default Login
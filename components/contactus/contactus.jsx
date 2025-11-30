"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ContactUs() {
  const position = [40.7128, -74.006];

  return (
    <div className="flex flex-col items-center min-h-screen p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">تماس با ما</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-500" />
            <span>+989123269665</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500" />
            <span>تهران ، بهشت زهرا</span>
          </div>
          <div className="flex justify-center gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} باشگاه پدل. تمامی حقوق محفوظ است.
        </p>
        <div className="mt-4">
          <a href="/about" className="text-blue-400 hover:text-blue-600 mx-2">
            درباره ما
          </a>
          <a href="/contact" className="text-blue-400 hover:text-blue-600 mx-2">
            تماس با ما
          </a>
          <a href="/privacy" className="text-blue-400 hover:text-blue-600 mx-2">
            حریم خصوصی
          </a>
        </div>
      </div>
    </footer>
  );
}

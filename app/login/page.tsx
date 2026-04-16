// app/login/page.tsx

import LoginForm from "../_components/login_form";

export default function LoginPage() {
    return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <LoginForm />

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Sign Up
          </a>
        </p>

      </div>
    </div>
    );
}
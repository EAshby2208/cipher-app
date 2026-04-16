// app/signup/page.tsx

import SignupForm from "../_components/signup_form";

export default function SignupPage() {
  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <SignupForm />

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}
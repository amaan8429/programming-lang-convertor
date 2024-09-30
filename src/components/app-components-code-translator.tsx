"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { translateCode } from "@/actions/app-actions-translate-code";

const initialState = {
  translatedCode: "",
  error: null,
};

export default function CodeTranslator() {
  const [state, formAction] = useFormState(translateCode, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await formAction(formData);
    setIsLoading(false);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="sourceLanguage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Source Language
          </label>
          <select
            id="sourceLanguage"
            name="sourceLanguage"
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="targetLanguage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Language
          </label>
          <select
            id="targetLanguage"
            name="targetLanguage"
            className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="sourceCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Source Code
        </label>
        <textarea
          id="sourceCode"
          name="sourceCode"
          rows={10}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your source code here..."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
      >
        {isLoading ? "Translating..." : "Translate"}
      </button>
      {state.error && <div className="text-red-600 mt-2">{state.error}</div>}
      {state.translatedCode && (
        <div>
          <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-800">
            Translated Code:
          </h2>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto border border-gray-200">
            <code className="text-sm text-gray-800">
              {state.translatedCode}
            </code>
          </pre>
        </div>
      )}
    </form>
  );
}

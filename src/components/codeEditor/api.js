import axios from "axios";

export const LANGUAGE_IDS = {
  javascript: 63,
  typescript: 74,
  python: 71,
  java: 62,
  csharp: 51,
  php: 68,
};

const JUDGE0_URL =
  "https://ce.judge0.com/submissions";

export const executeCode = async (
  language,
  sourceCode
) => {
  const languageId = LANGUAGE_IDS[language];

  if (!languageId) {
    throw new Error(
      `Unsupported language: ${language}`
    );
  }

  // Create submission
  const submissionResponse = await axios.post(
    `${JUDGE0_URL}?base64_encoded=false&wait=true`,
    {
      language_id: languageId,
      source_code: sourceCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return submissionResponse.data;
};

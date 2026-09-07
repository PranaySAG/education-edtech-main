import React, { useState, useRef } from "react";
import {
  FaCloudUploadAlt,
  FaCamera,
  FaPaperPlane,
  FaVideo,
  FaVideoSlash,
  FaTrash,
} from "react-icons/fa";
import Webcam from "react-webcam";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

const highlights = [
  {
    label: "Fast setup",
    value: "Upload or capture instantly",
  },
  {
    label: "Smart prompt",
    value: "Ask for analysis, ideas, or edits",
  },
  {
    label: "Live response",
    value: "Streamed output with clean formatting",
  },
];

const capabilities = [
  "Image understanding",
  "Visual reasoning",
  "Prompt-driven generation",
  "Camera capture support",
];

const CameraComponent = ({ setImage, setImagePreview, onImagePresent }) => {
  const webcamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(true);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        setImagePreview(imageSrc);
        onImagePresent(true);
      }
    }
  };

  return (
    <div className="glass-panel flex flex-col gap-4 rounded-[1.75rem] border border-white/15 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">Camera input</p>
          <h3 className="text-xl font-semibold text-white">Capture from webcam</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-xl">
          Live
        </span>
      </div>
      {cameraActive ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="h-56 w-full rounded-[1.4rem] object-cover shadow-2xl ring-1 ring-white/10"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/5 text-sm text-slate-300">
          Camera Off
        </div>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={capture}
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          <FaCamera className="text-base" />
        </button>
        <button
          type="button"
          onClick={() => setCameraActive(!cameraActive)}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-3 text-white backdrop-blur-xl transition duration-300 hover:bg-white/10"
        >
          {cameraActive ? <FaVideoSlash className="text-base" /> : <FaVideo className="text-base" />}
        </button>
      </div>
    </div>
  );
};

const GeminiImageText = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const fileInputRef = useRef(null);
  const [isImagePresent, setIsImagePresent] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setCameraImage(null);
        setIsImagePresent(true);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setIsImagePresent(false);
      setCameraImage(null);
    }
  };

  const handleImagePresent = (isPresent) => {
    setIsImagePresent(isPresent);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOutput("Generating...");
    setShowOutput(true);

    if (!prompt.trim() && !imagePreview && !cameraImage) {
      setOutput("Enter a prompt or select an image.");
      return;
    }

    try {
      if (!API_KEY) {
        throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env.local file.");
      }

      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const imageDataUrl = cameraImage || imagePreview;

      const input = imageDataUrl
        ? (() => {
            const [header, imageData] = imageDataUrl.split(",");
            const mimeType = header.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
            return [
              { type: "text", text: prompt.trim() || "Describe and analyze this image." },
              { type: "image", data: imageData, mime_type: mimeType },
            ];
          })()
        : prompt.trim();

      const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input,
      });

      setOutput(interaction.output_text || "Gemini returned no text output.");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.24),_transparent_28%),linear-gradient(180deg,_#06111c_0%,_#071725_45%,_#030712_100%)]" />
      <div className="absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl space-y-6 lg:space-y-8">
        <section className="glass-panel overflow-hidden rounded-[2rem] border border-white/15 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
                <FaCamera className="text-emerald-300" />
                AI image analysis workspace
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Analyze images with a calm, premium, glass-style interface.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Upload a file or use your camera, then ask Gemini to describe, explain, compare, or improve what it sees.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-white/15 p-5">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_35%,transparent_70%,rgba(255,255,255,0.07))]" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Toolkit</p>
                    <h2 className="text-2xl font-semibold text-white">What this page can do</h2>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white backdrop-blur-xl">
                    <FaCloudUploadAlt />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {capabilities.map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Interaction quality</span>
                    <span>Polished</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6">
            {showOutput ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-300">AI generated output</p>
                    <h2 className="text-2xl font-semibold text-white">Your analysis is ready</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowOutput(false)}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl transition duration-300 hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5 text-slate-200 shadow-inner">
                  <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    response
                  </div>
                  <div className="max-h-[420px] overflow-y-auto pr-2">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="mt-4 mb-2 text-2xl font-bold text-white">{children}</h1>,
                        h2: ({ children }) => <h2 className="mt-3 mb-2 text-xl font-semibold text-white">{children}</h2>,
                        h3: ({ children }) => <h3 className="mt-2 mb-1 text-lg font-medium text-white">{children}</h3>,
                        p: ({ children }) => <p className="mb-3 text-sm leading-relaxed text-slate-300">{children}</p>,
                        ul: ({ children }) => <ul className="mb-3 list-disc space-y-1.5 pl-5 text-sm text-slate-300">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-300">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-emerald-300">{children}</strong>,
                        code: ({ children }) => <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-amber-200">{children}</code>,
                      }}
                    >
                      {output}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-300">Analysis workspace</p>
                    <h2 className="text-2xl font-semibold text-white">Upload an image</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-xl">
                    Drag, tap, or capture
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div
                    className="group flex min-h-[360px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-dashed border-white/15 bg-white/5 p-6 text-center transition duration-300 hover:border-white/30 hover:bg-white/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="rounded-full border border-white/15 bg-white/10 p-5 text-white backdrop-blur-xl transition duration-300 group-hover:scale-105">
                      <FaCloudUploadAlt className="text-4xl text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Upload image</h3>
                      <p className="mt-1 text-sm text-slate-300">Select a file from your device for immediate analysis.</p>
                    </div>

                    {imagePreview ? (
                      <div className="relative mt-2 w-full">
                        <img
                          src={imagePreview}
                          alt="Uploaded"
                          className="mx-auto h-56 w-full max-w-md rounded-[1.4rem] object-cover shadow-2xl ring-1 ring-white/10"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePreview(null);
                            setCameraImage(null);
                            setIsImagePresent(false);
                          }}
                          className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow-lg transition duration-300 hover:bg-red-600"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2 rounded-[1.4rem] border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-400">
                        PNG, JPG, JPEG supported
                      </div>
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>

                  <CameraComponent
                    setImage={setCameraImage}
                    setImagePreview={setImagePreview}
                    onImagePresent={handleImagePresent}
                  />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Prompt</label>
                    <textarea
                      name="prompt"
                      placeholder="Describe what you want Gemini to do with this image..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/25 focus:bg-white/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-50 ${
                      !prompt.trim() && !isImagePresent ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={!prompt.trim() && !isImagePresent}
                  >
                    <FaPaperPlane />
                    Generate analysis
                  </button>
                </form>
              </>
            )}
          </section>

          <aside className="space-y-6">
            <div className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-300">Quick tips</p>
                  <h3 className="text-xl font-semibold text-white">Best results</h3>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-emerald-300 backdrop-blur-xl">
                  <FaVideo />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Use clear, well-lit images for better analysis.",
                  "Ask for summaries, comparisons, or step-by-step explanations.",
                  "Try camera capture for a smoother mobile workflow.",
                ].map((tip) => (
                  <div key={tip} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] border border-white/15 p-5 sm:p-6">
              <p className="text-sm text-slate-300">Flow</p>
              <h3 className="mt-1 text-xl font-semibold text-white">From image to insight</h3>
              <div className="mt-5 space-y-4">
                {[
                  "Pick a file or capture from camera",
                  "Add a short prompt or question",
                  "Review Gemini output",
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <footer className="pb-4 text-center text-xs text-slate-400 sm:pb-6">
          Built with glassmorphism, depth, and motion.
        </footer>
      </div>
    </div>
  );
};

export default GeminiImageText;
import { useMemo, useState } from "react";
import GaugeComponent from "react-gauge-component";
import MarkdownViewer from "@/components/MarkdownViewer";
import { FaMale, FaFemale } from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";
import aboutbmi from "./aboutBMI.md?raw";
type Gender = "male" | "female";
type HeightUnit = "cm" | "ft";

export default function BMICalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [calculated, setCalculated] = useState(false);

  const heightInMeters = useMemo(() => {
    if (heightUnit === "cm") {
      const cm = Number(heightCm);
      return cm > 0 ? cm / 100 : 0; // Convert cm to meters
    }
    const ft = Number(heightFt);
    const inch = Number(heightIn);
    const totalInches = ft * 12 + inch;
    return totalInches > 0 ? totalInches * 0.0254 : 0; // Convert inches to meters
  }, [heightUnit, heightCm, heightFt, heightIn]);

  // BMI = weight (kg) / [height (m)]^2
  const bmi = useMemo(() => {
    const w = Number(weight);
    if (!heightInMeters || !w) return 0;
    return w / (heightInMeters * heightInMeters);
  }, [weight, heightInMeters]);

  // WHO official adult BMI categories
  const bmiCategory = useMemo(() => {
    if (!bmi) return null;
    if (bmi < 18.5) return { label: "Underweight", color: "text-yellow-400" };
    if (bmi < 25) return { label: "Normal", color: "text-green-400" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-400" };
    if (bmi < 35) return { label: "Obese (Class I)", color: "text-red-400" };
    if (bmi < 40) return { label: "Obese (Class II)", color: "text-red-500" };
    return { label: "Obese (Class III)", color: "text-red-600" };
  }, [bmi]);

  const canCalculate =
    Number(age) >= 2 &&
    Number(age) <= 120 &&
    Number(weight) > 0 &&
    heightInMeters > 0;

  // Map BMI range (0 – 40) to gauge percentage (0 – 100)
  const gaugeValue = Math.floor(Math.min(Math.max((bmi / 40) * 100, 0), 100));

  return (
    <div className="mx-auto w-full max-w-5xl flex flex-col gap-9">
      <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/30 p-4 backdrop-blur-lg sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
            BMI Calculator
          </h1>
          <p className="text-sm text-zinc-400">
            Calculate your Body Mass Index using standard medical guidelines.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Form Inputs */}
          <div className="flex flex-col gap-6">
            {/* Gender */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">Gender</label>
              <div className="flex items-center gap-1 rounded-lg border border-zinc-800/40 bg-zinc-900/30 p-1">
                {[
                  { key: "male", label: "Male", icon: FaMale },
                  { key: "female", label: "Female", icon: FaFemale },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setGender(key as Gender)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      gender === key
                        ? "bg-zinc-800 text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years (2–120)"
                className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none"
              />
            </div>

            {/* Height */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-400">Height</label>
                <button
                  onClick={() =>
                    setHeightUnit((u) => (u === "cm" ? "ft" : "cm"))
                  }
                  className="flex items-center gap-1 text-xs text-zinc-500"
                >
                  <IoSwapHorizontal />
                  Switch to {heightUnit === "cm" ? "ft & in" : "cm"}
                </button>
              </div>

              {heightUnit === "cm" ? (
                <input
                  type="number"
                  placeholder="Centimeters"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none"
                />
              ) : (
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="FT"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="IN"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none"
                  />
                </div>
              )}
            </div>

            {/* Weight */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Kilograms"
                className="w-full rounded-lg border border-zinc-800/40 bg-zinc-900/30 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 outline-none"
              />
            </div>

            <button
              disabled={!canCalculate}
              onClick={() => setCalculated(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-800"
            >
              Calculate BMI
            </button>
          </div>

          {/* Right: Gauge + Results */}
          <div className="flex flex-col justify-center rounded-xl border border-zinc-800/40 bg-zinc-900/25 p-6 backdrop-blur-lg">
            {!calculated ? (
              <p className="text-center text-sm text-zinc-500">
                Enter your details to see the result
              </p>
            ) : (
              <>
                {/* Animated Gauge */}
                <div className="mx-auto w-64">
                  <GaugeComponent
                    value={gaugeValue} // 0–100 mapped from BMI
                    minValue={0}
                    maxValue={100}
                    arc={{
                      subArcs: [
                        {
                          limit: 46, // Underweight
                          color: "#DC2626",
                        },
                        {
                          limit: 62, // Normal
                          color: "#22C55E",
                        },
                        {
                          limit: 75, // Overweight
                          color: "#F59E0B",
                        },
                        {
                          color: "#EF4444", // Obese
                        },
                      ],
                    }}
                    pointer={{
                      type: "needle",
                      animate: true,
                    }}
                    labels={{
                      tickLabels: {
                        type: "outer",
                        ticks: [
                          {
                            value: 46,
                            valueConfig: {
                              formatTextValue: () => "Underweight",
                            },
                          },
                          {
                            value: 62,
                            valueConfig: { formatTextValue: () => "Normal" },
                          },
                          {
                            value: 75,
                            valueConfig: {
                              formatTextValue: () => "Overweight",
                            },
                          },
                          {
                            value: 100,
                            valueConfig: { formatTextValue: () => "Obese" },
                          },
                        ],
                        defaultTickValueConfig: {
                          style: {
                            fontSize: "10px",
                            fill: "#A1A1AA", // zinc-400
                          },
                        },
                        defaultTickLineConfig: {
                          width: 1,
                          length: 6,
                          color: "rgba(255,255,255,0.25)",
                        },
                      },
                    }}
                  />
                </div>

                {/* Text Summary */}
                <div className="mt-4 text-center">
                  <div className="text-3xl font-bold text-zinc-100">
                    {bmi.toFixed(1)}
                  </div>
                  {bmiCategory && (
                    <span
                      className={`text-sm font-medium ${bmiCategory.color}`}
                    >
                      {bmiCategory.label}
                    </span>
                  )}
                  <p className="mt-1 text-xs text-zinc-500">
                    Healthy range: 18.5 – 25 kg/m²
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <MarkdownViewer content={aboutbmi} filename="aboutBMI.md" />
    </div>
  );
}
